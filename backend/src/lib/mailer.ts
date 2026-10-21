import fs from "node:fs";
import nodemailer from "nodemailer";
import { env } from "../config/env";
import { emailTemplateDefinitions, type EmailTemplateKey } from "./emailTemplateDefaults";
import { getEmailTemplate } from "../services/emailTemplates.service";
import type { EnquiryDto } from "../services/enquiries.service";
import type { CareerApplicationDto } from "../services/careerApplications.service";

// Gmail SMTP transport. Null when credentials aren't configured, in which case
// notifications are silently skipped so local dev works without email setup.
const transporter =
  env.SMTP_USER && env.SMTP_PASS
    ? nodemailer.createTransport({
        service: "gmail",
        auth: { user: env.SMTP_USER, pass: env.SMTP_PASS },
      })
    : null;

// SMTP_USER always receives notifications, plus any extra ENQUIRY_NOTIFY_TO inboxes.
export const notificationRecipients = Array.from(
  new Set(
    [env.SMTP_USER ?? "", ...(env.ENQUIRY_NOTIFY_TO ?? "").split(",")]
      .map((address) => address.trim())
      .filter(Boolean)
  )
);

export const isMailerConfigured = transporter !== null && notificationRecipients.length > 0;

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function fill(template: string, vars: Record<string, string>, transform: (value: string) => string): string {
  return template.replace(/\{\{\s*(\w+)\s*\}\}/g, (match, name: string) =>
    name in vars ? transform(vars[name] || "-") : match
  );
}

function formatSubmittedAt(date: Date = new Date()): string {
  return date.toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

export interface MailAttachment {
  filename: string;
  path: string;
}

// Gmail rejects messages over 25MB, and base64 encoding inflates attachments
// by ~33% — so cap the raw total well below that.
const MAX_ATTACHMENT_BYTES = 17 * 1024 * 1024;

/** Keeps attachments in order until the size budget runs out; missing files are skipped. */
async function fitAttachments(candidates: MailAttachment[]): Promise<{ included: MailAttachment[]; skipped: MailAttachment[] }> {
  const included: MailAttachment[] = [];
  const skipped: MailAttachment[] = [];
  let total = 0;
  for (const file of candidates) {
    const size = await fs.promises
      .stat(file.path)
      .then((stats) => stats.size)
      .catch(() => null);
    if (size === null || total + size > MAX_ATTACHMENT_BYTES) {
      skipped.push(file);
      continue;
    }
    total += size;
    included.push(file);
  }
  return { included, skipped };
}

interface SendOptions {
  replyTo?: string | null;
  attachments?: MailAttachment[];
  // Test sends go out even when the template is switched off, and surface
  // errors to the admin instead of only logging them.
  isTest?: boolean;
}

async function sendTemplatedEmail(
  key: EmailTemplateKey,
  vars: Record<string, string>,
  options: SendOptions = {}
): Promise<void> {
  if (!transporter || notificationRecipients.length === 0) {
    if (options.isTest) throw new Error("Email is not configured — set SMTP_USER and SMTP_PASS in backend/.env.");
    return;
  }

  const template = await getEmailTemplate(key);
  if (!template.enabled && !options.isTest) return;

  const subject = fill(template.subject, vars, (value) => value.replace(/\s+/g, " "));
  const text = fill(template.body, vars, (value) => value);
  const html =
    `<div style="font-family:Arial,sans-serif;font-size:14px;line-height:1.6;color:#1e293b">` +
    fill(escapeHtml(template.body), vars, escapeHtml).replace(/\n/g, "<br>") +
    `</div>`;

  await transporter.sendMail({
    from: `"AXON Website" <${env.SMTP_USER}>`,
    to: notificationRecipients,
    replyTo: options.replyTo || undefined,
    subject: options.isTest ? `[TEST] ${subject}` : subject,
    text,
    html,
    attachments: options.attachments,
  });
}

/**
 * Notification senders for the public forms. Never throw — a mail failure
 * must not fail the visitor's submission (it's already saved by then).
 */
export async function notifyEnquiry(enquiry: EnquiryDto): Promise<void> {
  try {
    await sendTemplatedEmail(
      enquiry.source,
      {
        name: enquiry.name,
        phone: enquiry.phone,
        email: enquiry.email ?? "",
        service: enquiry.serviceInterest ?? "",
        preferredDate: enquiry.preferredDate ?? "",
        preferredTime: enquiry.preferredTime ?? "",
        message: enquiry.message ?? "",
        submittedAt: formatSubmittedAt(),
      },
      { replyTo: enquiry.email }
    );
  } catch (error) {
    console.error(`Failed to send ${enquiry.source} notification email:`, error);
  }
}

export async function notifyCareerApplication(
  application: CareerApplicationDto,
  files: MailAttachment[]
): Promise<void> {
  try {
    const { included, skipped } = await fitAttachments(files);
    let attachedFiles = included.map((file) => file.filename).join(", ") || "None";
    if (skipped.length > 0) {
      attachedFiles += ` (not attached, too large for email: ${skipped
        .map((file) => file.filename)
        .join(", ")} — download from the admin panel)`;
    }

    await sendTemplatedEmail(
      "career_application",
      {
        name: application.name,
        phone: application.phone,
        email: application.email,
        position: application.position ?? "",
        message: application.message ?? "",
        resumeFilename: application.resumeOriginalFilename,
        certificateCount: String(application.certificateCount),
        attachedFiles,
        submittedAt: formatSubmittedAt(),
      },
      { replyTo: application.email, attachments: included }
    );
  } catch (error) {
    console.error("Failed to send career application notification email:", error);
  }
}

/** Sends a template filled with sample data. Throws so the admin sees why it failed. */
export async function sendTestEmail(key: EmailTemplateKey): Promise<string[]> {
  await sendTemplatedEmail(key, emailTemplateDefinitions[key].sample, { isTest: true });
  return notificationRecipients;
}
