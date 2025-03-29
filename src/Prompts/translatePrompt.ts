export const translatePrompt = (text: string, targetLanguage: string) => `
Translate the following text into ${targetLanguage}. Ensure that the translation is accurate and maintains the original meaning. If there are any idiomatic expressions, provide a suitable equivalent in ${targetLanguage}.
Text:
${text}
Translation:
`;
