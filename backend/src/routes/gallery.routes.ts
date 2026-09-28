import { Router } from "express";
import { requireAuth } from "../middleware/requireAuth";
import { uploadGalleryImage } from "../middleware/upload";
import {
  listGalleryHandler,
  getGalleryHandler,
  createGalleryHandler,
  updateGalleryHandler,
  reorderGalleryHandler,
  deleteGalleryHandler,
} from "../controllers/gallery.controller";
import { asyncHandler } from "../utils/asyncHandler";

export const galleryRouter = Router();

galleryRouter.get("/gallery", asyncHandler(listGalleryHandler));
galleryRouter.put("/gallery/reorder", requireAuth, asyncHandler(reorderGalleryHandler));
galleryRouter.get("/gallery/:id", asyncHandler(getGalleryHandler));
galleryRouter.post("/gallery", requireAuth, uploadGalleryImage, asyncHandler(createGalleryHandler));
galleryRouter.put("/gallery/:id", requireAuth, uploadGalleryImage, asyncHandler(updateGalleryHandler));
galleryRouter.delete("/gallery/:id", requireAuth, asyncHandler(deleteGalleryHandler));
