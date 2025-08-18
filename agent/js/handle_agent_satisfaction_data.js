document.addEventListener("DOMContentLoaded", () => {
  const endChatBtn = document.getElementById("endChatBtn");
  const ratingModal = document.getElementById("ratingModal");
  const submitRatingBtn = document.getElementById("submitRating");
  const skipRatingBtn = document.getElementById("skipRating");
  const stars = document.querySelectorAll("#ratingStars .star");
  const feedbackText = document.getElementById("feedbackText");
  const messagesContainer = document.getElementById("messagesContainer");

  let selectedRating = 0;

  // ⭐ Handle star selection
  stars.forEach(star => {
    star.addEventListener("click", () => {
      selectedRating = parseInt(star.getAttribute("data-rating"));
      stars.forEach(s => s.classList.remove("selected"));
      for (let i = 0; i < selectedRating; i++) {
        stars[i].classList.add("selected");
      }
    });
  });

  // Utility: Add AI message to chat
  function addAIMessage(content) {
    const messageDiv = document.createElement("div");
    messageDiv.classList.add("message", "ai");

    messageDiv.innerHTML = `
      <div class="message-avatar ai-avatar">AI</div>
      <div class="message-wrapper">
        <div class="message-content">${content}</div>
      </div>
    `;

    messagesContainer.appendChild(messageDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }

  // 🛑 End chat button → show modal after AI messages
  endChatBtn.addEventListener("click", () => {
    // 1. AI message 1
    addAIMessage("Thank you for using our customer service! I hope I was able to help you today. 😊");

    // 2. AI message 2
    addAIMessage(`<p>Thank you for using our customer service! We hope we were able to help you today. Your feedback would be greatly appreciated.</p>`);

   setTimeout(() => {
    ratingModal.style.display = "flex";
  }, 3000);
  });

  // 🚀 Submit rating
  submitRatingBtn.addEventListener("click", async () => {
    try {
      // Get username from cookies
      const username = document.cookie
        .split("; ")
        .find(row => row.startsWith("username="))
        ?.split("=")[1];

      // Get agentId & agentName from URL params
      const urlParams = new URLSearchParams(window.location.search);
      const agentId = urlParams.get("agentId");
      const agentName = urlParams.get("agentName");

      // Get feedback text
      const comment = feedbackText.value.trim();

      if (!selectedRating) {
        alert("Please select a star rating before submitting!");
        return;
      }

      // Send request to backend
      const response = await fetch("http://localhost:3001/agent_satisfaction_data", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username,
          comment,
          reviewStar: selectedRating,
          agentId,
          agentName
        })
      });

      const result = await response.json();
      console.log("✅ Satisfaction Data Response:", result);

      // Hide modal after success
      ratingModal.style.display = "none";
      alert("Thank you for your feedback!");

      // Final AI message
      addAIMessage("Chat has ended. Start a new conversation to continue.");

    } catch (error) {
      console.error("❌ Error submitting rating:", error);
    }
  });

  // ❌ Skip rating
  skipRatingBtn.addEventListener("click", () => {
    ratingModal.style.display = "none";

    // Final AI message
    addAIMessage("Chat has ended. Start a new conversation to continue.");
  });
});
