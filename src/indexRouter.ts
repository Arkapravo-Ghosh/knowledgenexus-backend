import { Router, Request, Response } from "express";

const router = Router();

// Index Route
router.get("/", async (req: Request, res: Response): Promise<void> => {
  res.json({ message: "Server is Up and Running!" });
  return;
});

// Router Imports
import aiRouter from "./routes/aiRoutes";
import pdfRouter from "./routes/pdfRouter";

// Router Mounts
router.use("/ai", aiRouter);
router.use("/pdf", pdfRouter);

export default router;
