import generateContent from "./genAIUtils";

export const summarizeText = async (text: string): Promise<string> => {
  return await generateContent(
    [
      { role: "system", content: "Summarize the following text in a concise manner." },
      { role: "user", content: text }
    ],
    "Summarization"
  );
};
