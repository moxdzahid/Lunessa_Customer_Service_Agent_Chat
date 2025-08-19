/**
 * Event handling and keyboard shortcuts
 */
class EventHandler {
  constructor(chatCore, voiceHandler, themeManager, sidebarManager, sessionManager, ratingManager) {
    this.chatCore = chatCore;
    this.voiceHandler = voiceHandler;
    this.themeManager = themeManager;
    this.sidebarManager = sidebarManager;
    this.sessionManager = sessionManager;
    this.ratingManager = ratingManager;
    
    this.initEventListeners();
    this.initResponsiveHandling();
  }

  initEventListeners() {

    
    // Voice input
    this.voiceHandler.voiceBtn.addEventListener("click", () => this.voiceHandler.toggleVoiceInput());

    // Theme toggle
    this.themeManager.themeToggle.addEventListener("click", () => this.themeManager.toggleTheme());


    // Sidebar actions
    document.getElementById("talkToHuman").addEventListener("click", () => this.sidebarManager.requestHuman());
    document.getElementById("callSupport").addEventListener("click", () => this.sidebarManager.callSupport());
  }

  initResponsiveHandling() {
    // Handle window resize for responsive sidebar
    window.addEventListener("resize", () => {
      const sidebarToggle = document.getElementById("sidebarToggle");

      if (window.innerWidth <= 768) {
        sidebarToggle.style.display = "flex";
      } else {
        sidebarToggle.style.display = "flex";
      }
    });

    // Initialize responsive behavior
    window.dispatchEvent(new Event("resize"));
  }
}
