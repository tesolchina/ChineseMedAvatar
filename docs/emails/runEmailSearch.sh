#!/bin/bash

# Script to run the AppleScript for searching Chinese Medicine Avatar emails
# This script will execute the AppleScript to search Mail.app and export emails

echo "Searching for Chinese Medicine Avatar project emails..."
echo "This script will search Mail.app for emails from Ellie, Cissy, and Andy"
echo "related to the Chinese Medicine Avatar project."
echo ""

# Check if the AppleScript file exists
SCRIPT_PATH="$(dirname "$0")/searchChineseMedEmails.applescript"

if [ ! -f "$SCRIPT_PATH" ]; then
    echo "Error: AppleScript file not found at $SCRIPT_PATH"
    exit 1
fi

# Make sure the emails directory exists
mkdir -p "$(dirname "$0")"

echo "Running AppleScript to search and export emails..."
echo "Note: You may need to grant permission for Terminal to access Mail.app"
echo ""

# Execute the AppleScript
osascript "$SCRIPT_PATH"

echo ""
echo "Email search completed!"
echo "Check the docs/emails/ directory for exported .eml files"
echo ""

# List any .eml files found
EML_FILES=$(find "$(dirname "$0")" -name "*.eml" -type f)
if [ -n "$EML_FILES" ]; then
    echo "Found the following email files:"
    find "$(dirname "$0")" -name "*.eml" -type f -exec basename {} \;
else
    echo "No .eml files found in the directory."
fi
