# Text-to-Speech Requirements

## Overview
Cost-effective text-to-speech requirements for the Chinese Medicine Avatar project. Implementation will be in the technical repository.

## UI Integration Requirements
- Audio playback controls in HTML interface
- Volume control and mute functionality  
- Visual indicators for speech activity
- Loading states for TTS processing

## TTS Service Requirements

### Language Support
- **Primary**: Mandarin Chinese (zh-CN)
- **Secondary**: English (en-US)
- Natural-sounding pronunciation for medical terms
- Appropriate accent and tone for each avatar

### Voice Characteristics by Avatar

#### Dr. Li Wei (TCM Doctor)
- **Voice Type**: Mature male, authoritative yet warm
- **Speaking Pace**: Moderate, clear enunciation
- **Tone**: Professional, caring, educational

#### Master Chen (Herbalist)
- **Voice Type**: Older male, traditional wisdom
- **Speaking Pace**: Slightly slower, thoughtful
- **Tone**: Traditional, detailed, patient

#### Dr. Zhang (Acupuncturist)
- **Voice Type**: Mid-aged professional, precise
- **Speaking Pace**: Clear and measured
- **Tone**: Scientific yet gentle, reassuring

## Cost Optimization Strategy
1. **Service Comparison**: Azure, Google, Amazon pricing
2. **Usage Patterns**: Cache common responses
3. **Compression**: Optimize audio format and quality
4. **Batching**: Group multiple requests when possible

## Integration Specifications

### Message Format for TTS
```javascript
{
    type: 'text-to-speech-request',
    data: {
        text: "Traditional Chinese Medicine focuses on...",
        voice_id: "tcm-doctor" | "herbalist" | "acupuncturist", 
        language: "zh-CN" | "en-US",
        speed: 0.8 to 1.2,
        emotion: "neutral" | "happy" | "concerned"
    }
}
```

### Audio Delivery
```javascript
{
    type: 'speech-audio-ready',
    data: {
        audio_url: "blob:https://...",
        duration: 5000, // milliseconds
        format: "mp3" | "wav",
        transcript: "Original text"
    }
}
```

## Quality Requirements
- Natural prosody and intonation
- Correct pronunciation of TCM terminology
- Consistent voice quality across sessions
- Low latency for real-time conversation

---
*TTS Requirements for Technical Implementation*