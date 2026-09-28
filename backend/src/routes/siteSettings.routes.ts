import { Router } from "express";
import { requireAuth } from "../middleware/requireAuth";
import { getSiteSettingsHandler, updateSiteSettingsHandler } from "../controllers/siteSettings.controller";
import { asyncHandler } from "../utils/asyncHandler";

export const siteSettingsRouter = Router();

// Public — the live site's footer/contact page/floating buttons/schema.org
// markup all read the address, phone numbers, emails and hours from here.
siteSettingsRouter.get("/site-settings", asyncHandler(getSiteSettingsHandler));
siteSettingsRouter.put("/site-settings", requireAuth, asyncHandler(updateSiteSettingsHandler));
