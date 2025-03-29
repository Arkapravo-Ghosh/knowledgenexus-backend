import generateContent from "./genAIUtils";

export const generateQuiz = async (text: string): Promise<string> => {
  const result = await generateContent(
    [
      { role: "system", content: "Generate 3 multiple-choice questions (MCQs) from the following study notes. Each question should have 4 answer options (A, B, C, D) with the correct answer indicated." },
      { role: "user", content: text }
    ],
    "QuizGeneration"
  );
  return result;
};
