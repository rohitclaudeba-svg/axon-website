import { z } from "zod";
import { youtubeIdSchema } from "./youtube";

export { youtubeIdSchema };

export const createVideoItemSchema = z.object({
  type: z.literal("video"),
  youtubeId: youtubeIdSchema,
  title: z.string().trim().min(1, "Please enter a title"),
  description: z.string().trim().max(500).optional().default(""),
});

export const updateVideoItemSchema = createVideoItemSchema.omit({ type: true });

export const createImageMetaSchema = z.object({
  type: z.literal("image"),
  description: z.string().trim().max(500).optional().default(""),
});

export const updateImageMetaSchema = createImageMetaSchema.omit({ type: true });
