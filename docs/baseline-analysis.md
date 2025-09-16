# Baseline Analysis: HKBU Chinese Medicine Tutor Website

## Current Live System Overview

**URL:** https://lessons.hkbu.tech/api/AccessLessons/ChineseMedTutorWebsite

### System Architecture
- **Module Type:** Medical Conversation Learning Module
- **Framework Focus:** ISBAR Communication Framework
- **Learning Modes:** 
  - 📚 Interactive Learning
  - 🎬 Avatar Tutor 
  - 🤖 Live Avatar Practice

### Content Structure

#### 1. ISBAR Framework Components
- **Introduction:** Name, role, location, patient identification
- **Situation:** Current status and immediate concern  
- **Background:** Relevant medical history and context
- **Assessment:** Professional judgment and analysis
- **Recommendation:** Specific actions or requests

#### 2. Interactive Elements
- **Knowledge Check System:** Multiple choice questions (5 questions format)
- **Progressive Navigation:** Previous/Next functionality
- **Case Scenarios:**
  - Emergency Transfer (Chest pain patient requiring urgent cardiology consultation)
  - Routine Handover (End-of-shift patient status update)  
  - Consultation Request (Seeking specialist advice for complex case)

#### 3. Communication Guidelines
**Do's:**
- ✓ Use clear, concise language
- ✓ Include relevant vital signs
- ✓ State urgency level clearly
- ✓ Confirm understanding

**Don'ts:**
- ✗ Avoid medical jargon with families

## Comparison with Our Current Project

### Similarities
1. **Medical Communication Focus:** Both systems target medical communication training
2. **Framework-Based Approach:** ISBAR vs Calgary-Cambridge/SPIKES protocols
3. **Avatar Integration:** Both utilize avatar-based learning
4. **Interactive Learning:** Knowledge checks and practice scenarios

### Key Differences

#### Framework Focus
- **Live System:** ISBAR (Introduction, Situation, Background, Assessment, Recommendation)
- **Our Project:** Multiple frameworks (Calgary-Cambridge, SPIKES, IMIST-AMBO)

#### Scope
- **Live System:** Focused on handover communication
- **Our Project:** Broader Chinese Medicine communication (interviews, treatment plans, difficult conversations, referrals)

#### Technology Stack
- **Live System:** API-based lessons system with integrated avatar
- **Our Project:** iframe-based architecture with separate UI and technical components

#### Content Depth
- **Live System:** Structured lessons with knowledge checks
- **Our Project:** AI-powered conversational practice with transcript analysis

## Integration Opportunities

### 1. Content Structure Learning
- Adopt their clear framework presentation format
- Implement progressive knowledge checks
- Use their case scenario categorization approach

### 2. UI/UX Patterns
- Clean, icon-based navigation (📚 🎬 🤖)
- Progressive disclosure of information
- Clear do's and don'ts formatting

### 3. Assessment Integration
- Multiple choice knowledge validation
- Scenario-based practice structure
- Progress tracking through numbered sequences

## Recommendations for Our Project

### 1. Enhanced Content Organization
```
Our Current Structure:
├── avatars/
│   ├── dr-li-wei.json (Diagnostic specialist)
│   ├── master-chen.json (Traditional practitioner) 
│   └── dr-zhang.json (Acupuncture specialist)

Proposed Enhancement:
├── frameworks/
│   ├── isbar/
│   ├── calgary-cambridge/
│   ├── spikes/
│   └── imist-ambo/
├── scenarios/
│   ├── emergency-transfer/
│   ├── routine-handover/
│   ├── consultation-request/
│   └── difficult-conversations/
└── assessments/
    ├── knowledge-checks/
    └── practice-evaluations/
```

### 2. Learning Path Integration
- Pre-practice knowledge validation
- Structured scenario progression
- Post-practice assessment and feedback

### 3. Framework Consolidation
- Consider adding ISBAR to our existing frameworks
- Create unified communication principles
- Develop cross-framework competency mapping

## Next Steps
1. **Content Audit:** Compare their ISBAR content with our Calgary-Cambridge approach
2. **UI Enhancement:** Integrate their clear visual communication patterns
3. **Assessment System:** Implement structured knowledge checks before avatar practice
4. **Framework Expansion:** Add ISBAR as a fourth communication framework
5. **Scenario Development:** Create Chinese Medicine specific versions of their case types

## Technical Integration Considerations
- Their API-based approach vs our iframe architecture
- Lesson progression tracking and state management
- Avatar integration patterns and best practices
- Assessment data collection and analysis methods