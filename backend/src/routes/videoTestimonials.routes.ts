import { Router } from "express";
import { requireAuth } from "../middleware/requireAuth";
import {
  listVideoTestimonialsHandler,
  getVideoTestimonialHandler,
  createVideoTestimonialHandler,
  updateVideoTestimonialHandler,
  deleteVideoTestimonialHandler,
} from "../controllers/videoTestimonials.controller";
import { asyncHandler } from "../utils/asyncHandler";

export const videoTestimonialsRouter = Router();

videoTestimonialsRouter.get("/video-testimonials", asyncHandler(listVideoTestimonialsHandler));
videoTestimonialsRouter.get("/video-testimonials/:id", asyncHandler(getVideoTestimonialHandler));
videoTestimonialsRouter.post("/video-testimonials", requireAuth, asyncHandler(createVideoTestimonialHandler));
videoTestimonialsRouter.put("/video-testimonials/:id", requireAuth, asyncHandler(updateVideoTestimonialHandler));
videoTestimonialsRouter.delete("/video-testimonials/:id", requireAuth, asyncHandler(deleteVideoTestimonialHandler));
