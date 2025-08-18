/**
 * Compact formatter for AI agent input.
 * Prepares all agent, company, product, and chat details
 * into a minimal but context-rich string for the AI model.
 *
 * Uses compact speaker tokens (`U:` for User, `A:` for Agent)
 * while explaining them once at the top to save tokens.
 *
 * @param {string} chatHistory - 
 *   The chat history between the user and the agent, already
 *   compacted with prefixes:
 *   - "U:" = User (customer message)
 *   - "A:" = Agent (AI assistant message)
 *   Example:
 *     "U: hi\nA: hello, how can I help?\nU: my device isn’t working"
 *
 * @param {string} userInput - 
 *   The latest message from the user that the agent needs
 *   to respond to. This is appended after the chat history
 *   with the `U:` prefix.
 *
 * @param {object} agentDetails - 
 *   Metadata about the AI agent and its company, containing:
 *   - agentName {string} → Name of the AI agent
 *   - companyName {string} → Company the agent represents
 *   - establishmentDate {string|Date} → Company founding date
 *   - companyOwnerName {string} → Owner of the company
 *   - companyHumanServiceNumber {string} → Human support contact
 *   - companyDescription {string} → Short description of the company
 *   - items {Array<object>} → Products the agent supports, each with:
 *       • itemName {string}
 *       • itemCode {string}
 *       • itemInitialWorkingExplanation {string}
 *       • itemRunningSteps {string[]}
 *       • commonProblemsSolutions {Array<{problem: string, solution: string}>}
 *
 * @returns {string} - 
 *   A formatted multi-section string combining:
 *   - Chat prefix explanation (U vs A)
 *   - Agent + company details
 *   - Products + troubleshooting steps
 *   - Full chat history
 *   - The latest user input
 *   - A final instruction telling the AI how to respond
 *
 *   This formatted string is designed to be sent to the LLM
 *   for generating the agent’s reply.
 */
function formatAIAgentInput(chatHistory, userInput, agentDetails) {
  if (!agentDetails) {
    throw new Error("agentDetails is required to format AI input");
  }

  let output = "";

  // 🔹 Explain short prefixes ONCE
  output += `Chat Prefixes:\nU = User (customer)\nA = ${agentDetails.agentName} (agent)\n\n`;

  // 🔹 Agent + Company Info (compact)
  output += `Agent: ${agentDetails.agentName}\n`;
  output += `Company: ${agentDetails.companyName} (est. ${new Date(agentDetails.establishmentDate).getFullYear()})\n`;
  output += `Owner: ${agentDetails.companyOwnerName} | Human Support: ${agentDetails.companyHumanServiceNumber}\n`;
  output += `Desc: ${agentDetails.companyDescription}\n\n`;

  // 🔹 Items (short format)
  output += `Products:\n`;
  if (agentDetails.items?.length > 0) {
    agentDetails.items.forEach((item, idx) => {
      output += `#${idx + 1} ${item.itemName} [${item.itemCode}]\n`;
      output += `Work: ${item.itemInitialWorkingExplanation}\n`;
      if (item.itemRunningSteps?.length > 0) {
        output += `Steps: ${item.itemRunningSteps.join(" -> ")}\n`;
      }
      if (item.commonProblemsSolutions?.length > 0) {
        output += `Issues:\n`;
        item.commonProblemsSolutions.forEach((ps) => {
          output += `- ${ps.problem} => ${ps.solution}\n`;
        });
      }
      output += `\n`;
    });
  } else {
    output += "None\n\n";
  }

  // 🔹 Chat History
  output += `Chat:\n${chatHistory}\n\n`;

  // 🔹 Current User Input
  output += `U: ${userInput}\n\n`;

  // 🔹 Final Instruction (short)
  output += `Reply as A, using product info and problem/solutions to assist U.`;

  return output;
}

module.exports = formatAIAgentInput;
