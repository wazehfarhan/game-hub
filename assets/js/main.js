// Main Game Hub Controller
class GameHub {
    constructor() {
        this.games = [];
        this.filteredGames = [];
        this.currentSearch = '';
        this.currentCategory = 'all';
        this.utils = window.GameHubUtils;
        
        this.init();
    }
    
    init() {
        this.loadGames();
        this.setupEventListeners();
        this.renderGames();
    }
    
    loadGames() {
        this.games = [
            {
                id: 'tic-tac-toe',
                title: 'Tic Tac Toe',
                description: 'Classic 3x3 grid game. Play against AI or a friend!',
                icon: 'fas fa-times',
                difficulty: 'easy',
                players: '1-2',
                playTime: '2-5 min',
                category: 'strategy',
                color: '#6c5ce7',
                implemented: true
            },
            {
                id: 'snake',
                title: 'Snake Game',
                description: 'Control a snake, eat food, and grow without hitting walls or yourself!',
                icon: 'fas fa-snake',
                difficulty: 'medium',
                players: '1',
                playTime: '5-10 min',
                category: 'arcade',
                color: '#00b894',
                implemented: true
            },
            {
                id: 'rock-paper-scissors',
                title: 'Rock Paper Scissors',
                description: 'The classic hand game. Try to beat the computer!',
                icon: 'fas fa-hand-scissors',
                difficulty: 'easy',
                players: '1',
                playTime: '1-2 min',
                category: 'casual',
                color: '#fd79a8',
                implemented: true
            },
            {
                id: 'memory-match',
                title: 'Memory Match',
                description: 'Test your memory by matching pairs of cards.',
                icon: 'fas fa-brain',
                difficulty: 'medium',
                players: '1-2',
                playTime: '5-15 min',
                category: 'memory',
                color: '#a29bfe',
                implemented: false
            },
            {
                id: 'number-guessing',
                title: 'Number Guessing',
                description: 'Guess the secret number with hints in limited attempts.',
                icon: 'fas fa-question-circle',
                difficulty: 'easy',
                players: '1',
                playTime: '2-5 min',
                category: 'puzzle',
                color: '#74b9ff',
                implemented: false
            },
            {
                id: 'whack-a-mole',
                title: 'Whack-a-Mole',
                description: 'Hit the moles as they pop up from their holes!',
                icon: 'fas fa-hat-wizard',
                difficulty: 'medium',
                players: '1',
                playTime: '3-5 min',
                category: 'arcade',
                color: '#fdcb6e',
                implemented: false
            },
            {
                id: 'pong',
                title: 'Pong',
                description: 'Classic table tennis simulation. Play against AI.',
                icon: 'fas fa-table-tennis',
                difficulty: 'medium',
                players: '1-2',
                playTime: '5-10 min',
                category: 'sports',
                color: '#55efc4',
                implemented: false
            },
            {
                id: 'flappy-bird',
                title: 'Flappy Bird',
                description: 'Navigate through pipes without crashing. How far can you go?',
                icon: 'fas fa-dove',
                difficulty: 'hard',
                players: '1',
                playTime: '1-5 min',
                category: 'arcade',
                color: '#81ecec',
                implemented: false
            },
            {
                id: 'hangman',
                title: 'Hangman',
                description: 'Guess the word before the hangman is complete.',
                icon: 'fas fa-user',
                difficulty: 'medium',
                players: '1-2',
                playTime: '3-7 min',
                category: 'word',
                color: '#ffeaa7',
                implemented: false
            },
            {
                id: 'breakout',
                title: 'Breakout',
                description: 'Break all bricks with a bouncing ball and paddle.',
                icon: 'fas fa-basketball-ball',
                difficulty: 'medium',
                players: '1',
                playTime: '5-10 min',
                category: 'arcade',
                color: '#fab1a0',
                implemented: false
            },
            {
                id: 'dice-roll',
                title: 'Dice Roll',
                description: 'Roll virtual dice for board games or gambling fun.',
                icon: 'fas fa-dice-five',
                difficulty: 'easy',
                players: '1-4',
                playTime: '1-3 min',
                category: 'casual',
                color: '#ff7675',
                implemented: false
            },
            {
                id: 'quiz-game',
                title: 'Quiz Game',
                description: 'Test your knowledge with trivia questions.',
                icon: 'fas fa-question',
                difficulty: 'medium',
                players: '1-4',
                playTime: '5-15 min',
                category: 'trivia',
                color: '#fd79a8',
                implemented: false
            },
            {
                id: 'simon-says',
                title: 'Simon Says',
                description: 'Repeat the color sequence correctly.',
                icon: 'fas fa-memory',
                difficulty: 'medium',
                players: '1',
                playTime: '3-7 min',
                category: 'memory',
                color: '#a29bfe',
                implemented: false
            },
            {
                id: 'click-speed-test',
                title: 'Click Speed Test',
                description: 'How fast can you click in 10 seconds?',
                icon: 'fas fa-mouse-pointer',
                difficulty: 'easy',
                players: '1',
                playTime: '1 min',
                category: 'skill',
                color: '#74b9ff',
                implemented: false
            },
            {
                id: '2048',
                title: '2048',
                description: 'Slide numbered tiles to combine them and reach 2048.',
                icon: 'fas fa-th',
                difficulty: 'hard',
                players: '1',
                playTime: '10-30 min',
                category: 'puzzle',
                color: '#00cec9',
                implemented: false
            },
            {
                id: 'space-invaders',
                title: 'Space Invaders',
                description: 'Classic arcade shooter. Defend against alien invaders!',
                icon: 'fas fa-space-shuttle',
                difficulty: 'medium',
                players: '1',
                playTime: '5-10 min',
                category: 'arcade',
                color: '#6c5ce7',
                implemented: false
            },
            {
                id: 'sudoku',
                title: 'Sudoku',
                description: 'Fill the 9x9 grid with numbers following Sudoku rules.',
                icon: 'fas fa-border-all',
                difficulty: 'hard',
                players: '1',
                playTime: '10-30 min',
                category: 'puzzle',
                color: '#00b894',
                implemented: false
            },
            {
                id: 'tetris',
                title: 'Tetris',
                description: 'Arrange falling blocks to complete lines.',
                icon: 'fas fa-cubes',
                difficulty: 'medium',
                players: '1',
                playTime: '5-15 min',
                category: 'arcade',
                color: '#fd79a8',
                implemented: false
            },
            {
                id: 'chess',
                title: 'Chess',
                description: 'Classic chess game against AI.',
                icon: 'fas fa-chess',
                difficulty: 'hard',
                players: '1',
                playTime: '10-60 min',
                category: 'strategy',
                color: '#a29bfe',
                implemented: false
            },
            {
                id: 'minesweeper',
                title: 'Minesweeper',
                description: 'Find all mines without triggering any.',
                icon: 'fas fa-bomb',
                difficulty: 'medium',
                players: '1',
                playTime: '5-15 min',
                category: 'puzzle',
                color: '#ff7675',
                implemented: false
            }
        ];
        
        this.filteredGames = [...this.games];
    }
    
    setupEventListeners() {
        // Search input
        const searchInput = document.getElementById('gameSearch');
        if (searchInput) {
            searchInput.addEventListener('input', this.utils.debounce((e) => {
                this.currentSearch = e.target.value.toLowerCase();
                this.filterGames();
            }, 300));
        }
        
        // Category filter
        const categoryFilter = document.getElementById('categoryFilter');
        if (categoryFilter) {
            categoryFilter.addEventListener('change', (e) => {
                this.currentCategory = e.target.value;
                this.filterGames();
            });
        }
        
        // Game card clicks
        document.addEventListener('click', (e) => {
            const playBtn = e.target.closest('.play-btn');
            if (playBtn) {
                e.stopPropagation();
                const gameId = playBtn.dataset.gameId;
                this.loadGame(gameId);
            }
            
            const gameCard = e.target.closest('.game-card');
            if (gameCard && !e.target.closest('.play-btn')) {
                const gameId = gameCard.dataset.gameId;
                this.loadGame(gameId);
            }
        });
        
        // Back button event
        document.addEventListener('backToHub', () => {
            this.returnToHub();
        });
    }
    
    filterGames() {
        this.filteredGames = this.games.filter(game => {
            const matchesSearch = game.title.toLowerCase().includes(this.currentSearch) ||
                                 game.description.toLowerCase().includes(this.currentSearch) ||
                                 game.category.toLowerCase().includes(this.currentSearch);
            
            const matchesCategory = this.currentCategory === 'all' || game.category === this.currentCategory;
            
            return matchesSearch && matchesCategory;
        });
        
        this.renderGames();
    }
    
    renderGames() {
        const gamesGrid = document.getElementById('gamesGrid');
        const noGamesFound = document.getElementById('noGamesFound');
        
        if (!gamesGrid) return;
        
        gamesGrid.innerHTML = '';
        
        if (this.filteredGames.length === 0) {
            if (noGamesFound) noGamesFound.classList.remove('hidden');
            return;
        }
        
        if (noGamesFound) noGamesFound.classList.add('hidden');
        
        this.filteredGames.forEach(game => {
            const highScore = this.utils.getHighScore(game.id);
            const gameCard = this.createGameCard(game, highScore);
            gamesGrid.appendChild(gameCard);
        });
    }
    
    createGameCard(game, highScore) {
        const card = document.createElement('div');
        card.className = 'game-card';
        card.dataset.gameId = game.id;
        
        // Set thumbnail color
        const thumbnailStyle = game.implemented ? 
            `background: linear-gradient(135deg, ${game.color}40, ${game.color}20);` :
            `background: linear-gradient(135deg, var(--bg-secondary), var(--border-color));`;
        
        card.innerHTML = `
            <div class="game-thumbnail" style="${thumbnailStyle}">
                <i class="${game.icon}" style="color: ${game.implemented ? game.color : 'var(--text-muted)'}"></i>
            </div>
            <div class="game-content">
                <div class="game-title">
                    <h3>${game.title}</h3>
                    <span class="game-difficulty difficulty-${game.difficulty}">
                        ${game.difficulty}
                    </span>
                </div>
                <p class="game-description">${game.description}</p>
                <div class="game-meta">
                    <span><i class="fas fa-users"></i> ${game.players}</span>
                    <span><i class="fas fa-clock"></i> ${game.playTime}</span>
                    ${highScore > 0 ? `<span class="high-score"><i class="fas fa-trophy"></i> ${this.utils.formatScore(highScore)}</span>` : ''}
                </div>
                <button class="play-btn" data-game-id="${game.id}">
                    <i class="fas fa-${game.implemented ? 'play' : 'code'}"></i>
                    ${game.implemented ? 'Play Now' : 'Coming Soon'}
                </button>
            </div>
        `;
        
        if (!game.implemented) {
            card.querySelector('.play-btn').disabled = true;
            card.querySelector('.play-btn').style.opacity = '0.6';
            card.querySelector('.play-btn').style.cursor = 'not-allowed';
        }
        
        return card;
    }
    
    async loadGame(gameId) {
        const game = this.games.find(g => g.id === gameId);
        if (!game) {
            this.utils.showMessage('Error', 'Game not found!');
            return;
        }
        
        if (!game.implemented) {
            this.utils.showMessage('Coming Soon', `${game.title} is currently under development. Check back soon!`);
            return;
        }
        
        this.utils.showLoader();
        this.utils.playSound('click');
        
        try {
            // Hide hub content
            document.querySelector('.hub-main').classList.add('hidden');
            
            // Load game using GameLoader
            const gameLoader = new GameLoader();
            await gameLoader.loadGame(gameId);
            
        } catch (error) {
            console.error('Error loading game:', error);
            this.utils.showMessage('Error', `Failed to load ${game.title}. Please try again.`);
            this.returnToHub();
        } finally {
            this.utils.hideLoader();
        }
    }
    
    returnToHub() {
        // Remove game container if exists
        const gameContainer = document.getElementById('game-container');
        if (gameContainer) {
            gameContainer.remove();
        }
        
        // Show hub content
        document.querySelector('.hub-main').classList.remove('hidden');
        
        // Refresh games to update high scores
        this.renderGames();
    }
}

// Initialize GameHub when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.gameHub = new GameHub();
});