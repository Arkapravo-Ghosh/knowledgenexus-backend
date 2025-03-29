import multer from "multer";
import path from "path";
import cacheConfig from "./cacheConfig";
import generateUUID from "../utils/uuidUtils";

/**
 * Multer storage configuration for handling file uploads.
 * Specifies the destination directory and filename format.
 */
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, cacheConfig.cacheDir); // Set the upload directory
  },
  filename: (req, file, cb) => {
    const newFileName = generateUUID();
    const extension = path.extname(file.originalname);
    cb(null, `${newFileName}${extension}`); // Create a unique file name
  },
});

/**
 * Upload configuration for multer with disk storage.
 */
const upload = multer({
  storage: storage,
  limits: { fileSize: 300 * 1024 * 1024 }, // Set file size limit
});

export default upload;
