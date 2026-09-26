import type { NextFunction, Request, Response } from "express";

/**
 * Express 4 doesn't forward rejected promises from async route handlers to
 * the error-handling middleware on its own — wrap every async handler with
 * this so thrown/rejected errors reach `errorHandler` instead of hanging.
 */
export function asyncHandler<Req extends Request = Request>(
  fn: (req: Req, res: Response, next: NextFunction) => Promise<unknown>
) {
  return (req: Req, res: Response, next: NextFunction) => {
    fn(req, res, next).catch(next);
  };
}
