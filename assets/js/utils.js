// GameHub Utilities

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
        
        // Create audio context for sound effects
        try {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            // Different sounds for different actions
            switch(type) {
                case 'click':
                    oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
                    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
                    oscillator.start();
                    oscillator.stop(audioContext.currentTime + 0.1);
                    break;
                    
                case 'success':
                    oscillator.frequency.setValueAtTime(523.25, audioContext.currentTime); // C5
                    oscillator.frequency.setValueAtTime(659.25, audioContext.currentTime + 0.1); // E5
                    oscillator.frequency.setValueAtTime(783.99, audioContext.currentTime + 0.2); // G5
                    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
                    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
                    oscillator.start();
                    oscillator.stop(audioContext.currentTime + 0.3);
                    break;
                    
                case 'error':
                    oscillator.frequency.setValueAtTime(200, audioContext.currentTime);
                    oscillator.frequency.setValueAtTime(150, audioContext.currentTime + 0.1);
                    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
                    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);
                    oscillator.start();
                    oscillator.stop(audioContext.currentTime + 0.2);
                    break;
                    
                case 'move':
                    oscillator.frequency.setValueAtTime(400, audioContext.currentTime);
                    gainNode.gain.setValueAtTime(0.05, audioContext.currentTime);
                    oscillator.start();
                    oscillator.stop(audioContext.currentTime + 0.05);
                    break;
            }
        } catch (e) {
            console.log('Web Audio API not supported or blocked');
        }
    }
    
    showLoader() {
        const loader = document.getElementById('loader');
        if (loader) {
            loader.classList.remove('hidden');
        }
    }
    
    hideLoader() {
        const loader = document.getElementById('loader');
        if (loader) {
            loader.classList.add('hidden');
        }
    }
    
    showMessage(title, message, buttons = []) {
        return new Promise((resolve) => {
            const messageEl = document.createElement('div');
            messageEl.className = 'game-message';
            messageEl.innerHTML = `
                <h3 class="message-title">${title}</h3>
                <p class="message-text">${message}</p>
                <div class="message-buttons">
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
    
    formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    
    formatScore(score) {
        return score.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }
    
    isMobile() {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }
    
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
}

// Initialize utilities
const utils = new GameHubUtils();
window.GameHubUtils = utils;