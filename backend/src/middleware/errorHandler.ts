import type { NextFunction, Request, Response } from "express";
import multer from "multer";
import { UnsupportedFileTypeError, UnsupportedDocumentTypeError } from "./upload";

export function notFoundHandler(req: Request, res: Response) {
  res.status(404).json({ ok: false, error: `Not found: ${req.method} ${req.path}` });
}

export function errorHandler(err: unknown, _req: Request, res: Response, _next: NextFunction) {
  if (err instanceof multer.MulterError) {
    const message = err.code === "LIMIT_FILE_SIZE" ? "File is too large." : err.message;
    return res.status(422).json({ ok: false, error: message });
  }

  if (err instanceof UnsupportedFileTypeError || err instanceof UnsupportedDocumentTypeError) {
    return res.status(422).json({ ok: false, error: err.message });
  }

  console.error("Unhandled error:", err);
  const message = err instanceof Error ? err.message : "Internal server error";
  res.status(500).json({ ok: false, error: message });
}
