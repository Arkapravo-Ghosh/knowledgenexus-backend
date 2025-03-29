export const quizGeneratorPrompt = (text: string) => `
Generate a set of 5 multiple-choice questions based on the following study notes. Each question should have 4 answer choices, and the correct answer should be indicated.

Text:
${text}

Quiz:
`;
