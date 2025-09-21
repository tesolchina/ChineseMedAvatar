# TCM Avatar iFrame Integration Guide

## 📋 Overview

This directory contains HTML files for embedding TCM communication practice avatars into websites, learning management systems, or other educational platforms.

## 📁 Files Included

### Main Integration File
- **`tcm-avatar-embed.html`** - Complete dashboard with all 6 avatars in a responsive grid layout

### Individual Avatar Embeds
- **`tcm-clinical-interview-embed.html`** - Clinical interview practice with skeptical patients
- **`tcm-concept-explanation-embed.html`** - TCM concept explanation to analytical patients  
- **`tcm-cultural-sensitivity-embed.html`** - Cultural sensitivity and diversity practice
- **`tcm-difficult-conversations-embed.html`** - Challenging patient interactions
- **`tcm-professional-referral-embed.html`** - Medical professional communication
- **`tcm-treatment-planning-embed.html`** - Comprehensive treatment planning

## 🔗 Direct Avatar URLs

For direct embedding or linking:

```html
<!-- Clinical Interview Practice -->
https://textbot.hkbu.tech/avatar/tcm-clinical-interview

<!-- Concept Explanation Practice -->
https://textbot.hkbu.tech/avatar/tcm-concept-explanation

<!-- Cultural Sensitivity Practice -->
https://textbot.hkbu.tech/avatar/tcm-cultural-sensitivity

<!-- Difficult Conversations Practice -->
https://textbot.hkbu.tech/avatar/tcm-difficult-conversations

<!-- Professional Referral Practice -->
https://textbot.hkbu.tech/avatar/tcm-professional-referral

<!-- Treatment Planning Practice -->
https://textbot.hkbu.tech/avatar/tcm-treatment-planning
```

## 🛠️ Integration Options

### Option 1: Complete Dashboard
Use `tcm-avatar-embed.html` for a full dashboard experience:

```html
<iframe src="path/to/tcm-avatar-embed.html" 
        width="100%" 
        height="800px" 
        frameborder="0">
</iframe>
```

### Option 2: Individual Avatar Embed
Use individual HTML files for specific practice sessions:

```html
<iframe src="path/to/tcm-clinical-interview-embed.html" 
        width="100%" 
        height="600px" 
        frameborder="0"
        allow="microphone; camera; fullscreen">
</iframe>
```

### Option 3: Direct URL Embedding
Embed avatars directly from the live platform:

```html
<iframe src="https://textbot.hkbu.tech/avatar/tcm-clinical-interview" 
        width="100%" 
        height="600px" 
        frameborder="0"
        allow="microphone; camera; fullscreen"
        title="TCM Clinical Interview Practice">
</iframe>
```

## 📱 Responsive Design

All iframe embeds are fully responsive and will adapt to different screen sizes:

- **Desktop:** Optimal experience with full feature access
- **Tablet:** Adapted layout for touch interaction
- **Mobile:** Streamlined interface for smaller screens

## ⚙️ Customization

### Adjusting Dimensions
Modify width and height attributes based on your layout needs:

```html
<!-- Standard embedding -->
<iframe width="100%" height="600px">

<!-- Large embedding for full experience -->
<iframe width="100%" height="800px">

<!-- Compact embedding -->
<iframe width="100%" height="500px">
```

### Permissions
Include necessary permissions for full functionality:

```html
<iframe allow="microphone; camera; fullscreen; clipboard-read; clipboard-write">
```

## 🎯 Learning Management System Integration

### Moodle
1. Enable iframe embedding in site administration
2. Use HTML block or embed activity
3. Paste iframe code with full permissions

### Canvas
1. Use the "Embed" option in content editor
2. Paste iframe HTML code
3. Ensure external tools are enabled

### Blackboard
1. Use content editor's HTML view
2. Insert iframe code
3. Configure external tool permissions

### Google Classroom
1. Create assignment with external link
2. Or embed in Google Sites page
3. Share page link with students

## 🔒 Security Considerations

- All avatars use HTTPS for secure communication
- Microphone/camera permissions only requested when needed
- No personal data stored in iframes
- GDPR and privacy compliant

## 📊 Assessment Integration

Each avatar session includes:
- **Real-time feedback** during practice
- **Performance scoring** based on communication frameworks
- **Downloadable reports** for assessment records
- **Progress tracking** across multiple sessions

## 🎓 Educational Applications

### Clinical Skills Training
- Practice patient communication before real encounters
- Safe environment for making and learning from mistakes
- Standardized patient scenarios for consistent training

### Language Learning
- English communication practice for non-native speakers
- Medical terminology in context
- Cultural communication awareness

### Professional Development
- Continuing education for practicing TCM professionals
- Communication skills refresher training
- New graduate orientation programs

## 🛠️ Technical Requirements

### For Optimal Performance:
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Stable internet connection (minimum 1 Mbps)
- Microphone access for voice interaction
- Camera access for avatar features (optional)

### Compatibility:
- ✅ Desktop browsers (all major browsers)
- ✅ Mobile browsers (iOS Safari, Android Chrome)
- ✅ Tablet browsers (iPad, Android tablets)
- ✅ Learning management systems with iframe support

## 📞 Support and Contact

**Created by:** Dr. Simon Wang, Innovation Officer  
**Institution:** Language Centre, Hong Kong Baptist University  
**Email:** simonwang@hkbu.edu.hk  
**Repository:** https://github.com/tesolchina/ChineseMedAvatar

For technical support or feature requests, please contact the development team.

## 🔄 Updates and Maintenance

- Avatar configurations automatically updated from central repository
- New practice scenarios added regularly
- Performance improvements and bug fixes deployed seamlessly
- Notification system for major updates

---

*Last Updated: September 22, 2025*