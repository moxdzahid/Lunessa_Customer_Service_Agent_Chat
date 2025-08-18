// utils/add_new_tokens_to_agent.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const checkAgentTokens = require('./check_agent_tokens'); // Import the function you already have

/**
 * Adds tokens to an agent's availableTokens count.
 * @param {string} agentId - Unique ID of the agent.
 * @param {string} agentName - Name of the agent (for validation/logging).
 * @param {number} tokensToAdd - Number of tokens to add.
 * @returns {Promise<Object>} - Updated agent record.
 */
async function addNewTokensToAgent(agentId, agentName, tokensToAdd) {
  if (!agentId || !agentName || typeof tokensToAdd !== 'number') {
    throw new Error('❌ agentId, agentName and numeric tokensToAdd are required');
  }

  // Step 1: Get current tokens
  const currentTokens = await checkAgentTokens(agentId);

  // Step 2: Add the new tokens
  const updatedTokens = currentTokens + tokensToAdd;

  // Step 3: Update DB
  const updatedAgent = await prisma.customerServiceAgents.update({
    where: { agentId },
    data: { availableTokens: updatedTokens }
  });

  console.log(`✅ Tokens updated for agent: ${agentName} (${agentId})`);
  return updatedAgent;
}

module.exports = addNewTokensToAgent;
