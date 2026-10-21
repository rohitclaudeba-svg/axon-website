import { Router } from "express";
import { requireAuth } from "../middleware/requireAuth";
import {
  listEmailTemplatesHandler,
  updateEmailTemplateHandler,
  sendTestEmailHandler,
} from "../controllers/emailTemplates.controller";
import { asyncHandler } from "../utils/asyncHandler";

export const emailTemplatesRouter = Router();

// Admin-only — notification emails sent to the clinic inbox on form submissions.
emailTemplatesRouter.get("/email-templates", requireAuth, asyncHandler(listEmailTemplatesHandler));
emailTemplatesRouter.put("/email-templates/:key", requireAuth, asyncHandler(updateEmailTemplateHandler));
emailTemplatesRouter.post("/email-templates/:key/test", requireAuth, asyncHandler(sendTestEmailHandler));
