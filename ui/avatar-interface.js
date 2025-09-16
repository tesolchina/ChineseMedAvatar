// Chinese Medicine Avatar - Interface Controller
class AvatarInterface {
    constructor() {
        this.currentAvatar = 'tcm-doctor';
        this.inputMode = 'voice';
        this.isRecording = false;
        this.avatarFrame = null;
        
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.setupIframeIntegration();
        this.updateConnectionStatus('connecting');
        
        // Simulate loading completion after 3 seconds
        setTimeout(() => {
            this.hideLoadingOverlay();
            this.updateConnectionStatus('connected');
        }, 3000);
    }

    setupEventListeners() {
        // Turn control buttons
        document.getElementById('user-turn').addEventListener('click', () => {
            this.setTurn('user');
        });
        
        document.getElementById('avatar-turn').addEventListener('click', () => {
            this.setTurn('avatar');
        });

        // Input mode buttons
        document.getElementById('voice-mode').addEventListener('click', () => {
            this.setInputMode('voice');
        });
        
        document.getElementById('text-mode').addEventListener('click', () => {
            this.setInputMode('text');
        });

        // Voice recording
        const recordButton = document.getElementById('start-recording');
        recordButton.addEventListener('mousedown', () => this.startRecording());
        recordButton.addEventListener('mouseup', () => this.stopRecording());
        recordButton.addEventListener('mouseleave', () => this.stopRecording());

        // Text input
        document.getElementById('send-message').addEventListener('click', () => {
            this.sendTextMessage();
        });
        
        document.getElementById('message-input').addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                this.sendTextMessage();
            }
        });

        // Avatar selection
        document.querySelectorAll('.avatar-card').forEach(card => {
            card.addEventListener('click', () => {
                this.selectAvatar(card.dataset.avatar);
            });
        });
    }

    setupIframeIntegration() {
        this.avatarFrame = document.getElementById('avatar-frame');
        
        // Listen for messages from the technical avatar implementation
        window.addEventListener('message', (event) => {
            this.handleAvatarMessage(event);
        });
        
        // Set iframe source when ready (placeholder for now)
        // In production, this would point to the technical repo's avatar interface
        // this.avatarFrame.src = 'https://technical-repo-url/avatar-interface';
    }

    handleAvatarMessage(event) {
        // Handle communication from the technical avatar iframe
        const { type, data } = event.data;
        
        switch (type) {
            case 'avatar-ready':
                this.hideLoadingOverlay();
                this.updateConnectionStatus('connected');
                break;
                
            case 'avatar-speaking':
                this.setTurn('avatar');
                break;
                
            case 'avatar-listening':
                this.setTurn('user');
                break;
                
            case 'speech-recognition-result':
                this.handleSpeechResult(data.text);
                break;
                
            case 'error':
                this.showError(data.message);
                break;
        }
    }

    sendMessageToAvatar(type, data) {
        // Send messages to the technical avatar iframe
        if (this.avatarFrame && this.avatarFrame.contentWindow) {
            this.avatarFrame.contentWindow.postMessage({ type, data }, '*');
        }
    }

    setTurn(participant) {
        // Update UI for turn management
        const userButton = document.getElementById('user-turn');
        const avatarButton = document.getElementById('avatar-turn');
        
        if (participant === 'user') {
            userButton.classList.add('active');
            avatarButton.classList.remove('active');
        } else {
            userButton.classList.remove('active');
            avatarButton.classList.add('active');
        }
        
        // Notify the technical avatar
        this.sendMessageToAvatar('turn-change', { participant });
    }

    setInputMode(mode) {
        this.inputMode = mode;
        
        const voiceButton = document.getElementById('voice-mode');
        const textButton = document.getElementById('text-mode');
        const textArea = document.getElementById('text-input-area');
        const voiceControls = document.getElementById('voice-controls');
        
        if (mode === 'voice') {
            voiceButton.classList.add('active');
            textButton.classList.remove('active');
            textArea.style.display = 'none';
            voiceControls.style.display = 'block';
        } else {
            voiceButton.classList.remove('active');
            textButton.classList.add('active');
            textArea.style.display = 'block';
            voiceControls.style.display = 'none';
        }
    }

    startRecording() {
        if (this.isRecording) return;
        
        this.isRecording = true;
        document.getElementById('recording-indicator').style.display = 'flex';
        
        // Notify the technical avatar to start speech recognition
        this.sendMessageToAvatar('start-recording', {});
    }

    stopRecording() {
        if (!this.isRecording) return;
        
        this.isRecording = false;
        document.getElementById('recording-indicator').style.display = 'none';
        
        // Notify the technical avatar to stop speech recognition
        this.sendMessageToAvatar('stop-recording', {});
    }

    sendTextMessage() {
        const textarea = document.getElementById('message-input');
        const message = textarea.value.trim();
        
        if (!message) return;
        
        // Send text message to technical avatar
        this.sendMessageToAvatar('text-message', { text: message });
        
        // Clear the textarea
        textarea.value = '';
        
        // Switch to avatar turn
        this.setTurn('avatar');
    }

    handleSpeechResult(text) {
        // Handle speech recognition result from technical avatar
        console.log('Speech recognized:', text);
        
        // Could display the recognized text in the UI
        // or process it further
    }

    selectAvatar(avatarId) {
        this.currentAvatar = avatarId;
        
        // Update UI
        document.querySelectorAll('.avatar-card').forEach(card => {
            card.classList.remove('active');
        });
        document.querySelector(`[data-avatar="${avatarId}"]`).classList.add('active');
        
        // Notify the technical avatar about the selection
        this.sendMessageToAvatar('avatar-change', { avatarId });
        
        // Show loading while switching
        this.showLoadingOverlay();
        setTimeout(() => this.hideLoadingOverlay(), 2000);
    }

    updateConnectionStatus(status) {
        const indicator = document.getElementById('connection-status');
        const statusText = document.getElementById('status-text');
        
        switch (status) {
            case 'connected':
                indicator.textContent = '🟢';
                statusText.textContent = 'Connected';
                break;
            case 'connecting':
                indicator.textContent = '🟡';
                statusText.textContent = 'Connecting...';
                break;
            case 'disconnected':
                indicator.textContent = '🔴';
                statusText.textContent = 'Disconnected';
                break;
        }
    }

    showLoadingOverlay() {
        document.getElementById('loading-overlay').style.display = 'flex';
    }

    hideLoadingOverlay() {
        document.getElementById('loading-overlay').style.display = 'none';
    }

    showError(message) {
        const errorOverlay = document.getElementById('error-overlay');
        errorOverlay.querySelector('p').textContent = message || 'Avatar temporarily unavailable';
        errorOverlay.style.display = 'flex';
        this.updateConnectionStatus('disconnected');
    }
}

// Global functions for HTML event handlers
function reloadAvatar() {
    document.getElementById('error-overlay').style.display = 'none';
    avatarInterface.showLoadingOverlay();
    avatarInterface.updateConnectionStatus('connecting');
    
    // Simulate reload
    setTimeout(() => {
        avatarInterface.hideLoadingOverlay();
        avatarInterface.updateConnectionStatus('connected');
    }, 2000);
}

function showDemoInfo() {
    document.getElementById('demo-modal').style.display = 'flex';
}

function closeDemoInfo() {
    document.getElementById('demo-modal').style.display = 'none';
}

// Initialize the interface when page loads
let avatarInterface;
document.addEventListener('DOMContentLoaded', () => {
    avatarInterface = new AvatarInterface();
});

// Export for potential module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AvatarInterface;
}