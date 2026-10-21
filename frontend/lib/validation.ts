import { z } from "zod";

// Name, mobile number and email are mandatory on every public form.
const nameField = z.string().trim().min(2, "Please enter your full name");
const phoneField = z
  .string()
  .trim()
  .min(1, "Please enter your mobile number")
  .regex(/^\d{10}$/, "Please enter a valid 10-digit mobile number");

/**
 * Keeps only digits, capped at 10 — used on the mobile number inputs as the
 * visitor types. A pasted "+91 98765 43210" or "098765 43210" loses its
 * country/trunk prefix rather than being cut off at the wrong end.
 */
export function sanitizeMobileInput(value: string): string {
  let digits = value.trim().startsWith("+91") ? value.trim().slice(3) : value;
  digits = digits.replace(/\D/g, "");
  if (digits.length === 11 && digits.startsWith("0")) digits = digits.slice(1);
  return digits.slice(0, 10);
}
const emailField = z
  .string()
  .trim()
  .min(1, "Please enter your email address")
  .email("Please enter a valid email address");

export const enquirySchema = z.object({
  name: nameField,
  phone: phoneField,
  email: emailField,
  serviceInterest: z.string().optional(),
  preferredDate: z.string().optional(),
  preferredTime: z.string().optional(),
  message: z.string().trim().max(1000, "Message is too long").optional().or(z.literal("")),
});

export type EnquiryInput = z.infer<typeof enquirySchema>;

export const careerApplicationSchema = z.object({
  name: nameField,
  email: emailField,
  phone: phoneField,
  position: z.string().optional(),
  message: z.string().trim().max(1000, "Message is too long").optional().or(z.literal("")),
});

export type CareerApplicationInput = z.infer<typeof careerApplicationSchema>;
