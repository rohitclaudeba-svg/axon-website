import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { env } from "../config/env";
import { findAdminByEmail } from "../repositories/auth.repository";
import type { LoginInput } from "../validators/auth";

export class InvalidCredentialsError extends Error {
  constructor() {
    super("Invalid email or password");
  }
}

export async function login({ email, password }: LoginInput): Promise<{ token: string; email: string }> {
  const admin = await findAdminByEmail(email);
  if (!admin) throw new InvalidCredentialsError();

  const matches = await bcrypt.compare(password, admin.password_hash);
  if (!matches) throw new InvalidCredentialsError();

  const token = jwt.sign({ sub: admin.id, email: admin.email }, env.JWT_SECRET, { expiresIn: "12h" });
  return { token, email: admin.email };
}
