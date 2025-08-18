/**
 * Rating and feedback functionality
 */
class RatingManager {
  constructor(chatCore, themeManager) {
    this.chatCore = chatCore;
    this.themeManager = themeManager;
    this.currentRating = 0;
    
    this.initElements();
  }

  initElements() {
    this.ratingModal = document.getElementById("ratingModal");
    this.feedbackText = document.getElementById("feedbackText");
  }

  showRatingModal() {
    this.ratingModal.style.display = "flex";
    setTimeout(() => {
      const firstStar = document.querySelector(".star");
      if (firstStar) firstStar.focus();
    }, 300);
  }

  hideRatingModal() {
    this.ratingModal.style.display = "none";
    this.currentRating = 0;
    this.updateStars();
    this.feedbackText.value = "";
  }

  updateStars() {
    document.querySelectorAll(".star").forEach((star, index) => {
      star.classList.toggle("active", index < this.currentRating);
    });
  }

  setRating(rating) {
    this.currentRating = rating;
    this.updateStars();
  }

  submitRating() {
    const feedbackText = this.feedbackText.value.trim();
    let confirmationMessage = "";

    if (this.currentRating > 0) {
      const ratingText = this.currentRating === 1 ? "star" : "stars";
      confirmationMessage = `Thank you for rating us ${this.currentRating} ${ratingText}! ⭐`;

      if (feedbackText) {
        confirmationMessage += " Your detailed feedback has been recorded and will help us improve our service.";
      } else {
        confirmationMessage += " Your rating helps us understand how we're doing.";
      }

      this.saveReview(this.currentRating, feedbackText);
    } else {
      confirmationMessage = "Thank you for your time! Your feedback helps us improve our service.";
    }

    setTimeout(() => {
      this.chatCore.addMessage(confirmationMessage, "ai");
      this.showThankYouMessage();
    }, 500);

    this.hideRatingModal();
  }

  saveReview(rating, feedback) {
    const reviewData = {
      rating: rating,
      feedback: feedback,
      timestamp: new Date().toISOString(),
      sessionId: this.generateSessionId(),
      messageCount: this.chatCore.messages.length,
      sessionDuration: this.calculateSessionDuration(),
      userAgent: navigator.userAgent,
      resolvedIssue: rating >= 4,
      theme: this.themeManager.getCurrentTheme(),
    };

    console.log("Review submitted:", reviewData);
  }

  calculateSessionDuration() {
    if (this.chatCore.messages.length > 0) {
      const firstMessage = this.chatCore.messages[0];
      const lastMessage = this.chatCore.messages[this.chatCore.messages.length - 1];
      return Math.round((lastMessage.timestamp - firstMessage.timestamp) / 1000);
    }
    return 0;
  }

  generateSessionId() {
    return "session_" + Date.now() + "_" + Math.random().toString(36).substr(2, 9);
  }

  skipRating() {
    this.chatCore.addMessage(
      "Thank you for using our service! Have a wonderful day! 🌟",
      "ai"
    );
    this.hideRatingModal();
    this.showThankYouMessage();
  }

  showThankYouMessage() {
    setTimeout(() => {
      const thankYouDiv = document.createElement("div");
      thankYouDiv.className = "chat-ended-message";
      thankYouDiv.innerHTML = `
        <div class="icon">🙏</div>
        <h3>Thank You!</h3>
        <p>We appreciate your time and feedback. Feel free to start a new conversation anytime you need assistance!</p>
        <br>
        <button class="modal-btn" onclick="window.location.reload()">Start New Chat</button>
      `;
      this.chatCore.messagesContainer.appendChild(thankYouDiv);
      this.chatCore.scrollToBottom();
    }, 1000);
  }
}
