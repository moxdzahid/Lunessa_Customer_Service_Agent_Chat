// Dynamic input resize function for messageInput - FIXED VERSION
function setupDynamicInputResize() {
  const messageInput = document.getElementById('messageInput');
  
  if (!messageInput) {
    console.warn('Element with id "messageInput" not found');
    return;
  }

  // Set initial styles if not already set
  if (!messageInput.style.minHeight) {
    messageInput.style.minHeight = '24px';
    messageInput.style.maxHeight = '300px';
    messageInput.style.resize = 'none';
    messageInput.style.overflow = 'hidden';
    messageInput.style.transition = 'height 0.2s ease';
  }

  function resizeInput() {
    // Store current scroll position
    const scrollTop = messageInput.scrollTop;
    
    // Temporarily set height to auto to get the natural height
    const originalHeight = messageInput.style.height;
    messageInput.style.height = 'auto';
    
    // Force browser to recalculate
    const computedStyle = window.getComputedStyle(messageInput);
    const minHeight = parseInt(computedStyle.minHeight) || 24;
    const maxHeight = parseInt(computedStyle.maxHeight) || 300;
    
    // Get the scroll height (natural height of content)
    const scrollHeight = messageInput.scrollHeight;
    
    // Calculate the new height within bounds
    const newHeight = Math.min(Math.max(scrollHeight, minHeight), maxHeight);
    
    // Set the new height
    messageInput.style.height = newHeight + 'px';
    
    // Handle overflow
    if (scrollHeight > maxHeight) {
      messageInput.style.overflowY = 'auto';
      messageInput.scrollTop = scrollTop;
    } else {
      messageInput.style.overflowY = 'hidden';
    }
  }

  // Event listeners for all input changes
  messageInput.addEventListener('input', resizeInput);
  messageInput.addEventListener('keydown', function(e) {
    // Handle special keys that might change content
    if (e.key === 'Backspace' || e.key === 'Delete' || e.key === 'Enter') {
      setTimeout(resizeInput, 0);
    }
  });
  
  messageInput.addEventListener('keyup', resizeInput);
  messageInput.addEventListener('paste', () => setTimeout(resizeInput, 10));
  messageInput.addEventListener('cut', () => setTimeout(resizeInput, 10));
  
  // FIXED: Handle programmatic value changes without infinite recursion
  const originalDescriptor = Object.getOwnPropertyDescriptor(HTMLTextAreaElement.prototype, 'value');
  const originalSetter = originalDescriptor.set;
  const originalGetter = originalDescriptor.get;
  
  // Only override if not already overridden
  if (!messageInput._valueOverridden) {
    Object.defineProperty(messageInput, 'value', {
      set: function(val) {
        originalSetter.call(this, val);
        setTimeout(resizeInput, 0);
      },
      get: function() {
        // FIX: Use original getter instead of this.value
        return originalGetter.call(this);
      },
      configurable: true
    });
    
    // Mark as overridden to prevent double override
    messageInput._valueOverridden = true;
  }

  // Initial resize
  resizeInput();
  
  // Return function to manually trigger resize if needed
  return resizeInput;
}

// Alternative simpler function if you just want basic functionality
function simpleInputResize() {
  const messageInput = document.getElementById('messageInput');
  
  if (!messageInput) return;
  
  function resize() {
    messageInput.style.height = 'auto';
    messageInput.style.height = Math.min(messageInput.scrollHeight, 300) + 'px';
  }
  
  messageInput.addEventListener('input', resize);
  messageInput.addEventListener('keyup', resize);
  messageInput.addEventListener('paste', () => setTimeout(resize, 10));
  messageInput.addEventListener('cut', () => setTimeout(resize, 10));
  
  resize(); // Initial call
}

// Safe initialization function
function initializeAutoResize() {
  try {
    const resizeFunction = setupDynamicInputResize();
    if (resizeFunction) {
      window.resizeMessageInput = resizeFunction;
    }
  } catch (error) {
    console.warn('Failed to setup dynamic resize, falling back to simple version:', error);
    // Fallback to simple version
    simpleInputResize();
  }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeAutoResize);
} else {
  // DOM is already loaded
  initializeAutoResize();
}