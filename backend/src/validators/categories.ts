import { z } from "zod";

export const createCategorySchema = z.object({
  name: z.string().trim().min(1, "Please enter a name"),
  // Absent/null => parent category. A number => subcategory under that parent.
  parentId: z
    .union([z.number(), z.string()])
    .nullable()
    .optional()
    .transform((val) => {
      if (val === null || val === undefined || val === "") return null;
      const n = Number(val);
      return Number.isInteger(n) ? n : null;
    }),
});

export const updateCategorySchema = createCategorySchema;
