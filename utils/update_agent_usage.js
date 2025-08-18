const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

/**
 * Updates agent usage statistics by logging tokens used.
 *
 * @param {string} agentId - The unique ID of the agent.
 * @param {number} tokensUsed - The number of tokens consumed in the chat.
 * @returns {Promise<object>} Updated AgentUsageStatistics record.
 */
async function updateAgentUsage(agentId, tokensUsed) {
  if (!agentId || typeof agentId !== "string") {
    throw new Error("Invalid agentId provided");
  }
  if (typeof tokensUsed !== "number" || tokensUsed < 0) {
    throw new Error("Invalid tokensUsed value provided");
  }

  try {
    const updatedAgent = await prisma.agentUsageStatistics.update({
      where: { agentId },
      data: {
        usageLogs: {
          push: {
            tokensUsed,
            timestamp: new Date(),
          },
        },
      },
    });

    return updatedAgent;
  } catch (err) {
    // If record doesn't exist, create a new one
    if (err.code === "P2025") {
      const newAgent = await prisma.agentUsageStatistics.create({
        data: {
          agentId,
          agentName: "Unknown", // you can pass actual agentName if available
          usageLogs: [
            {
              tokensUsed,
              timestamp: new Date(),
            },
          ],
        },
      });
      return newAgent;
    }

    console.error("❌ Error updating agent usage:", err);
    throw err;
  }
}

module.exports = updateAgentUsage;
