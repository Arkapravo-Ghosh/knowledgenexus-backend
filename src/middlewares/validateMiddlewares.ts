import { Request, Response, NextFunction } from "express";

export const validateAIRequest = (req: Request, res: Response, next: NextFunction): void => {
  if (!req.body.text) {
    res.status(400).json({ error: "Missing 'text' field in request body." });
    return;
  }
  next();
};
