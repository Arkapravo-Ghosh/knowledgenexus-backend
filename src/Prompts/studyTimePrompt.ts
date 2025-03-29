export const studyTimePrompt = (text: string) => `
Estimate the total time required to study and revise the given material, considering key topics and their difficulty level. Provide the estimation in hours and minutes.

Text:
${text}

Estimated Study Time:
`;
