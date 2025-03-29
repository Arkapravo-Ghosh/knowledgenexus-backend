import { OpenAI } from "openai";
import dotenv from "dotenv";
import { logToWeave } from "./weaveUtils";

dotenv.config();
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

type ChatCompletionMessage = {
  role: "system" | "user" | "assistant";
  content: string;
};

const generateContent = async (messages: ChatCompletionMessage[], operation: string): Promise<string> => {
  try {
    // Generate AI response
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: messages,
    });

    const result = response.choices[0]?.message?.content || "No response generated.";

    // Log AI interaction to Weave
    await logToWeave(operation, messages, result);

    return result;
  } catch (error) {
    console.error("Error generating AI response:", error);
    return "Error processing request.";
  }
};

export default generateContent;
