import generateContent from "./genAIUtils";

export const generateRevisedNotes = async (text: string): Promise<string> => {
  const result = await generateContent(
    [
      { role: "system", content: "Reformat the given text into structured, well-organized notes with headings, bullet points, and key concepts." },
      { role: "user", content: text }
    ],
    "RevisedNotesGeneration"
  );
  return result;
};
