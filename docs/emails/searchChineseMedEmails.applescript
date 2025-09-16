(*
AppleScript to search Mail.app for Chinese Medicine Avatar project emails
Searches for emails from Ellie, Cissy, and Andy related to the project
Exports found emails as .eml files to the docs/emails/ directory
Updated to include Archive and Exchange mailbox support
*)

tell application "Mail"
	
	-- Define search terms related to Chinese Medicine Avatar project
	set searchTerms to {"Chinese medicine", "Chinese med", "avatar", "ChineseMedAvatar", "TCM", "clinical handover", "pedagogical", "simulation", "chatbot", "HeyGen", "TDG scenarios"}
	
	-- Define sender email addresses/names to search for (updated with discovered names)
	set targetSenders to {"Ellie", "ellielaw@hkbu.edu.hk", "Yuen Yi LAW", "Cissy", "yxli@hkbu.edu.hk", "Cissy Y X LI", "Andy", "21253153@life.hkbu.edu.hk"}
	
	-- Get the path to the current project's email directory
	set projectPath to (path to home folder as string) & "Documents:Usage:VibeCoding:ChineseMedAvatar:docs:emails:"
	
	-- Create a list to store found emails
	set foundEmails to {}
	set searchedMailboxes to 0
	set totalMessages to 0
	
	-- Search through all mailboxes including Archives and Exchange
	repeat with eachAccount in accounts
		log "Searching account: " & (name of eachAccount)
		
		-- Get all mailboxes for this account
		set accountMailboxes to mailboxes of eachAccount
		
		repeat with eachMailbox in accountMailboxes
			try
				set mailboxName to name of eachMailbox
				log "Searching mailbox: " & mailboxName
				set searchedMailboxes to searchedMailboxes + 1
				
				-- Get all messages in the mailbox
				set allMessages to messages of eachMailbox
				set messageCount to count of allMessages
				set totalMessages to totalMessages + messageCount
				log "Found " & messageCount & " messages in " & mailboxName
				
				-- Check each message
				repeat with eachMessage in allMessages
					set messageMatch to false
					
					-- Check if sender matches our target senders
					try
						set messageSender to sender of eachMessage
						repeat with targetSender in targetSenders
							if messageSender contains targetSender then
								set messageMatch to true
								log "Found message from target sender: " & messageSender
								exit repeat
							end if
						end repeat
					on error
						-- Skip if sender cannot be read
						set messageSender to ""
					end try
					
					-- If sender matches, check for project-related content
					if messageMatch then
						try
							set messageSubject to subject of eachMessage
							set messageContent to content of eachMessage
							
							-- Check if subject or content contains project terms
							repeat with searchTerm in searchTerms
								if (messageSubject contains searchTerm) or (messageContent contains searchTerm) then
									set end of foundEmails to eachMessage
									log "Added email: " & messageSubject
									exit repeat
								end if
							end repeat
						on error
							-- Skip if message content cannot be read
							log "Error reading message content"
						end try
					end if
				end repeat
				
				-- Also search submailboxes recursively
				try
					set subMailboxes to mailboxes of eachMailbox
					repeat with subMailbox in subMailboxes
						try
							set subMailboxName to name of subMailbox
							log "Searching sub-mailbox: " & subMailboxName
							set searchedMailboxes to searchedMailboxes + 1
							
							set subMessages to messages of subMailbox
							set subMessageCount to count of subMessages
							set totalMessages to totalMessages + subMessageCount
							log "Found " & subMessageCount & " messages in " & subMailboxName
							
							repeat with eachMessage in subMessages
								set messageMatch to false
								
								try
									set messageSender to sender of eachMessage
									repeat with targetSender in targetSenders
										if messageSender contains targetSender then
											set messageMatch to true
											log "Found message from target sender in sub-mailbox: " & messageSender
											exit repeat
										end if
									end repeat
								on error
									set messageSender to ""
								end try
								
								if messageMatch then
									try
										set messageSubject to subject of eachMessage
										set messageContent to content of eachMessage
										
										repeat with searchTerm in searchTerms
											if (messageSubject contains searchTerm) or (messageContent contains searchTerm) then
												set end of foundEmails to eachMessage
												log "Added email from sub-mailbox: " & messageSubject
												exit repeat
											end if
										end repeat
									on error
										log "Error reading sub-mailbox message content"
									end try
								end if
							end repeat
						on error errMsg
							log "Error processing sub-mailbox " & subMailboxName & ": " & errMsg
						end try
					end repeat
				on error
					-- No submailboxes or error accessing them
				end try
				
			on error errMsg
				-- Continue if there's an error with a particular mailbox
				log "Error processing mailbox " & mailboxName & ": " & errMsg
			end try
		end repeat
	end repeat
	
	log "Search completed. Searched " & searchedMailboxes & " mailboxes with " & totalMessages & " total messages."
	
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
				log "Saved: " & fileName
				
			on error errMsg
				log "Error saving email: " & errMsg
			end try
		end repeat
		
		display dialog "Found and exported " & (count of foundEmails) & " Chinese Medicine Avatar project emails to docs/emails/ directory." & return & return & "Searched " & searchedMailboxes & " mailboxes with " & totalMessages & " total messages."
	else
		display dialog "No Chinese Medicine Avatar project emails found from the specified senders." & return & return & "Searched " & searchedMailboxes & " mailboxes with " & totalMessages & " total messages." & return & return & "Check Console.app for detailed search logs."
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
