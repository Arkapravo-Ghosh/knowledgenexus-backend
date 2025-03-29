import generateContent from "./genAIUtils";

export const askDoubt = async (query: string, context: string): Promise<string> => {
  const result = await generateContent(
    [
      { role: "system", content: "You are an AI tutor. Answer the user's question based on the provided notes. Be clear and concise." },
      { role: "user", content: `Context:\n${context}\n\nQuestion:\n${query}` }
    ],
    "DoubtSolving"
  );
  return result;
};
