// utils/remove_agent_tokens.js
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const checkAgentTokens = require("./check_agent_tokens");

/**
 * Remove tokens from an agent's availableTokens count.
 * @param {string} agentId - The agent's unique ID/code.
 * @param {number} usedTokens - Number of tokens to subtract.
 * @returns {Promise<number|null>} The updated availableTokens count or null if agent not found.
 */
async function removeAgentTokens(agentId, usedTokens) {
  try {
    if (typeof usedTokens !== "number" || usedTokens <= 0) {
      throw new Error("usedTokens must be a positive number");
    }

    // 1️⃣ Get current token count
    const currentTokens = await checkAgentTokens(agentId);

    if (currentTokens === null) {
      console.warn(`⚠️ Cannot remove tokens: Agent "${agentId}" not found.`);
      return null;
    }

    // 2️⃣ Calculate updated token count
    const updatedTokens = Math.max(0, currentTokens - usedTokens); // Prevent negative tokens

    // 3️⃣ Update in DB
    const updatedAgent = await prisma.customerServiceAgents.update({
      where: { agentId: agentId },
      data: { availableTokens: updatedTokens },
      select: { availableTokens: true }
    });

    return updatedAgent.availableTokens;
  } catch (error) {
    console.error("❌ Error removing agent tokens:", error);
    throw error;
  }
}

module.exports = removeAgentTokens;
