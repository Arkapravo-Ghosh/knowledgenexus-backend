import { Request, Response, NextFunction } from "express";
import { pdfToText } from "../utils/pdfUtils";
import upload from "../configs/multerConfig";
import { MulterError } from "multer";
import fs from "fs";

/**
 * Controller to handle PDF conversion and text extraction.
 */
export const pdfController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    upload.single("pdf")(req, res, async (err): Promise<void> => {
      if (err instanceof MulterError) {
        res.status(400).json({ message: "File too large" });
        return;
      } else if (err) {
        return next(err);
      };

      if (!req.file) {
        res.status(400).json({ message: "No file uploaded" });
        return;
      };

      const filePath = req.file.path;

      try {
        const pdfData = fs.readFileSync(filePath);
        const ocrScannedText = await pdfToText(new Uint8Array(pdfData));
        res.status(200).json({ text: ocrScannedText });
        return;
      } catch (error) {
        console.error("Error processing PDF:", error);
        res.status(500).json({ message: "Error processing the PDF file" });
        return;
      } finally {
        fs.unlinkSync(filePath); // Clean up the uploaded file
      };
    });
  } catch (error) {
    return next(error);
  }
};
