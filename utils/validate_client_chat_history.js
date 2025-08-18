/**
 * Validates the format of a client chat history string (token-optimized).
 *
 * Expected format (short prefixes):
 * "U: <message>
 *  A: <message>
 *  U: <message>
 *  A: <message>"
 *
 * Validation Rules:
 * - Must be a string
 * - Must contain at least one line
 * - Each line must start with "U:" (User) or "A:" (Agent/Lunessa)
 * - Each message must not be empty
 * - Consecutive U or A messages are allowed
 *
 * @param {string} chatHistory - The chat history string to validate
 * @returns {{status: string, reason?: string}} Validation result:
 *   - { status: "passed" } if valid
 *   - { status: "fail", reason: "<why it failed>" } if invalid
 */
function validateClientChatHistory(chatHistory) {
  if (typeof chatHistory !== "string") {
    return { status: "fail", reason: "Chat history must be a string" };
  }

  const lines = chatHistory.trim().split("\n").map(line => line.trim());

  if (lines.length === 0) {
    return { status: "fail", reason: "Chat history is empty" };
  }

  const validPrefixes = ["U:", "A:"];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Check prefix validity
    if (!validPrefixes.some(prefix => line.startsWith(prefix))) {
      return { status: "fail", reason: `Invalid prefix at line ${i + 1}: "${line}"` };
    }

    // Check message content
    const parts = line.split(":");
    if (parts.length < 2 || !parts[1].trim()) {
      return { status: "fail", reason: `Empty message at line ${i + 1}` };
    }
  }

  return { status: "passed" };
}

module.exports = validateClientChatHistory;
