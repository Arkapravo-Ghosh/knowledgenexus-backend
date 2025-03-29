import generateContent from "./genAIUtils";

export const extractCheatSheet = async (text: string): Promise<string> => {
  const result = await generateContent(
    [
      { role: "system", content: "Extract key formulas, definitions, and important concepts as a concise cheat sheet." },
      { role: "user", content: text }
    ],
    "CheatSheetExtraction"
  );
  return result;
};
