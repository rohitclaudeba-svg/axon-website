import { z } from "zod";
import { CAREER_OPENING_ICONS } from "../lib/careerOpeningIcons";

const nonEmptyString = z.string().trim().min(1);

export const createCareerOpeningSchema = z.object({
  title: z.string().trim().min(1, "Please enter a title"),
  department: z.string().trim().min(1, "Please enter a department"),
  icon: z.enum(CAREER_OPENING_ICONS).optional().default("briefcase"),
  type: z.string().trim().min(1, "Please enter an employment type"),
  location: z.string().trim().min(1, "Please enter a location"),
  summary: z.string().trim().min(1, "Please enter a summary"),
  responsibilities: z.array(nonEmptyString).optional().default([]),
  requirements: z.array(nonEmptyString).optional().default([]),
  enabled: z.boolean().optional().default(true),
});

export const updateCareerOpeningSchema = createCareerOpeningSchema;
