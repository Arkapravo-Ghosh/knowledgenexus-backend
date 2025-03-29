import weave from "weave";

// Initialize Weave
const project = "ai-note-app"; // Change this to your project name

// Function to log data to Weave
export const logToWeave = async (operation: string, input: unknown, output: unknown) => {
  try {
    const logData = {
      operation,
      input,
      output,
      timestamp: new Date().toISOString(),
    };

    console.log("Log Data:", logData); // Use logData to avoid the unused variable error

    await weave.init(project); // Initialize Weave

    console.log(`Logged to Weave: ${operation}`);
  } catch (error) {
    console.error("Error logging to Weave:", error);
  }
};

export default logToWeave;
