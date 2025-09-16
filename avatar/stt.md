# Speech-to-Text Requirements

## Overview
Cost-effective speech-to-text requirements for real-time conversation with the Chinese Medicine Avatar. Implementation will be in the technical repository.

## UI Integration Requirements
- Microphone access and permissions handling
- Visual recording indicators
- Real-time transcription display (optional)
- Noise level indicators
- Push-to-talk button functionality

## STT Service Requirements

### Language Support
- **Primary**: Mandarin Chinese (zh-CN)
- **Secondary**: English (en-US)
- Medical terminology recognition
- Accent tolerance for non-native speakers

### Performance Requirements
- **Latency**: <2 seconds for real-time response
- **Accuracy**: >90% for clear speech
- **Noise Handling**: Background noise filtering
- **Continuous Recognition**: Support for natural conversation flow

## UI Controls

### Recording Interface
```html
<!-- Push-to-talk button -->
<button id="push-to-talk" class="record-button">
    <span class="icon">🎤</span>
    Hold to Speak
</button>

<!-- Recording indicator -->
<div class="recording-status">
    <span class="pulse-indicator"></span>
    <span class="recording-text">Listening...</span>
</div>

<!-- Volume level indicator -->
<div class="volume-meter">
    <div class="volume-bar"></div>
</div>
```

### Visual Feedback
- Pulsing microphone icon during recording
- Volume level visualization
- Transcription confidence indicators
- Error states for audio issues

## Integration Specifications

### STT Request Message
```javascript
{
    type: 'speech-recognition-start',
    data: {
        language: "zh-CN" | "en-US",
        continuous: true,
        interim_results: true,
        max_alternatives: 3
    }
}
```

### STT Response Message
```javascript
{
    type: 'speech-recognition-result',
    data: {
        transcript: "I have a headache and feel tired",
        confidence: 0.95,
        is_final: true,
        alternatives: [
            { transcript: "I have a headache and feel tired", confidence: 0.95 },
            { transcript: "I have a headache and feel tie", confidence: 0.82 }
        ]
    }
}
```

## Error Handling

### Common Issues
- Microphone access denied
- No audio input detected
- Network connectivity problems
- Service rate limits exceeded

### Error UI States
```javascript
{
    type: 'speech-recognition-error',
    data: {
        error: 'microphone-denied' | 'no-audio' | 'network-error',
        message: "Please allow microphone access to continue",
        recovery_action: "Check browser settings and reload page"
    }
}
```

## Cost Optimization Strategies
1. **Audio Preprocessing**: Remove silence, normalize volume
2. **Batch Processing**: Group short utterances  
3. **Local Processing**: Use Web Speech API when available
4. **Caching**: Store common phrases and responses
5. **Quality Settings**: Adjust accuracy vs cost based on user needs

## Browser Compatibility
- Chrome: Web Speech API support
- Firefox: Limited Web Speech API  
- Safari: Basic support
- Mobile: Platform-specific considerations

---
*STT Requirements for Technical Implementation*