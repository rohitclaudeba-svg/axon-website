import { z } from "zod";

export const reviewSchema = z.object({
  quote: z.string().trim().min(1, "Please enter the review text"),
  author: z.string().trim().min(1, "Please enter the author's name"),
  context: z.string().trim().max(150).optional().default(""),
  rating: z.coerce.number().int().min(1).max(5).optional(),
});

export type ReviewInput = z.infer<typeof reviewSchema>;
