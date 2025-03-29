export const doubtSolverPrompt = (question: string, context: string) => `
Use the provided context to answer the student's question accurately and clearly.

Context:
${context}

Question:
${question}

Answer:
`;
