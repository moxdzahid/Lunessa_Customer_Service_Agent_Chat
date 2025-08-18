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
    // this.initKeyboardShortcuts();
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

    // // Rating modal events
    // document.querySelectorAll(".star").forEach((star) => {
    //   star.addEventListener("click", (e) => {
    //     this.ratingManager.setRating(parseInt(e.target.dataset.rating));
    //   });
    // });

    // document.getElementById("submitRating").addEventListener("click", () => this.ratingManager.submitRating());
    // document.getElementById("skipRating").addEventListener("click", () => this.ratingManager.skipRating());
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
