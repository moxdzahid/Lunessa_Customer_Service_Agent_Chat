document.addEventListener("DOMContentLoaded", () => {
  const sendBtn = document.getElementById("sendBtn");
  const messageInput = document.getElementById("messageInput");
  const messagesContainer = document.getElementById("messagesContainer");

  let isSending = false; // lock while awaiting and typing

  // --- Helpers ----------------------------------------------------

  function stripLeadingPrefixes(text) {
    return String(text || "").replace(/^([UA]:\s*)+/g, "").trim();
  }

  // Build last 15 messages into clean "U:" / "A:" format (1 line per message)
  function buildChatHistory() {
    const messages = [...messagesContainer.querySelectorAll(".message")];
    const last15 = messages.slice(-15);

    return last15.map(msg => {
      let content = msg.querySelector(".message-content")?.textContent || "";
      content = stripLeadingPrefixes(content);
      content = content.replace(/\s*\n\s*/g, " ").trim();
      if (!content) return "";

      if (msg.classList.contains("user")) return `U: ${content}`;
      if (msg.classList.contains("ai"))  return `A: ${content}`;
      return "";
    }).filter(Boolean).join("\n");
  }

  function getQueryParams() {
    const params = new URLSearchParams(window.location.search);
    return {
      agentId: params.get("agentId"),
      agentName: params.get("agentName"),
    };
  }

  // Append a message bubble and return its content element
  function appendMessage(sender, initialText = "") {
    const messageDiv = document.createElement("div");
    messageDiv.className = `message ${sender}`;
    messageDiv.innerHTML = `
      <div class="message-avatar ${sender === "ai" ? "ai-avatar" : "user-avatar"}">${sender === "user" ? "U" : "AI"}</div>
      <div class="message-wrapper">
        <div class="message-content"></div>
        <div class="message-time">${new Date().toLocaleTimeString()}</div>
      </div>
    `;
    const contentEl = messageDiv.querySelector(".message-content");
    contentEl.textContent = initialText; // set initial (user text or empty for AI)
    messagesContainer.appendChild(messageDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
    return contentEl;
  }

  function setSendingState(state) {
    isSending = state;
    sendBtn.disabled = state;
    messageInput.disabled = state;
  }

  // Smooth, reliable typewriter using requestAnimationFrame + chunking
  // - speedMs: approximate ms delay per "chunk"
  // - chunkSize: how many characters to add each frame
  async function typeWriterEffect(element, fullText, { speedMs = 18, chunkSize = 2 } = {}) {
    // Respect reduced motion preference: show instantly
    const prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      element.textContent = fullText;
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
      return;
    }

    element.textContent = ""; // ensure start from empty
    let index = 0;
    let nextTime = performance.now();

    return new Promise(resolve => {
      function step(now) {
        // Add a chunk when "speedMs" elapsed OR first frame
        if (now >= nextTime) {
          const nextIndex = Math.min(index + chunkSize, fullText.length);
          element.textContent += fullText.slice(index, nextIndex);
          index = nextIndex;
          messagesContainer.scrollTop = messagesContainer.scrollHeight;
          nextTime = now + speedMs;
        }

        if (index < fullText.length) {
          requestAnimationFrame(step);
        } else {
          resolve();
        }
      }
      requestAnimationFrame(step);
    });
  }

  // --- Core send flow --------------------------------------------

  async function handleSendMessage() {
    if (isSending) return;

    const userInput = messageInput.value.trim();
    if (!userInput) return;

    setSendingState(true);

    // 1) Show user's message immediately
    appendMessage("user", userInput);

    // 2) Build chat history including this user line
    const chatHistory = buildChatHistory();
    const { agentId, agentName } = getQueryParams();
    if (!agentId || !agentName) {
      console.error("❌ Missing agentId or agentName in URL");
      setSendingState(false);
      return;
    }

    try {
      // 3) Send to server
      const response = await fetch(
        `/chat_agent?agentId=${encodeURIComponent(agentId)}&agentName=${encodeURIComponent(agentName)}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ chatHistory, userInput }),
        }
      );

      // If server rejects, fail early but unlock
      if (!response.ok) {
        console.error("❌ Server error:", response.status, await response.text().catch(() => ""));
        setSendingState(false);
        return;
      }

      const data = await response.json();

      // 4) Prepare AI bubble and animate typing
      if (data && typeof data.reply === "string") {
        const cleanReply = stripLeadingPrefixes(data.reply);
        const aiContentEl = appendMessage("ai", ""); // empty bubble to type into
        await typeWriterEffect(aiContentEl, cleanReply, { speedMs: 18, chunkSize: 2 });
      }

      messageInput.value = ""; // clear input after success
    } catch (err) {
      console.error("❌ Network/parse error:", err);
    } finally {
      // 5) Re-enable input after typing completes (or on error)
      setSendingState(false);
    }
  }

  // --- Events -----------------------------------------------------

  // Send button
  sendBtn.addEventListener("click", handleSendMessage);

  // Enter key (no Shift) -> same logic; prevent default submit/reload
  messageInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (!isSending) handleSendMessage();
    }
  });

  // Optional: if your input is inside a <form>, prevent its default submit
  const form = messageInput.closest("form");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      if (!isSending) handleSendMessage();
    });
  }
});