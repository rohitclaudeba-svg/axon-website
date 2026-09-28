import { Router } from "express";
import { requireAuth } from "../middleware/requireAuth";
import { uploadCareerApplicationFiles } from "../middleware/upload";
import {
  listCareerApplicationsHandler,
  createCareerApplicationHandler,
  downloadResumeHandler,
  downloadCertificateHandler,
  deleteCareerApplicationHandler,
} from "../controllers/careerApplications.controller";
import { asyncHandler } from "../utils/asyncHandler";

export const careerApplicationsRouter = Router();

// Public — the Careers page submits applications here.
careerApplicationsRouter.post(
  "/career-applications",
  uploadCareerApplicationFiles,
  asyncHandler(createCareerApplicationHandler)
);

// Admin-only — resumes/certificates carry PII, never served from a public
// static directory like gallery/founder photos are.
careerApplicationsRouter.get("/career-applications", requireAuth, asyncHandler(listCareerApplicationsHandler));
careerApplicationsRouter.get(
  "/career-applications/:id/resume",
  requireAuth,
  asyncHandler(downloadResumeHandler)
);
careerApplicationsRouter.get(
  "/career-applications/:id/certificates/:index",
  requireAuth,
  asyncHandler(downloadCertificateHandler)
);
careerApplicationsRouter.delete(
  "/career-applications/:id",
  requireAuth,
  asyncHandler(deleteCareerApplicationHandler)
);
