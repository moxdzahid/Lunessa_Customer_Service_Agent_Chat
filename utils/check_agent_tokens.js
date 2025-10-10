// utils/check_agent_tokens.js
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

/**
 * Check and return available tokens for an agent.
 * Priority:
 *  1️⃣ Using model (if active and has tokens > 0)
 *  2️⃣ Default model (if has tokens > 0)
 *  3️⃣ Otherwise → fail (no tokens available)
 *
 * @param {string} agentId - Unique agent ID.
 * @returns {Promise<{ success: boolean, data?: object, error?: string }>}
 */
async function checkAgentTokens(agentId) {
  try {
    const agent = await prisma.CustomerServiceAgents.findUnique({
      where: { agentId },
      select: {
        agentId: true,
        agentName: true,
        usingModel: true,
        defaultModel: true,
      },
    });

    if (!agent) {
      return {
        success: false,
        error: `Agent with ID "${agentId}" not found.`,
      };
    }

    // 1️⃣ Check if usingModel exists, is active, and has available tokens
    const usingModel = agent.usingModel;
    if (
      usingModel &&
      usingModel.status === "active" &&
      usingModel.availableTokens > 0
    ) {
      return {
        success: true,
        data: {
          modelType: "usingModel",
          modelName: usingModel.modelName,
          availableTokens: usingModel.availableTokens,
        },
      };
    }

    // 2️⃣ Check default model fallback
    const defaultModel = agent.defaultModel;
    if (defaultModel && defaultModel.availableTokens > 0) {
      return {
        success: true,
        data: {
          modelType: "defaultModel",
          modelName: defaultModel.modelName,
          availableTokens: defaultModel.availableTokens,
        },
      };
    }

    // 3️⃣ No tokens available
    return {
      success: false,
      error: `No tokens available for agent "${agentId}". Both usingModel and defaultModel are empty or inactive.`,
    };
  } catch (error) {
    console.error("❌ Error fetching agent tokens:", error);
    return {
      success: false,
      error: `Database error while fetching tokens: ${error.message}`,
    };
  }
}

module.exports = checkAgentTokens;
