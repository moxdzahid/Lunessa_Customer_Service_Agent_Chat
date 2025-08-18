const formatAIAgentInput = require("../utils/format_AI_agent_input.js");
const sendMessageToAIAgent = require("../utils/send_message_to_AI_agent.js");
const removeAgentTokens = require("../utils/remove_agent_tokens.js")
const totalRequestsHandledIncrementer = require("../utils/total_requests_handled_incrementer.js");
const updateAgentUsage = require("../utils/update_agent_usage.js");

/**
 * Handles incoming chat requests for a given AI agent.
 *
 * @param {string} agentId - Unique ID of the agent.
 * @param {string} agentName - Display name of the agent.
 * @param {string} chatHistory - Previous conversation (formatted with U: and A: prefixes).
 * @param {string} userInput - Latest user message.
 * @param {object} agentDetails - Full details about the agent & company (see formatAIAgentInput docs).
 * @param {string} apiKey - API key for the Gemini AI.
 * @param {string} modelName - Model name to use (e.g., "gemini-2.5-flash").
 *
 * @returns {Promise<{ reply: string, totalTokens: number, formattedInput: string }>}
 *   - reply: AI-generated response
 *   - totalTokens: tokens consumed in request (if available)
 *   - formattedInput: the final input string that was sent to the AI
 */
async function chatAgentHandler(
  agentId,
  agentName,
  chatHistory,
  userInput,
  agentDetails,
  apiKey,
  modelName
) {
  if (!agentId || !agentName) {
    throw new Error("agentId and agentName are required");
  }

  // 1️⃣ Format AI input
  const formattedInput = formatAIAgentInput(chatHistory, userInput, agentDetails);

  // 2️⃣ Send to Gemini AI
  const { reply, totalTokens } = await sendMessageToAIAgent(formattedInput, apiKey, modelName);

  // Remove agent tokens to keep track of how many tokens has been utilized
  removeAgentTokens(agentId, totalTokens);

  // Add tokens usage logs to the AgentUsageStatistics collection , for making agent token uses graph
  updateAgentUsage(agentId, totalTokens);

  // Increase count of total request for making the agent uses graph 
  totalRequestsHandledIncrementer(agentId, agentName);


  // 3️⃣ Return structured response
  return {
    reply,
    totalTokens,
    formattedInput, // optional: helps debugging
  };
}

module.exports = chatAgentHandler;
