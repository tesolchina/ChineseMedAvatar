// Chinese Medicine Avatar - Interface Controller
class AvatarInterface {
    constructor() {
        this.currentAvatar = 'tcm-doctor';
        this.inputMode = 'voice';
        this.isRecording = false;
        this.avatarFrame = null;
        this.avatarConfigs = {};
        
        this.init();
    }

    init() {
        this.loadAvatarConfigs();
        this.setupEventListeners();
        this.setupIframeIntegration();
        this.updateConnectionStatus('connecting');
        
        // Simulate loading completion after 3 seconds
        setTimeout(() => {
            this.hideLoadingOverlay();
            this.updateConnectionStatus('connected');
        }, 3000);
    }

    async loadAvatarConfigs() {
        // Load avatar configuration files
        const configFiles = {
            'dr-li-wei': '../bot-config/dr-li-wei.json',
            'master-chen': '../bot-config/master-chen.json',
            'dr-zhang': '../bot-config/dr-zhang.json'
        };

        for (const [key, path] of Object.entries(configFiles)) {
            try {
                const response = await fetch(path);
                if (response.ok) {
                    this.avatarConfigs[key] = await response.json();
                    console.log(`Loaded config for ${key}:`, this.avatarConfigs[key]);
                } else {
                    console.warn(`Failed to load config for ${key}`);
                    // Fallback configuration
                    this.avatarConfigs[key] = this.getDefaultConfig(key);
                }
            } catch (error) {
                console.warn(`Error loading config for ${key}:`, error);
                this.avatarConfigs[key] = this.getDefaultConfig(key);
            }
        }
    }

    getDefaultConfig(avatarKey) {
        const defaults = {
            'dr-li-wei': {
                name: '李伟医生 (Dr. Li Wei)',
                styleClass: 'from-emerald-500 to-teal-600',
                systemPrompt: 'You are Dr. Li Wei, a Traditional Chinese Medicine doctor with 30 years of experience.',
                welcomePrompt: 'Hello! I am Dr. Li Wei. How can I help you with Traditional Chinese Medicine today?'
            },
            'master-chen': {
                name: '陈师傅 (Master Chen)',
                styleClass: 'from-orange-500 to-yellow-500',
                systemPrompt: 'You are Master Chen, an experienced herbalist specializing in Chinese herbal medicine.',
                welcomePrompt: 'Greetings! I am Master Chen. What herbal remedies can I help you with?'
            },
            'dr-zhang': {
                name: '张医生 (Dr. Zhang)',
                styleClass: 'from-purple-500 to-pink-500',
                systemPrompt: 'You are Dr. Zhang, an acupuncture expert with modern TCM approach.',
                welcomePrompt: 'Hello! I am Dr. Zhang. How can I assist you with acupuncture and TCM treatment?'
            }
        };
        return defaults[avatarKey] || defaults['dr-li-wei'];
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
        const selectedCard = document.querySelector(`[data-avatar="${avatarId}"]`);
        if (selectedCard) {
            selectedCard.classList.add('active');
            
            // Get the config key from the data-config attribute
            const configKey = selectedCard.dataset.config;
            const config = this.avatarConfigs[configKey];
            
            if (config) {
                console.log(`Selected avatar: ${config.name}`);
                console.log(`System prompt: ${config.systemPrompt}`);
                
                // Notify the technical avatar about the selection with full config
                this.sendMessageToAvatar('avatar-change', { 
                    avatarId, 
                    config: config,
                    animationSpecs: this.getAnimationSpecs(avatarId)
                });
            }
        }
        
        // Show loading while switching
        this.showLoadingOverlay();
        setTimeout(() => this.hideLoadingOverlay(), 2000);
    }

    getAnimationSpecs(avatarId) {
        // Return animation specifications from the avatar/animation.md file
        const specs = {
            'tcm-doctor': {
                appearance: 'Professional, traditional Chinese medicine doctor',
                ageRange: '45-55 years',
                attire: 'Traditional white coat or Chinese medical attire',
                expressions: ['wise', 'patient', 'caring', 'attentive'],
                gestures: ['gentle hand movements', 'traditional greeting']
            },
            'herbalist': {
                appearance: 'Experienced herbalist with traditional wisdom',
                ageRange: '55-65 years',
                attire: 'Traditional Chinese clothing, possibly herbal workshop setting',
                expressions: ['knowledgeable', 'detailed-oriented', 'traditional'],
                gestures: ['herb handling motions', 'explanatory gestures']
            },
            'acupuncturist': {
                appearance: 'Modern TCM practitioner with scientific approach',
                ageRange: '35-45 years',
                attire: 'Modern medical attire with TCM elements',
                expressions: ['precise', 'gentle', 'focused', 'reassuring'],
                gestures: ['point location demonstrations', 'needle handling motions']
            }
        };
        return specs[avatarId] || specs['tcm-doctor'];
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
