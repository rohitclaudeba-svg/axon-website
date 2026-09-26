import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import multer from "multer";

const galleryDir = path.resolve(__dirname, "../../uploads/gallery");
fs.mkdirSync(galleryDir, { recursive: true });

const allowedMimeTypes = new Set(["image/jpeg", "image/png", "image/webp"]);
const MAX_IMAGE_SIZE_BYTES = 10 * 1024 * 1024; // 10MB

export class UnsupportedFileTypeError extends Error {
  constructor() {
    super("Only JPEG, PNG or WebP images are allowed");
  }
}

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, galleryDir),
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    cb(null, `${crypto.randomUUID()}${ext}`);
  },
});

export const uploadGalleryImage = multer({
  storage,
  limits: { fileSize: MAX_IMAGE_SIZE_BYTES },
  fileFilter: (_req, file, cb) => {
    if (!allowedMimeTypes.has(file.mimetype)) {
      cb(new UnsupportedFileTypeError());
      return;
    }
    cb(null, true);
  },
}).single("image");

export { galleryDir };
