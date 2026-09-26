import { Router } from "express";
import { requireAuth } from "../middleware/requireAuth";
import {
  listReviewsHandler,
  getReviewHandler,
  createReviewHandler,
  updateReviewHandler,
  deleteReviewHandler,
} from "../controllers/reviews.controller";
import { asyncHandler } from "../utils/asyncHandler";

export const reviewsRouter = Router();

reviewsRouter.get("/reviews", asyncHandler(listReviewsHandler));
reviewsRouter.get("/reviews/:id", asyncHandler(getReviewHandler));
reviewsRouter.post("/reviews", requireAuth, asyncHandler(createReviewHandler));
reviewsRouter.put("/reviews/:id", requireAuth, asyncHandler(updateReviewHandler));
reviewsRouter.delete("/reviews/:id", requireAuth, asyncHandler(deleteReviewHandler));
