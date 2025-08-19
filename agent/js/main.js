/**
 * Main AI Customer Service application
 * Integrates all modules and initializes the chat system
 */
class AICustomerService {
  constructor() {
    // Initialize core modules
    this.chatCore = new ChatCore();
    this.themeManager = new ThemeManager();
    this.voiceHandler = new VoiceHandler(this.chatCore);
    // this.ratingManager = new RatingManager(this.chatCore, this.themeManager);
    this.fileManager = new FileManager();
    
    // Initialize event handler last (needs all other modules)
    this.eventHandler = new EventHandler(
      this.chatCore,
      this.voiceHandler,
      this.themeManager,
      this.ratingManager
    );

    // Auto-resize message input
    this.chatCore.autoResize();
  }

  // Public API methods for external access
  sendMessage() {
    return this.chatCore.sendMessage();
  }

  endChat() {
    return this.sessionManager.endChat();
  }

  startNewChat() {
    return this.sessionManager.startNewChat();
  }

  toggleTheme() {
    return this.themeManager.toggleTheme();
  }


  // Getter methods for accessing module states
  get messages() {
    return this.chatCore.messages;
  }

  get chatEnded() {
    return this.chatCore.chatEnded;
  }

  get isProcessing() {
    return this.chatCore.isProcessing;
  }

  get currentTheme() {
    return this.themeManager.getCurrentTheme();
  }


  get selectedFiles() {
    return this.fileManager.getSelectedFiles();
  }
}

// Initialize the chat service when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  const chatService = new AICustomerService();
  window.chatServiceInstance = chatService; // Make accessible globally for debugging
});
