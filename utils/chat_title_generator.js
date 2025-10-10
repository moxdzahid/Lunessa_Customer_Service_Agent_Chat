// utils/chat_title_generator.js

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
    console.log("Chat history must be a non-empty string");
    
    return { success: false, error: "Chat history must be a non-empty string" };
  }
  if (!apiKey || !modelName) {
    console.log("API key and modelName are required");
    
    return { success: false, error: "Server is facing some issues. Try again later" };
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
      console.error("AI call failed. Falling back to UUID title:", aiResponse.error);
      return {
        success: true, // Mark as success because a title was generated (the fallback)
        data: { title: `${uuidv4()}` },
      };
    }
     
    // Return AI-generated title only, trimmed for cleanliness
    const finalTitle = aiResponse.data.reply.trim();
    
    // Fallback to UUID if the AI returns empty text after trimming
    if (!finalTitle) {
         console.warn("AI returned an empty title. Falling back to UUID.");
         return {
            success: true, 
            data: { title: `${uuidv4()}` },
         };
    }
     
    return {
      success: true,
      data: { title: finalTitle },
    };

  } catch (err) {
    console.error("Unexpected error in generateChatTitle. Falling back to UUID.", err);
    // Unexpected errors → fallback to UUID
    return {
      success: true,
      data: { title: `${uuidv4()}` },
    };
  }
}

module.exports = generateChatTitle;