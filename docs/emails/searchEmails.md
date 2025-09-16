# Chinese Medicine Avatar Email Search

This directory contains tools to search and extract emails related to the Chinese Medicine Avatar project from Mail.app on macOS.

## Overview

The email search focuses on finding project-related emails from key team members:
- **Ellie** (ellielaw@hkbu.edu.hk) - Team Member
- **Cissy** (yxli@hkbu.edu.hk) - Team Member  
- **Andy** (21253153@life.hkbu.edu.hk) - Technical Developer

## Search Terms

The script searches for emails containing these keywords:
- Chinese medicine, Chinese med
- avatar, ChineseMedAvatar
- TCM (Traditional Chinese Medicine)
- clinical handover
- pedagogical
- simulation, chatbot
- HeyGen

## Files in This Directory

### 1. `searchChineseMedEmails.applescript`
AppleScript that searches Mail.app and exports matching emails as .eml files.

**Features:**
- Searches all mailboxes across all accounts
- Filters by sender (Ellie, Cissy, Andy)
- Checks subject lines and content for project keywords
- Exports emails with descriptive filenames
- Handles filename sanitization and length limits

### 2. `runEmailSearch.sh`
Shell script wrapper that executes the AppleScript and provides user feedback.

**Features:**
- Checks for required files
- Creates output directory if needed
- Runs the AppleScript
- Lists found email files
- Provides status updates

## How to Use

### Method 1: Using the Shell Script (Recommended)

1. Open Terminal
2. Navigate to the project directory:
   ```bash
   cd /Users/simonwang/Documents/Usage/VibeCoding/ChineseMedAvatar
   ```
3. Make the script executable:
   ```bash
   chmod +x docs/emails/runEmailSearch.sh
   ```
4. Run the email search:
   ```bash
   ./docs/emails/runEmailSearch.sh
   ```

### Method 2: Direct AppleScript Execution

1. Open Script Editor (Applications > Utilities > Script Editor)
2. Open the file `searchChineseMedEmails.applescript`
3. Click the "Run" button
4. Grant permissions if prompted

### Method 3: Command Line AppleScript

```bash
osascript docs/emails/searchChineseMedEmails.applescript
```

## Permissions Required

When running for the first time, macOS may prompt for permissions:
- **Mail.app access**: Required to read email contents
- **File system access**: Required to save exported emails
- **Terminal/Script Editor access**: Required for automation

Grant these permissions in System Preferences > Security & Privacy > Privacy.

## Output

Found emails will be saved as `.eml` files in this directory with names like:
```
ChineseMed_2025_8_10_Technical_team_discussion_Re_Chinese_Medicine_TDG_scenarios.eml
```

## Troubleshooting

### No Emails Found
- Verify the target senders have sent emails with project keywords
- Check that Mail.app contains the expected emails
- Ensure search terms match the actual email content

### Permission Errors
- Go to System Preferences > Security & Privacy > Privacy
- Add Terminal (or Script Editor) to Full Disk Access
- Add Terminal to Automation and select Mail.app

### Script Errors
- Ensure Mail.app is running
- Check that the AppleScript file is not corrupted
- Verify the project directory path is correct

## Next Steps

After extracting emails:
1. Review the .eml files for relevant project information
2. Extract key contacts, requirements, and decisions
3. Update project documentation with findings
4. Add any new contacts to `contacts/contacts.json`

## Manual Search Alternative

If the automated search doesn't work, you can manually search Mail.app:

1. Open Mail.app
2. Use the search bar with these terms:
   - `from:ellielaw@hkbu.edu.hk Chinese medicine`
   - `from:yxli@hkbu.edu.hk avatar`
   - `from:21253153@life.hkbu.edu.hk TCM`
3. Export relevant emails manually:
   - Select email → File → Save As → Choose .eml format

## Integration with Project

Found emails should be processed to extract:
- Contact information for `contacts/contacts.json`
- Requirements for `docs/august-2025-requirements.md`
- Platform information for README.md
- Timeline updates for project overview
