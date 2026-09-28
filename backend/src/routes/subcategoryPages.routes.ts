import { Router } from "express";
import { requireAuth } from "../middleware/requireAuth";
import { uploadSubcategoryPageImage } from "../middleware/upload";
import {
  listSubcategoryPagesHandler,
  listParentCategoryPagesHandler,
  getSubcategoryPageHandler,
  updateSubcategoryPageHandler,
  getPublicSubcategoryPageHandler,
  uploadSubcategoryPageImageHandler,
} from "../controllers/subcategoryPages.controller";
import { asyncHandler } from "../utils/asyncHandler";

export const subcategoryPagesRouter = Router();

// Public — the live website fetches a subcategory's page content by slug.
// Only ever returns a page whose status is "published".
subcategoryPagesRouter.get("/subcategory-pages/public/:slug", asyncHandler(getPublicSubcategoryPageHandler));

subcategoryPagesRouter.get("/subcategory-pages", requireAuth, asyncHandler(listSubcategoryPagesHandler));
subcategoryPagesRouter.get("/subcategory-pages/parents", requireAuth, asyncHandler(listParentCategoryPagesHandler));
subcategoryPagesRouter.get(
  "/subcategory-pages/by-category/:categoryId",
  requireAuth,
  asyncHandler(getSubcategoryPageHandler)
);
subcategoryPagesRouter.put("/subcategory-pages/:id", requireAuth, asyncHandler(updateSubcategoryPageHandler));
subcategoryPagesRouter.post(
  "/subcategory-pages/upload-image",
  requireAuth,
  uploadSubcategoryPageImage,
  asyncHandler(uploadSubcategoryPageImageHandler)
);
