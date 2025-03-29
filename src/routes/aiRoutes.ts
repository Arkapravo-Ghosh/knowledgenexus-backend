import express from "express";
import { summarizeText } from "../utils/summarizerUtils";
import { generateRevisedNotes } from "../utils/revisedNotesUtils";
import { extractCheatSheet } from "../utils/cheatSheetUtils";
import { estimateStudyTime } from "../utils/studyTimeUtils";
import { askDoubt } from "../utils/doubtSolverUtils";
import { generateQuiz } from "../utils/quizGeneratorUtils";
import { validateAIRequest } from "../middlewares/validateMiddlewares";
import { Request, Response, NextFunction } from "express";
import sanitizeHtml from "sanitize-html"; // Add sanitization library

const router = express.Router();

// Secure validateAIRequest middleware
interface SecureValidateAIRequest extends Request {
    body: {
        text?: string;
        question?: string;
        context?: string;
    };
}

const secureValidateAIRequest = async (
    req: SecureValidateAIRequest,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        await validateAIRequest(req, res, next);
    } catch (error) {
        console.error("Validation error:", error); // Log the error
        res.status(500).json({ error: "Validation failed." });
    }
};

// Helper function to sanitize input
const sanitizeInput = (input: string): string => {
    return sanitizeHtml(input, {
        allowedTags: [],
        allowedAttributes: {},
    });
};

// Route for Summarization
router.post("/summarize", secureValidateAIRequest, async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) {
      res.status(400).json({ error: "'text' is required." });
      return;
    }
    const sanitizedText = sanitizeInput(text);
    const summary = await summarizeText(sanitizedText);
    res.json({ summary });
  } catch (error) {
    console.error("Error in /summarize route:", error); // Log the error
    res.status(500).json({ error: "Failed to generate summary." });
  }
});

// Route for Revised Notes
router.post("/revised-notes", secureValidateAIRequest, async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) {
      res.status(400).json({ error: "'text' is required." });
      return;
    }
    const sanitizedText = sanitizeInput(text);
    const revisedNotes = await generateRevisedNotes(sanitizedText);
    res.json({ revisedNotes });
  } catch (error) {
    console.error("Error in /revised-notes route:", error); // Log the error
    res.status(500).json({ error: "Failed to generate revised notes." });
  }
});

// Route for Cheat Sheet
router.post("/cheat-sheet", secureValidateAIRequest, async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) {
      res.status(400).json({ error: "'text' is required." });
      return;
    }
    const sanitizedText = sanitizeInput(text);
    const cheatSheet = await extractCheatSheet(sanitizedText);
    res.json({ cheatSheet });
  } catch (error) {
    console.error("Error in /cheat-sheet route:", error); // Log the error
    res.status(500).json({ error: "Failed to generate cheat sheet." });
  }
});

// Route for Study Time Estimation
router.post("/study-time", secureValidateAIRequest, async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) {
      res.status(400).json({ error: "'text' is required." });
      return;
    }
    const sanitizedText = sanitizeInput(text);
    const studyTime = await estimateStudyTime(sanitizedText);
    res.json({ studyTime });
  } catch (error) {
    console.error("Error in /study-time route:", error); // Log the error
    res.status(500).json({ error: "Failed to estimate study time." });
  }
});

// Route for AI Doubt Solver
router.post("/doubt", async (req, res): Promise<void> => {
  try {
    const { question, context } = req.body;
    if (!question || !context) {
      res.status(400).json({ error: "Both 'question' and 'context' are required." });
      return;
    }
    const sanitizedQuestion = sanitizeInput(question);
    const sanitizedContext = sanitizeInput(context);
    const answer = await askDoubt(sanitizedQuestion, sanitizedContext);
    res.json({ answer });
  } catch (error) {
    console.error("Error in /doubt route:", error); // Log the error
    res.status(500).json({ error: "Failed to solve the doubt." });
  }
});

// Route for AI Quiz Generation
router.post("/quiz", secureValidateAIRequest, async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) {
      res.status(400).json({ error: "'text' is required." });
      return;
    }
    const sanitizedText = sanitizeInput(text);
    const quiz = await generateQuiz(sanitizedText);
    res.json({ quiz });
  } catch (error) {
    console.error("Error in /quiz route:", error); // Log the error
    res.status(500).json({ error: "Failed to generate quiz." });
  }
});

export default router;
