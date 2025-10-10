// utils/remove_agent_tokens.js
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

/**
 * Deduct used tokens directly from all related locations:
 * - usingModel (if modelName matches)
 * - defaultModel (if modelName matches)
 * - tokenBalances[] (if modelName matches)
 *
 * @param {string} agentId - The agent's unique ID/code.
 * @param {string} modelName - The model name for which tokens should be deducted.
 * @param {number} usedTokens - Number of tokens to subtract.
 * @returns {Promise<{ success: boolean, data?: object, error?: string }>}
 */
async function removeAgentTokens(agentId, modelName, usedTokens) {
  try {
    // 🧩 Input validation
    if (!agentId || typeof agentId !== "string") {
      throw new Error("Invalid agentId provided.");
    }
    if (!modelName || typeof modelName !== "string") {
      throw new Error("Invalid modelName provided.");
    }
    if (typeof usedTokens !== "number" || usedTokens <= 0) {
      throw new Error("usedTokens must be a positive number.");
    }

    // 1️⃣ Fetch agent data
    const agent = await prisma.CustomerServiceAgents.findUnique({
      where: { agentId },
      select: {
        agentId: true,
        agentName: true,
        usingModel: true,
        defaultModel: true,
        tokenBalances: true,
      },
    });

    if (!agent) {
      return {
        success: false,
        error: `Agent with ID "${agentId}" not found.`,
      };
    }

    let updatedUsingModel = agent.usingModel;
    let updatedDefaultModel = agent.defaultModel;
    let updatedTokenBalances = [...(agent.tokenBalances || [])];
    let tokenUpdated = false;

    // 2️⃣ Deduct from usingModel (if model matches)
    if (agent.usingModel && agent.usingModel.modelName === modelName) {
      const newTokens = Math.max(0, agent.usingModel.availableTokens - usedTokens);
      updatedUsingModel = {
        ...agent.usingModel,
        availableTokens: newTokens,
      };
      tokenUpdated = true;
    }

    // 3️⃣ Deduct from defaultModel (if model matches)
    if (agent.defaultModel && agent.defaultModel.modelName === modelName) {
      const newTokens = Math.max(0, agent.defaultModel.availableTokens - usedTokens);
      updatedDefaultModel = {
        ...agent.defaultModel,
        availableTokens: newTokens,
      };
      tokenUpdated = true;
    }

    // 4️⃣ Deduct from tokenBalances[] (if model matches)
    updatedTokenBalances = updatedTokenBalances.map((tb) => {
      if (tb.modelName === modelName) {
        tokenUpdated = true;
        return {
          ...tb,
          availableTokens: Math.max(0, tb.availableTokens - usedTokens),
          updatedAt: new Date(),
        };
      }
      return tb;
    });

    if (!tokenUpdated) {
      return {
        success: false,
        error: `Model "${modelName}" not found in agent's models.`,
      };
    }

    // 5️⃣ Update database
    const updatedAgent = await prisma.CustomerServiceAgents.update({
      where: { agentId },
      data: {
        usingModel: updatedUsingModel ? { set: updatedUsingModel } : undefined,
        defaultModel: updatedDefaultModel ? { set: updatedDefaultModel } : undefined,
        tokenBalances: { set: updatedTokenBalances },
        lastModified: new Date(),
      },
      select: {
        agentId: true,
        agentName: true,
        usingModel: true,
        defaultModel: true,
        tokenBalances: true,
      },
    });

    return {
      success: true,
      data: {
        agentId: updatedAgent.agentId,
        agentName: updatedAgent.agentName,
        modelName,
        deductedTokens: usedTokens,
        updatedUsingModel: updatedAgent.usingModel,
        updatedDefaultModel: updatedAgent.defaultModel,
        updatedTokenBalances: updatedAgent.tokenBalances,
      },
    };
  } catch (error) {
    console.error("❌ Error removing agent tokens:", error);
    return {
      success: false,
      error: `Database error while removing tokens: ${error.message}`,
    };
  }
}

module.exports = removeAgentTokens;
