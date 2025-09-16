(*
AppleScript to search Mail.app for Chinese Medicine Avatar project emails
Searches for emails from Ellie, Cissy, and Andy related to the project
Exports found emails as .eml files to the docs/emails/ directory
*)

tell application "Mail"
	
	-- Define search terms related to Chinese Medicine Avatar project
	set searchTerms to {"Chinese medicine", "Chinese med", "avatar", "ChineseMedAvatar", "TCM", "clinical handover", "pedagogical", "simulation", "chatbot", "HeyGen"}
	
	-- Define sender email addresses/names to search for
	set targetSenders to {"Ellie", "ellielaw@hkbu.edu.hk", "Cissy", "yxli@hkbu.edu.hk", "Andy", "21253153@life.hkbu.edu.hk"}
	
	-- Get the path to the current project's email directory
	set projectPath to (path to home folder as string) & "Documents:Usage:VibeCoding:ChineseMedAvatar:docs:emails:"
	
	-- Create a list to store found emails
	set foundEmails to {}
	
	-- Search through all mailboxes
	repeat with eachAccount in accounts
		repeat with eachMailbox in mailboxes of eachAccount
			try
				-- Get all messages in the mailbox
				set allMessages to messages of eachMailbox
				
				-- Check each message
				repeat with eachMessage in allMessages
					set messageMatch to false
					
					-- Check if sender matches our target senders
					set messageSender to sender of eachMessage
					repeat with targetSender in targetSenders
						if messageSender contains targetSender then
							set messageMatch to true
							exit repeat
						end if
					end repeat
					
					-- If sender matches, check for project-related content
					if messageMatch then
						set messageSubject to subject of eachMessage
						set messageContent to content of eachMessage
						
						-- Check if subject or content contains project terms
						repeat with searchTerm in searchTerms
							if (messageSubject contains searchTerm) or (messageContent contains searchTerm) then
								set end of foundEmails to eachMessage
								exit repeat
							end if
						end repeat
					end if
				end repeat
			on error errMsg
				-- Continue if there's an error with a particular mailbox
				log "Error processing mailbox: " & errMsg
			end try
		end repeat
	end repeat
	
	-- Export found emails
	if (count of foundEmails) > 0 then
		repeat with eachEmail in foundEmails
			try
				set emailSubject to subject of eachEmail
				set emailDate to date received of eachEmail
				set emailSender to sender of eachEmail
				
				-- Create a safe filename
				set fileName to "ChineseMed_" & (year of emailDate) & "_" & (month of emailDate) & "_" & (day of emailDate) & "_" & emailSubject
				-- Remove invalid characters
				set fileName to my replaceChars(fileName, ":", "_")
				set fileName to my replaceChars(fileName, "/", "_")
				set fileName to my replaceChars(fileName, "\\", "_")
				set fileName to my replaceChars(fileName, "?", "_")
				set fileName to my replaceChars(fileName, "*", "_")
				set fileName to my replaceChars(fileName, "\"", "_")
				set fileName to my replaceChars(fileName, "<", "_")
				set fileName to my replaceChars(fileName, ">", "_")
				set fileName to my replaceChars(fileName, "|", "_")
				
				-- Limit filename length
				if length of fileName > 100 then
					set fileName to (characters 1 through 100 of fileName) as string
				end if
				
				set fileName to fileName & ".eml"
				set filePath to projectPath & fileName
				
				-- Save the email
				save eachEmail in file filePath
				
			on error errMsg
				log "Error saving email: " & errMsg
			end try
		end repeat
		
		display dialog "Found and exported " & (count of foundEmails) & " Chinese Medicine Avatar project emails to docs/emails/ directory."
	else
		display dialog "No Chinese Medicine Avatar project emails found from the specified senders."
	end if
	
end tell

-- Helper function to replace characters in a string
on replaceChars(this_text, search_string, replacement_string)
	set AppleScript's text item delimiters to the search_string
	set the item_list to every text item of this_text
	set AppleScript's text item delimiters to the replacement_string
	set this_text to the item_list as string
	set AppleScript's text item delimiters to ""
	return this_text
end replaceChars
