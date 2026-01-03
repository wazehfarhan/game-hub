// Main Game Hub Controller
class GameHub {
    constructor() {
        this.games = [];
        this.currentGame = null;
        this.utils = window.utils || {};
        
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
            }
        ];
    }
    
    setupEventListeners() {
        // Game card clicks
        document.addEventListener('click', (e) => {
            const playBtn = e.target.closest('.play-btn');
            if (playBtn) {
                e.stopPropagation();
                const gameId = playBtn.dataset.gameId;
                this.loadGame(gameId);
                return;
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
    
    renderGames() {
        const gamesGrid = document.getElementById('gamesGrid');
        if (!gamesGrid) return;
        
        gamesGrid.innerHTML = '';
        
        this.games.forEach(game => {
            const highScore = this.utils.getHighScore ? this.utils.getHighScore(game.id) : 0;
            const gameCard = this.createGameCard(game, highScore);
            gamesGrid.appendChild(gameCard);
        });
    }
    
    createGameCard(game, highScore) {
        const card = document.createElement('div');
        card.className = 'game-card';
        card.dataset.gameId = game.id;
        
        card.innerHTML = `
            <div class="game-thumbnail">
                <i class="${game.icon}"></i>
            </div>
            <div class="game-content">
                <h3 class="game-title">${game.title}</h3>
                <p class="game-description">${game.description}</p>
                <div class="game-meta">
                    <span><i class="fas fa-users"></i> ${game.players}</span>
                    <span><i class="fas fa-clock"></i> ${game.playTime}</span>
                    ${highScore > 0 ? `<span><i class="fas fa-trophy"></i> ${highScore}</span>` : ''}
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
    
    loadGame(gameId) {
        const game = this.games.find(g => g.id === gameId);
        if (!game) {
            alert('Game not found!');
            return;
        }
        
        if (!game.implemented) {
            alert(`${game.title} is coming soon!`);
            return;
        }
        
        if (this.utils.playSound) {
            this.utils.playSound('click');
        }
        
        // Hide hub, show game container
        document.getElementById('hubMain').classList.add('hidden');
        const gameContainer = document.getElementById('gameContainer');
        gameContainer.classList.remove('hidden');
        
        // Load game
        const gameLoader = new GameLoader();
        gameLoader.loadGame(gameId, gameContainer);
        
        this.currentGame = game;
    }
    
    returnToHub() {
        // Show hub, hide game container
        document.getElementById('hubMain').classList.remove('hidden');
        document.getElementById('gameContainer').classList.add('hidden');
        
        // Clear game container
        document.getElementById('gameContainer').innerHTML = '';
        
        // Refresh games to update high scores
        this.renderGames();
        
        this.currentGame = null;
    }
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', () => {
    window.gameHub = new GameHub();
});