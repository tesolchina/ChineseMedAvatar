# API Communication Specification

## Overview
Defines the communication protocols between the UI layer and the technical avatar implementation for the Chinese Medicine Avatar project.

## Communication Layers

### 1. UI Control Layer (This Repo)
- **Responsibilities**: User interface, avatar selection, demo coordination
- **Technologies**: HTML5, CSS3, JavaScript, postMessage API
- **Data Flow**: User interactions → postMessage → Technical Implementation

### 2. Technical Implementation Layer (Separate Repo)  
- **Responsibilities**: Avatar animation, TTS/STT, AI processing
- **Technologies**: WebGL, Web Audio API, ML models, real-time processing
- **Data Flow**: iframe embedding ← postMessage ← UI interactions

## Message Types and Specifications

### User Interaction Messages

#### 1. Avatar Selection
```typescript
interface AvatarChangeMessage {
    type: 'avatar-change';
    data: {
        avatarId: 'tcm-doctor' | 'herbalist' | 'acupuncturist';
        personality: AvatarPersonality;
        transition?: 'smooth' | 'instant';
    };
}

interface AvatarPersonality {
    name: string;
    specialties: string[];
    communication_style: string;
    knowledge_areas: string[];
    consultation_flow: string[];
}
```

#### 2. Conversation Control
```typescript
interface TurnChangeMessage {
    type: 'turn-change';
    data: {
        participant: 'user' | 'avatar';
        reason?: 'user_input' | 'avatar_response' | 'manual_switch';
    };
}

interface InputModeMessage {
    type: 'input-mode-change';
    data: {
        mode: 'voice' | 'text';
        settings?: {
            language: 'en' | 'zh-CN';
            voice_sensitivity?: number;
        };
    };
}
```

#### 3. Voice Communication
```typescript
interface VoiceControlMessage {
    type: 'start-recording' | 'stop-recording';
    data: {
        language?: 'en' | 'zh-CN';
        noise_reduction?: boolean;
    };
}

interface AudioDataMessage {
    type: 'audio-data';
    data: {
        audio_blob: Blob;
        format: 'wav' | 'mp3';
        sample_rate: number;
    };
}
```

#### 4. Text Communication
```typescript
interface TextMessage {
    type: 'text-message';
    data: {
        text: string;
        language: 'en' | 'zh-CN';
        user_id?: string;
        context?: ConversationContext;
    };
}

interface ConversationContext {
    previous_messages: number;
    session_id: string;
    avatar_mood?: string;
}
```

### Technical Response Messages

#### 1. System Status
```typescript
interface AvatarReadyMessage {
    type: 'avatar-ready';
    data: {
        avatar_id: string;
        capabilities: {
            animation: boolean;
            tts: boolean;
            stt: boolean;
            multilingual: boolean;
        };
        version: string;
    };
}

interface SystemStatusMessage {
    type: 'system-status';
    data: {
        status: 'online' | 'offline' | 'degraded';
        services: {
            animation: ServiceStatus;
            tts: ServiceStatus;
            stt: ServiceStatus;
        };
    };
}

interface ServiceStatus {
    available: boolean;
    latency?: number;
    quality?: 'high' | 'medium' | 'low';
}
```

#### 2. Speech Processing
```typescript
interface SpeechRecognitionMessage {
    type: 'speech-recognition-result';
    data: {
        text: string;
        confidence: number; // 0-1
        language: string;
        is_final: boolean;
        alternatives?: Array<{
            text: string;
            confidence: number;
        }>;
    };
}

interface SpeechSynthesisMessage {
    type: 'speech-synthesis-start' | 'speech-synthesis-end';
    data: {
        text: string;
        duration?: number; // milliseconds
        voice_id: string;
    };
}
```

#### 3. Avatar Animation
```typescript
interface AnimationStateMessage {
    type: 'animation-state';
    data: {
        state: 'idle' | 'speaking' | 'listening' | 'thinking';
        emotion?: 'neutral' | 'happy' | 'concerned' | 'focused';
        gesture?: string;
    };
}

interface LipSyncMessage {
    type: 'lip-sync-data';
    data: {
        phonemes: Array<{
            phoneme: string;
            timestamp: number;
            intensity: number;
        }>;
    };
}
```

#### 4. Error Handling
```typescript
interface ErrorMessage {
    type: 'error';
    data: {
        code: ErrorCode;
        message: string;
        severity: 'warning' | 'error' | 'critical';
        recovery_suggestions?: string[];
        technical_details?: any;
    };
}

enum ErrorCode {
    MICROPHONE_ACCESS_DENIED = 'MICROPHONE_ACCESS_DENIED',
    NETWORK_CONNECTION_ERROR = 'NETWORK_CONNECTION_ERROR',
    TTS_SERVICE_UNAVAILABLE = 'TTS_SERVICE_UNAVAILABLE',
    STT_SERVICE_UNAVAILABLE = 'STT_SERVICE_UNAVAILABLE',
    AVATAR_ANIMATION_ERROR = 'AVATAR_ANIMATION_ERROR',
    INVALID_MESSAGE_FORMAT = 'INVALID_MESSAGE_FORMAT',
    AUTHENTICATION_ERROR = 'AUTHENTICATION_ERROR'
}
```

## Message Validation

### Schema Validation
```typescript
interface BaseMessage {
    type: string;
    data: any;
    timestamp: number;
    source: 'ui' | 'avatar';
    message_id?: string;
    reply_to?: string;
}

// Message validation function
function validateMessage(message: any): message is BaseMessage {
    return (
        typeof message.type === 'string' &&
        message.data !== undefined &&
        typeof message.timestamp === 'number' &&
        ['ui', 'avatar'].includes(message.source)
    );
}
```

### Security Validation
```typescript
class SecureMessageHandler {
    private allowedOrigins = ['https://avatar.domain.com'];
    
    validateOrigin(origin: string): boolean {
        return this.allowedOrigins.includes(origin);
    }
    
    sanitizeMessage(message: any): any {
        // Remove potentially dangerous properties
        const safe_message = { ...message };
        delete safe_message.__proto__;
        delete safe_message.constructor;
        return safe_message;
    }
}
```

## Performance Considerations

### Message Throttling
```typescript
class MessageThrottler {
    private messageQueue: BaseMessage[] = [];
    private maxMessagesPerSecond = 10;
    
    throttleMessage(message: BaseMessage): boolean {
        const now = Date.now();
        const recent = this.messageQueue.filter(m => now - m.timestamp < 1000);
        
        if (recent.length >= this.maxMessagesPerSecond) {
            return false; // Reject message
        }
        
        this.messageQueue.push(message);
        return true; // Accept message
    }
}
```

### Message Prioritization
```typescript
enum MessagePriority {
    LOW = 1,      // UI updates, status messages
    NORMAL = 2,   // User interactions
    HIGH = 3,     // Voice data, real-time responses
    CRITICAL = 4  // Errors, system messages
}

interface PriorityMessage extends BaseMessage {
    priority: MessagePriority;
}
```

## Testing and Debugging

### Message Logging
```typescript
class MessageLogger {
    log(message: BaseMessage, direction: 'sent' | 'received'): void {
        console.log(`[${direction.toUpperCase()}] ${message.type}:`, message.data);
        
        // Optional: Send to analytics
        if (this.analyticsEnabled) {
            this.sendToAnalytics(message, direction);
        }
    }
}
```

### Integration Testing
```typescript
// Test message round-trip
async function testMessageRoundTrip(): Promise<void> {
    const integration = new IframeIntegration('avatar-frame');
    
    // Send test message
    integration.sendToAvatar('avatar-change', { avatarId: 'tcm-doctor' });
    
    // Wait for response
    const response = await integration.waitForMessage('avatar-ready', 5000);
    
    assert(response.data.avatar_id === 'tcm-doctor');
}
```

---
*API Communication Specification v1.0*