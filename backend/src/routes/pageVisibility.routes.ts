import { Router } from "express";
import { requireAuth } from "../middleware/requireAuth";
import { getPageVisibilityHandler, updatePageVisibilityHandler } from "../controllers/pageVisibility.controller";
import { asyncHandler } from "../utils/asyncHandler";

export const pageVisibilityRouter = Router();

// Public — the website checks this to hide unpublished pages (and their menu,
// footer and sitemap links).
pageVisibilityRouter.get("/page-visibility", asyncHandler(getPageVisibilityHandler));
pageVisibilityRouter.put("/page-visibility/:key", requireAuth, asyncHandler(updatePageVisibilityHandler));
