import { z } from "zod";

const listItemSchema = z.object({
  id: z.string(),
  text: z.string().trim().min(1),
});

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"] as const;

const timeString = z
  .string()
  .regex(/^([01]\d|2[0-3]):([0-5]\d)$/, "Use 24-hour HH:MM format")
  .or(z.literal(""));

const hourGroupSchema = z.object({
  id: z.string(),
  days: z.array(z.enum(DAYS)).min(1, "Select at least one day"),
  opens: timeString,
  closes: timeString,
  closed: z.boolean().default(false),
});

export const updateSiteSettingsSchema = z.object({
  streetAddress: z.string().trim().min(1, "Please enter a street address"),
  addressLocality: z.string().trim().min(1, "Please enter a city/town"),
  addressRegion: z.string().trim().min(1, "Please enter a state"),
  postalCode: z.string().trim().min(1, "Please enter a postal code"),
  phones: z.array(listItemSchema).min(1, "Please add at least one phone number"),
  emails: z.array(listItemSchema).min(1, "Please add at least one email address"),
  whatsappNumber: z.string().trim().optional().default(""),
  hours: z.array(hourGroupSchema).min(1, "Add at least one hours entry"),
});

export { DAYS };
