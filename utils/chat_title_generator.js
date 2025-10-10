const sendMessageToAIAgent = require("./send_message_to_AI_agent");
const { v4: uuidv4 } = require("uuid");

/**
 * Generates a suitable title for a given chat history using Gemini AI.
 * If AI fails, returns a UUID as fallback title.
 *
 * @param {string} chatHistory - The full chat history as a string.
 * @param {string} apiKey - Gemini API key.
 * @param {string} modelName - Model name (e.g., "gemini-2.5-flash").
 * @returns {Promise<{ success: boolean, data?: { title: string }, error?: string }>}
 */
async function generateChatTitle(chatHistory, apiKey, modelName) {
  // Input validation
  if (typeof chatHistory !== "string" || !chatHistory.trim()) {
    return { success: false, error: "Chat history must be a non-empty string" };
  }
  if (!apiKey || !modelName) {
    return { success: false, error: "API key and modelName are required" };
  }

  try {
    const inputMessage = `
You are an AI assistant. Based on the following chat history, generate a short, clear, and descriptive title for the conversation.

Chat History:
${chatHistory}

Only output the title. Do not include explanations.
`;

    const aiResponse = await sendMessageToAIAgent(inputMessage, apiKey, modelName);

    if (!aiResponse.success) {
      // If AI fails, fallback to UUID as title
      return {
        success: true,
        data: { title: `Chat-${uuidv4()}` },
      };
    }

    // Return AI-generated title only
    return {
      success: true,
      data: { title: aiResponse.data.reply.trim() },
    };

  } catch (err) {
    // Unexpected errors → fallback to UUID
    return {
      success: true,
      data: { title: `Chat-${uuidv4()}` },
    };
  }
}

module.exports = generateChatTitle;
