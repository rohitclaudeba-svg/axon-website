import { Router } from "express";
import { requireAuth } from "../middleware/requireAuth";
import {
  listCategoriesHandler,
  getCategoryHandler,
  createCategoryHandler,
  updateCategoryHandler,
  deleteCategoryHandler,
} from "../controllers/categories.controller";
import { asyncHandler } from "../utils/asyncHandler";

export const categoriesRouter = Router();

// Public — the website header reads the full tree to build its menu.
categoriesRouter.get("/categories", asyncHandler(listCategoriesHandler));
categoriesRouter.get("/categories/:id", requireAuth, asyncHandler(getCategoryHandler));
categoriesRouter.post("/categories", requireAuth, asyncHandler(createCategoryHandler));
categoriesRouter.put("/categories/:id", requireAuth, asyncHandler(updateCategoryHandler));
categoriesRouter.delete("/categories/:id", requireAuth, asyncHandler(deleteCategoryHandler));
