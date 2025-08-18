# AI Customer Service Chat - Modular Structure

## Overview
The AI Customer Service application has been refactored into a modular architecture for better maintainability, scalability, and code organization.

## File Structure

### Core Files
- `ai_agent.html` - Main HTML file with updated script imports
- `ai_agent.css` - Stylesheet (unchanged)
- `main.js` - Main application entry point and module coordinator

### JavaScript Modules

#### 1. `chat-core.js`
**Purpose**: Core chat functionality and message handling
- Message sending/receiving
- AI response generation
- Chat state management
- Processing state handling
- Auto-resize functionality

**Key Classes**: `ChatCore`

#### 2. `voice-handler.js`
**Purpose**: Speech recognition and voice input
- Speech-to-text functionality
- Voice button state management
- Recording state handling

**Key Classes**: `VoiceHandler`

#### 3. `theme-manager.js`
**Purpose**: Theme switching and appearance management
- Dark/light theme toggling
- Theme persistence
- Smooth theme transitions
- FOUC (Flash of Unstyled Content) prevention

**Key Classes**: `ThemeManager`

#### 4. `sidebar-manager.js`
**Purpose**: Sidebar navigation and quick actions
- Sidebar visibility management
- Human agent connection
- Support calling functionality
- Responsive sidebar behavior

**Key Classes**: `SidebarManager`

#### 5. `rating-manager.js`
**Purpose**: User feedback and rating system
- Star rating interface
- Feedback collection
- Review data processing
- Session analytics

**Key Classes**: `RatingManager`

#### 6. `session-manager.js`
**Purpose**: Chat session lifecycle management
- Chat initialization
- Session termination
- Chat reset functionality
- Session state management

**Key Classes**: `SessionManager`

#### 7. `file-manager.js`
**Purpose**: File upload and drag-drop handling
- File selection interface
- Drag-and-drop functionality
- File preview generation
- File management operations

**Key Classes**: `FileManager`

#### 8. `event-handler.js`
**Purpose**: Centralized event handling and keyboard shortcuts
- Event listener coordination
- Keyboard shortcut management
- Responsive behavior handling
- Module communication

**Key Classes**: `EventHandler`

## Module Dependencies

```
main.js
├── theme-manager.js (independent)
├── chat-core.js (independent)
├── voice-handler.js (depends on chat-core.js)
├── sidebar-manager.js (depends on chat-core.js)
├── rating-manager.js (depends on chat-core.js, theme-manager.js)
├── session-manager.js (depends on chat-core.js, rating-manager.js)
├── file-manager.js (independent)
└── event-handler.js (depends on all above modules)
```

## Key Improvements

### 1. **Separation of Concerns**
- Each module handles a specific aspect of functionality
- Reduced coupling between components
- Easier to test individual features

### 2. **Maintainability**
- Smaller, focused files
- Clear module responsibilities
- Easier debugging and development

### 3. **Scalability**
- Easy to add new features as separate modules
- Modules can be replaced or enhanced independently
- Better code reusability

### 4. **Performance**
- Modules can be loaded on-demand (future enhancement)
- Better browser caching of individual components
- Smaller change footprint for updates

## Usage

### Running the Application
1. Open `ai_agent.html` in a web browser
2. All modules will load automatically in the correct order
3. The application initializes via `main.js`

### Adding New Features
1. Create a new module file (e.g., `feature-name.js`)
2. Define your class with clear constructor dependencies
3. Add the script tag to `ai_agent.html` in the correct order
4. Initialize the module in `main.js`
5. Wire up events in `event-handler.js` if needed

### Module Communication
- Modules communicate through the main `AICustomerService` class
- Dependencies are passed through constructors
- Public methods are exposed for external access

## API Reference

### Main Application Class
```javascript
const chatService = new AICustomerService();

// Public methods
chatService.sendMessage();
chatService.endChat();
chatService.startNewChat();
chatService.toggleTheme();
chatService.toggleSidebar();

// Getters
chatService.messages;
chatService.chatEnded;
chatService.isProcessing;
chatService.currentTheme;
chatService.sidebarVisible;
chatService.selectedFiles;
```

## Development Guidelines

1. **Keep modules focused** - Each should have a single responsibility
2. **Minimize dependencies** - Reduce coupling between modules
3. **Use clear interfaces** - Define public methods and properties clearly
4. **Document changes** - Update this README when adding modules
5. **Test individually** - Each module should be testable in isolation

## Migration from Original Code

The original `ai_agent.js` has been completely replaced by the modular structure. All functionality has been preserved and enhanced:

- ✅ All original features maintained
- ✅ Improved code organization
- ✅ Better error handling
- ✅ Enhanced maintainability
- ✅ Keyboard shortcuts added
- ✅ Better responsive design

## Browser Support

- Modern browsers with ES6+ support
- Chrome, Firefox, Safari, Edge (latest versions)
- Speech recognition requires Chrome/Edge
