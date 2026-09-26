import { Router } from "express";
import { checkDbConnection } from "../config/db";

export const healthRouter = Router();

healthRouter.get("/health", async (_req, res) => {
  try {
    await checkDbConnection();
    res.json({ ok: true, db: "connected" });
  } catch (error) {
    console.error("Health check failed:", error);
    res.status(500).json({ ok: false, db: "disconnected" });
  }
});
