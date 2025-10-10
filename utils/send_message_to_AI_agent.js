// utils/send_message_to_AI_agent.js
const { GoogleGenAI } = require("@google/genai");

/**
 * Sends a message to the Gemini AI model and returns the AI's reply & total tokens used.
 *
 * @param {string} inputMessage - The message to send to the AI model.
 * @param {string} apiKey - The API key for authenticating with the Gemini API.
 * @param {string} modelName - The name of the Gemini AI model to use (e.g., "gemini-2.5-flash").
 * @returns {Promise<{ success: boolean, data?: object, error?: string }>}
 */
async function sendMessageToAIAgent(inputMessage, apiKey, modelName) {
  try {
    // 🧩 Validate inputs
    if (typeof inputMessage !== "string" || !inputMessage.trim()) {
      return { success: false, error: "Invalid input message provided." };
    }
    if (typeof apiKey !== "string" || !apiKey.trim()) {
      return { success: false, error: "Invalid API key provided." };
    }
    if (typeof modelName !== "string" || !modelName.trim()) {
      return { success: false, error: "Invalid model name provided." };
    }

    const ai = new GoogleGenAI({ apiKey });

    // 🧠 Send message to Gemini model
    const response = await ai.models.generateContent({
      model: modelName,
      contents: inputMessage,
    });

    // ✅ Safely extract data
    const reply = response?.text ?? null;
    const totalTokens = response?.usageMetadata?.totalTokenCount ?? null;

    if (!reply) {
      return {
        success: false,
        error: "No response text received from the Gemini model.",
      };
    }

    return {
      success: true,
      data: {
        reply,
        totalTokens,
        modelName,
      },
    };
  } catch (error) {
    console.error("❌ Error communicating with Gemini API:", error);
    return {
      success: false,
      error: `Failed to get a response from the AI: ${error.message}`,
    };
  }
}

module.exports = sendMessageToAIAgent;
