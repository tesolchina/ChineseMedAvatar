# TCM Avatar Integration Guide

This guide demonstrates how to set up an intro page and embed avatars into the TCM Communication Practice Simulator.

## Step 1: Create the Intro Page

First, create a simple landing page that introduces the system and allows users to select their practice scenario.

### File: `intro.html`

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>TCM Communication Practice - Welcome</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen">
    <div class="container mx-auto px-4 py-8">
        <!-- Header -->
        <div class="text-center mb-12">
            <h1 class="text-4xl font-bold text-gray-800 mb-4">
                TCM Communication Practice Simulator
            </h1>
            <p class="text-xl text-gray-600 max-w-3xl mx-auto">
                Practice your Traditional Chinese Medicine communication skills with AI-powered avatars. 
                Develop confidence in patient consultations, colleague interactions, and cross-cultural communication.
            </p>
        </div>

        <!-- Features Section -->
        <div class="grid md:grid-cols-3 gap-8 mb-12">
            <div class="bg-white rounded-lg shadow-md p-6 text-center">
                <div class="text-4xl mb-4">🗣️</div>
                <h3 class="text-xl font-semibold mb-2">Voice Practice</h3>
                <p class="text-gray-600">Practice speaking with realistic voice interactions and receive feedback on your communication style.</p>
            </div>
            <div class="bg-white rounded-lg shadow-md p-6 text-center">
                <div class="text-4xl mb-4">🎭</div>
                <h3 class="text-xl font-semibold mb-2">Multiple Personas</h3>
                <p class="text-gray-600">Interact with diverse patient and colleague avatars, each with unique backgrounds and communication styles.</p>
            </div>
            <div class="bg-white rounded-lg shadow-md p-6 text-center">
                <div class="text-4xl mb-4">📋</div>
                <h3 class="text-xl font-semibold mb-2">Framework-Based</h3>
                <p class="text-gray-600">Practice using established communication frameworks like Calgary-Cambridge, ISBAR, and SPIKES.</p>
            </div>
        </div>

        <!-- Avatar Selection -->
        <div class="max-w-4xl mx-auto">
            <h2 class="text-2xl font-bold text-center mb-8">Choose Your Practice Partner</h2>
            
            <div class="grid md:grid-cols-3 gap-6 mb-8">
                <!-- TCM Doctor -->
                <div class="bg-white rounded-lg shadow-md overflow-hidden">
                    <div class="bg-blue-500 h-32 flex items-center justify-center">
                        <span class="text-6xl">👨‍⚕️</span>
                    </div>
                    <div class="p-6">
                        <h3 class="text-xl font-semibold mb-2">Dr. Zhang Wei</h3>
                        <p class="text-gray-600 mb-4">Senior TCM Practitioner</p>
                        <ul class="text-sm text-gray-500 mb-4">
                            <li>• Clinical interviews</li>
                            <li>• Patient education</li>
                            <li>• Professional consultations</li>
                        </ul>
                        <button onclick="startSession('tcm-doctor')" 
                                class="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
                            Start Practice
                        </button>
                    </div>
                </div>

                <!-- Herbalist -->
                <div class="bg-white rounded-lg shadow-md overflow-hidden">
                    <div class="bg-green-500 h-32 flex items-center justify-center">
                        <span class="text-6xl">🌿</span>
                    </div>
                    <div class="p-6">
                        <h3 class="text-xl font-semibold mb-2">Master Chen Liling</h3>
                        <p class="text-gray-600 mb-4">Traditional Herbalist</p>
                        <ul class="text-sm text-gray-500 mb-4">
                            <li>• Herbal consultations</li>
                            <li>• Patient education</li>
                            <li>• Safety discussions</li>
                        </ul>
                        <button onclick="startSession('herbalist')" 
                                class="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600">
                            Start Practice
                        </button>
                    </div>
                </div>

                <!-- Acupuncturist -->
                <div class="bg-white rounded-lg shadow-md overflow-hidden">
                    <div class="bg-purple-500 h-32 flex items-center justify-center">
                        <span class="text-6xl">🎯</span>
                    </div>
                    <div class="p-6">
                        <h3 class="text-xl font-semibold mb-2">Dr. Sarah Kim</h3>
                        <p class="text-gray-600 mb-4">Licensed Acupuncturist</p>
                        <ul class="text-sm text-gray-500 mb-4">
                            <li>• Procedure explanations</li>
                            <li>• Anxiety management</li>
                            <li>• Cultural sensitivity</li>
                        </ul>
                        <button onclick="startSession('acupuncturist')" 
                                class="w-full bg-purple-500 text-white py-2 rounded hover:bg-purple-600">
                            Start Practice
                        </button>
                    </div>
                </div>
            </div>

            <!-- Quick Start Options -->
            <div class="bg-white rounded-lg shadow-md p-6 text-center">
                <h3 class="text-lg font-semibold mb-4">Or choose a specific scenario:</h3>
                <div class="grid grid-cols-2 md:grid-cols-5 gap-3">
                    <button onclick="startScenario('clinical-interview')" 
                            class="bg-gray-100 hover:bg-gray-200 px-3 py-2 rounded text-sm">
                        Clinical Interview
                    </button>
                    <button onclick="startScenario('tcm-concepts')" 
                            class="bg-gray-100 hover:bg-gray-200 px-3 py-2 rounded text-sm">
                        TCM Concepts
                    </button>
                    <button onclick="startScenario('treatment-plan')" 
                            class="bg-gray-100 hover:bg-gray-200 px-3 py-2 rounded text-sm">
                        Treatment Plans
                    </button>
                    <button onclick="startScenario('difficult-conversation')" 
                            class="bg-gray-100 hover:bg-gray-200 px-3 py-2 rounded text-sm">
                        Difficult Conversations
                    </button>
                    <button onclick="startScenario('patient-referral')" 
                            class="bg-gray-100 hover:bg-gray-200 px-3 py-2 rounded text-sm">
                        Patient Referrals
                    </button>
                </div>
            </div>
        </div>
    </div>

    <script>
        function startSession(avatarType) {
            // Store selected avatar type in localStorage
            localStorage.setItem('selectedAvatar', avatarType);
            // Redirect to main simulator
            window.location.href = 'tcm-simulator.html';
        }

        function startScenario(scenarioType) {
            // Store selected scenario in localStorage
            localStorage.setItem('selectedScenario', scenarioType);
            // Redirect to main simulator
            window.location.href = 'tcm-simulator.html';
        }
    </script>
</body>
</html>
```

## Step 2: Integrate HeyGen Avatar API

Add the HeyGen integration code to your main simulator. Here's how to modify the existing `tcm-simulator.html`:

### Add HeyGen SDK

Add this script tag to the `<head>` section:

```html
<script src="https://sdk.heygen.com/v1/streaming.js"></script>
```

### Update JavaScript with HeyGen Integration

Add this JavaScript code to handle avatar streaming:

```javascript
// HeyGen Configuration
const HEYGEN_CONFIG = {
    apiKey: 'YOUR_HEYGEN_API_KEY', // Replace with your actual API key
    baseUrl: 'https://api.heygen.com/v1',
    avatarIds: {
        'tcm-doctor': 'heygen_avatar_male_doctor_asian',
        'herbalist': 'heygen_avatar_female_mature_asian', 
        'acupuncturist': 'heygen_avatar_female_young_asian_american'
    }
};

let streamingSession = null;
let isConnected = false;

// Initialize HeyGen streaming
async function initializeAvatar(avatarType) {
    try {
        const avatarId = HEYGEN_CONFIG.avatarIds[avatarType] || HEYGEN_CONFIG.avatarIds['tcm-doctor'];
        
        streamingSession = new HeyGenStreamingAPI({
            apiKey: HEYGEN_CONFIG.apiKey,
            avatarId: avatarId,
            voice: 'professional_voice_id'
        });

        // Set up event listeners
        streamingSession.on('connected', () => {
            isConnected = true;
            document.getElementById('statusText').textContent = 'Avatar ready';
            document.getElementById('statusIndicator').className = 'w-3 h-3 bg-green-500 rounded-full';
            showAvatarVideo();
        });

        streamingSession.on('disconnected', () => {
            isConnected = false;
            document.getElementById('statusText').textContent = 'Disconnected';
            document.getElementById('statusIndicator').className = 'w-3 h-3 bg-red-500 rounded-full';
        });

        streamingSession.on('message', (data) => {
            if (data.type === 'chat') {
                addMessage('ai', data.content);
            }
        });

        // Connect to streaming service
        await streamingSession.connect();
        
    } catch (error) {
        console.error('Failed to initialize avatar:', error);
        document.getElementById('statusText').textContent = 'Connection failed';
        document.getElementById('statusIndicator').className = 'w-3 h-3 bg-red-500 rounded-full';
    }
}

// Show avatar video and hide placeholder
function showAvatarVideo() {
    document.getElementById('avatarPlaceholder').classList.add('hidden');
    document.getElementById('avatarVideo').classList.remove('hidden');
    
    // Attach video stream to video element
    const videoElement = document.getElementById('avatarVideoElement');
    if (streamingSession && streamingSession.videoStream) {
        videoElement.srcObject = streamingSession.videoStream;
    }
}

// Send message to avatar
async function sendToAvatar(message) {
    if (streamingSession && isConnected) {
        try {
            await streamingSession.sendMessage({
                type: 'chat',
                content: message,
                systemPrompt: getCurrentSystemPrompt()
            });
        } catch (error) {
            console.error('Failed to send message to avatar:', error);
            // Fallback to local simulation
            simulateAIResponse(message);
        }
    } else {
        // Fallback to local simulation if not connected
        simulateAIResponse(message);
    }
}

// Get system prompt based on current scenario and avatar
function getCurrentSystemPrompt() {
    const selectedAvatar = localStorage.getItem('selectedAvatar') || 'tcm-doctor';
    const currentScenario = document.getElementById('scenarioSelect').value;
    
    // Load system prompt from avatar configuration
    // This would typically be loaded from your bot-config JSON files
    return generateSystemPrompt(selectedAvatar, currentScenario);
}

// Generate system prompt based on avatar and scenario
function generateSystemPrompt(avatarType, scenarioType) {
    const basePrompts = {
        'tcm-doctor': 'You are Dr. Zhang Wei, a senior TCM practitioner...',
        'herbalist': 'You are Master Chen Liling, a traditional herbalist...',
        'acupuncturist': 'You are Dr. Sarah Kim, a licensed acupuncturist...'
    };
    
    const scenarioAddons = {
        'clinical-interview': 'Focus on building rapport and conducting thorough interviews.',
        'tcm-concepts': 'Emphasize clear explanation of TCM concepts in accessible language.',
        'treatment-plan': 'Concentrate on explaining treatment procedures and managing expectations.',
        'difficult-conversation': 'Use SPIKES protocol for handling challenging discussions.',
        'patient-referral': 'Follow ISBAR framework for professional medical communication.'
    };
    
    return `${basePrompts[avatarType]} ${scenarioAddons[scenarioType]}`;
}
```

## Step 3: Avatar Configuration Integration

Create a configuration loader to dynamically load avatar settings:

```javascript
// Avatar configuration loader
class AvatarConfigManager {
    constructor() {
        this.configs = new Map();
    }
    
    async loadConfig(avatarType) {
        if (this.configs.has(avatarType)) {
            return this.configs.get(avatarType);
        }
        
        try {
            const configPaths = {
                'tcm-doctor': './bot-config/tcm-doctor-zhang.json',
                'herbalist': './bot-config/master-chen-herbalist.json',
                'acupuncturist': './bot-config/dr-sarah-acupuncturist.json'
            };
            
            const response = await fetch(configPaths[avatarType]);
            const config = await response.json();
            this.configs.set(avatarType, config);
            return config;
        } catch (error) {
            console.error('Failed to load avatar config:', error);
            return null;
        }
    }
    
    getScenarios(avatarType) {
        const config = this.configs.get(avatarType);
        return config ? config.scenarios : [];
    }
    
    getSystemPrompt(avatarType, scenarioId) {
        const config = this.configs.get(avatarType);
        if (!config) return '';
        
        const scenario = config.scenarios.find(s => s.id === scenarioId);
        return scenario ? config.system_prompt : config.system_prompt;
    }
}

const avatarManager = new AvatarConfigManager();
```

## Step 4: Voice Integration

Add voice recording and speech-to-text functionality:

```javascript
// Voice recording functionality
let mediaRecorder = null;
let audioChunks = [];

async function startVoiceRecording() {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        mediaRecorder = new MediaRecorder(stream);
        
        mediaRecorder.ondataavailable = (event) => {
            audioChunks.push(event.data);
        };
        
        mediaRecorder.onstop = async () => {
            const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
            audioChunks = [];
            
            // Send audio to speech-to-text service
            const transcript = await transcribeAudio(audioBlob);
            if (transcript) {
                messageInput.value = transcript;
            }
        };
        
        mediaRecorder.start();
        updateRecordingUI(true);
        
    } catch (error) {
        console.error('Failed to start recording:', error);
        alert('Unable to access microphone');
    }
}

function stopVoiceRecording() {
    if (mediaRecorder && mediaRecorder.state === 'recording') {
        mediaRecorder.stop();
        updateRecordingUI(false);
    }
}

async function transcribeAudio(audioBlob) {
    // Integration with speech-to-text service
    // This would typically use a service like Google Speech-to-Text, 
    // Azure Speech Services, or OpenAI Whisper
    try {
        const formData = new FormData();
        formData.append('audio', audioBlob);
        
        const response = await fetch('/api/transcribe', {
            method: 'POST',
            body: formData
        });
        
        const result = await response.json();
        return result.transcript;
    } catch (error) {
        console.error('Transcription failed:', error);
        return null;
    }
}

function updateRecordingUI(isRecording) {
    const startBtn = document.getElementById('startVoiceBtn');
    const stopBtn = document.getElementById('stopVoiceBtn');
    
    if (isRecording) {
        startBtn.classList.add('hidden');
        stopBtn.classList.remove('hidden');
    } else {
        stopBtn.classList.add('hidden');  
        startBtn.classList.remove('hidden');
    }
}
```

## Step 5: Complete Integration

Update the main initialization function to handle all integrations:

```javascript
// Complete initialization on page load
document.addEventListener('DOMContentLoaded', async () => {
    // Check for selected avatar from intro page
    const selectedAvatar = localStorage.getItem('selectedAvatar');
    const selectedScenario = localStorage.getItem('selectedScenario');
    
    if (selectedAvatar) {
        // Load avatar configuration
        const config = await avatarManager.loadConfig(selectedAvatar);
        if (config) {
            updateAvatarDisplay(config);
            await initializeAvatar(selectedAvatar);
        }
    }
    
    if (selectedScenario) {
        // Set scenario and initialize
        document.getElementById('scenarioSelect').value = selectedScenario;
        initializeScenario(selectedScenario);
    }
    
    // Initialize other components
    initializeSpeechRecognition();
    setupEventListeners();
});

function updateAvatarDisplay(config) {
    document.getElementById('avatarName').textContent = config.name;
    document.getElementById('avatarRole').textContent = config.role;
    
    // Update scenario options based on avatar capabilities
    updateScenarioOptions(config.scenarios);
}

function updateScenarioOptions(scenarios) {
    const select = document.getElementById('scenarioSelect');
    select.innerHTML = '';
    
    scenarios.forEach(scenario => {
        const option = document.createElement('option');
        option.value = scenario.id;
        option.textContent = scenario.theme;
        select.appendChild(option);
    });
}
```

## Step 6: Deployment Considerations

### Environment Variables

Create a `.env` file for your configuration:

```env
HEYGEN_API_KEY=your_heygen_api_key_here
OPENAI_API_KEY=your_openai_api_key_here
SPEECH_TO_TEXT_API_KEY=your_speech_api_key_here
```

### Server-Side Integration

For production deployment, you'll need a backend service to handle:

1. **API Key Management**: Securely store and use API keys
2. **Session Management**: Track user sessions and progress
3. **Audio Processing**: Handle speech-to-text conversion
4. **Avatar Streaming**: Proxy HeyGen API calls

### File Structure

```
tcm-simulator/
├── index.html (intro page)
├── tcm-simulator.html (main simulator)
├── bot-config/
│   ├── tcm-doctor-zhang.json
│   ├── master-chen-herbalist.json
│   └── dr-sarah-acupuncturist.json
├── content/
│   └── tcm-communication-prompts.md
├── js/
│   ├── avatar-manager.js
│   ├── voice-handler.js
│   └── main.js
├── css/
│   └── custom-styles.css
└── server/
    ├── api/
    │   ├── transcribe.js
    │   ├── avatar-proxy.js
    │   └── session-manager.js
    └── config/
        └── environment.js
```

This guide provides a complete framework for integrating HeyGen avatars with your TCM communication simulator. The modular approach allows for easy customization and expansion of scenarios and avatar personalities.