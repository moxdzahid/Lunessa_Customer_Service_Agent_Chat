const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

/**
 * Adds customer satisfaction data for an agent
 * @param {string} username - Customer username
 * @param {string} comment - Customer comment (max 500 chars)
 * @param {number} reviewStar - Star rating (1–5)
 * @param {string} agentId - Agent's unique ID
 * @param {string} agentName - Agent's name
 * @returns {Promise<Object>} - Latest 10 customer reviews
 */
async function handleCustomerSatisfactionData(username, comment, reviewStar, agentId, agentName) {
  try {
    // Validation
    if (!username || !comment || !reviewStar || !agentId || !agentName) {
      throw new Error('All fields are required.');
    }

    if (comment.length > 500) {
      throw new Error('Comment cannot exceed 500 characters.');
    }

    if (reviewStar < 1 || reviewStar > 5) {
      throw new Error('Review star must be between 1 and 5.');
    }

    // Check if agent stats already exist
    let agentStats = await prisma.agentUsageStatistics.findUnique({
      where: { agentId },
    });

    // If not, create a fresh record for the agent
    if (!agentStats) {
      agentStats = await prisma.agentUsageStatistics.create({
        data: {
          agentId,
          agentName,
          usageLogs: [],
          satisfactionRate: 0,
          satisfactionRateLogs: [],
          customerReviews: []
        }
      });
    }

    // Prepare new review & satisfaction log
    const newReview = {
      username,
      comment,
      reviewStar,
      timestamp: new Date()
    };

    const newSatisfactionLog = {
      reviewStar,
      timestamp: new Date()
    };

    // Update the record by pushing new review & satisfaction log
    const updatedStats = await prisma.agentUsageStatistics.update({
      where: { agentId },
      data: {
        customerReviews: { push: newReview },
        satisfactionRateLogs: { push: newSatisfactionLog }
      }
    });

    // Get the latest 10 comments (sorted by timestamp descending)
    const latest10Comments = [...updatedStats.customerReviews]
      .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
      .slice(0, 10);

    // Calculate new satisfaction rate from latest 10
    const avgStars = latest10Comments.reduce((sum, r) => sum + r.reviewStar, 0) / latest10Comments.length;
    const newSatisfactionRate = Math.round((avgStars / 5) * 100);

    // Update satisfaction rate in DB
    await prisma.agentUsageStatistics.update({
      where: { agentId },
      data: { satisfactionRate: newSatisfactionRate }
    });

    return {
      agentId: updatedStats.agentId,
      agentName: updatedStats.agentName,
      satisfactionRate: newSatisfactionRate,
      latestCustomerReviews: latest10Comments
    };

  } catch (error) {
    console.error('Error handling customer satisfaction data:', error);
    throw error;
  }
}

module.exports = handleCustomerSatisfactionData;
