import { Router } from "express";
import { pdfController } from "../controllers/pdfController";

const router = Router();

router.post("/to-text", pdfController);

export default router;
