// agent/js/chat_handler.js
document.addEventListener("DOMContentLoaded", () => {
  const newChatBtn = document.getElementById("newChatBtn");
  const messagesContainer = document.getElementById("messagesContainer");
  const sidebarToggle = document.getElementById("sidebarToggle");
  const sidebar = document.querySelector(".sidebar");
  const conversationsList = document.querySelector(".conversations-list");
  const sidebarOverlay = document.querySelector(".sidebar-overlay");

  // --- Global Trackers ---
  window.activeChatId = null;   // current chatId in use
  window.isNewChat = true;      // flag to decide create/update

  // --- Helpers ---
  function generateChatId() {
    return "chat_" + Date.now() + "_" + Math.floor(Math.random() * 1000000);
  }

  function getChatHistory() {
    return Array.from(messagesContainer.querySelectorAll(".message"))
      .map(el => {
        const role = el.classList.contains("ai") ? "ai" : "user";
        const content = el.querySelector(".message-content")?.innerText.trim() || "";
        return { role, content };
      })
      .filter(m => m.content);
  }

  function getPreviousChats() {
    return JSON.parse(localStorage.getItem("previousChats") || "[]");
  }

  function savePreviousChats(chats) {
    localStorage.setItem("previousChats", JSON.stringify(chats));
  }

  // --- Save Current Chat Function ---
  function saveCurrentChat() {
    const chatHistory = getChatHistory();
    if (!chatHistory.length) return;

    let previousChats = getPreviousChats();

    if (window.isNewChat) {
      // ✅ Create brand new chat
      const newChatId = generateChatId();
      
      // Generate title (you can call your title generator API here)
      fetch("http://localhost:3001/chat_title_generator", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: chatHistory }),
      })
      .then(response => response.json())
      .then(result => {
        const newChat = {
          chatId: newChatId,
          title: result.chatTitle || `Chat ${newChatId}`,
          history: chatHistory,
        };

        previousChats.push(newChat);
        savePreviousChats(previousChats);
        
        window.activeChatId = newChatId;
        window.isNewChat = false; // ✅ Now it's not new anymore
        
        console.log("✅ Saved new chat:", newChat);
        renderConversationList();
      })
      .catch(error => {
        console.error("❌ Error generating title:", error);
        // Fallback: save with default title
        const newChat = {
          chatId: newChatId,
          title: `Chat ${Date.now()}`,
          history: chatHistory,
        };
        previousChats.push(newChat);
        savePreviousChats(previousChats);
        window.activeChatId = newChatId;
        window.isNewChat = false;
        renderConversationList();
      });

    } else {
      // ✅ Update existing chat
      const chatIndex = previousChats.findIndex(c => c.chatId === window.activeChatId);
      if (chatIndex !== -1) {
        previousChats[chatIndex].history = chatHistory;
        savePreviousChats(previousChats);
        console.log(`🔄 Updated existing chat: ${window.activeChatId}`);
        renderConversationList();
      }
    }
  }

  // --- Sidebar UI ---
  function renderConversationList() {
    const chats = getPreviousChats();
    conversationsList.innerHTML = "";

    chats.forEach(chat => {
      const lastMsg = chat.history.length
        ? chat.history[chat.history.length - 1].content
        : "No messages";

      const item = document.createElement("div");
      item.classList.add("conversation-item");
      if (chat.chatId === window.activeChatId) item.classList.add("active");

      item.innerHTML = `
        <div class="conversation-preview">
          <div class="conversation-title">${chat.title}</div>
          <div class="conversation-snippet">${lastMsg}</div>
        </div>
      `;

      item.addEventListener("click", () => {
        document.querySelectorAll(".conversation-item").forEach(el => el.classList.remove("active"));
        item.classList.add("active");

        // ✅ Load old chat
        loadChatById(chat.chatId);

        // ✅ Set flags for existing chat
        window.isNewChat = false;
        window.activeChatId = chat.chatId;

        collapseSidebar();
      });

      conversationsList.appendChild(item);
    });
  }

  function expandSidebar() {
    sidebar.classList.add("visible");
    messagesContainer.classList.add("blurred");
    sidebarOverlay.classList.add("visible");
  }

  function collapseSidebar() {
    sidebar.classList.remove("visible");
    messagesContainer.classList.remove("blurred");
    sidebarOverlay.classList.remove("visible");
  }

  // --- Public method to load a chat by id ---
  window.loadChatById = function (chatId) {
    const chats = getPreviousChats();
    const chat = chats.find(c => c.chatId === chatId);

    if (!chat) {
      console.warn("⚠️ Chat not found:", chatId);
      return;
    }

    // ✅ Before loading new chat, save current one if needed
    if (window.activeChatId && window.activeChatId !== chatId) {
      saveCurrentChat();
    }

    window.activeChatId = chatId;
    window.isNewChat = false; // ✅ Loading existing chat

    messagesContainer.innerHTML = "";

    chat.history.forEach(msg => {
      const msgDiv = document.createElement("div");
      msgDiv.classList.add("message", msg.role === "ai" ? "ai" : "user");
      msgDiv.innerHTML = `
        <div class="message-avatar ${msg.role === "ai" ? "ai-avatar" : "user-avatar"}">
          ${msg.role === "ai" ? "AI" : "U"}
        </div>
        <div class="message-wrapper">
          <div class="message-content">${msg.content}</div>
        </div>
      `;
      messagesContainer.appendChild(msgDiv);
    });

    console.log(`📂 Loaded existing chat: ${chatId}`);
    renderConversationList();
  };

  // --- Handle New Chat ---
  newChatBtn.addEventListener("click", () => {
    // ✅ Save current chat before starting new one
    saveCurrentChat();
    
    // ✅ Reset for new chat
    window.isNewChat = true;
    window.activeChatId = null;
    
    // ✅ Clear UI
    messagesContainer.innerHTML = "";
    document.getElementById("messageInput").value = "";
    
    // ✅ Update sidebar
    document.querySelectorAll(".conversation-item").forEach(el => el.classList.remove("active"));

    console.log("✨ Ready for new chat!");
    renderConversationList();
  });

  // --- Auto-save function (call this when sending messages) ---
  window.autoSaveChat = function() {
    saveCurrentChat();
  };

  // --- Event Listeners for Sidebar ---
  sidebarToggle.addEventListener("click", () => {
    renderConversationList();
    expandSidebar();
  });

  messagesContainer.addEventListener("click", () => {
    if (sidebar.classList.contains("visible")) collapseSidebar();
  });

  sidebarOverlay.addEventListener("click", () => {
    if (sidebar.classList.contains("visible")) collapseSidebar();
  });
});

// ✅ Usage: Call this after each message exchange
// window.autoSaveChat();