import { z } from "zod";

export const enquirySchema = z.object({
  name: z.string().trim().min(2, "Please enter your full name"),
  phone: z
    .string()
    .trim()
    .min(7, "Please enter a valid phone number")
    .max(20, "Please enter a valid phone number"),
  email: z.string().trim().email("Please enter a valid email address").optional().or(z.literal("")),
  serviceInterest: z.string().optional(),
  preferredDate: z.string().optional(),
  preferredTime: z.string().optional(),
  message: z.string().trim().max(1000, "Message is too long").optional().or(z.literal("")),
});

export type EnquiryInput = z.infer<typeof enquirySchema>;

export const careerApplicationSchema = z.object({
  name: z.string().trim().min(2, "Please enter your full name"),
  email: z.string().trim().email("Please enter a valid email address"),
  phone: z
    .string()
    .trim()
    .min(7, "Please enter a valid phone number")
    .max(20, "Please enter a valid phone number"),
  position: z.string().optional(),
  message: z.string().trim().max(1000, "Message is too long").optional().or(z.literal("")),
});

export type CareerApplicationInput = z.infer<typeof careerApplicationSchema>;
