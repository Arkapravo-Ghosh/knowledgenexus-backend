export const cheatSheetPrompt = (text: string) => `
Extract the most important formulas, key points, and definitions from the following text. Format them into a short cheat sheet for quick revision.

Text:
${text}

Cheat Sheet:
`;
