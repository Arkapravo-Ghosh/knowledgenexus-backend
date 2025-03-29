import { translatePrompt } from "../Prompts/translatePrompt";
import generateContent from "../utils/genAIUtils";
import { Request, Response, NextFunction } from "express";

export const translateText = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { text, targetLanguage } = req.body;
    if (!text || !targetLanguage) {
      res.status(400).json({ error: "'text' and 'targetLanguage' are required." });
      return;
    };
    const translationPrompt = translatePrompt(text, targetLanguage);
    const translation = await generateContent([
      { role: "system", content: translationPrompt },
    ],
      "Translate",
    );
    if (!translation) {
      res.status(500).json({ error: "Failed to generate translation." });
      return;
    };

    res.json({ translation });
  } catch (error) {
    return next(error);
  };
};
