import { Router } from "express";
import { requireAuth } from "../middleware/requireAuth";
import { uploadSubcategoryPageImage } from "../middleware/upload";
import {
  listSubcategoryPagesHandler,
  getSubcategoryPageHandler,
  updateSubcategoryPageHandler,
  uploadSubcategoryPageImageHandler,
} from "../controllers/subcategoryPages.controller";
import { asyncHandler } from "../utils/asyncHandler";

export const subcategoryPagesRouter = Router();

subcategoryPagesRouter.get("/subcategory-pages", requireAuth, asyncHandler(listSubcategoryPagesHandler));
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
