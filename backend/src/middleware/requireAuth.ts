import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { env } from "../config/env";

export interface AuthedRequest extends Request {
  admin?: { sub: number; email: string };
}

export function requireAuth(req: AuthedRequest, res: Response, next: NextFunction) {
  const header = req.headers.authorization;
  const token = header?.startsWith("Bearer ") ? header.slice("Bearer ".length) : null;

  if (!token) {
    return res.status(401).json({ ok: false, error: "Authentication required" });
  }

  try {
    const payload = jwt.verify(token, env.JWT_SECRET) as unknown as { sub: number; email: string };
    req.admin = payload;
    next();
  } catch {
    res.status(401).json({ ok: false, error: "Invalid or expired token" });
  }
}
