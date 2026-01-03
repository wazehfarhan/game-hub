// Game Loader - Dynamic Game Loading System
class GameLoader {
    constructor() {
        this.currentGame = null;
        this.gameInstance = null;
        this.utils = window.GameHubUtils;
    }
    
    async loadGame(gameId) {
        try {
            // Create game container
            const gameContainer = document.createElement('div');
            gameContainer.id = 'game-container';
            gameContainer.className = 'game-container';
            
            // Add to body
            document.body.appendChild(gameContainer);
            
            // Load specific game
            switch(gameId) {
                case 'tic-tac-toe':
                    await this.loadTicTacToe(gameContainer);
                    break;
                case 'snake':
                    await this.loadSnake(gameContainer);
                    break;
                case 'rock-paper-scissors':
                    await this.loadRockPaperScissors(gameContainer);
                    break;
                default:
                    this.showPlaceholder(gameContainer, gameId);
            }
            
        } catch (error) {
            console.error('GameLoader error:', error);
            throw error;
        }
    }
    
    async loadTicTacToe(container) {
        container.innerHTML = `
            <div class="game-wrapper">
                <div class="game-header">
                    <div class="game-title">
                        <h2>Tic Tac Toe</h2>
                        <span class="game-category">Strategy</span>
                    </div>
                    <div class="header-controls">
                        <div class="game-settings">
                            <button class="setting-btn" id="soundBtn" title="Toggle Sound">
                                <i class="fas fa-volume-up"></i>
                            </button>
                            <button class="setting-btn" id="fullscreenBtn" title="Fullscreen">
                                <i class="fas fa-expand"></i>
                            </button>
                        </div>
                        <button class="back-btn" id="backBtn">
                            <i class="fas fa-arrow-left"></i> Back to Hub
                        </button>
                    </div>
                </div>
                
                <div class="game-content">
                    <div class="game-stats">
                        <div class="stat-item">
                            <div class="stat-label">Player X</div>
                            <div class="stat-value" id="scoreX">0</div>
                        </div>
                        <div class="stat-item">
                            <div class="stat-label">Round</div>
                            <div class="stat-value" id="round">1</div>
                        </div>
                        <div class="stat-item">
                            <div class="stat-label">Player O</div>
                            <div class="stat-value" id="scoreO">0</div>
                        </div>
                    </div>
                    
                    <div class="game-area">
                        <div class="tic-tac-toe-board" id="board">
                            ${Array(9).fill().map((_, i) => 
                                `<div class="ttt-cell" data-index="${i}"></div>`
                            ).join('')}
                        </div>
                    </div>
                    
                    <div class="game-controls">
                        <div class="control-group">
                            <label class="control-label">
                                <i class="fas fa-gamepad"></i>
                                Game Mode
                            </label>
                            <div class="mode-selector">
                                <button class="mode-btn active" data-mode="pvp">
                                    <i class="fas fa-user-friends"></i> Player vs Player
                                </button>
                                <button class="mode-btn" data-mode="pvc">
                                    <i class="fas fa-robot"></i> Player vs AI
                                </button>
                            </div>
                        </div>
                        
                        <div class="control-group">
                            <label class="control-label">
                                <i class="fas fa-cog"></i>
                                AI Difficulty
                            </label>
                            <select class="control-select" id="aiDifficulty">
                                <option value="easy">Easy</option>
                                <option value="medium" selected>Medium</option>
                                <option value="hard">Hard</option>
                            </select>
                        </div>
                        
                        <div class="control-group">
                            <label class="control-label">
                                <i class="fas fa-trophy"></i>
                                High Score
                            </label>
                            <div class="stat-value" id="highScore">${this.utils.getHighScore('tic-tac-toe')}</div>
                        </div>
                    </div>
                    
                    <div class="game-buttons">
                        <button class="game-btn game-btn-primary" id="resetBtn">
                            <i class="fas fa-redo"></i> Reset Game
                        </button>
                        <button class="game-btn game-btn-secondary" id="newMatchBtn">
                            <i class="fas fa-plus-circle"></i> New Match
                        </button>
                    </div>
                    
                    <div class="instructions">
                        <h3><i class="fas fa-info-circle"></i> How to Play</h3>
                        <ul class="instructions-list">
                            <li>Players take turns placing <strong>X</strong> and <strong>O</strong> on the 3×3 grid</li>
                            <li>The first to get 3 in a row (horizontal, vertical, or diagonal) wins</li>
                            <li>If all squares are filled with no winner, it's a <strong>draw</strong></li>
                            <li>In Player vs AI mode, you play as <strong>X</strong> and computer as <strong>O</strong></li>
                        </ul>
                    </div>
                </div>
            </div>
            
            <style>
                .tic-tac-toe-board {
                    display: grid;
                    grid-template-columns: repeat(3, 100px);
                    grid-template-rows: repeat(3, 100px);
                    gap: 10px;
                    background: var(--text-primary);
                    padding: 15px;
                    border-radius: 15px;
                    box-shadow: var(--shadow);
                }
                
                .ttt-cell {
                    width: 100px;
                    height: 100px;
                    background: var(--bg-card);
                    border: 3px solid var(--border-color);
                    border-radius: 10px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 48px;
                    font-weight: bold;
                    cursor: pointer;
                    transition: all 0.2s ease;
                    font-family: 'Orbitron', sans-serif;
                }
                
                .ttt-cell:hover:not(.occupied) {
                    background: var(--bg-secondary);
                    border-color: var(--primary-color);
                    transform: scale(1.05);
                }
                
                .ttt-cell.x {
                    color: var(--primary-color);
                }
                
                .ttt-cell.o {
                    color: var(--secondary-color);
                }
                
                .ttt-cell.occupied {
                    cursor: not-allowed;
                }
                
                .ttt-cell.win {
                    background: var(--success-color);
                    color: white;
                    border-color: var(--success-color);
                    animation: pulse 0.5s infinite alternate;
                }
                
                @keyframes pulse {
                    from { transform: scale(1); }
                    to { transform: scale(1.05); }
                }
                
                .mode-selector {
                    display: flex;
                    gap: 10px;
                }
                
                .mode-btn {
                    flex: 1;
                    padding: 12px;
                    background: var(--bg-secondary);
                    border: 2px solid var(--border-color);
                    border-radius: var(--border-radius);
                    color: var(--text-primary);
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 8px;
                    transition: all 0.2s ease;
                    font-size: 0.9rem;
                }
                
                .mode-btn.active {
                    background: var(--primary-color);
                    color: white;
                    border-color: var(--primary-color);
                }
                
                @media (max-width: 768px) {
                    .tic-tac-toe-board {
                        grid-template-columns: repeat(3, 80px);
                        grid-template-rows: repeat(3, 80px);
                    }
                    
                    .ttt-cell {
                        width: 80px;
                        height: 80px;
                        font-size: 36px;
                    }
                    
                    .mode-selector {
                        flex-direction: column;
                    }
                }
                
                @media (max-width: 480px) {
                    .tic-tac-toe-board {
                        grid-template-columns: repeat(3, 70px);
                        grid-template-rows: repeat(3, 70px);
                        gap: 8px;
                        padding: 10px;
                    }
                    
                    .ttt-cell {
                        width: 70px;
                        height: 70px;
                        font-size: 32px;
                    }
                }
            </style>
        `;
        
        // Initialize Tic Tac Toe game
        this.gameInstance = new TicTacToeGame();
        this.setupGameEvents();
    }
    
    async loadSnake(container) {
        container.innerHTML = `
            <div class="game-wrapper">
                <div class="game-header">
                    <div class="game-title">
                        <h2>Snake Game</h2>
                        <span class="game-category">Arcade</span>
                    </div>
                    <div class="header-controls">
                        <div class="game-settings">
                            <button class="setting-btn" id="soundBtn" title="Toggle Sound">
                                <i class="fas fa-volume-up"></i>
                            </button>
                            <button class="setting-btn" id="pauseBtn" title="Pause Game">
                                <i class="fas fa-pause"></i>
                            </button>
                        </div>
                        <button class="back-btn" id="backBtn">
                            <i class="fas fa-arrow-left"></i> Back to Hub
                        </button>
                    </div>
                </div>
                
                <div class="game-content">
                    <div class="game-stats">
                        <div class="stat-item">
                            <div class="stat-label">Score</div>
                            <div class="stat-value" id="score">0</div>
                        </div>
                        <div class="stat-item stat-highlight">
                            <div class="stat-label">High Score</div>
                            <div class="stat-value" id="highScore">${this.utils.getHighScore('snake')}</div>
                        </div>
                        <div class="stat-item">
                            <div class="stat-label">Speed</div>
                            <div class="stat-value" id="speed">1</div>
                        </div>
                    </div>
                    
                    <div class="game-area">
                        <canvas id="snakeCanvas" width="600" height="400"></canvas>
                    </div>
                    
                    <div class="game-controls">
                        <div class="control-group">
                            <label class="control-label">
                                <i class="fas fa-tachometer-alt"></i>
                                Game Speed
                            </label>
                            <input type="range" class="control-range" id="speedControl" min="1" max="10" value="5">
                        </div>
                        
                        <div class="control-group">
                            <label class="control-label">
                                <i class="fas fa-palette"></i>
                                Snake Color
                            </label>
                            <select class="control-select" id="snakeColor">
                                <option value="#00b894">Green</option>
                                <option value="#6c5ce7">Purple</option>
                                <option value="#fd79a8">Pink</option>
                                <option value="#00cec9">Teal</option>
                                <option value="#fdcb6e">Yellow</option>
                            </select>
                        </div>
                        
                        <div class="control-group">
                            <label class="control-label">
                                <i class="fas fa-apple-alt"></i>
                                Food Type
                            </label>
                            <select class="control-select" id="foodType">
                                <option value="apple">Apple</option>
                                <option value="berry">Berry</option>
                                <option value="coin">Coin</option>
                            </select>
                        </div>
                    </div>
                    
                    <div class="game-buttons">
                        <button class="game-btn game-btn-primary" id="startBtn">
                            <i class="fas fa-play"></i> Start Game
                        </button>
                        <button class="game-btn game-btn-secondary" id="resetBtn">
                            <i class="fas fa-redo"></i> Restart
                        </button>
                    </div>
                    
                    <div class="mobile-controls">
                        <div class="mobile-btn" id="upBtn"><i class="fas fa-arrow-up"></i></div>
                        <div class="mobile-btn" id="leftBtn"><i class="fas fa-arrow-left"></i></div>
                        <div class="mobile-btn" id="downBtn"><i class="fas fa-arrow-down"></i></div>
                        <div class="mobile-btn" id="rightBtn"><i class="fas fa-arrow-right"></i></div>
                    </div>
                    
                    <div class="instructions">
                        <h3><i class="fas fa-info-circle"></i> How to Play</h3>
                        <ul class="instructions-list">
                            <li>Use <strong>arrow keys</strong> or <strong>WASD</strong> to control the snake</li>
                            <li>Eat the <strong>food</strong> to grow longer and earn points</li>
                            <li>Avoid hitting the <strong>walls</strong> or the <strong>snake's body</strong></li>
                            <li>Each food item increases your score by <strong>10 points</strong></li>
                            <li>The game gets faster as your score increases!</li>
                        </ul>
                    </div>
                </div>
            </div>
        `;
        
        // Initialize Snake game
        this.gameInstance = new SnakeGame();
    }
    
    async loadRockPaperScissors(container) {
        container.innerHTML = `
            <div class="game-wrapper">
                <div class="game-header">
                    <div class="game-title">
                        <h2>Rock Paper Scissors</h2>
                        <span class="game-category">Casual</span>
                    </div>
                    <div class="header-controls">
                        <div class="game-settings">
                            <button class="setting-btn" id="soundBtn" title="Toggle Sound">
                                <i class="fas fa-volume-up"></i>
                            </button>
                        </div>
                        <button class="back-btn" id="backBtn">
                            <i class="fas fa-arrow-left"></i> Back to Hub
                        </button>
                    </div>
                </div>
                
                <div class="game-content">
                    <div class="score-display">
                        <div class="score-item">
                            <div class="score-label">Player</div>
                            <div class="score-value score-player" id="playerScore">0</div>
                        </div>
                        <div class="score-item">
                            <div class="score-label">Round</div>
                            <div class="score-value" id="round">1/5</div>
                        </div>
                        <div class="score-item">
                            <div class="score-label">Computer</div>
                            <div class="score-value score-computer" id="computerScore">0</div>
                        </div>
                    </div>
                    
                    <div class="game-area">
                        <div class="rps-game">
                            <div class="choices">
                                <button class="choice-btn" data-choice="rock">
                                    <i class="fas fa-hand-rock"></i>
                                    <span>Rock</span>
                                </button>
                                <button class="choice-btn" data-choice="paper">
                                    <i class="fas fa-hand-paper"></i>
                                    <span>Paper</span>
                                </button>
                                <button class="choice-btn" data-choice="scissors">
                                    <i class="fas fa-hand-scissors"></i>
                                    <span>Scissors</span>
                                </button>
                            </div>
                            
                            <div class="battle-area">
                                <div class="player-choice" id="playerChoice">
                                    <div class="choice-placeholder">?</div>
                                </div>
                                <div class="vs">VS</div>
                                <div class="computer-choice" id="computerChoice">
                                    <div class="choice-placeholder">?</div>
                                </div>
                            </div>
                            
                            <div class="result" id="result">
                                <h3>Choose your move!</h3>
                            </div>
                        </div>
                    </div>
                    
                    <div class="game-controls">
                        <div class="control-group">
                            <label class="control-label">
                                <i class="fas fa-trophy"></i>
                                High Score
                            </label>
                            <div class="stat-value" id="highScore">${this.utils.getHighScore('rock-paper-scissors')}</div>
                        </div>
                        
                        <div class="control-group">
                            <label class="control-label">
                                <i class="fas fa-robot"></i>
                                AI Difficulty
                            </label>
                            <select class="control-select" id="difficulty">
                                <option value="easy">Easy</option>
                                <option value="medium" selected>Medium</option>
                                <option value="hard">Hard</option>
                            </select>
                        </div>
                        
                        <div class="control-group">
                            <label class="control-label">
                                <i class="fas fa-flag-checkered"></i>
                                Rounds to Win
                            </label>
                            <select class="control-select" id="rounds">
                                <option value="3">3</option>
                                <option value="5" selected>5</option>
                                <option value="7">7</option>
                            </select>
                        </div>
                    </div>
                    
                    <div class="game-buttons">
                        <button class="game-btn game-btn-primary" id="nextRoundBtn" disabled>
                            <i class="fas fa-forward"></i> Next Round
                        </button>
                        <button class="game-btn game-btn-secondary" id="resetGameBtn">
                            <i class="fas fa-redo"></i> New Game
                        </button>
                    </div>
                    
                    <div class="instructions">
                        <h3><i class="fas fa-info-circle"></i> How to Play</h3>
                        <ul class="instructions-list">
                            <li>Choose <strong>Rock</strong>, <strong>Paper</strong>, or <strong>Scissors</strong></li>
                            <li><strong>Rock</strong> beats <strong>Scissors</strong></li>
                            <li><strong>Paper</strong> beats <strong>Rock</strong></li>
                            <li><strong>Scissors</strong> beats <strong>Paper</strong></li>
                            <li>First to win the majority of rounds wins the game!</li>
                        </ul>
                    </div>
                </div>
            </div>
            
            <style>
                .rps-game {
                    text-align: center;
                    width: 100%;
                }
                
                .choices {
                    display: flex;
                    justify-content: center;
                    gap: 20px;
                    margin-bottom: 40px;
                    flex-wrap: wrap;
                }
                
                .choice-btn {
                    width: 120px;
                    height: 120px;
                    background: var(--bg-card);
                    border: 3px solid var(--border-color);
                    border-radius: 50%;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    transition: all 0.2s ease;
                    color: var(--text-primary);
                }
                
                .choice-btn:hover {
                    transform: scale(1.1);
                    border-color: var(--primary-color);
                    box-shadow: var(--glow);
                }
                
                .choice-btn i {
                    font-size: 3rem;
                    margin-bottom: 10px;
                }
                
                .choice-btn.rock { color: #6c5ce7; }
                .choice-btn.paper { color: #00cec9; }
                .choice-btn.scissors { color: #fd79a8; }
                
                .choice-btn.selected {
                    border-color: var(--success-color);
                    background: var(--success-color)20;
                    transform: scale(1.1);
                }
                
                .battle-area {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    gap: 40px;
                    margin-bottom: 30px;
                }
                
                .player-choice,
                .computer-choice {
                    width: 150px;
                    height: 150px;
                    background: var(--bg-card);
                    border: 4px solid var(--border-color);
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                
                .player-choice {
                    border-color: var(--primary-color);
                }
                
                .computer-choice {
                    border-color: var(--secondary-color);
                }
                
                .choice-placeholder {
                    font-size: 4rem;
                    color: var(--text-muted);
                }
                
                .choice-icon {
                    font-size: 5rem;
                }
                
                .vs {
                    font-size: 2rem;
                    font-weight: bold;
                    color: var(--text-muted);
                    font-family: 'Orbitron', sans-serif;
                }
                
                .result {
                    padding: 20px;
                    background: var(--bg-card);
                    border-radius: var(--border-radius);
                    border: 2px solid var(--border-color);
                    margin-top: 20px;
                }
                
                .result h3 {
                    margin: 0;
                    color: var(--text-primary);
                }
                
                .result.win {
                    border-color: var(--success-color);
                    background: var(--success-color)20;
                }
                
                .result.lose {
                    border-color: var(--danger-color);
                    background: var(--danger-color)20;
                }
                
                .result.draw {
                    border-color: var(--warning-color);
                    background: var(--warning-color)20;
                }
                
                @media (max-width: 768px) {
                    .choice-btn {
                        width: 100px;
                        height: 100px;
                    }
                    
                    .choice-btn i {
                        font-size: 2.5rem;
                    }
                    
                    .player-choice,
                    .computer-choice {
                        width: 120px;
                        height: 120px;
                    }
                    
                    .choice-icon {
                        font-size: 4rem;
                    }
                    
                    .battle-area {
                        gap: 20px;
                    }
                }
                
                @media (max-width: 480px) {
                    .choices {
                        gap: 10px;
                    }
                    
                    .choice-btn {
                        width: 80px;
                        height: 80px;
                    }
                    
                    .choice-btn i {
                        font-size: 2rem;
                        margin-bottom: 5px;
                    }
                    
                    .player-choice,
                    .computer-choice {
                        width: 100px;
                        height: 100px;
                    }
                    
                    .choice-icon {
                        font-size: 3rem;
                    }
                    
                    .vs {
                        font-size: 1.5rem;
                    }
                }
            </style>
        `;
        
        // Initialize Rock Paper Scissors game
        this.gameInstance = new RPSGame();
    }
    
    showPlaceholder(container, gameId) {
        const gameName = gameId.split('-').map(word => 
            word.charAt(0).toUpperCase() + word.slice(1)
        ).join(' ');
        
        container.innerHTML = `
            <div class="game-wrapper">
                <div class="game-header">
                    <div class="game-title">
                        <h2>${gameName}</h2>
                        <span class="game-category">Coming Soon</span>
                    </div>
                    <button class="back-btn" id="backBtn">
                        <i class="fas fa-arrow-left"></i> Back to Hub
                    </button>
                </div>
                
                <div class="game-content">
                    <div class="game-area" style="display: flex; align-items: center; justify-content: center;">
                        <div class="placeholder-content">
                            <div class="placeholder-icon">
                                <i class="fas fa-tools"></i>
                            </div>
                            <h3 style="margin: 20px 0 10px; color: var(--text-primary);">Under Development</h3>
                            <p style="color: var(--text-secondary); margin-bottom: 30px;">
                                ${gameName} is currently being developed. Check back soon!
                            </p>
                            
                            <div class="game-buttons">
                                <button class="game-btn game-btn-primary" id="suggestGameBtn">
                                    <i class="fas fa-lightbulb"></i> Suggest Features
                                </button>
                            </div>
                        </div>
                    </div>
                    
                    <div class="instructions">
                        <h3><i class="fas fa-info-circle"></i> About This Game</h3>
                        <p style="color: var(--text-secondary);">
                            We're working hard to bring you ${gameName}. This game will feature:
                        </p>
                        <ul class="instructions-list">
                            <li>Multiple difficulty levels</li>
                            <li>High score tracking</li>
                            <li>Beautiful animations</li>
                            <li>Mobile-friendly controls</li>
                            <li>Sound effects and music</li>
                        </ul>
                    </div>
                </div>
            </div>
        `;
        
        this.setupGameEvents();
    }
    
    setupGameEvents() {
        // Back button
        const backBtn = document.getElementById('backBtn');
        if (backBtn) {
            backBtn.addEventListener('click', () => {
                this.utils.playSound('click');
                const event = new Event('backToHub');
                document.dispatchEvent(event);
            });
        }
        
        // Sound button
        const soundBtn = document.getElementById('soundBtn');
        if (soundBtn) {
            soundBtn.addEventListener('click', () => {
                this.utils.toggleSound();
                const icon = soundBtn.querySelector('i');
                icon.className = this.utils.soundEnabled ? 'fas fa-volume-up' : 'fas fa-volume-mute';
                this.utils.playSound('click');
            });
        }
        
        // Fullscreen button
        const fullscreenBtn = document.getElementById('fullscreenBtn');
        if (fullscreenBtn) {
            fullscreenBtn.addEventListener('click', () => {
                if (!document.fullscreenElement) {
                    document.documentElement.requestFullscreen();
                    fullscreenBtn.innerHTML = '<i class="fas fa-compress"></i>';
                } else {
                    document.exitFullscreen();
                    fullscreenBtn.innerHTML = '<i class="fas fa-expand"></i>';
                }
                this.utils.playSound('click');
            });
        }
    }
    
    cleanup() {
        if (this.gameInstance && typeof this.gameInstance.destroy === 'function') {
            this.gameInstance.destroy();
        }
        this.gameInstance = null;
        this.currentGame = null;
    }
}

// Game Implementations

class TicTacToeGame {
    constructor() {
        this.board = ['', '', '', '', '', '', '', '', ''];
        this.currentPlayer = 'X';
        this.gameActive = true;
        this.gameMode = 'pvp';
        this.aiDifficulty = 'medium';
        this.scores = { X: 0, O: 0 };
        this.round = 1;
        this.highScore = window.GameHubUtils.getHighScore('tic-tac-toe');
        
        this.winningCombos = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6]             // Diagonals
        ];
        
        this.init();
    }
    
    init() {
        this.updateDisplay();
        this.setupEventListeners();
    }
    
    setupEventListeners() {
        // Cell clicks
        document.querySelectorAll('.ttt-cell').forEach(cell => {
            cell.addEventListener('click', () => this.handleCellClick(cell));
        });
        
        // Mode buttons
        document.querySelectorAll('.mode-btn').forEach(btn => {
            btn.addEventListener('click', () => this.changeMode(btn));
        });
        
        // AI difficulty
        const aiSelect = document.getElementById('aiDifficulty');
        if (aiSelect) {
            aiSelect.addEventListener('change', (e) => {
                this.aiDifficulty = e.target.value;
                window.GameHubUtils.playSound('click');
            });
        }
        
        // Reset button
        const resetBtn = document.getElementById('resetBtn');
        if (resetBtn) {
            resetBtn.addEventListener('click', () => this.resetGame());
        }
        
        // New match button
        const newMatchBtn = document.getElementById('newMatchBtn');
        if (newMatchBtn) {
            newMatchBtn.addEventListener('click', () => this.newMatch());
        }
    }
    
    handleCellClick(cell) {
        if (!this.gameActive) return;
        
        const index = parseInt(cell.dataset.index);
        
        if (this.board[index] !== '') return;
        
        this.makeMove(index);
        
        // AI move if needed
        if (this.gameActive && this.gameMode === 'pvc' && this.currentPlayer === 'O') {
            setTimeout(() => this.makeAIMove(), 500);
        }
    }
    
    makeMove(index) {
        this.board[index] = this.currentPlayer;
        const cell = document.querySelector(`.ttt-cell[data-index="${index}"]`);
        cell.textContent = this.currentPlayer;
        cell.classList.add(this.currentPlayer.toLowerCase());
        cell.classList.add('occupied');
        
        window.GameHubUtils.playSound('move');
        
        if (this.checkWin()) {
            this.handleWin();
        } else if (this.checkDraw()) {
            this.handleDraw();
        } else {
            this.switchPlayer();
        }
        
        this.updateDisplay();
    }
    
    makeAIMove() {
        if (!this.gameActive) return;
        
        let move;
        switch(this.aiDifficulty) {
            case 'easy':
                move = this.getRandomMove();
                break;
            case 'medium':
                move = this.getMediumMove();
                break;
            case 'hard':
                move = this.getHardMove();
                break;
            default:
                move = this.getRandomMove();
        }
        
        if (move !== null) {
            this.makeMove(move);
        }
    }
    
    getRandomMove() {
        const available = this.getAvailableMoves();
        return available.length > 0 ? available[Math.floor(Math.random() * available.length)] : null;
    }
    
    getMediumMove() {
        // Try to win
        for (let move of this.getAvailableMoves()) {
            this.board[move] = 'O';
            if (this.checkWinFor('O')) {
                this.board[move] = '';
                return move;
            }
            this.board[move] = '';
        }
        
        // Block player
        for (let move of this.getAvailableMoves()) {
            this.board[move] = 'X';
            if (this.checkWinFor('X')) {
                this.board[move] = '';
                return move;
            }
            this.board[move] = '';
        }
        
        // Center or random
        if (this.board[4] === '') return 4;
        return this.getRandomMove();
    }
    
    getHardMove() {
        // Simple minimax implementation
        let bestScore = -Infinity;
        let bestMove = null;
        
        for (let move of this.getAvailableMoves()) {
            this.board[move] = 'O';
            let score = this.minimax(this.board, 0, false);
            this.board[move] = '';
            
            if (score > bestScore) {
                bestScore = score;
                bestMove = move;
            }
        }
        
        return bestMove;
    }
    
    minimax(board, depth, isMaximizing) {
        // Terminal states
        if (this.checkWinForBoard(board, 'O')) return 10 - depth;
        if (this.checkWinForBoard(board, 'X')) return depth - 10;
        if (this.getAvailableMovesFromBoard(board).length === 0) return 0;
        
        if (isMaximizing) {
            let bestScore = -Infinity;
            for (let move of this.getAvailableMovesFromBoard(board)) {
                board[move] = 'O';
                let score = this.minimax(board, depth + 1, false);
                board[move] = '';
                bestScore = Math.max(score, bestScore);
            }
            return bestScore;
        } else {
            let bestScore = Infinity;
            for (let move of this.getAvailableMovesFromBoard(board)) {
                board[move] = 'X';
                let score = this.minimax(board, depth + 1, true);
                board[move] = '';
                bestScore = Math.min(score, bestScore);
            }
            return bestScore;
        }
    }
    
    getAvailableMoves() {
        return this.board
            .map((val, idx) => val === '' ? idx : null)
            .filter(val => val !== null);
    }
    
    getAvailableMovesFromBoard(board) {
        return board
            .map((val, idx) => val === '' ? idx : null)
            .filter(val => val !== null);
    }
    
    checkWin() {
        return this.checkWinFor(this.currentPlayer);
    }
    
    checkWinFor(player) {
        return this.checkWinForBoard(this.board, player);
    }
    
    checkWinForBoard(board, player) {
        return this.winningCombos.some(combo => 
            combo.every(index => board[index] === player)
        );
    }
    
    checkDraw() {
        return !this.board.includes('');
    }
    
    handleWin() {
        this.gameActive = false;
        this.scores[this.currentPlayer]++;
        this.highlightWinningCells();
        
        window.GameHubUtils.playSound('success');
        
        // Update high score
        const maxScore = Math.max(this.scores.X, this.scores.O);
        if (maxScore > this.highScore) {
            this.highScore = window.GameHubUtils.saveHighScore('tic-tac-toe', maxScore);
        }
        
        // Show win message
        setTimeout(() => {
            window.GameHubUtils.showMessage(
                `${this.currentPlayer} Wins!`,
                `Player ${this.currentPlayer} won round ${this.round}!`,
                [{ text: 'Next Round', action: 'next', class: 'game-btn-success' }]
            ).then(() => this.nextRound());
        }, 500);
    }
    
    handleDraw() {
        this.gameActive = false;
        window.GameHubUtils.playSound('move');
        
        setTimeout(() => {
            window.GameHubUtils.showMessage(
                'Draw!',
                `Round ${this.round} ended in a draw.`,
                [{ text: 'Next Round', action: 'next', class: 'game-btn-secondary' }]
            ).then(() => this.nextRound());
        }, 500);
    }
    
    highlightWinningCells() {
        for (let combo of this.winningCombos) {
            const [a, b, c] = combo;
            if (this.board[a] && this.board[a] === this.board[b] && this.board[a] === this.board[c]) {
                combo.forEach(index => {
                    const cell = document.querySelector(`.ttt-cell[data-index="${index}"]`);
                    cell.classList.add('win');
                });
                break;
            }
        }
    }
    
    switchPlayer() {
        this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
    }
    
    changeMode(button) {
        document.querySelectorAll('.mode-btn').forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        this.gameMode = button.dataset.mode;
        window.GameHubUtils.playSound('click');
        this.resetGame();
    }
    
    resetGame() {
        this.board = ['', '', '', '', '', '', '', '', ''];
        this.gameActive = true;
        this.currentPlayer = 'X';
        
        document.querySelectorAll('.ttt-cell').forEach(cell => {
            cell.textContent = '';
            cell.className = 'ttt-cell';
        });
        
        window.GameHubUtils.playSound('click');
        this.updateDisplay();
    }
    
    newMatch() {
        this.scores = { X: 0, O: 0 };
        this.round = 1;
        this.resetGame();
        window.GameHubUtils.playSound('click');
    }
    
    nextRound() {
        this.round++;
        this.resetGame();
    }
    
    updateDisplay() {
        document.getElementById('scoreX').textContent = this.scores.X;
        document.getElementById('scoreO').textContent = this.scores.O;
        document.getElementById('round').textContent = this.round;
        document.getElementById('highScore').textContent = this.highScore;
    }
    
    destroy() {
        // Cleanup if needed
    }
}

class SnakeGame {
    constructor() {
        this.canvas = document.getElementById('snakeCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.gridSize = 20;
        this.tileCount = this.canvas.width / this.gridSize;
        
        this.snake = [];
        this.food = {};
        this.dx = 0;
        this.dy = 0;
        this.score = 0;
        this.highScore = window.GameHubUtils.getHighScore('snake');
        this.speed = 5;
        this.gameRunning = false;
        this.gameLoop = null;
        
        this.snakeColor = '#00b894';
        this.foodType = 'apple';
        
        this.init();
    }
    
    init() {
        this.resetGame();
        this.setupEventListeners();
        this.draw();
    }
    
    setupEventListeners() {
        // Keyboard controls
        document.addEventListener('keydown', (e) => this.handleKeyDown(e));
        
        // Mobile controls
        document.getElementById('upBtn')?.addEventListener('click', () => this.changeDirection(0, -1));
        document.getElementById('leftBtn')?.addEventListener('click', () => this.changeDirection(-1, 0));
        document.getElementById('downBtn')?.addEventListener('click', () => this.changeDirection(0, 1));
        document.getElementById('rightBtn')?.addEventListener('click', () => this.changeDirection(1, 0));
        
        // Start button
        document.getElementById('startBtn')?.addEventListener('click', () => this.startGame());
        
        // Reset button
        document.getElementById('resetBtn')?.addEventListener('click', () => this.resetGame());
        
        // Speed control
        document.getElementById('speedControl')?.addEventListener('input', (e) => {
            this.speed = parseInt(e.target.value);
            document.getElementById('speed').textContent = this.speed;
            if (this.gameRunning) {
                clearInterval(this.gameLoop);
                this.startGameLoop();
            }
        });
        
        // Color select
        document.getElementById('snakeColor')?.addEventListener('change', (e) => {
            this.snakeColor = e.target.value;
        });
        
        // Food type
        document.getElementById('foodType')?.addEventListener('change', (e) => {
            this.foodType = e.target.value;
        });
    }
    
    handleKeyDown(e) {
        if (!this.gameRunning) return;
        
        // Prevent default behavior for arrow keys
        if ([37, 38, 39, 40].includes(e.keyCode)) {
            e.preventDefault();
        }
        
        // Arrow keys or WASD
        switch(e.key) {
            case 'ArrowUp':
            case 'w':
            case 'W':
                if (this.dy !== 1) this.changeDirection(0, -1);
                break;
            case 'ArrowLeft':
            case 'a':
            case 'A':
                if (this.dx !== 1) this.changeDirection(-1, 0);
                break;
            case 'ArrowDown':
            case 's':
            case 'S':
                if (this.dy !== -1) this.changeDirection(0, 1);
                break;
            case 'ArrowRight':
            case 'd':
            case 'D':
                if (this.dx !== -1) this.changeDirection(1, 0);
                break;
        }
    }
    
    changeDirection(x, y) {
        if (!this.gameRunning) return;
        this.dx = x;
        this.dy = y;
        window.GameHubUtils.playSound('move');
    }
    
    startGame() {
        if (this.gameRunning) return;
        
        this.gameRunning = true;
        this.dx = 1;
        this.dy = 0;
        
        document.getElementById('startBtn').disabled = true;
        document.getElementById('startBtn').innerHTML = '<i class="fas fa-pause"></i> Playing';
        
        window.GameHubUtils.playSound('click');
        this.startGameLoop();
    }
    
    startGameLoop() {
        clearInterval(this.gameLoop);
        const interval = Math.max(50, 200 - (this.speed * 15));
        this.gameLoop = setInterval(() => this.gameUpdate(), interval);
    }
    
    gameUpdate() {
        if (!this.gameRunning) return;
        
        // Move snake
        const head = { x: this.snake[0].x + this.dx, y: this.snake[0].y + this.dy };
        
        // Check wall collision
        if (head.x < 0 || head.x >= this.tileCount || head.y < 0 || head.y >= this.tileCount) {
            this.gameOver();
            return;
        }
        
        // Check self collision
        for (let segment of this.snake) {
            if (head.x === segment.x && head.y === segment.y) {
                this.gameOver();
                return;
            }
        }
        
        // Add new head
        this.snake.unshift(head);
        
        // Check food collision
        if (head.x === this.food.x && head.y === this.food.y) {
            this.score += 10;
            window.GameHubUtils.playSound('success');
            this.generateFood();
            
            // Update high score
            if (this.score > this.highScore) {
                this.highScore = window.GameHubUtils.saveHighScore('snake', this.score);
            }
            
            this.updateDisplay();
        } else {
            // Remove tail if no food eaten
            this.snake.pop();
        }
        
        this.draw();
    }
    
    draw() {
        // Clear canvas
        this.ctx.fillStyle = '#0f0f23';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Draw grid
        this.ctx.strokeStyle = '#1a1a2e';
        this.ctx.lineWidth = 0.5;
        for (let x = 0; x < this.tileCount; x++) {
            for (let y = 0; y < this.tileCount; y++) {
                this.ctx.strokeRect(x * this.gridSize, y * this.gridSize, this.gridSize, this.gridSize);
            }
        }
        
        // Draw snake
        this.snake.forEach((segment, index) => {
            const gradient = this.ctx.createLinearGradient(
                segment.x * this.gridSize,
                segment.y * this.gridSize,
                (segment.x + 1) * this.gridSize,
                (segment.y + 1) * this.gridSize
            );
            
            if (index === 0) {
                // Head - brighter color
                gradient.addColorStop(0, this.lightenColor(this.snakeColor, 30));
                gradient.addColorStop(1, this.snakeColor);
            } else {
                // Body - gradient
                const intensity = 1 - (index / this.snake.length * 0.5);
                gradient.addColorStop(0, this.lightenColor(this.snakeColor, 10));
                gradient.addColorStop(1, this.darkenColor(this.snakeColor, 20 * intensity));
            }
            
            this.ctx.fillStyle = gradient;
            this.ctx.fillRect(segment.x * this.gridSize, segment.y * this.gridSize, this.gridSize, this.gridSize);
            
            // Draw border
            this.ctx.strokeStyle = this.darkenColor(this.snakeColor, 30);
            this.ctx.lineWidth = 1;
            this.ctx.strokeRect(segment.x * this.gridSize, segment.y * this.gridSize, this.gridSize, this.gridSize);
            
            // Draw eyes on head
            if (index === 0) {
                this.ctx.fillStyle = 'white';
                const eyeSize = this.gridSize / 5;
                const eyeOffset = this.gridSize / 3;
                
                // Left eye
                this.ctx.beginPath();
                this.ctx.arc(
                    segment.x * this.gridSize + eyeOffset,
                    segment.y * this.gridSize + eyeOffset,
                    eyeSize, 0, Math.PI * 2
                );
                this.ctx.fill();
                
                // Right eye
                this.ctx.beginPath();
                this.ctx.arc(
                    segment.x * this.gridSize + this.gridSize - eyeOffset,
                    segment.y * this.gridSize + eyeOffset,
                    eyeSize, 0, Math.PI * 2
                );
                this.ctx.fill();
            }
        });
        
        // Draw food
        const foodColors = {
            apple: '#ff6b6b',
            berry: '#6c5ce7',
            coin: '#fdcb6e'
        };
        
        this.ctx.fillStyle = foodColors[this.foodType] || '#ff6b6b';
        
        if (this.foodType === 'apple') {
            // Draw apple
            this.ctx.beginPath();
            this.ctx.arc(
                this.food.x * this.gridSize + this.gridSize / 2,
                this.food.y * this.gridSize + this.gridSize / 2,
                this.gridSize / 2 - 2, 0, Math.PI * 2
            );
            this.ctx.fill();
            
            // Apple stem
            this.ctx.fillStyle = '#8b4513';
            this.ctx.fillRect(
                this.food.x * this.gridSize + this.gridSize / 2 - 1,
                this.food.y * this.gridSize,
                2, this.gridSize / 3
            );
            
        } else if (this.foodType === 'berry') {
            // Draw berry
            this.ctx.beginPath();
            this.ctx.arc(
                this.food.x * this.gridSize + this.gridSize / 2,
                this.food.y * this.gridSize + this.gridSize / 2,
                this.gridSize / 2 - 2, 0, Math.PI * 2
            );
            this.ctx.fill();
            
        } else if (this.foodType === 'coin') {
            // Draw coin
            this.ctx.fillStyle = '#fdcb6e';
            this.ctx.beginPath();
            this.ctx.arc(
                this.food.x * this.gridSize + this.gridSize / 2,
                this.food.y * this.gridSize + this.gridSize / 2,
                this.gridSize / 2 - 2, 0, Math.PI * 2
            );
            this.ctx.fill();
            
            this.ctx.fillStyle = '#e17055';
            this.ctx.beginPath();
            this.ctx.arc(
                this.food.x * this.gridSize + this.gridSize / 2,
                this.food.y * this.gridSize + this.gridSize / 2,
                this.gridSize / 4, 0, Math.PI * 2
            );
            this.ctx.fill();
            
            this.ctx.fillStyle = '#fdcb6e';
            this.ctx.font = 'bold 8px Arial';
            this.ctx.textAlign = 'center';
            this.ctx.textBaseline = 'middle';
            this.ctx.fillText(
                '$',
                this.food.x * this.gridSize + this.gridSize / 2,
                this.food.y * this.gridSize + this.gridSize / 2
            );
        }
    }
    
    generateFood() {
        let foodOnSnake;
        do {
            foodOnSnake = false;
            this.food = {
                x: Math.floor(Math.random() * this.tileCount),
                y: Math.floor(Math.random() * this.tileCount)
            };
            
            for (let segment of this.snake) {
                if (segment.x === this.food.x && segment.y === this.food.y) {
                    foodOnSnake = true;
                    break;
                }
            }
        } while (foodOnSnake);
    }
    
    gameOver() {
        this.gameRunning = false;
        clearInterval(this.gameLoop);
        
        document.getElementById('startBtn').disabled = false;
        document.getElementById('startBtn').innerHTML = '<i class="fas fa-play"></i> Start Game';
        
        window.GameHubUtils.playSound('error');
        
        setTimeout(() => {
            window.GameHubUtils.showMessage(
                'Game Over!',
                `Final Score: ${this.score}`,
                [
                    { text: 'Play Again', action: 'retry', class: 'game-btn-primary' },
                    { text: 'Main Menu', action: 'menu', class: 'game-btn-secondary' }
                ]
            ).then((action) => {
                if (action === 'retry') {
                    this.resetGame();
                    this.startGame();
                }
            });
        }, 500);
    }
    
    resetGame() {
        this.snake = [{ x: 10, y: 10 }];
        this.dx = 0;
        this.dy = 0;
        this.score = 0;
        this.gameRunning = false;
        
        clearInterval(this.gameLoop);
        
        this.generateFood();
        this.updateDisplay();
        this.draw();
        
        document.getElementById('startBtn').disabled = false;
        document.getElementById('startBtn').innerHTML = '<i class="fas fa-play"></i> Start Game';
    }
    
    updateDisplay() {
        document.getElementById('score').textContent = this.score;
        document.getElementById('highScore').textContent = this.highScore;
        document.getElementById('speed').textContent = this.speed;
    }
    
    lightenColor(color, percent) {
        const num = parseInt(color.slice(1), 16);
        const amt = Math.round(2.55 * percent);
        const R = (num >> 16) + amt;
        const G = (num >> 8 & 0x00FF) + amt;
        const B = (num & 0x0000FF) + amt;
        
        return `#${(
            0x1000000 +
            (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 +
            (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 +
            (B < 255 ? B < 1 ? 0 : B : 255)
        ).toString(16).slice(1)}`;
    }
    
    darkenColor(color, percent) {
        const num = parseInt(color.slice(1), 16);
        const amt = Math.round(2.55 * percent);
        const R = (num >> 16) - amt;
        const G = (num >> 8 & 0x00FF) - amt;
        const B = (num & 0x0000FF) - amt;
        
        return `#${(
            0x1000000 +
            (R > 0 ? R : 0) * 0x10000 +
            (G > 0 ? G : 0) * 0x100 +
            (B > 0 ? B : 0)
        ).toString(16).slice(1)}`;
    }
    
    destroy() {
        clearInterval(this.gameLoop);
        document.removeEventListener('keydown', this.handleKeyDown);
    }
}

class RPSGame {
    constructor() {
        this.playerScore = 0;
        this.computerScore = 0;
        this.round = 1;
        this.totalRounds = 5;
        this.difficulty = 'medium';
        this.highScore = window.GameHubUtils.getHighScore('rock-paper-scissors');
        this.gameActive = true;
        
        this.choices = ['rock', 'paper', 'scissors'];
        this.rules = {
            rock: 'scissors',
            paper: 'rock',
            scissors: 'paper'
        };
        
        this.choiceIcons = {
            rock: 'fas fa-hand-rock',
            paper: 'fas fa-hand-paper',
            scissors: 'fas fa-hand-scissors'
        };
        
        this.init();
    }
    
    init() {
        this.updateDisplay();
        this.setupEventListeners();
    }
    
    setupEventListeners() {
        // Choice buttons
        document.querySelectorAll('.choice-btn').forEach(btn => {
            btn.addEventListener('click', () => this.playerChoice(btn.dataset.choice));
        });
        
        // Next round button
        document.getElementById('nextRoundBtn')?.addEventListener('click', () => this.nextRound());
        
        // Reset game button
        document.getElementById('resetGameBtn')?.addEventListener('click', () => this.resetGame());
        
        // Difficulty select
        document.getElementById('difficulty')?.addEventListener('change', (e) => {
            this.difficulty = e.target.value;
            window.GameHubUtils.playSound('click');
        });
        
        // Rounds select
        document.getElementById('rounds')?.addEventListener('change', (e) => {
            this.totalRounds = parseInt(e.target.value);
            this.resetGame();
            window.GameHubUtils.playSound('click');
        });
    }
    
    playerChoice(choice) {
        if (!this.gameActive) return;
        
        // Update UI
        document.querySelectorAll('.choice-btn').forEach(btn => btn.classList.remove('selected'));
        event.target.closest('.choice-btn').classList.add('selected');
        
        // Disable choice buttons
        document.querySelectorAll('.choice-btn').forEach(btn => {
            btn.disabled = true;
            btn.style.opacity = '0.6';
            btn.style.cursor = 'not-allowed';
        });
        
        // Show player choice
        const playerChoiceEl = document.getElementById('playerChoice');
        playerChoiceEl.innerHTML = `<i class="${this.choiceIcons[choice]} choice-icon" style="color: ${this.getChoiceColor(choice)}"></i>`;
        
        window.GameHubUtils.playSound('move');
        
        // Computer choice after delay
        setTimeout(() => {
            const computerChoice = this.getComputerChoice();
            const computerChoiceEl = document.getElementById('computerChoice');
            computerChoiceEl.innerHTML = `<i class="${this.choiceIcons[computerChoice]} choice-icon" style="color: ${this.getChoiceColor(computerChoice)}"></i>`;
            
            // Determine winner
            setTimeout(() => this.determineWinner(choice, computerChoice), 500);
        }, 1000);
    }
    
    getComputerChoice() {
        if (this.difficulty === 'easy') {
            // Easy: random choice
            return this.choices[Math.floor(Math.random() * 3)];
        } else if (this.difficulty === 'medium') {
            // Medium: sometimes counter player's likely choice
            if (Math.random() < 0.3) {
                // Predict player might choose what beats last computer choice
                const lastPlayerChoice = this.lastPlayerChoice || 'rock';
                const options = this.choices.filter(c => c !== this.rules[lastPlayerChoice]);
                return options[Math.floor(Math.random() * options.length)];
            }
            return this.choices[Math.floor(Math.random() * 3)];
        } else {
            // Hard: tries to counter patterns
            if (Math.random() < 0.5) {
                // Choose what beats the most common player choice
                return this.rules[this.getMostCommonPlayerChoice()];
            }
            return this.choices[Math.floor(Math.random() * 3)];
        }
    }
    
    getMostCommonPlayerChoice() {
        // In a real game, you'd track player history
        // For now, return random
        return this.choices[Math.floor(Math.random() * 3)];
    }
    
    determineWinner(player, computer) {
        let result;
        
        if (player === computer) {
            result = 'draw';
        } else if (this.rules[player] === computer) {
            result = 'win';
            this.playerScore++;
        } else {
            result = 'lose';
            this.computerScore++;
        }
        
        // Update result display
        const resultEl = document.getElementById('result');
        resultEl.className = 'result ' + result;
        
        let message = '';
        switch(result) {
            case 'win':
                message = `${this.capitalize(player)} beats ${computer}! You win!`;
                window.GameHubUtils.playSound('success');
                break;
            case 'lose':
                message = `${this.capitalize(computer)} beats ${player}! Computer wins!`;
                window.GameHubUtils.playSound('error');
                break;
            case 'draw':
                message = 'Both chose ' + player + '. It\'s a draw!';
                window.GameHubUtils.playSound('move');
                break;
        }
        
        resultEl.innerHTML = `<h3>${message}</h3>`;
        
        this.updateDisplay();
        
        // Enable next round button
        document.getElementById('nextRoundBtn').disabled = false;
        
        // Check if game is over
        setTimeout(() => this.checkGameOver(), 1000);
    }
    
    checkGameOver() {
        const roundsPlayed = this.round;
        const roundsLeft = this.totalRounds - roundsPlayed;
        
        if (roundsPlayed >= this.totalRounds) {
            this.gameActive = false;
            
            let finalMessage = '';
            if (this.playerScore > this.computerScore) {
                finalMessage = `You win the game ${this.playerScore}-${this.computerScore}!`;
                // Update high score
                if (this.playerScore > this.highScore) {
                    this.highScore = window.GameHubUtils.saveHighScore('rock-paper-scissors', this.playerScore);
                }
            } else if (this.computerScore > this.playerScore) {
                finalMessage = `Computer wins ${this.computerScore}-${this.playerScore}. Better luck next time!`;
            } else {
                finalMessage = `Game ended in a tie ${this.playerScore}-${this.computerScore}!`;
            }
            
            window.GameHubUtils.showMessage(
                'Game Over!',
                finalMessage,
                [
                    { text: 'Play Again', action: 'playAgain', class: 'game-btn-primary' },
                    { text: 'Main Menu', action: 'menu', class: 'game-btn-secondary' }
                ]
            ).then((action) => {
                if (action === 'playAgain') {
                    this.resetGame();
                }
            });
        }
    }
    
    nextRound() {
        if (this.round >= this.totalRounds) return;
        
        this.round++;
        
        // Reset UI
        document.querySelectorAll('.choice-btn').forEach(btn => {
            btn.classList.remove('selected');
            btn.disabled = false;
            btn.style.opacity = '1';
            btn.style.cursor = 'pointer';
        });
        
        document.getElementById('playerChoice').innerHTML = '<div class="choice-placeholder">?</div>';
        document.getElementById('computerChoice').innerHTML = '<div class="choice-placeholder">?</div>';
        
        const resultEl = document.getElementById('result');
        resultEl.className = 'result';
        resultEl.innerHTML = '<h3>Choose your move!</h3>';
        
        document.getElementById('nextRoundBtn').disabled = true;
        
        this.updateDisplay();
        window.GameHubUtils.playSound('click');
    }
    
    resetGame() {
        this.playerScore = 0;
        this.computerScore = 0;
        this.round = 1;
        this.gameActive = true;
        
        // Reset UI
        document.querySelectorAll('.choice-btn').forEach(btn => {
            btn.classList.remove('selected');
            btn.disabled = false;
            btn.style.opacity = '1';
            btn.style.cursor = 'pointer';
        });
        
        document.getElementById('playerChoice').innerHTML = '<div class="choice-placeholder">?</div>';
        document.getElementById('computerChoice').innerHTML = '<div class="choice-placeholder">?</div>';
        
        const resultEl = document.getElementById('result');
        resultEl.className = 'result';
        resultEl.innerHTML = '<h3>Choose your move!</h3>';
        
        document.getElementById('nextRoundBtn').disabled = true;
        
        this.updateDisplay();
        window.GameHubUtils.playSound('click');
    }
    
    updateDisplay() {
        document.getElementById('playerScore').textContent = this.playerScore;
        document.getElementById('computerScore').textContent = this.computerScore;
        document.getElementById('round').textContent = `${this.round}/${this.totalRounds}`;
        document.getElementById('highScore').textContent = this.highScore;
    }
    
    getChoiceColor(choice) {
        const colors = {
            rock: '#6c5ce7',
            paper: '#00cec9',
            scissors: '#fd79a8'
        };
        return colors[choice] || '#6c5ce7';
    }
    
    capitalize(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
    
    destroy() {
        // Cleanup if needed
    }
}

// Export GameLoader
window.GameLoader = GameLoader;