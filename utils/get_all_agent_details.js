// utils/get_all_agent_details.js
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

/**
 * Get all details about a specific agent by ID and Name.
 * @param {string} agentId - The agent's unique ID.
 * @param {string} agentName - The agent's name.
 * @returns {Promise<object|null>} Agent details in JSON format or null if not found.
 */
async function getAllAgentDetails(agentId, agentName) {
  try {
    if (!agentId || !agentName) {
      throw new Error("Both agentId and agentName are required");
    }

    const agentDetails = await prisma.customerServiceAgents.findFirst({
      where: {
        agentId: agentId,
        agentName: agentName
      }
    });

    return agentDetails || null;
  } catch (error) {
    console.error("❌ Error fetching agent details:", error);
    throw error;
  }
}

module.exports = getAllAgentDetails;
