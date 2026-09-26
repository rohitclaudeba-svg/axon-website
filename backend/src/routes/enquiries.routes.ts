import { Router } from "express";
import { requireAuth } from "../middleware/requireAuth";
import {
  listEnquiriesHandler,
  getEnquiryHandler,
  createEnquiryHandler,
  updateEnquiryHandler,
  deleteEnquiryHandler,
} from "../controllers/enquiries.controller";
import { asyncHandler } from "../utils/asyncHandler";

export const enquiriesRouter = Router();

// Public — the site's book-appointment and contact forms both submit here.
enquiriesRouter.post("/enquiries", asyncHandler(createEnquiryHandler));

// Admin-only — reviewing/managing submissions.
enquiriesRouter.get("/enquiries", requireAuth, asyncHandler(listEnquiriesHandler));
enquiriesRouter.get("/enquiries/:id", requireAuth, asyncHandler(getEnquiryHandler));
enquiriesRouter.put("/enquiries/:id", requireAuth, asyncHandler(updateEnquiryHandler));
enquiriesRouter.delete("/enquiries/:id", requireAuth, asyncHandler(deleteEnquiryHandler));
