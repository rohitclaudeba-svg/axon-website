import { z } from "zod";

// Accepts either a raw 11-char YouTube video ID or a full YouTube/Shorts URL,
// and always returns just the ID.
function extractYoutubeId(input: string): string | null {
  const trimmed = input.trim();
  if (/^[a-zA-Z0-9_-]{11}$/.test(trimmed)) return trimmed;

  try {
    const url = new URL(trimmed);
    if (url.hostname.includes("youtu.be")) {
      return url.pathname.slice(1) || null;
    }
    if (url.hostname.includes("youtube.com")) {
      if (url.pathname.startsWith("/shorts/")) return url.pathname.split("/shorts/")[1] ?? null;
      if (url.pathname.startsWith("/embed/")) return url.pathname.split("/embed/")[1] ?? null;
      return url.searchParams.get("v");
    }
  } catch {
    return null;
  }

  return null;
}

export const youtubeIdSchema = z
  .string()
  .trim()
  .min(1, "Please enter a YouTube link")
  .transform((value, ctx) => {
    const id = extractYoutubeId(value);
    if (!id) {
      ctx.addIssue({ code: "custom", message: "That doesn't look like a valid YouTube link or video ID" });
      return z.NEVER;
    }
    return id;
  });

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
