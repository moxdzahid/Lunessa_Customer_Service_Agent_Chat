const sendMessageToAIAgent = require("./send_message_to_AI_agent");

/**
 * Generates a suitable title for a given chat history using Gemini AI.
 *
 * @param {string} chatHistory - The full chat history as a string.
 * @param {string} apiKey - Gemini API key.
 * @param {string} modelName - Model name (e.g., "gemini-2.5-flash").
 * @returns {Promise<{ title: string, totalTokens: number }>} The generated chat title and tokens used.
 */
async function generateChatTitle(chatHistory, apiKey, modelName) {
  if (typeof chatHistory !== "string" || !chatHistory.trim()) {
    throw new Error("Chat history must be a non-empty string");
  }

  try {
    const inputMessage = `
You are an AI assistant. Based on the following chat history, generate a short, clear, and descriptive title for the conversation.

Chat History:
${chatHistory}

Only output the title. Do not include explanations.
`;

    const { reply, totalTokens } = await sendMessageToAIAgent(
      inputMessage,
      apiKey,
      modelName
    );

    return {
      title: reply.trim(),
      totalTokens,
    };
  } catch (err) {
    console.error("❌ Error generating chat title:", err);
    throw err;
  }
}

module.exports = generateChatTitle;
