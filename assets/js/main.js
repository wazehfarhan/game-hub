// Main Application Controller
class GameHub {
    constructor() {
        this.games = [];
        this.currentGame = null;
        this.isSoundOn = true;
        this.currentTheme = 'dark';
        
        this.init();
    }
    
    init() {
        this.loadGames();
        this.setupEventListeners();
        this.loadPreferences();
        this.renderGames();
    }
    
    loadGames() {
        // Game configuration data
        this.games = [
            {
                id: 'tic-tac-toe',
                title: 'Tic Tac Toe',
                description: 'Classic 3x3 grid game. Play against AI or a friend!',
                icon: 'fas fa-times',
                difficulty: 'easy',
                players: '1-2',
                playTime: '2-5 min',
                category: 'Strategy'
            },
            {
                id: 'snake',
                title: 'Snake Game',
                description: 'Control a snake, eat food, and grow without hitting walls or yourself!',
                icon: 'fas fa-snake',
                difficulty: 'medium',
                players: '1',
                playTime: '5-10 min',
                category: 'Arcade'
            },
            {
                id: 'rock-paper-scissors',
                title: 'Rock Paper Scissors',
                description: 'The classic hand game. Try to beat the computer!',
                icon: 'fas fa-hand-scissors',
                difficulty: 'easy',
                players: '1',
                playTime: '1-2 min',
                category: 'Casual'
            },
            {
                id: 'memory-match',
                title: 'Memory Match',
                description: 'Test your memory by matching pairs of cards.',
                icon: 'fas fa-brain',
                difficulty: 'medium',
                players: '1-2',
                playTime: '5-15 min',
                category: 'Puzzle'
            },
            {
                id: 'number-guessing',
                title: 'Number Guessing',
                description: 'Guess the secret number with hints in limited attempts.',
                icon: 'fas fa-question-circle',
                difficulty: 'easy',
                players: '1',
                playTime: '2-5 min',
                category: 'Puzzle'
            },
            {
                id: 'whack-a-mole',
                title: 'Whack-a-Mole',
                description: 'Hit the moles as they pop up from their holes!',
                icon: 'fas fa-hat-wizard',
                difficulty: 'medium',
                players: '1',
                playTime: '3-5 min',
                category: 'Arcade'
            },
            {
                id: 'pong',
                title: 'Pong',
                description: 'Classic table tennis simulation. Play against AI.',
                icon: 'fas fa-table-tennis',
                difficulty: 'medium',
                players: '1-2',
                playTime: '5-10 min',
                category: 'Sports'
            },
            {
                id: 'flappy-bird',
                title: 'Flappy Bird',
                description: 'Navigate through pipes without crashing. How far can you go?',
                icon: 'fas fa-dove',
                difficulty: 'hard',
                players: '1',
                playTime: '1-5 min',
                category: 'Arcade'
            },
            {
                id: 'hangman',
                title: 'Hangman',
                description: 'Guess the word before the hangman is complete.',
                icon: 'fas fa-user',
                difficulty: 'medium',
                players: '1-2',
                playTime: '3-7 min',
                category: 'Word'
            },
            {
                id: 'breakout',
                title: 'Breakout',
                description: 'Break all bricks with a bouncing ball and paddle.',
                icon: 'fas fa-basketball-ball',
                difficulty: 'medium',
                players: '1',
                playTime: '5-10 min',
                category: 'Arcade'
            },
            {
                id: 'dice-roll',
                title: 'Dice Roll',
                description: 'Roll virtual dice for board games or gambling fun.',
                icon: 'fas fa-dice-five',
                difficulty: 'easy',
                players: '1-4',
                playTime: '1-3 min',
                category: 'Casual'
            },
            {
                id: 'quiz-game',
                title: 'Quiz Game',
                description: 'Test your knowledge with trivia questions.',
                icon: 'fas fa-question',
                difficulty: 'medium',
                players: '1-4',
                playTime: '5-15 min',
                category: 'Trivia'
            },
            {
                id: 'simon-says',
                title: 'Simon Says',
                description: 'Repeat the color sequence correctly.',
                icon: 'fas fa-memory',
                difficulty: 'medium',
                players: '1',
                playTime: '3-7 min',
                category: 'Memory'
            },
            {
                id: 'click-speed-test',
                title: 'Click Speed Test',
                description: 'How fast can you click in 10 seconds?',
                icon: 'fas fa-mouse-pointer',
                difficulty: 'easy',
                players: '1',
                playTime: '1 min',
                category: 'Skill'
            },
            {
                id: '2048',
                title: '2048',
                description: 'Slide numbered tiles to combine them and reach 2048.',
                icon: 'fas fa-th',
                difficulty: 'hard',
                players: '1',
                playTime: '10-30 min',
                category: 'Puzzle'
            },
            {
                id: 'space-invaders',
                title: 'Space Invaders',
                description: 'Classic arcade shooter. Defend against alien invaders!',
                icon: 'fas fa-space-shuttle',
                difficulty: 'medium',
                players: '1',
                playTime: '5-10 min',
                category: 'Arcade'
            },
            {
                id: 'sudoku',
                title: 'Sudoku',
                description: 'Fill the 9x9 grid with numbers following Sudoku rules.',
                icon: 'fas fa-border-all',
                difficulty: 'hard',
                players: '1',
                playTime: '10-30 min',
                category: 'Puzzle'
            },
            {
                id: 'tetris',
                title: 'Tetris',
                description: 'Arrange falling blocks to complete lines.',
                icon: 'fas fa-cubes',
                difficulty: 'medium',
                players: '1',
                playTime: '5-15 min',
                category: 'Arcade'
            },
            {
                id: 'chess',
                title: 'Chess',
                description: 'Classic chess game against AI.',
                icon: 'fas fa-chess',
                difficulty: 'hard',
                players: '1',
                playTime: '10-60 min',
                category: 'Strategy'
            },
            {
                id: 'minesweeper',
                title: 'Minesweeper',
                description: 'Find all mines without triggering any.',
                icon: 'fas fa-bomb',
                difficulty: 'medium',
                players: '1',
                playTime: '5-15 min',
                category: 'Puzzle'
            }
        ];
    }
    
    renderGames() {
        const gamesGrid = document.getElementById('gamesGrid');
        if (!gamesGrid) return;
        
        gamesGrid.innerHTML = '';
        
        this.games.forEach(game => {
            const gameCard = this.createGameCard(game);
            gamesGrid.appendChild(gameCard);
        });
    }
    
    createGameCard(game) {
        const card = document.createElement('div');
        card.className = 'game-card';
        card.dataset.gameId = game.id;
        
        card.innerHTML = `
            <div class="game-thumbnail">
                <i class="${game.icon}"></i>
            </div>
            <div class="game-content">
                <div class="game-title">
                    <span>${game.title}</span>
                    <span class="game-difficulty difficulty-${game.difficulty}">
                        ${game.difficulty}
                    </span>
                </div>
                <p class="game-description">${game.description}</p>
                <div class="game-stats">
                    <span class="game-stat">
                        <i class="fas fa-users"></i>
                        ${game.players}
                    </span>
                    <span class="game-stat">
                        <i class="fas fa-clock"></i>
                        ${game.playTime}
                    </span>
                    <span class="game-stat">
                        <i class="fas fa-tag"></i>
                        ${game.category}
                    </span>
                </div>
                <button class="play-btn" data-game-id="${game.id}">
                    <i class="fas fa-play"></i>
                    Play Now
                </button>
            </div>
        `;
        
        return card;
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
        
        // Game card clicks
        document.addEventListener('click', (e) => {
            const playBtn = e.target.closest('.play-btn');
            if (playBtn) {
                const gameId = playBtn.dataset.gameId;
                this.loadGame(gameId);
            }
            
            const gameCard = e.target.closest('.game-card');
            if (gameCard && !e.target.closest('.play-btn')) {
                const gameId = gameCard.dataset.gameId;
                this.loadGame(gameId);
            }
        });
        
        // Back button from games
        document.addEventListener('backToHub', () => {
            this.returnToHub();
        });
    }
    
    async loadGame(gameId) {
        console.log(`Loading game: ${gameId}`);
        
        // Show loader
        const loader = document.getElementById('loader');
        if (loader) loader.classList.remove('hidden');
        
        try {
            // Load game module
            const gameData = this.games.find(g => g.id === gameId);
            if (!gameData) throw new Error('Game not found');
            
            this.currentGame = gameData;
            
            // Create game container
            const gameContainer = document.createElement('div');
            gameContainer.id = 'game-container';
            gameContainer.className = 'game-container';
            
            // Hide hub content
            document.querySelector('.hub-main').classList.add('hidden');
            
            // Add game container to body
            document.querySelector('.container').appendChild(gameContainer);
            
            // Use GameLoader to load the game
            const gameLoader = new GameLoader();
            await gameLoader.loadGame(gameId);
            
        } catch (error) {
            console.error('Error loading game:', error);
            alert(`Failed to load ${gameId}. Please try again.`);
        } finally {
            // Hide loader
            if (loader) loader.classList.add('hidden');
        }
    }
    
    returnToHub() {
        // Remove game container
        const gameContainer = document.getElementById('game-container');
        if (gameContainer) {
            gameContainer.remove();
        }
        
        // Show hub content
        document.querySelector('.hub-main').classList.remove('hidden');
        
        this.currentGame = null;
    }
    
    toggleTheme() {
        this.currentTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', this.currentTheme);
        localStorage.setItem('gameHubTheme', this.currentTheme);
        
        // Update button icon
        const themeToggle = document.getElementById('themeToggle');
        if (themeToggle) {
            const icon = themeToggle.querySelector('i');
            if (icon) {
                icon.className = this.currentTheme === 'dark' ? 'fas fa-moon' : 'fas fa-sun';
            }
        }
    }
    
    toggleSound() {
        this.isSoundOn = !this.isSoundOn;
        localStorage.setItem('gameHubSound', this.isSoundOn);
        
        // Update button icon
        const soundToggle = document.getElementById('soundToggle');
        if (soundToggle) {
            const icon = soundToggle.querySelector('i');
            if (icon) {
                icon.className = this.isSoundOn ? 'fas fa-volume-up' : 'fas fa-volume-mute';
            }
        }
        
        // Emit sound change event
        const event = new CustomEvent('soundChange', { 
            detail: { isSoundOn: this.isSoundOn } 
        });
        document.dispatchEvent(event);
    }
    
    loadPreferences() {
        // Load theme
        const savedTheme = localStorage.getItem('gameHubTheme');
        if (savedTheme) {
            this.currentTheme = savedTheme;
            document.documentElement.setAttribute('data-theme', this.currentTheme);
            
            // Update theme button icon
            const themeToggle = document.getElementById('themeToggle');
            if (themeToggle) {
                const icon = themeToggle.querySelector('i');
                if (icon) {
                    icon.className = this.currentTheme === 'dark' ? 'fas fa-moon' : 'fas fa-sun';
                }
            }
        }
        
        // Load sound preference
        const savedSound = localStorage.getItem('gameHubSound');
        if (savedSound !== null) {
            this.isSoundOn = savedSound === 'true';
            
            // Update sound button icon
            const soundToggle = document.getElementById('soundToggle');
            if (soundToggle) {
                const icon = soundToggle.querySelector('i');
                if (icon) {
                    icon.className = this.isSoundOn ? 'fas fa-volume-up' : 'fas fa-volume-mute';
                }
            }
        }
    }
}

// Initialize GameHub when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.gameHub = new GameHub();
});