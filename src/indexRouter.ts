import { Router, Request, Response } from "express";

const router = Router();

// Index Route
router.get("/", async (req: Request, res: Response): Promise<void> => {
  res.json({ message: "Server is Up and Running!" });
  return;
});

// Router Imports

// Router Mounts

export default router;
