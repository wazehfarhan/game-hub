// Main Game Hub Controller
class GameHub {
    constructor() {
        this.games = [];
        this.utils = GameHubUtils;
        
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
    }
    
    renderGames() {
        const gamesGrid = document.getElementById('gamesGrid');
        if (!gamesGrid) return;
        
        gamesGrid.innerHTML = '';
        
        this.games.forEach(game => {
            const highScore = this.utils.getHighScore(game.id);
            const gameCard = this.createGameCard(game, highScore);
            gamesGrid.appendChild(gameCard);
        });
    }
    
    createGameCard(game, highScore) {
        const card = document.createElement('div');
        card.className = 'game-card';
        card.dataset.gameId = game.id;
        
        card.innerHTML = `
            <div class="game-thumbnail" style="background: linear-gradient(135deg, ${game.color}40, ${game.color}20);">
                <i class="${game.icon}" style="color: ${game.color}"></i>
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
                    <i class="fas fa-play"></i> Play Now
                </button>
            </div>
        `;
        
        return card;
    }
    
    async loadGame(gameId) {
        const game = this.games.find(g => g.id === gameId);
        if (!game) {
            alert('Game not found!');
            return;
        }
        
        this.utils.playSound('click');
        
        // Hide hub, show game container
        document.getElementById('hubMain').classList.add('hidden');
        const gameContainer = document.getElementById('gameContainer');
        gameContainer.classList.remove('hidden');
        
        // Load game using iframe
        gameContainer.innerHTML = `
            <div style="position: relative; height: 100%;">
                <button id="backToHub" class="back-btn" style="position: absolute; top: 20px; right: 20px; z-index: 1001;">
                    <i class="fas fa-arrow-left"></i> Back to Hub
                </button>
                <iframe src="games/${gameId}/index.html" 
                        style="width: 100%; height: 100%; border: none;"
                        title="${game.title}">
                </iframe>
            </div>
        `;
        
        // Add back button event
        document.getElementById('backToHub').addEventListener('click', () => {
            this.returnToHub();
        });
    }
    
    returnToHub() {
        // Show hub, hide game container
        document.getElementById('hubMain').classList.remove('hidden');
        document.getElementById('gameContainer').classList.add('hidden');
        
        // Clear game container
        document.getElementById('gameContainer').innerHTML = '';
        
        // Refresh games to update high scores
        this.renderGames();
        
        this.utils.playSound('click');
    }
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', () => {
    window.gameHub = new GameHub();
});