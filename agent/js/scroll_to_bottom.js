// Auto-scroll functionality for chat messages container
class ChatAutoScroll {
    constructor(containerId = 'messagesContainer') {
        this.container = document.getElementById(containerId);
        this.chatMessages = document.getElementById('chatMessages'); // The scrollable parent
        this.isUserScrolling = false;
        this.scrollThreshold = 100; // pixels from bottom to consider "at bottom"
        
        if (!this.container) {
            console.error(`Container with ID "${containerId}" not found`);
            return;
        }
        
        // Use chat-messages as the scroll container if available
        this.scrollContainer = this.chatMessages || this.container;
        
        this.init();
    }
    
    init() {
        // Track user scrolling on the correct container
        this.scrollContainer.addEventListener('scroll', this.handleScroll.bind(this));
        
        // Set up MutationObserver to watch for new messages and text changes (typewriter effect)
        this.observer = new MutationObserver(this.handleMutation.bind(this));
        this.observer.observe(this.container, {
            childList: true,
            subtree: true,
            characterData: true // This will catch typewriter text changes
        });
        
        // Initial scroll to bottom
        this.scrollToBottom();
    }
    
    handleScroll() {
        // Check if user is near the bottom using the correct scroll container
        const { scrollTop, scrollHeight, clientHeight } = this.scrollContainer;
        const isNearBottom = scrollHeight - scrollTop - clientHeight < this.scrollThreshold;
        
        // Update user scrolling state
        this.isUserScrolling = !isNearBottom;
        
        // Clear any existing timeout
        if (this.scrollTimeout) {
            clearTimeout(this.scrollTimeout);
        }
        
        // Reset user scrolling state after a delay
        this.scrollTimeout = setTimeout(() => {
            if (this.isAtBottom()) {
                this.isUserScrolling = false;
            }
        }, 150);
    }
    
    handleMutation(mutations) {
        // Check if any nodes were added or text content changed (for typewriter effect)
        const hasAddedNodes = mutations.some(mutation => mutation.addedNodes.length > 0);
        const hasTextChanges = mutations.some(mutation => 
            mutation.type === 'childList' || 
            mutation.type === 'characterData' || 
            (mutation.addedNodes && mutation.addedNodes.length > 0)
        );
        
        if (hasAddedNodes || hasTextChanges) {
            // Force scroll to bottom for any new content, even if user was scrolled up
            // This is especially important for typewriter effects
            requestAnimationFrame(() => {
                this.forceScrollToBottom();
            });
        }
    }
    
    isAtBottom() {
        const { scrollTop, scrollHeight, clientHeight } = this.scrollContainer;
        return scrollHeight - scrollTop - clientHeight < this.scrollThreshold;
    }
    
    scrollToBottom(smooth = false) {
        if (smooth) {
            this.scrollContainer.scrollTo({
                top: this.scrollContainer.scrollHeight,
                behavior: 'smooth'
            });
        } else {
            this.scrollContainer.scrollTop = this.scrollContainer.scrollHeight;
        }
    }
    
    // Method to manually add a message and auto-scroll
    addMessage(messageElement) {
        this.container.appendChild(messageElement);
        // The MutationObserver will handle the auto-scroll
    }
    
    // Method to force scroll to bottom (useful for buttons and typewriter effects)
    forceScrollToBottom() {
        this.isUserScrolling = false; // Reset user scrolling state
        this.scrollToBottom(true);
        
        // Also clear any scroll timeout to prevent conflicts
        if (this.scrollTimeout) {
            clearTimeout(this.scrollTimeout);
        }
    }
    
    // Cleanup method
    destroy() {
        if (this.observer) {
            this.observer.disconnect();
        }
        if (this.scrollTimeout) {
            clearTimeout(this.scrollTimeout);
        }
        this.scrollContainer.removeEventListener('scroll', this.handleScroll);
    }
}

// Initialize auto-scroll when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    // Create auto-scroll instance
    const chatAutoScroll = new ChatAutoScroll('messagesContainer');
    
    // Make it globally available if needed
    window.chatAutoScroll = chatAutoScroll;
    
    // Example usage: Adding messages programmatically
    window.addChatMessage = function(content, isAI = false) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${isAI ? 'ai' : 'user'}`;
        
        const avatar = document.createElement('div');
        avatar.className = `message-avatar ${isAI ? 'ai-avatar' : 'user-avatar'}`;
        avatar.textContent = isAI ? 'AI' : 'You';
        
        const wrapper = document.createElement('div');
        wrapper.className = 'message-wrapper';
        
        const messageContent = document.createElement('div');
        messageContent.className = 'message-content';
        messageContent.textContent = content;
        
        wrapper.appendChild(messageContent);
        messageDiv.appendChild(avatar);
        messageDiv.appendChild(wrapper);
        
        // Add message to container
        document.getElementById('messagesContainer').appendChild(messageDiv);
    };
});

// Alternative aggressive auto-scroll for typewriter effects
function aggressiveAutoScroll() {
    const container = document.getElementById('messagesContainer');
    const chatMessages = document.getElementById('chatMessages');
    
    // Use chat-messages as scroll container if available, otherwise use messages container
    const scrollContainer = chatMessages || container;
    
    // Create observer for new messages and text changes
    const observer = new MutationObserver(() => {
        // Always scroll to bottom when any content changes (good for typewriter effects)
        requestAnimationFrame(() => {
            scrollContainer.scrollTop = scrollContainer.scrollHeight;
        });
    });
    
    // Start observing with more comprehensive options
    observer.observe(container, { 
        childList: true, 
        subtree: true, 
        characterData: true // Catch text changes in typewriter effect
    });
    
    // Initial scroll to bottom
    scrollContainer.scrollTop = scrollContainer.scrollHeight;
    
    return observer;
}

// Usage examples:

// 1. For typewriter effects - use aggressive auto-scroll
// aggressiveAutoScroll();

// 2. Advanced initialization with smart scrolling
// const autoScroll = new ChatAutoScroll('messagesContainer');

// 3. Add messages programmatically
// addChatMessage("Hello! This is a user message", false);
// addChatMessage("Hi there! This is an AI response", true);

// 4. Force scroll to bottom (for a "scroll to bottom" button)
// chatAutoScroll.forceScrollToBottom();

// 5. If you want to temporarily disable auto-scroll (when user is reading old messages)
// chatAutoScroll.isUserScrolling = true;

// 6. Re-enable auto-scroll
// chatAutoScroll.isUserScrolling = false;

