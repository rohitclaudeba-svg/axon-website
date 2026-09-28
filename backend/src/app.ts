import path from "node:path";
import express from "express";
import cors from "cors";
import { corsOrigins } from "./config/env";
import { healthRouter } from "./routes/health.routes";
import { authRouter } from "./routes/auth.routes";
import { galleryRouter } from "./routes/gallery.routes";
import { reviewsRouter } from "./routes/reviews.routes";
import { videoTestimonialsRouter } from "./routes/videoTestimonials.routes";
import { enquiriesRouter } from "./routes/enquiries.routes";
import { foundersRouter } from "./routes/founders.routes";
import { categoriesRouter } from "./routes/categories.routes";
import { subcategoryPagesRouter } from "./routes/subcategoryPages.routes";
import { careerApplicationsRouter } from "./routes/careerApplications.routes";
import { careerOpeningsRouter } from "./routes/careerOpenings.routes";
import { errorHandler, notFoundHandler } from "./middleware/errorHandler";

export const app = express();

app.use(cors({ origin: corsOrigins }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Keeps the JSON API itself out of search results without blocking
// /uploads/* — those are the real gallery/founder photos, still discoverable
// for image search since the public site links to them.
app.use("/api", (_req, res, next) => {
  res.setHeader("X-Robots-Tag", "noindex, nofollow, noarchive");
  next();
});

app.get("/robots.txt", (_req, res) => {
  res.type("text/plain").send("User-agent: *\nDisallow: /api/\n");
});

// Publicly served — gallery photos are meant to be visible on the site, unlike
// career-application uploads (resumes/certificates), which are never exposed here.
app.use("/uploads/gallery", express.static(path.resolve(__dirname, "../uploads/gallery")));
app.use("/uploads/founders", express.static(path.resolve(__dirname, "../uploads/founders")));
app.use("/uploads/subcategory-pages", express.static(path.resolve(__dirname, "../uploads/subcategory-pages")));

app.use("/api", healthRouter);
app.use("/api", authRouter);
app.use("/api", galleryRouter);
app.use("/api", reviewsRouter);
app.use("/api", videoTestimonialsRouter);
app.use("/api", enquiriesRouter);
app.use("/api", foundersRouter);
app.use("/api", categoriesRouter);
app.use("/api", subcategoryPagesRouter);
app.use("/api", careerApplicationsRouter);
app.use("/api", careerOpeningsRouter);

app.use(notFoundHandler);
app.use(errorHandler);
