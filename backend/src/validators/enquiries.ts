import { z } from "zod";

// Mirrors frontend/lib/validation.ts enquirySchema, plus `source` (which
// distinguishes the two admin-facing modules) and `status` (admin-only).
export const createEnquirySchema = z.object({
  source: z.enum(["appointment", "contact"]).default("appointment"),
  name: z.string().trim().min(2, "Please enter your full name"),
  phone: z.string().trim().min(7).max(20, "Please enter a valid phone number"),
  email: z.string().trim().email("Please enter a valid email address").optional().or(z.literal("")),
  serviceInterest: z.string().trim().optional(),
  preferredDate: z.string().trim().optional(),
  preferredTime: z.string().trim().optional(),
  message: z.string().trim().max(1000, "Message is too long").optional().or(z.literal("")),
});

export type CreateEnquiryInput = z.infer<typeof createEnquirySchema>;

export const enquiryStatusValues = [
  "waiting_for_action",
  "no_response",
  "follow_up",
  "appointment_confirmed",
  "consultation_done",
] as const;

export const updateEnquirySchema = z.object({
  name: z.string().trim().min(2, "Please enter the full name"),
  phone: z.string().trim().min(7).max(20, "Please enter a valid phone number"),
  email: z.string().trim().email("Please enter a valid email address").optional().or(z.literal("")),
  serviceInterest: z.string().trim().optional().or(z.literal("")),
  preferredDate: z.string().trim().optional().or(z.literal("")),
  preferredTime: z.string().trim().optional().or(z.literal("")),
  message: z.string().trim().max(1000).optional().or(z.literal("")),
  status: z.enum(enquiryStatusValues),
});

export type UpdateEnquiryInput = z.infer<typeof updateEnquirySchema>;

export const listEnquiriesQuerySchema = z.object({
  source: z.enum(["appointment", "contact"]).optional(),
  status: z.enum(enquiryStatusValues).optional(),
  q: z.string().trim().optional(),
  month: z
    .string()
    .trim()
    .regex(/^\d{4}-\d{2}$/, "month must be in YYYY-MM format")
    .optional(),
});
