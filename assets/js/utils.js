// Utility Functions for GameHub

class GameHubUtils {
    constructor() {
        this.soundEnabled = true;
        this.currentTheme = 'dark';
        this.init();
    }
    
    init() {
        this.loadPreferences();
        this.setupEventListeners();
    }
    
    loadPreferences() {
        // Load theme
        const savedTheme = localStorage.getItem('gameHubTheme');
        if (savedTheme) {
            this.currentTheme = savedTheme;
            document.documentElement.setAttribute('data-theme', this.currentTheme);
            this.updateThemeIcon();
        }
        
        // Load sound preference
        const savedSound = localStorage.getItem('gameHubSound');
        if (savedSound !== null) {
            this.soundEnabled = savedSound === 'true';
            this.updateSoundIcon();
        }
    }
    
    setupEventListeners() {
        // Theme toggle
        const themeToggle = document.getElementById('themeToggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', () => this.toggleTheme());
        }
        
        // Sound toggle
        const soundToggle = document.getElementById('soundToggle');
        if (soundToggle) {
            soundToggle.addEventListener('click', () => this.toggleSound());
        }
    }
    
    toggleTheme() {
        this.currentTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', this.currentTheme);
        localStorage.setItem('gameHubTheme', this.currentTheme);
        this.updateThemeIcon();
        this.playSound('click');
    }
    
    toggleSound() {
        this.soundEnabled = !this.soundEnabled;
        localStorage.setItem('gameHubSound', this.soundEnabled);
        this.updateSoundIcon();
        this.playSound('click');
    }
    
    updateThemeIcon() {
        const themeToggle = document.getElementById('themeToggle');
        if (themeToggle) {
            const icon = themeToggle.querySelector('i');
            if (icon) {
                icon.className = this.currentTheme === 'dark' ? 'fas fa-moon' : 'fas fa-sun';
            }
        }
    }
    
    updateSoundIcon() {
        const soundToggle = document.getElementById('soundToggle');
        if (soundToggle) {
            const icon = soundToggle.querySelector('i');
            if (icon) {
                icon.className = this.soundEnabled ? 'fas fa-volume-up' : 'fas fa-volume-mute';
            }
        }
    }
    
    playSound(type) {
        if (!this.soundEnabled) return;
        
        // Simple beep sounds using Web Audio API
        try {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            // Different frequencies for different sounds
            let frequency = 800;
            let duration = 0.1;
            
            switch(type) {
                case 'click':
                    frequency = 800;
                    break;
                case 'win':
                    frequency = 1200;
                    duration = 0.3;
                    break;
                case 'lose':
                    frequency = 400;
                    duration = 0.2;
                    break;
                case 'move':
                    frequency = 600;
                    duration = 0.05;
                    break;
            }
            
            oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
            gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);
            
            oscillator.start();
            oscillator.stop(audioContext.currentTime + duration);
        } catch (e) {
            console.log('Sound not supported');
        }
    }
    
    getHighScore(gameId) {
        const scores = JSON.parse(localStorage.getItem('gameHubScores') || '{}');
        return scores[gameId] || 0;
    }
    
    saveHighScore(gameId, score) {
        const scores = JSON.parse(localStorage.getItem('gameHubScores') || '{}');
        scores[gameId] = Math.max(scores[gameId] || 0, score);
        localStorage.setItem('gameHubScores', JSON.stringify(scores));
        return scores[gameId];
    }
    
    showMessage(title, message, buttons = []) {
        return new Promise((resolve) => {
            // Remove existing message if any
            const existing = document.querySelector('.game-message');
            if (existing) existing.remove();
            
            const messageEl = document.createElement('div');
            messageEl.className = 'game-message';
            messageEl.style.cssText = `
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: var(--bg-card);
                padding: var(--spacing-xl);
                border-radius: var(--border-radius);
                border: 2px solid var(--border-color);
                text-align: center;
                z-index: 1100;
                box-shadow: var(--shadow);
                animation: popIn 0.3s ease;
                max-width: 90%;
                width: 400px;
            `;
            
            // Add animation
            const style = document.createElement('style');
            style.textContent = `
                @keyframes popIn {
                    from {
                        opacity: 0;
                        transform: translate(-50%, -50%) scale(0.8);
                    }
                    to {
                        opacity: 1;
                        transform: translate(-50%, -50%) scale(1);
                    }
                }
            `;
            document.head.appendChild(style);
            
            messageEl.innerHTML = `
                <h3 style="margin-bottom: var(--spacing-sm); color: var(--text-primary);">${title}</h3>
                <p style="color: var(--text-secondary); margin-bottom: var(--spacing-lg);">${message}</p>
                <div style="display: flex; gap: var(--spacing-sm); justify-content: center;">
                    ${buttons.map((btn, i) => 
                        `<button class="game-btn ${btn.class || 'game-btn-primary'}" data-action="${btn.action}">
                            ${btn.text}
                        </button>`
                    ).join('')}
                </div>
            `;
            
            document.body.appendChild(messageEl);
            
            messageEl.querySelectorAll('button').forEach(button => {
                button.addEventListener('click', (e) => {
                    const action = e.target.dataset.action;
                    document.body.removeChild(messageEl);
                    resolve(action);
                });
            });
        });
    }
    
    formatScore(score) {
        return score.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }
}

// Initialize and export
const utils = new GameHubUtils();