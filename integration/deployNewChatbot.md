# Chatbot Deployment Process

## Target Repository
**Deployment Location:** https://github.com/Bob8259/new-bytewise-frontend/tree/main/src/botConfig

## Deployment Workflow

### Step 1: Prepare Bot Configuration Files ✅
- **Status:** COMPLETED (16 Sep 2025)
- **Files Ready for Deployment:**
  - `dr-li-wei.json` - Diagnostic Specialist
  - `master-chen.json` - Traditional TCM Practitioner  
  - `dr-zhang.json` - Acupuncture Specialist
  - `dr-sarah-chen-communication.json` - Medical Communication Specialist (**NEW**)

### Step 2: Upload to Bytewise Frontend Repository 🔄
- **Status:** PENDING
- **Action Required:** Send JSON files to Bob8259/new-bytewise-frontend/src/botConfig/
- **Expected Outcome:** Receive deployment URL for each bot

### Step 3: Railway Deployment Approval 🔄
- **Status:** PENDING APPROVAL
- **Platform:** Railway
- **Action Required:** Approve pending deployment
- **Timeline:** Awaiting deployment approval

### Step 4: Testing and Validation ⏳
- **Status:** NOT STARTED
- **Prerequisites:** Deployment completion
- **Testing Scope:**
  - Bot response accuracy
  - Framework adherence (ISBAR, Calgary-Cambridge, SPIKES, IMIST-AMBO)
  - Chinese Medicine context adaptation
  - Communication training effectiveness

## Bot Configuration Summary

### Dr. Sarah Chen (Communication Specialist) - NEW BOT
- **Specialization:** Clinical Communication & Framework Training
- **Frameworks:** ISBAR, Calgary-Cambridge, SPIKES, IMIST-AMBO
- **Focus:** Medical communication training for Chinese Medicine contexts
- **Model:** gpt-4.1-mini
- **File:** `/bot-config/dr-sarah-chen-communication.json`

### Existing Bots (Ready for Re-deployment)
1. **Dr. Li Wei** - Traditional Chinese Medicine diagnostic specialist
2. **Master Chen** - Senior TCM practitioner with herbal expertise
3. **Dr. Zhang** - Acupuncture and moxibustion specialist

## Next Actions Required

1. **Upload bot configurations** to Bob8259/new-bytewise-frontend/src/botConfig/
2. **Approve Railway deployment** when notification received
3. **Test all four bots** once deployment is live
4. **Document deployment URLs** for integration with our iframe interface
5. **Update team** with testing URLs and access instructions

## Expected Timeline
- **Bot Upload:** Immediate (pending repository access)
- **Deployment Approval:** 1-2 days
- **Testing Phase:** 3-5 days
- **Production Ready:** Within 1 week

## Integration Notes
Once deployed, the bot URLs will be integrated with our iframe-based interface at:
- `/ui/index.html` - Avatar selection and communication interface
- `/integration/iframe-integration.md` - Technical integration documentation

## Deployment Checklist
- [ ] Upload all 4 bot JSON files to target repository
- [ ] Verify bot configurations are valid
- [ ] Approve Railway deployment 
- [ ] Test each bot individually
- [ ] Test framework-specific scenarios
- [ ] Document final deployment URLs
- [ ] Update team with access details
