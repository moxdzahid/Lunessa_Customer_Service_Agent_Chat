// utils/update_agent_usage.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

/**
 * Updates agent usage statistics by logging tokens used for a specific model.
 *
 * @param {string} agentId - Unique ID of the agent.
 * @param {string} agentName - Name of the agent (used if record creation is needed).
 * @param {string} modelName - The model used (e.g., "gemini-2.5-flash").
 * @param {number} tokensUsed - Number of tokens consumed.
 * @returns {Promise<{ success: boolean, data?: object, error?: string }>}
 */
async function updateAgentUsage(agentId, agentName, modelName, tokensUsed) {
  // 🧩 Basic validation
  if (!agentId || typeof agentId !== "string") {
    return { success: false, error: "Invalid agentId provided." };
  }
  if (!agentName || typeof agentName !== "string") {
    return { success: false, error: "Invalid agentName provided." };
  }
  if (!modelName || typeof modelName !== "string") {
    return { success: false, error: "Invalid modelName provided." };
  }
  if (typeof tokensUsed !== "number" || tokensUsed < 0) {
    return { success: false, error: "Invalid tokensUsed value provided." };
  }

  try {
    // ✅ Update existing record
    const updatedAgent = await prisma.AgentUsageStatistics.update({
      where: { agentId },
      data: {
        usageLogs: {
          push: {
            modelName,
            tokensUsed,
            timestamp: new Date(),
          },
        },
      },
    });

    return {
      success: true,
      data: updatedAgent,
    };

  } catch (err) {
    // If record doesn't exist — create one
    if (err.code === "P2025") {
      try {
        const newAgent = await prisma.AgentUsageStatistics.create({
          data: {
            agentId,
            agentName,
            usageLogs: [
              {
                modelName,
                tokensUsed,
                timestamp: new Date(),
              },
            ],
          },
        });

        return {
          success: true,
          data: newAgent,
        };
      } catch (createErr) {
        console.error("❌ Error creating new agent usage record:", createErr);
        return { success: false, error: createErr.message };
      }
    }

    console.error("❌ Error updating agent usage:", err);
    return { success: false, error: err.message };
  }
}

module.exports = updateAgentUsage;
