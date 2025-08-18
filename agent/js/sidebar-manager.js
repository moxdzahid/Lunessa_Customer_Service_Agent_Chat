/**
 * Sidebar management functionality
 */
class SidebarManager {
  constructor(chatCore) {
    this.chatCore = chatCore;
    this.sidebarVisible = false;
    
    this.initElements();
    this.initSidebar();
  }

  initElements() {
    this.sidebar = document.querySelector(".sidebar");
    this.sidebarToggle = document.getElementById("sidebarToggle");
    this.sidebarOverlay = document.getElementById("sidebarOverlay");
    this.mainChat = document.querySelector(".main-chat");
  }

  initSidebar() {
    this.setSidebarVisibility(this.sidebarVisible);
  }

  toggleSidebar() {
    this.sidebarVisible = !this.sidebarVisible;
    this.setSidebarVisibility(this.sidebarVisible);
  }

  setSidebarVisibility(visible) {
    const icon = this.sidebarToggle.querySelector(".sidebar-toggle-icon");

    if (visible) {
      this.sidebar.classList.add("visible");
      this.sidebarOverlay.classList.add("visible");
      this.sidebarToggle.classList.add("active");
      icon.innerHTML = "☰";
      this.sidebarToggle.title = "Close sidebar";
      document.body.style.overflow = "hidden";
    } else {
      this.sidebar.classList.remove("visible");
      this.sidebarOverlay.classList.remove("visible");
      this.sidebarToggle.classList.remove("active");
      icon.innerHTML = "☰";
      this.sidebarToggle.title = "Open sidebar";
      document.body.style.overflow = "";
    }

    this.sidebarVisible = visible;
  }

  closeSidebar() {
    if (this.sidebarVisible) {
      this.setSidebarVisibility(false);
    }
  }

  requestHuman() {
    if (this.chatCore.chatEnded || this.chatCore.isProcessing) return;

    this.chatCore.addMessage("I'd like to speak with a human agent, please.", "user");

    this.chatCore.setProcessingState(true);
    setTimeout(() => {
      this.chatCore.showTypingIndicator();
      setTimeout(() => {
        this.chatCore.hideTypingIndicator();
        this.chatCore.addMessage(
          "I'm connecting you with a human agent now. Please hold on for a moment while I transfer you...",
          "ai"
        );
        setTimeout(() => {
          this.chatCore.addMessage(
            "A human agent will be with you shortly. Please stay on the line. Is there anything specific you'd like me to note for the agent?",
            "ai"
          );
          this.chatCore.setProcessingState(false);
        }, 2500);
      }, 1500);
    }, 1000);
  }

  callSupport() {
    if (this.chatCore.chatEnded || this.chatCore.isProcessing) return;
    this.chatCore.addMessage(
      "I've initiated a call connection to our support line at +1 (800) 123-456. You should receive a call shortly, or you can dial the number directly.",
      "ai"
    );
  }
}
