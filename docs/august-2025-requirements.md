# August 2025 Development Requirements

## Source
Email from Simon H WANG to technical team, dated August 10, 2025

## Requested Features for End of August 2025

### Priority Features (from Simon to Kaitai/Andy)
1. **Multiple Avatar Selection**
   - Allow choice of different avatars and voices
   - Support for avatar switching during conversations

2. **Conversation Transcript Management**
   - Save conversation transcripts automatically
   - Allow student and teacher access to transcripts
   - Persistent storage and retrieval system

3. **Web Integration**
   - Embed avatar in HTML web page
   - Student access after SSO login
   - Target integration: https://gamesbe.asia:3000/GamePlay/Clinical_handover

4. **AI-Powered Report Generation**
   - Generate written analysis of conversation transcripts
   - Based on teacher's system prompt using AI
   - Downloadable reports for students and teachers
   - Optional email delivery to participants

5. **Video Generation Enhancement**
   - Enable dialogue video creation (currently supports monologues only)
   - Extend existing video generation chatbot capabilities

## Current Platform Information

### Avatar Management
- **Platform**: chat.hkbu.life
- **Management Interface**: https://chat.hkbu.life/#/teacher/manage-avatars
- **Current Avatar**: ChineseMedTutor
- **Access Credentials**:
  - Username: zi.an.zheng0715@gmail.com
  - Password: ChineseMedicine

### Demo Resources
- **Video Demo**: https://meeting.tencent.com/cw/295QPG5q2d
- **Demo Instructions**: Click transcript on right side, start at 56 seconds
- **Video Documentation**: Available in Google Docs

## Technical Implementation Team
- **Primary Developers**: Kaitai Zhang (Zian ZHENG), Andy
- **Integration Target**: Games-based learning platform
- **Timeline**: End of August 2025

## Pedagogical Development Requirements

### TDG Team Responsibilities
1. **Scenario Development**
   - Create more scenarios for student practice with avatars
   - Define learning objectives for each scenario

2. **Practice Framework**
   - Describe techniques students can practice
   - Define how avatars facilitate practice and feedback
   - Establish assessment criteria

3. **Analytics Framework**
   - Methods for analyzing chat history/transcripts
   - Student performance evaluation metrics
   - Learning outcome measurements

4. **Web Platform Development**
   - Design interactive learning experience
   - Avatar integration as one module among others
   - Student access and progress tracking

## Integration Architecture
- **Separation of Concerns**: Avatar technical implementation separate from UI
- **iframe Embedding**: Avatar embedded in existing web platform
- **SSO Authentication**: Student login through institutional system
- **Multi-modal Learning**: Avatar as part of broader learning modules

## Related Projects
- **Video Generation Module**: Separate chatbot for script and video creation
- **Clinical Handover Scenarios**: Specific use case for medical education
- **Chinese Medicine Education**: Traditional medicine consultation practice

---
*Extracted from technical team email dated August 10, 2025*
*Status: Requirements documented for development tracking*