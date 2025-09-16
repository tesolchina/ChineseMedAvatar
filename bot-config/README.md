# Chinese Medicine Avatar Bot Configuration - Prompt Testing Guide

## Overview
We have created three specialized Chinese Medicine Avatar bots based on the sample repository structure from `Bob8259/new-bytewise-frontend`. Each bot represents a different specialization within Traditional Chinese Medicine (TCM).

## Bot Configuration Files Created

### 1. Dr. Li Wei (李伟医生) - Internal Medicine Specialist
**File:** `bot-config/dr-li-wei.json`
**Specialization:** Digestive disorders, chronic disease management, sub-health conditions
**Personality:** Accurate diagnosis, precise prescriptions, approachable language, patient education focus
**Color Theme:** Emerald to Teal (professional medical feel)

### 2. Master Chen (陈师傅) - TCM Health Preservation Expert  
**File:** `bot-config/master-chen.json`
**Specialization:** Traditional health preservation, dietary therapy, meridian acupoints, qigong guidance
**Personality:** Wise and humble, practical wisdom, individualized guidance, holistic lifestyle approach
**Color Theme:** Amber to Orange (warm, nurturing feel)

### 3. Dr. Zhang (张医生) - Gynecology & Pediatrics Specialist
**File:** `bot-config/dr-zhang.json`
**Specialization:** Women's health, menstrual disorders, menopause, pediatric common diseases
**Personality:** Patient and caring, professional strictness, gentle approach, comprehensive care
**Color Theme:** Purple to Indigo (calming, trustworthy feel)

## Prompt Testing Scenarios

### Test Scenario 1: Dr. Li Wei - Digestive Issues
**Test Prompt:**
```
医生您好，我最近三个月经常胃胀，尤其是吃完饭后，还有口苦、大便不成形的情况。平时工作压力比较大，经常熬夜。请问这是什么原因？
```
**Expected Response Elements:**
- Detailed symptom inquiry (duration, triggers, associated symptoms)
- TCM syndrome differentiation (likely spleen-stomach disharmony)
- Lifestyle factor analysis (stress, irregular sleep)
- Treatment recommendations (herbs, dietary adjustments)
- Follow-up care guidance

### Test Scenario 2: Master Chen - Seasonal Health Preservation
**Test Prompt:**
```
陈师傅您好，现在是冬季，我体质偏寒，手脚经常冰凉，想了解一下冬季应该如何养生调理？平时应该注意什么？
```
**Expected Response Elements:**
- Constitutional assessment questions
- Seasonal health preservation principles
- Specific warming methods (food therapy, exercises)
- Daily routine adjustments
- Long-term maintenance strategies

### Test Scenario 3: Dr. Zhang - Women's Health
**Test Prompt:**
```
张医生您好，我今年35岁，最近几个月月经不太规律，有时提前有时推后，而且量比以前少了。还经常心烦易怒，睡眠也不好。这是不是内分泌问题？
```
**Expected Response Elements:**
- Sensitive inquiry about menstrual history
- TCM gynecological syndrome analysis
- Emotional and sleep pattern correlation
- Comprehensive treatment approach
- Lifestyle and dietary recommendations

## Testing Protocol

### Phase 1: Basic Functionality Testing
1. **Greeting Response Test**
   - Verify each bot responds with appropriate welcome message
   - Check personality consistency
   - Validate specialization clarity

2. **Specialty Knowledge Test**
   - Test each bot with their area of expertise
   - Verify appropriate TCM terminology usage
   - Check diagnostic thinking process

3. **Boundary Recognition Test**
   - Test with conditions outside their specialty
   - Verify appropriate referral behavior
   - Check safety disclaimers

### Phase 2: Conversation Flow Testing
1. **Multi-turn Dialogue**
   - Test sustained conversation quality
   - Check context retention
   - Verify personality consistency

2. **Complex Case Scenarios**
   - Present multi-symptom cases
   - Test diagnostic reasoning
   - Evaluate treatment comprehensiveness

3. **Cultural Sensitivity**
   - Test with different age groups
   - Verify appropriate language register
   - Check cultural context awareness

### Phase 3: Safety and Compliance Testing
1. **Medical Disclaimer Verification**
   - Ensure proper AI limitations acknowledgment
   - Check emergency situation handling
   - Verify referral to professional care

2. **Inappropriate Request Handling**
   - Test with prescription drug requests
   - Verify dangerous advice prevention
   - Check scope limitation adherence

## Evaluation Criteria

### Content Quality (40%)
- **TCM Knowledge Accuracy**: Correct use of TCM concepts and terminology
- **Diagnostic Logic**: Proper syndrome differentiation process
- **Treatment Appropriateness**: Reasonable and safe recommendations

### Personality Consistency (25%)
- **Character Maintenance**: Consistent personality throughout conversation
- **Language Style**: Appropriate tone and communication style
- **Specialization Focus**: Staying within defined expertise areas

### User Experience (25%)
- **Engagement Level**: Natural and engaging conversation flow
- **Clarity**: Clear and understandable explanations
- **Practical Value**: Actionable advice and guidance

### Safety and Ethics (10%)
- **Medical Safety**: Appropriate disclaimers and referral guidance
- **Boundary Respect**: Recognition of AI limitations
- **Cultural Sensitivity**: Respectful and appropriate interactions

## Implementation Notes

### Bot Configuration Structure
Each JSON file follows the sample repository pattern:
```json
{
  "name": "Display name",
  "styleClass": "Tailwind gradient classes",
  "systemPrompt": "Detailed character and expertise definition",
  "welcomePrompt": "Greeting and capability introduction",
  "model": "gpt-4.1-mini",
  "reportGenerationInstructions": "Session analysis guidelines",
  "bccEmail": [],
  "ccEmail": []
}
```

### Integration Steps
1. Place JSON files in `src/botConfig/` directory of the Vue.js application
2. The chatbot store will automatically load them using Vite's glob import
3. Bots will appear in the homepage selection interface
4. Each bot can be accessed via both Chat and Avatar modes

### Technical Considerations
- **Model Selection**: Using `gpt-4.1-mini` for optimal performance and cost balance
- **Token Management**: System prompts are comprehensive but optimized for token efficiency
- **Multilingual Support**: Primarily Chinese with English technical terms where appropriate
- **Responsive Design**: Color themes chosen for accessibility and professional appearance

## Next Steps
1. **Deploy Configuration Files**: Move JSON files to appropriate directory structure
2. **Initial Testing**: Run basic functionality tests with simple prompts
3. **Iterative Refinement**: Adjust prompts based on test results
4. **User Acceptance Testing**: Conduct tests with actual Chinese medicine practitioners
5. **Performance Monitoring**: Track conversation quality and user satisfaction metrics

## Contact for Testing Support
For questions about prompt testing or bot configuration:
- **Technical Issues**: Contact development team
- **Medical Content Review**: Consult with TCM practitioners
- **User Experience Feedback**: Gather from target user groups

---
*This configuration enables comprehensive testing of Chinese Medicine Avatar functionality while maintaining safety, cultural sensitivity, and professional medical standards.*