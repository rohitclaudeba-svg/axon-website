import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import multer from "multer";

const galleryDir = path.resolve(__dirname, "../../uploads/gallery");
fs.mkdirSync(galleryDir, { recursive: true });

const foundersDir = path.resolve(__dirname, "../../uploads/founders");
fs.mkdirSync(foundersDir, { recursive: true });

const subcategoryPagesDir = path.resolve(__dirname, "../../uploads/subcategory-pages");
fs.mkdirSync(subcategoryPagesDir, { recursive: true });

// Resumes/certificates carry PII — kept out of any publicly-served uploads
// directory and only ever readable through the admin-authenticated download
// route (see careerApplications.routes.ts), unlike the image dirs above.
const careerApplicationsDir = path.resolve(__dirname, "../../uploads/career-applications");
fs.mkdirSync(careerApplicationsDir, { recursive: true });

// Accepts any common raster/vector image format — banners, photos and logos
// come from all kinds of sources (phone camera, design tools, stock sites)
// and shouldn't be rejected just for being a GIF/SVG/BMP/etc.
const allowedMimeTypes = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "image/svg+xml",
  "image/bmp",
  "image/avif",
  "image/tiff",
  "image/x-icon",
  "image/vnd.microsoft.icon",
  "image/heic",
  "image/heif",
]);
const MAX_IMAGE_SIZE_BYTES = 10 * 1024 * 1024; // 10MB

export class UnsupportedFileTypeError extends Error {
  constructor() {
    super("Please upload an image file");
  }
}

function imageStorage(destDir: string) {
  return multer.diskStorage({
    destination: (_req, _file, cb) => cb(null, destDir),
    filename: (_req, file, cb) => {
      const ext = path.extname(file.originalname).toLowerCase();
      cb(null, `${crypto.randomUUID()}${ext}`);
    },
  });
}

const imageFileFilter: multer.Options["fileFilter"] = (_req, file, cb) => {
  if (!allowedMimeTypes.has(file.mimetype)) {
    cb(new UnsupportedFileTypeError());
    return;
  }
  cb(null, true);
};

export const uploadGalleryImage = multer({
  storage: imageStorage(galleryDir),
  limits: { fileSize: MAX_IMAGE_SIZE_BYTES },
  fileFilter: imageFileFilter,
}).single("image");

export const uploadFounderPhoto = multer({
  storage: imageStorage(foundersDir),
  limits: { fileSize: MAX_IMAGE_SIZE_BYTES },
  fileFilter: imageFileFilter,
}).single("photo");

export const uploadSubcategoryPageImage = multer({
  storage: imageStorage(subcategoryPagesDir),
  limits: { fileSize: MAX_IMAGE_SIZE_BYTES },
  fileFilter: imageFileFilter,
}).single("image");

const documentMimeTypes = new Set([
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "image/jpeg",
  "image/png",
]);
const MAX_DOCUMENT_SIZE_BYTES = 5 * 1024 * 1024; // 5MB, matches the frontend's existing limit

export class UnsupportedDocumentTypeError extends Error {
  constructor() {
    super("Please upload a PDF, Word document or image");
  }
}

const documentStorage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, careerApplicationsDir),
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    cb(null, `${crypto.randomUUID()}${ext}`);
  },
});

const documentFileFilter: multer.Options["fileFilter"] = (_req, file, cb) => {
  if (!documentMimeTypes.has(file.mimetype)) {
    cb(new UnsupportedDocumentTypeError());
    return;
  }
  cb(null, true);
};

export const uploadCareerApplicationFiles = multer({
  storage: documentStorage,
  limits: { fileSize: MAX_DOCUMENT_SIZE_BYTES },
  fileFilter: documentFileFilter,
}).fields([
  { name: "resume", maxCount: 1 },
  { name: "certificates", maxCount: 10 },
]);

export { galleryDir, foundersDir, subcategoryPagesDir, careerApplicationsDir };
