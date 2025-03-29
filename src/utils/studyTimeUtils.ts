import generateContent from "./genAIUtils";

export const estimateStudyTime = async (text: string): Promise<string> => {
  const result = await generateContent(
    [
      { role: "system", content: "Analyze the given study material and estimate the time required to complete it based on complexity and length. Provide the estimated time in minutes." },
      { role: "user", content: text }
    ],
    "StudyTimeEstimation"
  );
  return result;
};
