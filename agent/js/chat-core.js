/**
 * Core chat functionality
 */
class ChatCore {
  constructor() {
    this.messages = [];
    this.chatEnded = false;
    this.isProcessing = false;
    
    this.initElements();
  }

  initElements() {
    this.chatMessages = document.getElementById("chatMessages");
    this.messagesContainer = document.getElementById("messagesContainer");
    this.messageInput = document.getElementById("messageInput");
    this.sendBtn = document.getElementById("sendBtn");
    this.typingIndicator = document.getElementById("typingIndicator");
    this.chatInputContainer = document.getElementById("chatInputContainer");
    this.endChatBtn = document.getElementById("endChatBtn");
    this.processingNotification = document.getElementById("processingNotification");
  }

  addMessage(content, sender) {
    const messageDiv = document.createElement("div");
    messageDiv.className = `message ${sender}`;

    const avatar = document.createElement("div");
    avatar.className = `message-avatar ${sender}-avatar`;
    avatar.textContent = sender === "ai" ? "AI" : "U";

    const messageWrapper = document.createElement("div");
    messageWrapper.className = "message-wrapper";

    const messageContent = document.createElement("div");
    messageContent.className = "message-content";
    messageContent.textContent = content;

    const messageTime = document.createElement("div");
    messageTime.className = "message-time";
    messageTime.textContent = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    messageWrapper.appendChild(messageContent);
    messageWrapper.appendChild(messageTime);
    messageDiv.appendChild(avatar);
    messageDiv.appendChild(messageWrapper);

    this.messagesContainer.appendChild(messageDiv);
    this.scrollToBottom();
    this.messages.push({ content, sender, timestamp: new Date() });
  }


  setProcessingState(processing) {
    this.isProcessing = processing;

    if (processing) {
      this.chatInputContainer.classList.add("processing-state");
      this.messageInput.disabled = true;
      this.showProcessingNotification();
    } else {
      this.chatInputContainer.classList.remove("processing-state");
      if (!this.chatEnded) {
        this.messageInput.disabled = false;
      }
      this.hideProcessingNotification();
    }

    this.updateSendButton();
  }

  showProcessingNotification() {
    this.processingNotification.classList.add("show");
  }

  hideProcessingNotification() {
    this.processingNotification.classList.remove("show");
  }

  showTypingIndicator() {
    if (!this.chatEnded) {
      this.typingIndicator.style.display = "flex";
      this.scrollToBottom();
    }
  }

  hideTypingIndicator() {
    this.typingIndicator.style.display = "none";
  }


  autoResize() {
    this.messageInput.style.height = "auto";
    const newHeight = Math.min(this.messageInput.scrollHeight, 160);
    this.messageInput.style.height = newHeight + "px";

    if (this.messageInput.scrollHeight > 160) {
      this.messageInput.scrollTop = this.messageInput.scrollHeight;
    } else {
      this.messageInput.scrollTop = 0;
    }

    if (this.messageInput.scrollWidth > this.messageInput.clientWidth) {
      this.messageInput.scrollLeft = this.messageInput.scrollWidth;
    }
  }

  scrollToBottom() {
    requestAnimationFrame(() => {
      this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
    });
  }

  isGoodbyeMessage(message) {
    const goodbyeKeywords = [
      "bye", "goodbye", "thanks", "thank you", "done", "finished", 
      "end chat", "that's all", "see you", "have a good day", "stop", "quit"
    ];
    return goodbyeKeywords.some((keyword) => message.includes(keyword));
  }
}
