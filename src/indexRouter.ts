import { Router, Request, Response } from "express";

const router = Router();

// Index Route
router.get("/", async (req: Request, res: Response): Promise<void> => {
  res.json({ message: "Server is Up and Running!" });
  return;
});

// Router Imports
import aiRouter from "./routes/aiRoutes";

// Router Mounts
router.use("/ai", aiRouter);

export default router;
