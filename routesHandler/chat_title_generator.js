// routesHandler/chat_title_generator.js

const generateChatTitle = require("../utils/chat_title_generator");

const API_KEY = process.env.GEMINI_API_KEY;
const modelName = process.env.AI_MODEL || "gemini-2.5-flash";

async function chatTitleGenerator(req, res) {

  try {
    const { messages } = req.body;

    if (!Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ success: false, error: "Chat history must be a non-empty array" });
    }

    if (!API_KEY) {
      return res.status(500).json({ success: false, error: "Server is having some problems. Try again later" });
    }

    const chatHistoryString = messages
      .map(msg => `${msg.role === "user" ? "User" : "AI"}: ${msg.content}`)
      .join("\n");


    const result = await generateChatTitle(chatHistoryString, API_KEY, modelName);

    // Check if the overall title generation failed
    if (!result.success) {
         return res.status(500).json({ success: false, error: result.error || "Title generation failed internally" });
    }
    
    // Ensure result.data.title exists (using the guaranteed title from the utility)
    const chatTitle = result.data.title || `Chat-${Date.now()}`;

    // Simplify the return structure to prevent potential JSON serialization issues
    return res.status(200).json({
      success: true,
      chatTitle: chatTitle, // Changed data: { chatTitle } to chatTitle: chatTitle
    });

  } catch (err) {
    console.error("❌ Unexpected error in /chat_title_generator:", err);
    return res.status(500).json({ success: false, error: "Unable to generate chat title at this time" });
  }
}

module.exports = chatTitleGenerator;