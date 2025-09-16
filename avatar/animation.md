# Avatar Animation Specifications

## Overview
This document specifies the avatar animation requirements for the Chinese Medicine Avatar project. The actual implementation will be in a separate technical repository and integrated via iframe.

## UI Requirements for Avatar Display
- Avatar display area: 800x600px minimum
- Responsive design for different screen sizes
- Loading states and error handling
- Smooth transitions between avatars

## Avatar Visual Specifications

### Dr. Li Wei (TCM Doctor)
- **Appearance**: Professional, traditional Chinese medicine doctor
- **Age Range**: 45-55 years
- **Attire**: Traditional white coat or Chinese medical attire
- **Expressions**: Wise, patient, caring, attentive
- **Gestures**: Gentle hand movements, traditional greeting

### Master Chen (Herbalist)
- **Appearance**: Experienced herbalist with traditional wisdom
- **Age Range**: 55-65 years  
- **Attire**: Traditional Chinese clothing, possibly herbal workshop setting
- **Expressions**: Knowledgeable, detailed-oriented, traditional
- **Gestures**: Herb handling motions, explanatory gestures

### Dr. Zhang (Acupuncturist)
- **Appearance**: Modern TCM practitioner with scientific approach
- **Age Range**: 35-45 years
- **Attire**: Modern medical attire with TCM elements
- **Expressions**: Precise, gentle, focused, reassuring
- **Gestures**: Point location demonstrations, needle handling motions

## Animation States Required

### Idle States
- Neutral breathing animation
- Occasional blinks and micro-movements
- Avatar-specific subtle gestures

### Speaking States
- Lip-sync with generated speech
- Appropriate facial expressions for content
- Hand gestures that match speaking style
- Eye contact with camera/user

### Listening States
- Attentive posture and expression
- Occasional nods and acknowledgments
- Reduced movement, focused attention

### Transition States
- Smooth morphing between avatars
- Loading animations
- Error state animations

## Technical Integration Points

### iframe Communication
```javascript
// Animation control messages
{
    type: 'animation-state-change',
    data: {
        state: 'speaking' | 'listening' | 'idle',
        emotion: 'neutral' | 'happy' | 'concerned',
        intensity: 0.1 to 1.0
    }
}
```

### Performance Requirements
- 60fps animation when possible
- Graceful degradation for lower-end devices
- Minimal loading time between avatar switches
- Efficient memory usage

## Asset Requirements
- High-quality photo references for each avatar
- Multiple expression variations
- Professional photography with consistent lighting
- Clean background for easy compositing

---
*Avatar Animation Specifications for Technical Implementation*