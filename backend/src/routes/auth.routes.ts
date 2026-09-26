import { Router } from "express";
import { loginHandler } from "../controllers/auth.controller";
import { asyncHandler } from "../utils/asyncHandler";

export const authRouter = Router();

authRouter.post("/auth/login", asyncHandler(loginHandler));
