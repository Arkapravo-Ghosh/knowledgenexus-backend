export const summarizationPrompt = (text: string) => `
Summarize the following text while maintaining key concepts and important details. Keep it concise and structured.

Text:
${text}

Summary:
`;
