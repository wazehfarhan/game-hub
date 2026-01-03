// GameHub Utilities
const GameHubUtils = {
    soundEnabled: true,
    currentTheme: 'dark',
    
    init() {
        this.loadPreferences();
        this.setupEventListeners();
    },
    
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
    },
    
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
    },
    
    toggleTheme() {
        this.currentTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', this.currentTheme);
        localStorage.setItem('gameHubTheme', this.currentTheme);
        this.updateThemeIcon();
        this.playSound('click');
    },
    
    toggleSound() {
        this.soundEnabled = !this.soundEnabled;
        localStorage.setItem('gameHubSound', this.soundEnabled);
        this.updateSoundIcon();
        this.playSound('click');
    },
    
    updateThemeIcon() {
        const themeToggle = document.getElementById('themeToggle');
        if (themeToggle) {
            const icon = themeToggle.querySelector('i');
            if (icon) {
                icon.className = this.currentTheme === 'dark' ? 'fas fa-moon' : 'fas fa-sun';
            }
        }
    },
    
    updateSoundIcon() {
        const soundToggle = document.getElementById('soundToggle');
        if (soundToggle) {
            const icon = soundToggle.querySelector('i');
            if (icon) {
                icon.className = this.soundEnabled ? 'fas fa-volume-up' : 'fas fa-volume-mute';
            }
        }
    },
    
    playSound(type) {
        if (!this.soundEnabled) return;
        
        try {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
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
    },
    
    getHighScore(gameId) {
        const scores = JSON.parse(localStorage.getItem('gameHubScores') || '{}');
        return scores[gameId] || 0;
    },
    
    saveHighScore(gameId, score) {
        const scores = JSON.parse(localStorage.getItem('gameHubScores') || '{}');
        scores[gameId] = Math.max(scores[gameId] || 0, score);
        localStorage.setItem('gameHubScores', JSON.stringify(scores));
        return scores[gameId];
    }
};

// Initialize utilities when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    GameHubUtils.init();
});