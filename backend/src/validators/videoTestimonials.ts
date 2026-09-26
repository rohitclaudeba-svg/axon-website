import { z } from "zod";
import { youtubeIdSchema } from "./youtube";

export const videoTestimonialSchema = z.object({
  youtubeId: youtubeIdSchema,
  title: z.string().trim().min(1, "Please enter a title"),
  author: z.string().trim().max(150).optional().default(""),
});

export type VideoTestimonialInput = z.infer<typeof videoTestimonialSchema>;
