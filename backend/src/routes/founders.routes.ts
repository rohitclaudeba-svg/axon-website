import { Router } from "express";
import { requireAuth } from "../middleware/requireAuth";
import { uploadFounderPhoto } from "../middleware/upload";
import {
  listFoundersHandler,
  getFounderHandler,
  createFounderHandler,
  updateFounderHandler,
  deleteFounderHandler,
} from "../controllers/founders.controller";
import { asyncHandler } from "../utils/asyncHandler";

export const foundersRouter = Router();

foundersRouter.get("/founders", asyncHandler(listFoundersHandler));
foundersRouter.get("/founders/:id", asyncHandler(getFounderHandler));
foundersRouter.post("/founders", requireAuth, uploadFounderPhoto, asyncHandler(createFounderHandler));
foundersRouter.put("/founders/:id", requireAuth, uploadFounderPhoto, asyncHandler(updateFounderHandler));
foundersRouter.delete("/founders/:id", requireAuth, asyncHandler(deleteFounderHandler));
