const express = require('express');
require('dotenv').config();
const app = express();
const PORT = process.env.CHAT_AGENT_PORT || 3001;
const modelName = process.env.AI_MODEL || "gemini-2.5-flash";
const apiKey = process.env.GEMINI_API_KEY;
const handleCustomerSatisfactionData = require('./utils/handle_customer_satisfaction_data');
const chat_title_generator = require('./utils/chat_title_generator');

console.log(apiKey,modelName);
app.use(express.static(__dirname+"/agent"));


// Middleware to parse JSON bodies
app.use(express.json());

// Utils
const validateClientChatHistory = require('./utils/validate_client_chat_history');
const getAllAgentDetails = require('./utils/get_all_agent_details');
const chatAgentHandler = require('./routesHandler/chat_agent');

// Basic route
app.get('/chat_agent', (req, res) => {
  res.sendFile(__dirname+"/agent/ai_agent_updated.html");
});

// Handle customer satisfaction data
app.post("/agent_satisfaction_data", async (req, res) => {
  try {
    const { username, comment, reviewStar, agentId, agentName } = req.body;

    // ✅ Call the handler function
    const result = await handleCustomerSatisfactionData(
      username,
      comment,
      reviewStar,
      agentId,
      agentName
    );

    // ✅ Send only the required fields to the client
    return res.json({
      agentId: result.agentId,
      agentName: result.agentName,
      satisfactionRate: result.satisfactionRate,
      latestCustomerReviews: result.latestCustomerReviews
    });

  } catch (error) {
    console.error("❌ Error in /agent_satisfaction_data:", error.message);

    if (error.message.includes("required") || error.message.includes("exceed") || error.message.includes("Review star")) {
      return res.status(400).json({ error: error.message });
    }

    return res.status(500).json({ error: "Internal server error" });
  }
});

// POST route for chat agent
app.post('/chat_agent', async (req, res) => {
  try {
    const { agentId, agentName } = req.query;
    const { chatHistory, userInput } = req.body;

    // Check query params
    if (!agentId || !agentName) {
      return res.status(400).json({
        error: "Missing query parameters: agentId and agentName are required",
      });
    }

    // Check body params
    if (!chatHistory || !userInput) {
      return res.status(400).json({
        error: "Missing body parameters: chatHistory and userInput are required",
      });
    }

    // ✅ Validate chat history
    const validation = validateClientChatHistory(chatHistory);
    if (validation.status === "fail") {
      return res.status(400).json({
        error: "Invalid chat history",
        reason: validation.reason,
      });
    }

    // ✅ Fetch agent details
    const agentDetails = await getAllAgentDetails(agentId, agentName);
    if (!agentDetails) {
      return res.status(404).json({
        error: `No agent found for id=${agentId}, name=${agentName}`,
      });
    }

    // ✅ Call chat agent handler
    const response = await chatAgentHandler(
      agentId,
      agentName,
      chatHistory,
      userInput,
      agentDetails,
      apiKey,
      modelName


    );

    return res.json(response);

  } catch (err) {
    console.error("❌ Error handling /chat_agent:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Generate title for the chat history for saving the previous chat with the generated title
app.post("/chat_title_generator", async (req, res) => {
  try {
    const { messages } = req.body; // expecting { messages: [ {role, content}, ... ] }

    if (!Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: "Chat history must be a non-empty array" });
    }

    // Convert array to readable string for AI
    const chatHistoryString = messages
      .map(msg => `${msg.role === "user" ? "User" : "AI"}: ${msg.content}`)
      .join("\n");

    const { title, totalTokens } = await chat_title_generator(
      chatHistoryString,
      apiKey,
      modelName
    );

    return res.json({ chatTitle: title, totalTokens });
  } catch (err) {
    console.error("❌ Error in /chat_title_generator:", err);
    return res.status(500).json({ error: "Failed to generate chat title" });
  }
});


app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
