# iframe Integration Documentation

## Overview
This document describes how to integrate the technical avatar implementation with our HTML UI using iframe embedding and communication protocols.

## Architecture
```
HTML UI (This Repo)          Technical Avatar (Separate Repo)
┌─────────────────────┐      ┌──────────────────────────┐
│  - User Interface   │      │  - Avatar Animation      │
│  - Control Panel    │ ←──→ │  - TTS/STT Processing    │
│  - Avatar Selection │      │  - AI/NLP Engine         │
│  - Demo Materials   │      │  - WebGL/Canvas Rendering│
└─────────────────────┘      └──────────────────────────┘
         ↑                              ↑
         │                              │
    postMessage API              iframe embedding
```

## iframe Setup

### Basic Embedding
```html
<iframe 
    id="avatar-frame" 
    src="https://technical-repo-url/avatar-interface"
    frameborder="0"
    sandbox="allow-scripts allow-same-origin"
    allow="microphone; camera; autoplay"
    title="Chinese Medicine Avatar">
</iframe>
```

### Security Considerations
- Use `sandbox` attribute to restrict iframe capabilities
- Specify `allow` permissions for microphone/camera access
- Validate message origins in postMessage communication
- Use HTTPS for all communications

## Communication Protocol

### Message Format
All messages between UI and avatar use this standardized format:
```javascript
{
    type: "message_type",
    data: {
        // message-specific data
    },
    timestamp: Date.now(),
    source: "ui" | "avatar"
}
```

### UI → Avatar Messages

#### Avatar Selection
```javascript
{
    type: "avatar-change",
    data: {
        avatarId: "tcm-doctor" | "herbalist" | "acupuncturist",
        personality: { /* avatar personality data */ }
    }
}
```

#### Turn Management
```javascript
{
    type: "turn-change", 
    data: {
        participant: "user" | "avatar"
    }
}
```

#### Text Input
```javascript
{
    type: "text-message",
    data: {
        text: "User's message text",
        language: "en" | "zh-CN"
    }
}
```

#### Voice Control
```javascript
// Start recording
{
    type: "start-recording",
    data: {}
}

// Stop recording  
{
    type: "stop-recording",
    data: {}
}
```

### Avatar → UI Messages

#### Avatar Ready
```javascript
{
    type: "avatar-ready",
    data: {
        avatarId: "current_avatar",
        capabilities: ["tts", "stt", "animation"]
    }
}
```

#### Speech Recognition Result
```javascript
{
    type: "speech-recognition-result",
    data: {
        text: "Recognized speech text",
        confidence: 0.95,
        language: "en" | "zh-CN"
    }
}
```

#### Avatar State Changes
```javascript
{
    type: "avatar-speaking",
    data: {
        message: "Avatar's response text",
        duration: 5000 // milliseconds
    }
}

{
    type: "avatar-listening", 
    data: {}
}
```

#### Error Handling
```javascript
{
    type: "error",
    data: {
        code: "MICROPHONE_ERROR" | "NETWORK_ERROR" | "AVATAR_ERROR",
        message: "Human-readable error message",
        details: { /* additional error context */ }
    }
}
```

## Implementation Examples

### JavaScript Communication Handler
```javascript
class IframeIntegration {
    constructor(iframeId) {
        this.iframe = document.getElementById(iframeId);
        this.setupMessageListener();
    }
    
    setupMessageListener() {
        window.addEventListener('message', (event) => {
            // Validate origin for security
            if (event.origin !== 'https://technical-repo-url') {
                return;
            }
            
            this.handleAvatarMessage(event.data);
        });
    }
    
    sendToAvatar(type, data) {
        const message = {
            type,
            data,
            timestamp: Date.now(),
            source: 'ui'
        };
        
        this.iframe.contentWindow.postMessage(message, 'https://technical-repo-url');
    }
    
    handleAvatarMessage(message) {
        switch (message.type) {
            case 'avatar-ready':
                this.onAvatarReady(message.data);
                break;
            case 'speech-recognition-result':
                this.onSpeechResult(message.data);
                break;
            case 'error':
                this.onError(message.data);
                break;
        }
    }
}
```

### Loading and Error States
```javascript
// Show loading state
function showLoading() {
    document.getElementById('loading-overlay').style.display = 'flex';
}

// Handle iframe load
iframe.onload = function() {
    hideLoading();
    updateConnectionStatus('connected');
};

// Handle iframe errors
iframe.onerror = function() {
    showError('Failed to load avatar interface');
};
```

## Development Environment Setup

### Local Development
1. Technical repo runs on `http://localhost:3000`
2. UI repo runs on `http://localhost:8080`
3. Configure CORS for cross-origin communication
4. Use dev-specific iframe src for testing

### Production Deployment
1. Technical repo deployed to `https://avatar.domain.com`
2. UI repo deployed to `https://ui.domain.com`
3. Configure proper SSL certificates
4. Set production iframe src

## Testing Integration

### Manual Testing Checklist
- [ ] iframe loads successfully
- [ ] Avatar selection changes work
- [ ] Turn management functions
- [ ] Voice recording starts/stops
- [ ] Text input sends messages
- [ ] Error states display properly
- [ ] Connection status updates

### Automated Testing
```javascript
// Example integration test
describe('Avatar Integration', () => {
    test('should communicate with avatar iframe', async () => {
        const integration = new IframeIntegration('avatar-frame');
        
        // Send message to avatar
        integration.sendToAvatar('avatar-change', { avatarId: 'tcm-doctor' });
        
        // Wait for response
        const response = await waitForMessage('avatar-ready');
        expect(response.data.avatarId).toBe('tcm-doctor');
    });
});
```

## Troubleshooting

### Common Issues
1. **CORS Errors**: Configure proper origins in technical repo
2. **Microphone Access**: Ensure HTTPS and proper permissions
3. **Message Timing**: Add timeout handling for communications
4. **iframe Sandbox**: Adjust permissions as needed

### Debug Tools
```javascript
// Message logging for debugging
window.addEventListener('message', (event) => {
    console.log('Received message:', event.data);
});

// Connection status monitoring
setInterval(() => {
    if (iframe.contentWindow) {
        iframe.contentWindow.postMessage({ type: 'ping' }, '*');
    }
}, 30000);
```

---
*iframe Integration Documentation v1.0*