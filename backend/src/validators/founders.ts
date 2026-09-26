import { z } from "zod";

export const createFounderSchema = z.object({
  name: z.string().trim().min(1, "Please enter a name"),
  credentials: z.string().trim().max(191).optional().default(""),
  role: z.string().trim().min(1, "Please enter a role"),
  bio: z.string().trim().min(1, "Please enter a bio"),
});

export const updateFounderSchema = createFounderSchema;
