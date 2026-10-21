import { z } from "zod";

export const updateEmailTemplateSchema = z.object({
  subject: z.string().trim().min(1, "Subject is required").max(255, "Subject is too long"),
  body: z.string().trim().min(1, "Body is required").max(10000, "Body is too long"),
  enabled: z.boolean(),
});

export type UpdateEmailTemplateInput = z.infer<typeof updateEmailTemplateSchema>;
