import { z } from "zod";

export const createCareerApplicationSchema = z.object({
  name: z.string().trim().min(2, "Please enter your full name"),
  email: z.string().trim().email("Please enter a valid email address"),
  phone: z.string().trim().regex(/^\d{10}$/, "Please enter a valid 10-digit mobile number"),
  position: z.string().trim().optional().default(""),
  message: z.string().trim().max(1000, "Message is too long").optional().default(""),
});
