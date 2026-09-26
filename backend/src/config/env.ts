import "dotenv/config";
import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z.string().default("development"),
  PORT: z.coerce.number().default(4000),
  DB_HOST: z.string().min(1, "DB_HOST is required"),
  DB_PORT: z.coerce.number().default(3306),
  DB_USER: z.string().min(1, "DB_USER is required"),
  DB_PASSWORD: z.string().default(""),
  DB_NAME: z.string().min(1, "DB_NAME is required"),
  JWT_SECRET: z.string().min(1, "JWT_SECRET is required"),
  ADMIN_EMAIL: z.string().email().optional(),
  ADMIN_INITIAL_PASSWORD: z.string().optional(),
  CORS_ORIGIN: z.string().default("http://localhost:3000"),
  PUBLIC_API_URL: z.string().optional(),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error("Invalid environment configuration:", parsed.error.flatten().fieldErrors);
  throw new Error("Fix backend/.env before starting the server.");
}

export const env = {
  ...parsed.data,
  // The full base URL the frontend/admin use to reach this API — defaults to
  // localhost:PORT for local dev; set PUBLIC_API_URL in .env once deployed.
  PUBLIC_API_URL: parsed.data.PUBLIC_API_URL ?? `http://localhost:${parsed.data.PORT}`,
};

export const corsOrigins = env.CORS_ORIGIN.split(",").map((origin) => origin.trim());
