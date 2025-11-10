// Avatar configuration and state management
class AvatarSelectionApp {
    constructor() {
        this.selectedAvatar = null;
        this.iframe = null;
        this.currentTab = 'selection';
        
        // Avatar configuration mapping
        this.avatars = {
            'tcm-clinical-interview': {
                id: 'tcm-clinical-interview',
                name: 'Clinical Interview',
                icon: '🩺',
                description: 'Practice conducting comprehensive patient interviews in TCM context, focusing on gathering chief complaints, medical history, and understanding patient concerns.',
                patient: 'Mr. Wang (45), stressed office worker with digestive issues',
                framework: 'HEAL framework + TCM diagnostic inquiry',
                duration: '15-20 minutes',
                difficulty: 'intermediate',
                url: 'https://textbot.hkbu.tech/avatar/tcm-clinical-interview',
                tips: [
                    'Start with open-ended questions about the chief complaint',
                    'Explore both physical symptoms and emotional state',
                    'Ask about lifestyle, diet, and stress factors',
                    'Practice active listening and empathetic responses',
                    'Connect symptoms to TCM concepts where appropriate'
                ]
            },
            'tcm-concept-explanation': {
                id: 'tcm-concept-explanation',
                name: 'Concept Explanation',
                icon: '📚',
                description: 'Learn to explain complex TCM concepts in simple, accessible language that patients can understand and relate to their condition.',
                patient: 'Mr. Chen (38), engineer new to TCM seeking acupuncture',
                framework: 'TEACH-BACK method with cultural bridging',
                duration: '10-15 minutes',
                difficulty: 'intermediate',
                url: 'https://textbot.hkbu.tech/avatar/tcm-concept-explanation',
                tips: [
                    'Use analogies and metaphors familiar to patients',
                    'Avoid overwhelming with too much theory at once',
                    'Check understanding frequently with teach-back',
                    'Connect abstract concepts to patient\'s experience',
                    'Provide written materials for complex concepts'
                ]
            },
            'tcm-cultural-sensitivity': {
                id: 'tcm-cultural-sensitivity',
                name: 'Cultural Sensitivity',
                icon: '🌏',
                description: 'Navigate cultural differences and beliefs about health, respecting diverse perspectives while providing effective TCM care.',
                patient: 'Mrs. Johnson (52), Western patient skeptical about TCM',
                framework: 'Cultural competency + respectful dialogue',
                duration: '15-20 minutes',
                difficulty: 'advanced',
                url: 'https://textbot.hkbu.tech/avatar/tcm-cultural-sensitivity',
                tips: [
                    'Acknowledge and respect different health beliefs',
                    'Avoid dismissing conventional medical approaches',
                    'Explain TCM in culturally appropriate terms',
                    'Find common ground between belief systems',
                    'Address skepticism with patience and evidence'
                ]
            },
            'tcm-difficult-conversations': {
                id: 'tcm-difficult-conversations',
                name: 'Difficult Conversations',
                icon: '💬',
                description: 'Handle challenging discussions about treatment limitations, realistic expectations, and when TCM may not be the primary solution.',
                patient: 'Mr. Liu (60), chronic pain patient with unrealistic expectations',
                framework: 'SPIKES protocol adapted for TCM',
                duration: '20-25 minutes',
                difficulty: 'advanced',
                url: 'https://textbot.hkbu.tech/avatar/tcm-difficult-conversations',
                tips: [
                    'Prepare for emotional reactions and disappointment',
                    'Use the SPIKES framework: Setting, Perception, Information, Knowledge, Emotions, Strategy',
                    'Be honest about treatment limitations',
                    'Offer alternative approaches when appropriate',
                    'Maintain hope while being realistic'
                ]
            },
            'tcm-professional-referral': {
                id: 'tcm-professional-referral',
                name: 'Professional Referral',
                icon: '🤝',
                description: 'Learn when and how to refer patients to other healthcare professionals while maintaining trust and continuity of care.',
                patient: 'Ms. Zhang (28), anxiety symptoms requiring psychiatric evaluation',
                framework: 'Collaborative care model',
                duration: '10-15 minutes',
                difficulty: 'intermediate',
                url: 'https://textbot.hkbu.tech/avatar/tcm-professional-referral',
                tips: [
                    'Recognize scope of practice limitations',
                    'Frame referrals as complementary, not replacement',
                    'Maintain involvement in patient\'s overall care',
                    'Provide clear rationale for referral',
                    'Follow up to ensure continuity'
                ]
            },
            'tcm-treatment-planning': {
                id: 'tcm-treatment-planning',
                name: 'Treatment Planning',
                icon: '📋',
                description: 'Develop comprehensive, individualized treatment plans that integrate TCM approaches with patient preferences and lifestyle factors.',
                patient: 'Dr. Anderson (45), physician seeking TCM for work stress',
                framework: 'Shared decision-making + TCM principles',
                duration: '20-25 minutes',
                difficulty: 'advanced',
                url: 'https://textbot.hkbu.tech/avatar/tcm-treatment-planning',
                tips: [
                    'Involve patients in treatment planning decisions',
                    'Consider patient\'s lifestyle and preferences',
                    'Explain treatment rationale clearly',
                    'Set realistic timelines and expectations',
                    'Plan for treatment adjustments and follow-up'
                ]
            }
        };
        
        this.init();
    }
    
    init() {
        this.setupEventListeners();
        this.setupTabNavigation();
        this.renderAvatarCards();
        this.showTab('selection');
    }
    
    setupEventListeners() {
        // Tab navigation
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                this.showTab(btn.dataset.tab);
            });
        });
        
        // Avatar selection using event delegation
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('select-btn') && e.target.dataset.avatarId) {
                console.log('Avatar selection button clicked:', e.target.dataset.avatarId);
                this.selectAvatar(e.target.dataset.avatarId);
            }
        });
        
        // Practice controls
        const resetBtn = document.getElementById('reset-session');
        const newSessionBtn = document.getElementById('new-session');
        
        if (resetBtn) {
            resetBtn.addEventListener('click', () => this.resetSession());
        }
        
        if (newSessionBtn) {
            newSessionBtn.addEventListener('click', () => this.showTab('selection'));
        }
    }
    
    setupTabNavigation() {
        // Initially disable practice tab
        const practiceTab = document.querySelector('[data-tab="practice"]');
        if (practiceTab) {
            practiceTab.disabled = true;
        }
    }
    
    renderAvatarCards() {
        console.log('Rendering avatar cards...');
        const gridContainer = document.getElementById('avatar-grid');
        if (!gridContainer) {
            console.error('Avatar grid container not found');
            return;
        }
        
        gridContainer.innerHTML = '';
        
        const avatarKeys = Object.keys(this.avatars);
        console.log('Number of avatars to render:', avatarKeys.length);
        
        Object.values(this.avatars).forEach(avatar => {
            console.log('Rendering avatar:', avatar.name);
            const card = this.createAvatarCard(avatar);
            gridContainer.appendChild(card);
        });
        
        console.log('Avatar cards rendered successfully');
    }
    
    createAvatarCard(avatar) {
        const card = document.createElement('div');
        card.className = 'avatar-card';
        card.dataset.avatarId = avatar.id;
        card.innerHTML = `
            <div class="card-header">
                <div class="card-icon">${avatar.icon}</div>
                <div class="card-title">${avatar.name}</div>
            </div>
            <div class="card-body">
                <div class="card-description">${avatar.description}</div>
                <div class="card-details">
                    <div class="detail-item">
                        <span class="detail-label">Patient Scenario:</span>
                        <span class="detail-value">${avatar.patient}</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Framework:</span>
                        <span class="detail-value">${avatar.framework}</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Duration:</span>
                        <span class="detail-value">${avatar.duration}</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Difficulty:</span>
                        <span class="detail-value">
                            <span class="difficulty ${avatar.difficulty}">${avatar.difficulty}</span>
                        </span>
                    </div>
                </div>
            </div>
            <div class="card-footer">
                <button class="select-btn" data-avatar-id="${avatar.id}">
                    Start Practice Session
                </button>
            </div>
        `;
        
        return card;
    }
    
    selectAvatar(avatarId) {
        console.log('selectAvatar called with:', avatarId);
        this.selectedAvatar = this.avatars[avatarId];
        if (!this.selectedAvatar) {
            console.error('Avatar not found:', avatarId);
            return;
        }
        
        console.log('Selected avatar:', this.selectedAvatar);
        
        // Enable practice tab
        const practiceTab = document.querySelector('[data-tab="practice"]');
        if (practiceTab) {
            practiceTab.disabled = false;
            console.log('Practice tab enabled');
        } else {
            console.error('Practice tab not found');
        }
        
        // Update practice tab content
        this.updatePracticeTab();
        
        // Switch to practice tab
        this.showTab('practice');
        
        // Load iframe
        this.loadAvatarIframe();
    }
    
    updatePracticeTab() {
        if (!this.selectedAvatar) return;
        
        // Update header info
        const practiceTitle = document.querySelector('.practice-info h2');
        const practiceDescription = document.querySelector('.practice-info p');
        
        if (practiceTitle) {
            practiceTitle.textContent = `${this.selectedAvatar.icon} ${this.selectedAvatar.name}`;
        }
        
        if (practiceDescription) {
            practiceDescription.textContent = this.selectedAvatar.description;
        }
        
        // Update demo section
        const demoContent = document.querySelector('.demo-content');
        if (demoContent) {
            demoContent.innerHTML = `
                <h3>Practice Session: ${this.selectedAvatar.name}</h3>
                <div class="demo-details">
                    <p><strong>Patient:</strong> ${this.selectedAvatar.patient}</p>
                    <p><strong>Framework:</strong> ${this.selectedAvatar.framework}</p>
                    <p><strong>Expected Duration:</strong> ${this.selectedAvatar.duration}</p>
                    <p><strong>Difficulty Level:</strong> <span class="difficulty ${this.selectedAvatar.difficulty}">${this.selectedAvatar.difficulty}</span></p>
                </div>
                <div class="demo-tips">
                    <h4>Practice Tips:</h4>
                    <ul id="practice-tips">
                        ${this.selectedAvatar.tips.map(tip => `<li>${tip}</li>`).join('')}
                    </ul>
                </div>
            `;
        }
    }
    
    loadAvatarIframe() {
        if (!this.selectedAvatar) {
            console.error('No avatar selected for iframe loading');
            return;
        }
        
        console.log('Loading iframe for avatar:', this.selectedAvatar.name);
        console.log('Avatar URL:', this.selectedAvatar.url);
        
        const iframeContainer = document.querySelector('.iframe-container');
        
        if (!iframeContainer) {
            console.error('Iframe container not found');
            return;
        }
        
        // Show loading state
        iframeContainer.innerHTML = `
            <div class="loading-message">
                <div class="loading-spinner"></div>
                <p>Loading ${this.selectedAvatar.name} avatar...</p>
                <p class="text-sm">Please wait while we initialize your practice session.</p>
            </div>
        `;
        
        console.log('Loading state displayed');
        
        // Create new iframe
        setTimeout(() => {
            console.log('Creating iframe with URL:', this.selectedAvatar.url);
            
            iframeContainer.innerHTML = `
                <iframe 
                    id="practice-iframe"
                    src="${this.selectedAvatar.url}"
                    title="${this.selectedAvatar.name} Practice Session"
                    loading="lazy"
                    style="width: 100%; height: 100%; border: none;">
                </iframe>
            `;
            
            // Handle iframe load
            const newIframe = document.getElementById('practice-iframe');
            if (newIframe) {
                newIframe.onload = () => {
                    console.log('Avatar iframe loaded successfully');
                };
                
                newIframe.onerror = () => {
                    console.error('Failed to load avatar iframe');
                    this.showIframeError();
                };
            } else {
                console.error('Failed to create iframe element');
            }
        }, 1500); // Small delay to show loading state
    }
    
    showIframeError() {
        const iframeContainer = document.querySelector('.iframe-container');
        if (iframeContainer) {
            iframeContainer.innerHTML = `
                <div class="loading-message">
                    <div style="font-size: 3rem; margin-bottom: 1rem;">⚠️</div>
                    <p><strong>Unable to load practice session</strong></p>
                    <p>Please check your internet connection and try again.</p>
                    <button class="control-btn" onclick="app.loadAvatarIframe()" style="margin-top: 1rem;">
                        Retry Loading
                    </button>
                </div>
            `;
        }
    }
    
    showTab(tabId) {
        console.log('showTab called with:', tabId);
        this.currentTab = tabId;
        
        // Update tab buttons
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.tab === tabId) {
                btn.classList.add('active');
            }
        });
        
        // Update tab content
        document.querySelectorAll('.tab-content').forEach(content => {
            content.classList.remove('active');
        });
        
        const activeContent = document.getElementById(`${tabId}-tab`);
        console.log('Looking for tab content with ID:', `${tabId}-tab`);
        console.log('Found tab content:', activeContent);
        
        if (activeContent) {
            activeContent.classList.add('active');
            console.log('Tab switched to:', tabId);
        } else {
            console.error('Tab content not found for:', tabId);
        }
        
        // Update URL hash for direct linking
        window.location.hash = tabId;
    }
    
    resetSession() {
        if (confirm('Are you sure you want to reset the current practice session?')) {
            this.loadAvatarIframe();
        }
    }
    
    // Utility methods
    getSelectedAvatarInfo() {
        return this.selectedAvatar;
    }
    
    getAllAvatars() {
        return this.avatars;
    }
    
    // Handle browser back/forward navigation
    handleHashChange() {
        const hash = window.location.hash.substr(1);
        if (hash && ['selection', 'practice', 'about'].includes(hash)) {
            this.showTab(hash);
        }
    }
}

// Session management utilities
class SessionManager {
    constructor() {
        this.sessionStartTime = null;
        this.sessionData = {};
    }
    
    startSession(avatarId) {
        this.sessionStartTime = new Date();
        this.sessionData = {
            avatarId: avatarId,
            startTime: this.sessionStartTime,
            interactions: [],
            duration: 0
        };
        
        // Store in localStorage for persistence
        localStorage.setItem('currentSession', JSON.stringify(this.sessionData));
    }
    
    endSession() {
        if (this.sessionStartTime) {
            const endTime = new Date();
            this.sessionData.duration = Math.round((endTime - this.sessionStartTime) / 1000 / 60); // minutes
            this.sessionData.endTime = endTime;
            
            // Archive session
            this.archiveSession();
        }
    }
    
    archiveSession() {
        const sessions = JSON.parse(localStorage.getItem('archivedSessions') || '[]');
        sessions.push(this.sessionData);
        localStorage.setItem('archivedSessions', JSON.stringify(sessions));
        localStorage.removeItem('currentSession');
    }
    
    getCurrentSession() {
        const stored = localStorage.getItem('currentSession');
        return stored ? JSON.parse(stored) : null;
    }
    
    getArchivedSessions() {
        return JSON.parse(localStorage.getItem('archivedSessions') || '[]');
    }
}

// Initialize application
let app;
let sessionManager;

document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM Content Loaded - Initializing app...');
    
    try {
        app = new AvatarSelectionApp();
        sessionManager = new SessionManager();
        
        // Handle hash changes for navigation
        window.addEventListener('hashchange', () => {
            app.handleHashChange();
        });
        
        // Handle initial hash
        app.handleHashChange();
        
        // Check for existing session on load
        const existingSession = sessionManager.getCurrentSession();
        if (existingSession) {
            console.log('Found existing session:', existingSession);
            // Optionally restore the session or prompt user
        }
        
        console.log('TCM Avatar Selection App initialized successfully');
        console.log('Available avatars:', Object.keys(app.avatars));
        
    } catch (error) {
        console.error('Failed to initialize app:', error);
    }
});

// Error handling
window.addEventListener('error', (event) => {
    console.error('Application error:', event.error);
});

// Unload handling
window.addEventListener('beforeunload', () => {
    if (sessionManager && sessionManager.sessionStartTime) {
        sessionManager.endSession();
    }
});

// Export for debugging
if (typeof window !== 'undefined') {
    window.avatarApp = {
        app: () => app,
        sessionManager: () => sessionManager,
        debug: {
            getState: () => ({
                selectedAvatar: app?.selectedAvatar,
                currentTab: app?.currentTab,
                currentSession: sessionManager?.getCurrentSession()
            }),
            selectAvatar: (id) => app?.selectAvatar(id),
            showTab: (tab) => app?.showTab(tab)
        }
    };
    
    // Global functions for onclick handlers
    window.selectAvatar = function(avatarId) {
        console.log('Global selectAvatar called with:', avatarId);
        if (app) {
            app.selectAvatar(avatarId);
        } else {
            console.error('App not initialized');
        }
    };
    
    window.switchTab = function(tabId) {
        console.log('Global switchTab called with:', tabId);
        if (app) {
            app.showTab(tabId);
        } else {
            console.error('App not initialized');
        }
    };
    
    window.resetSession = function() {
        console.log('Global resetSession called');
        if (app) {
            app.resetSession();
        } else {
            console.error('App not initialized');
        }
    };
}