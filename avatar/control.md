# Conversation Control Interface

## Overview
Turn-based conversation control system for managing interactions between users and multiple avatars.

## Features
- Turn management between users and avatars
- Multi-avatar conversation support
- Audio/text input toggle
- Conversation state tracking

## User Interface Components
```html
<!-- Turn Control Panel -->
<div class="conversation-controls">
    <button id="user-turn" class="turn-button active">Your Turn</button>
    <button id="avatar-turn" class="turn-button">Avatar Speaking</button>
    <button id="listen-mode" class="mode-button">🎤 Listen</button>
    <button id="type-mode" class="mode-button">⌨️ Type</button>
</div>

<!-- Multi-Avatar Selection -->
<div class="avatar-selection">
    <div class="avatar-card" data-avatar="tcm-doctor">
        <img src="avatars/tcm-doctor.jpg" alt="TCM Doctor">
        <span>Dr. Traditional</span>
    </div>
    <div class="avatar-card" data-avatar="herbalist">
        <img src="avatars/herbalist.jpg" alt="Herbalist">
        <span>Master Chen</span>
    </div>
</div>
```

## Control Logic
```javascript
class ConversationController {
    constructor() {
        this.currentTurn = 'user';
        this.activeAvatar = null;
        this.conversationMode = 'voice'; // 'voice' or 'text'
    }
    
    switchTurn(participant) {
        // Handle turn switching logic
    }
    
    selectAvatar(avatarId) {
        // Switch active avatar
    }
    
    setInputMode(mode) {
        // Toggle between voice and text input
    }
    
    manageConversationFlow() {
        // Coordinate turn-based conversation
    }
}
```

## Multi-Avatar Management
- Avatar queue system
- Conversation context sharing
- Individual avatar personalities
- Seamless handoff between avatars

## Integration Points
- STT/TTS coordination
- Avatar animation triggers
- Conversation logging
- User preference management

---
*Module: Conversation Control*
*Status: Design Phase*