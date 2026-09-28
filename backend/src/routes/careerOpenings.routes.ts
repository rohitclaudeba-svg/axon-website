import { Router } from "express";
import { requireAuth } from "../middleware/requireAuth";
import {
  listPublicCareerOpeningsHandler,
  listCareerOpeningsHandler,
  getCareerOpeningHandler,
  createCareerOpeningHandler,
  updateCareerOpeningHandler,
  deleteCareerOpeningHandler,
} from "../controllers/careerOpenings.controller";
import { asyncHandler } from "../utils/asyncHandler";

export const careerOpeningsRouter = Router();

// Public — the live Careers page's job board. Only ever returns enabled roles.
careerOpeningsRouter.get("/career-openings", asyncHandler(listPublicCareerOpeningsHandler));

// Admin-only — includes disabled roles so they can be re-enabled later.
careerOpeningsRouter.get("/career-openings/all", requireAuth, asyncHandler(listCareerOpeningsHandler));
careerOpeningsRouter.get("/career-openings/:id", requireAuth, asyncHandler(getCareerOpeningHandler));
careerOpeningsRouter.post("/career-openings", requireAuth, asyncHandler(createCareerOpeningHandler));
careerOpeningsRouter.put("/career-openings/:id", requireAuth, asyncHandler(updateCareerOpeningHandler));
careerOpeningsRouter.delete("/career-openings/:id", requireAuth, asyncHandler(deleteCareerOpeningHandler));
