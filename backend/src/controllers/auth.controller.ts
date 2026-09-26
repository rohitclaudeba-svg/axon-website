import type { Request, Response } from "express";
import { loginSchema } from "../validators/auth";
import { login, InvalidCredentialsError } from "../services/auth.service";

export async function loginHandler(req: Request, res: Response) {
  const parsed = loginSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(422).json({ ok: false, errors: parsed.error.flatten().fieldErrors });
  }

  try {
    const result = await login(parsed.data);
    res.json({ ok: true, token: result.token, email: result.email });
  } catch (error) {
    if (error instanceof InvalidCredentialsError) {
      return res.status(401).json({ ok: false, error: error.message });
    }
    throw error;
  }
}
