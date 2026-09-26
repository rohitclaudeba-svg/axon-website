import path from "node:path";
import express from "express";
import cors from "cors";
import { corsOrigins } from "./config/env";
import { healthRouter } from "./routes/health.routes";
import { authRouter } from "./routes/auth.routes";
import { galleryRouter } from "./routes/gallery.routes";
import { errorHandler, notFoundHandler } from "./middleware/errorHandler";

export const app = express();

app.use(cors({ origin: corsOrigins }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Publicly served — gallery photos are meant to be visible on the site, unlike
// career-application uploads (resumes/certificates), which are never exposed here.
app.use("/uploads/gallery", express.static(path.resolve(__dirname, "../uploads/gallery")));

app.use("/api", healthRouter);
app.use("/api", authRouter);
app.use("/api", galleryRouter);

app.use(notFoundHandler);
app.use(errorHandler);
