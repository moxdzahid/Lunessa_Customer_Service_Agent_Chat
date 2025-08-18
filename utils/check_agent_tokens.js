// utils/check_agent_tokens.js
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

/**
 * Get the availableTokens for a given agentId.
 * @param {string} agentId - The agent's unique ID/code.
 * @returns {Promise<number|null>} The available tokens count or null if not found.
 */
async function checkAgentTokens(agentId) {
  try {
    const agent = await prisma.customerServiceAgents.findUnique({
      where: { agentId: agentId },
      select: { availableTokens: true }
    });

    if (!agent) {
      console.warn(`⚠️ Agent with ID "${agentId}" not found.`);
      return null;
    }

    return agent.availableTokens;
  } catch (error) {
    console.error("❌ Error fetching available tokens:", error);
    throw error;
  }
}

module.exports = checkAgentTokens;
