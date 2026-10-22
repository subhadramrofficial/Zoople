
import multer from "multer";
import path from "path";
import { mkdir, unlink } from "fs/promises";
import { fileTypeFromFile } from "file-type";

const UPLOAD_DIR = path.resolve("uploads");
const MAX_IMAGE_SIZE = 5 * 1024 * 1024;

const ALLOWED_MIME_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
];

const storage = multer.diskStorage({
  destination: async (req, file, cb) => {
    try {
      await mkdir(UPLOAD_DIR, { recursive: true });
      cb(null, UPLOAD_DIR);
    } catch (error) {
      cb(error);
    }
  },

  filename: (req, file, cb) => {
    const uniqueName =
      Date.now() + "-" + Math.round(Math.random() * 1e9);

    // Use a trusted extension based on the MIME type.
    const extensions = {
      "image/jpeg": ".jpg",
      "image/png": ".png",
      "image/webp": ".webp",
    };

    const extension = extensions[file.mimetype];

    if (!extension) {
      return cb(new Error("Only JPG, PNG, and WebP images are allowed."));
    }

    cb(null, uniqueName + extension);
  },
});

const multerUpload = multer({
  storage,
  limits: {
    fileSize: MAX_IMAGE_SIZE,
    files: 1,
  },
  fileFilter: (req, file, cb) => {
    if (!ALLOWED_MIME_TYPES.includes(file.mimetype)) {
      return cb(
        new Error("Only JPG, PNG, and WebP images are allowed."),
      );
    }

    cb(null, true);
  },
});

// Handles Multer errors and verifies the actual file contents.
export const handleImageUpload = (req, res, next) => {
  multerUpload.single("image")(req, res, async (uploadError) => {
    if (uploadError) {
      if (req.file?.path) {
        await unlink(req.file.path).catch(() => {});
      }

      const message =
        uploadError instanceof multer.MulterError &&
        uploadError.code === "LIMIT_FILE_SIZE"
          ? "Image size must not exceed 5 MB."
          : uploadError.message ||
            "The image could not be uploaded.";

      return res.status(400).json({
        success: false,
        message,
      });
    }

    if (!req.file) {
      // The controller will decide whether an image is required.
      return next();
    }

    try {
      const detectedType = await fileTypeFromFile(req.file.path);

      if (
        !detectedType ||
        !ALLOWED_MIME_TYPES.includes(detectedType.mime)
      ) {
        await unlink(req.file.path).catch(() => {});

        return res.status(400).json({
          success: false,
          message: "The uploaded file is not a supported, valid image.",
        });
      }

      // Store the extension matching the detected file contents.
      const extensions = {
        "image/jpeg": ".jpg",
        "image/png": ".png",
        "image/webp": ".webp",
      };

      const correctExtension = extensions[detectedType.mime];

      if (path.extname(req.file.filename) !== correctExtension) {
        const newFilename = `${path.basename(
          req.file.filename,
          path.extname(req.file.filename),
        )}${correctExtension}`;

        const { rename } = await import("fs/promises");

        await rename(req.file.path, path.join(UPLOAD_DIR, newFilename));

        req.file.filename = newFilename;
        req.file.path = path.join(UPLOAD_DIR, newFilename);
      }

      next();
    } catch (error) {
      if (req.file?.path) {
        await unlink(req.file.path).catch(() => {});
      }

      console.error("Image validation error:", error);

      return res.status(400).json({
        success: false,
        message: "Unable to validate the uploaded image. Please try another file.",
      });
    }
  });
};
