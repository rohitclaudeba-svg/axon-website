import type { Response } from "express";
import type { AuthedRequest } from "../middleware/requireAuth";
import {
  listEmailTemplates,
  updateEmailTemplate,
  isEmailTemplateKey,
} from "../services/emailTemplates.service";
import { updateEmailTemplateSchema } from "../validators/emailTemplates";
import { isMailerConfigured, notificationRecipients, sendTestEmail } from "../lib/mailer";

export async function listEmailTemplatesHandler(_req: AuthedRequest, res: Response) {
  const templates = await listEmailTemplates();
  res.json({
    ok: true,
    data: { configured: isMailerConfigured, recipients: notificationRecipients, templates },
  });
}

export async function updateEmailTemplateHandler(req: AuthedRequest, res: Response) {
  const key = req.params.key;
  if (!isEmailTemplateKey(key)) {
    return res.status(404).json({ ok: false, error: "Template not found" });
  }

  const parsed = updateEmailTemplateSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(422).json({ ok: false, errors: parsed.error.flatten().fieldErrors });
  }

  const template = await updateEmailTemplate(key, parsed.data);
  res.json({ ok: true, data: template });
}

export async function sendTestEmailHandler(req: AuthedRequest, res: Response) {
  const key = req.params.key;
  if (!isEmailTemplateKey(key)) {
    return res.status(404).json({ ok: false, error: "Template not found" });
  }

  try {
    const recipients = await sendTestEmail(key);
    res.json({ ok: true, data: { recipients } });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to send test email";
    res.status(502).json({ ok: false, error: message });
  }
}
