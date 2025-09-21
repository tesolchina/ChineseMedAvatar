# TCM Communication Practice Platform

## 🩺 Overview
Interactive platform for Traditional Chinese Medicine practitioners to practice communication skills with AI-powered patient avatars.

## 🌐 Live Demo
**Student Interface:** https://tesolchina.github.io/ChineseMedAvatar/

## 📚 Practice Scenarios

### 1. 🩺 Clinical Interview
- **Patient:** Ms. Wang (45), stressed office worker with digestive issues
- **Framework:** HEAL framework + TCM diagnostic inquiry
- **Duration:** 15-20 minutes
- **Difficulty:** Intermediate

### 2. 📚 Concept Explanation
- **Patient:** Mr. Chen (38), engineer new to TCM seeking acupuncture
- **Framework:** TEACH-BACK method with cultural bridging
- **Duration:** 10-15 minutes
- **Difficulty:** Intermediate

### 3. 🌏 Cultural Sensitivity
- **Patient:** Mrs. Johnson (52), Western patient skeptical about TCM
- **Framework:** Cultural competency + respectful dialogue
- **Duration:** 15-20 minutes
- **Difficulty:** Advanced

### 4. 💬 Difficult Conversations
- **Patient:** Mr. Liu (60), chronic pain patient with unrealistic expectations
- **Framework:** SPIKES protocol adapted for TCM
- **Duration:** 20-25 minutes
- **Difficulty:** Advanced

### 5. 🤝 Professional Referral
- **Patient:** Ms. Zhang (28), anxiety symptoms requiring psychiatric evaluation
- **Framework:** Collaborative care model
- **Duration:** 10-15 minutes
- **Difficulty:** Intermediate

### 6. 📋 Treatment Planning
- **Patient:** Dr. Anderson (45), physician seeking TCM for work stress
- **Framework:** Shared decision-making + TCM principles
- **Duration:** 20-25 minutes
- **Difficulty:** Advanced

## 🚀 Features

- **Responsive Design:** Optimized for desktop, tablet, and mobile devices
- **Interactive Chat:** Real-time conversation with AI patient avatars
- **Progress Tracking:** Session management and performance monitoring
- **Professional UI:** Modern, accessible interface design
- **Multi-Framework:** Incorporates established communication frameworks

## 🛠️ Technical Stack

- **Frontend:** HTML5, CSS3, JavaScript (ES6+)
- **Hosting:** GitHub Pages
- **AI Integration:** Bytewise chat platform (textbot.hkbu.tech)
- **Design:** Responsive grid layout with modern UI components

## 📁 Project Structure

```
ChineseMedAvatar/
├── index.html          # Main student interface
├── styles.css          # Responsive stylesheet
├── app.js             # Application logic and session management
├── iframe-embeds/     # Individual embed files
│   ├── tcm-clinical-interview-embed.html
│   ├── tcm-concept-explanation-embed.html
│   ├── tcm-cultural-sensitivity-embed.html
│   ├── tcm-difficult-conversations-embed.html
│   ├── tcm-professional-referral-embed.html
│   └── tcm-treatment-planning-embed.html
├── bot-config/        # Avatar configurations
└── bytewise-configs/  # Bytewise-compatible JSON files
```

## 🔗 Integration Options

### Direct Link
```
https://tesolchina.github.io/ChineseMedAvatar/
```

### Iframe Embedding
```html
<iframe 
    src="https://tesolchina.github.io/ChineseMedAvatar/" 
    width="100%" 
    height="800px" 
    frameborder="0">
</iframe>
```

### Individual Scenario Embedding
```html
<iframe 
    src="https://tesolchina.github.io/ChineseMedAvatar/iframe-embeds/tcm-clinical-interview-embed.html" 
    width="100%" 
    height="600px" 
    frameborder="0">
</iframe>
```

## 👥 Development Team

- **Project Lead:** Dr. Simon Wang, Hong Kong Baptist University
- **Institution:** School of Chinese Medicine, HKBU
- **Contact:** simonwang@hkbu.edu.hk

## 📄 License

Educational use - Hong Kong Baptist University

---

© 2025 Hong Kong Baptist University - School of Chinese Medicine

## Project Overview
This repository contains the **non-technical development** components for the Chinese Medicine Avatar project. The actual technical implementation (frontend/backend) will be in a separate repository and integrated via iframe embedding.

## Repository Focus
- **HTML UI Components**: User interface elements for avatar interaction
- **Content Management**: Avatar prompts, responses, and Chinese medicine knowledge
- **Integration Documentation**: iframe embedding and communication protocols
- **Demo Materials**: Presentation content and stakeholder resources
- **Contact Management**: Outreach and demo coordination

## September 2025 Goals
Based on the meeting with Kaitai Zhang on 2025-08-22, the priority objectives for September include:

### Core Features (Technical Repo)
- **Animated Photo Avatar**: Set up an animated photo that can talk and interact
- **Text-to-Speech Engine**: Implement cost-effective TTS with low API costs
- **Speech-to-Text Engine**: Implement cost-effective STT with low API costs  
- **Turn-Based Control**: Button interface to control conversation turns
- **Multi-Avatar Support**: Enable multiple people to talk with multiple avatars

### Our Responsibilities (This Repo)
- **UI Design**: HTML/CSS for avatar interface and controls
- **Content Creation**: Avatar personalities, medical knowledge, conversation flows
- **Integration Planning**: iframe embedding strategy and communication
- **Demo Coordination**: Stakeholder outreach and presentation materials

## Current Test Environment
- **Test URL**: http://8.211.158.223/
- **Username**: zi.an.zheng0715@gmail.com
- **Password**: ChineseMedicine

## Avatar Management Platform
- **Platform**: chat.hkbu.life
- **Management URL**: https://chat.hkbu.life/#/teacher/manage-avatars
- **Avatar to Edit**: ChineseMedTutor
- **Demo Video**: https://meeting.tencent.com/cw/295QPG5q2d (start at 56 seconds)

## Integration Target
- **Target URL**: https://gamesbe.asia:3000/GamePlay/Clinical_handover
- **Access**: Student SSO login required

## Project Structure
```
ChineseMedAvatar/
├── ui/                # HTML/CSS interface components
├── content/           # Avatar content and Chinese medicine knowledge
├── integration/       # iframe embedding and API communication docs
├── avatar/            # Avatar specifications and requirements
├── contacts/          # Contact management and email system
├── demo/              # Demo materials and presentations
├── docs/              # Documentation and specifications
└── README.md          # This file
```

## Technology Stack
- **UI Layer**: HTML5, CSS3, JavaScript (for iframe communication)
- **Technical Backend**: Separate repository (TBD)
- **Integration**: iframe embedding, postMessage API
- **Content**: Markdown files, JSON data structures
- **Demo Tools**: Presentation software, screen recording

## Development Workflow
1. **Content Creation**: Develop avatar personalities and medical knowledge
2. **UI Design**: Create HTML interface components
3. **Integration Planning**: Design iframe communication protocols
4. **Testing**: Coordinate with technical repo for integration testing
5. **Demo Preparation**: Create presentation materials and coordinate outreach

## GitHub Repository
- **Repository**: https://github.com/tesolchina/ChineseMedAvatar.git
- **Branch**: main
- **Status**: Ready for initial push to GitHub

## iframe Integration Strategy
The technical avatar implementation will be embedded in our HTML interface using:
- iframe for secure embedding
- postMessage API for communication
- Responsive design for different screen sizes
- Loading states and error handling

## Development Timeline
- **Phase 1 (September 2025)**: Core avatar functionality
- **Phase 2 (TBD)**: Multi-avatar support
- **Phase 3 (TBD)**: Advanced features and optimization

## Contact & Outreach
Contact management system for demo scheduling and stakeholder communication.

## Related Resources
- Bytewise outreach coordination
- Demo scheduling requirements
- Avatar prompt specifications
- Embed avatar integration requirements

---
*Last updated: September 2025*