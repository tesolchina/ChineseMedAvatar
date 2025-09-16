# Extracted Materials from Email Archive

## Google Docs References Found

### 1. Video Generation Module Documentation
**URL:** https://docs.google.com/document/d/1mNAs7Qmqxvd0YpQC1pzEExQemS7ohOx9pCpuzsbgouU/edit?tab=t.wd13mco6ggfr

**Context:** Kaitai developed a separate module that can generate video demos. By talking to a chatbot, scripts will first be generated which can then be used to create a video. Currently supports monologues only; should allow generation of videos for dialogues very soon.

### 2. Discussion Notes Document  
**URL:** https://docs.google.com/document/d/1mNAs7Qmqxvd0YpQC1pzEExQemS7ohOx9pCpuzsbgouU/edit?usp=sharing

**Context:** Notes for discussion (mentioned in June 30, 2025 email)

## Existing HTML Demo/Mockup Found

### Clinical Handover Demo
**URL:** https://gamesbe.asia:3000/GamePlay/Clinical_handover

**Description:** Simon created a simulation of chats between a student and an avatar in text format. This appears to be the HTML mockup/demo mentioned.

**Context:** "Here I simulated some chats between a student and an avatar in texts; please take a look. We need to design the instructions given to students before they engage with the avatar and decide how to comment on their recorded performance."

## System Prompts and Configuration Found

### 1. Existing Chatbot - SimulateAnnotateChat
**Platform:** chat.hkbu.life  
**URL:** https://chat.hkbu.life/#/chat/025e51f3-7418-4c55-80df-0b9fa8b68349/session/latest?courseId=ff2bf847-695c-4df7-82cd-b10cb49c2823&courseTitle=Chinese+Medicine+TDG+Scenario&moduleId=e273da28-1342-4341-82bb-d1faf8b0ea97&moduleTitle=Default+Module

**System Prompt:**
```
You are an experienced consultant on medical communication and a expert lecturer on English communication. Your job is to simulate various chat between a medical student trainee and a person served by the the student trainee. The user will first provide some background info and sample chat history as well as guidelines and techniques. Based on the input, you should generate sample chats of strong and weak students performing the communication tasks. When the user types _ok_ you should ask one question at a time to collect the input mentioned above. Once you understand the needs, you should then generate the sample chats with annotations to explain the strengths and weaknesses of the simulated performers.

You should also keep track of the guidelines and principles that students should learn about a particular communication context. Based on user input, you should generate a summary of such guidelines and principles. This summary should be presented as code block when the user type _principles_. The user may provide an updated version of the summary. When you get this, you should replace the version you keep with the user's version.

You should also keep track of sample histories generated during the chat. When the user types _sample_ you should list the brief sample chat titles for the user to access and modify. When the user types _tutoring_, you should guide the user to explore how a human tutor may work with a student to practice and simulate and annotate such interaction. Such simulation should be useful for setting up an AI tutor to practice with the student.
```

**Welcome Prompt:**
```
I am here to simulate and annotate chats on medical communication. Please type ok to get started. You may type principles to access and modify a summary of guidelines and principles. You may type sample to access sample chats that have been generated. You may type tutoring to explore how a human tutor may practice with a student and generate some simulated practice session with annotations. Click here to edit system prompt- teacher only.
```

### 2. ChineseMedTutor Avatar
**Platform:** chat.hkbu.life  
**Management URL:** https://chat.hkbu.life/#/teacher/manage-avatars  
**Avatar Name:** ChineseMedTutor

**Login Credentials:**
- Username: zi.an.zheng0715@gmail.com
- Password: ChineseMedicine

## Video Demos Found

### 1. Tencent Meeting Recording
**URL:** https://meeting.tencent.com/cw/295QPG5q2d

**Context:** Avatar testing demo - "You can click on the transcript on the right hand side to start the video around 56 seconds."

## Technical Requirements Extracted

### Development Tasks (From August 2025 Email)
1. Allow the choice of different avatars and voices
2. Save and allow access to the transcript of the conversation  
3. Embed the avatar in an html web page (with students' access after SSO login)
4. Generate a written report analyzing the transcripts (based on teacher's system prompt using AI) that can be downloaded by students and teachers

### Framework References
- **CALGARY-CAMBRIDGE GUIDE TO THE MEDICAL INTERVIEW** – Communication Process
- **SPIKES protocol** - For handling difficult conversations
- **IMIST-AMBO framework** - For patient handover (https://clinical.stjohnwa.com.au/clinical-practice-guidelines/general/clinical-handover)
- **WHO international standard terminologies on TCM** - https://www.who.int/publications/i/item/9789240042322

### Key Themes for Avatar Development
1. Conducting clinical interviews with patients
2. Communicating key Chinese medicine concepts in English  
3. Explaining treatment plans and procedures
4. Handling difficult conversations
5. Referring patients to other specialists

## Next Actions Needed
1. Access the Google Docs documents to extract detailed requirements and prompts
2. Test the existing HTML demo at gamesbe.asia:3000
3. Login to chat.hkbu.life to examine the existing avatar configurations
4. Review the video demo for UI/UX insights
5. Integrate extracted prompts and requirements into current project structure