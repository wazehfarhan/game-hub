// Game Loader - Handles dynamic loading of games
class GameLoader {
    constructor() {
        this.currentGame = null;
        this.gameContainer = null;
    }
    
    async loadGame(gameId) {
        try {
            // Create or get game container
            this.gameContainer = document.getElementById('game-container');
            if (!this.gameContainer) {
                this.gameContainer = document.createElement('div');
                this.gameContainer.id = 'game-container';
                document.body.appendChild(this.gameContainer);
            }
            
            // Clear previous game
            this.cleanup();
            
            // Load game based on ID
            switch (gameId) {
                case 'tic-tac-toe':
                    await this.loadTicTacToe();
                    break;
                case 'snake':
                    await this.loadSnake();
                    break;
                case 'rock-paper-scissors':
                    await this.loadRockPaperScissors();
                    break;
                case 'memory-match':
                    await this.loadMemoryMatch();
                    break;
                case 'number-guessing':
                    await this.loadNumberGuessing();
                    break;
                case 'whack-a-mole':
                    await this.loadWhackAMole();
                    break;
                case 'pong':
                    await this.loadPong();
                    break;
                case 'flappy-bird':
                    await this.loadFlappyBird();
                    break;
                case 'hangman':
                    await this.loadHangman();
                    break;
                case 'breakout':
                    await this.loadBreakout();
                    break;
                case 'dice-roll':
                    await this.loadDiceRoll();
                    break;
                case 'quiz-game':
                    await this.loadQuizGame();
                    break;
                case 'simon-says':
                    await this.loadSimonSays();
                    break;
                case 'click-speed-test':
                    await this.loadClickSpeedTest();
                    break;
                case '2048':
                    await this.load2048();
                    break;
                default:
                    // For unimplemented games, show a placeholder
                    this.showPlaceholder(gameId);
            }
            
        } catch (error) {
            console.error('Error in loadGame:', error);
            this.showError(gameId, error.message);
        }
    }
    
    // Tic Tac Toe Implementation
    async loadTicTacToe() {
        // In a real implementation, you would load external files here
        // For this example, we'll create the game inline
        
        const gameHTML = `
            <div class="game-wrapper" data-game="tic-tac-toe">
                <div class="game-header">
                    <h2>Tic Tac Toe</h2>
                    <button class="back-btn">
                        <i class="fas fa-arrow-left"></i> Back to Hub
                    </button>
                </div>
                
                <div class="game-content">
                    <div class="game-info">
                        <div class="score-board">
                            <div class="player">
                                <span class="player-icon">X</span>
                                <span class="player-score" id="scoreX">0</span>
                            </div>
                            <div class="vs">VS</div>
                            <div class="player">
                                <span class="player-icon">O</span>
                                <span class="player-score" id="scoreO">0</span>
                            </div>
                        </div>
                        
                        <div class="game-controls">
                            <div class="status" id="gameStatus">Player X's Turn</div>
                            <div class="control-buttons">
                                <button id="resetBtn" class="control-btn">
                                    <i class="fas fa-redo"></i> Reset Game
                                </button>
                                <button id="newGameBtn" class="control-btn">
                                    <i class="fas fa-plus-circle"></i> New Match
                                </button>
                            </div>
                        </div>
                    </div>
                    
                    <div class="game-board">
                        <div class="board" id="ticTacToeBoard">
                            ${Array(9).fill().map((_, i) => 
                                `<div class="cell" data-index="${i}"></div>`
                            ).join('')}
                        </div>
                    </div>
                    
                    <div class="game-options">
                        <div class="option-group">
                            <label>Game Mode:</label>
                            <div class="mode-selector">
                                <button class="mode-btn active" data-mode="pvp">Player vs Player</button>
                                <button class="mode-btn" data-mode="pvc">Player vs AI</button>
                            </div>
                        </div>
                        <div class="option-group">
                            <label>Difficulty:</label>
                            <select id="aiDifficulty" class="difficulty-select">
                                <option value="easy">Easy</option>
                                <option value="medium">Medium</option>
                                <option value="hard">Hard</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        // Add styles
        const styles = `
            <style>
                .game-wrapper {
                    max-width: 800px;
                    margin: 0 auto;
                    padding: 20px;
                }
                
                .game-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 30px;
                }
                
                .back-btn {
                    background: var(--primary-color);
                    color: white;
                    border: none;
                    padding: 10px 20px;
                    border-radius: var(--border-radius);
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    transition: all var(--transition-fast);
                }
                
                .back-btn:hover {
                    background: var(--primary-dark);
                    transform: translateX(-2px);
                }
                
                .game-content {
                    display: flex;
                    flex-direction: column;
                    gap: 30px;
                }
                
                .game-info {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    background: var(--bg-card);
                    padding: 20px;
                    border-radius: var(--border-radius);
                    border: 1px solid var(--border-color);
                }
                
                .score-board {
                    display: flex;
                    align-items: center;
                    gap: 30px;
                }
                
                .player {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 10px;
                }
                
                .player-icon {
                    width: 50px;
                    height: 50px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 24px;
                    font-weight: bold;
                    background: var(--bg-secondary);
                    border-radius: 10px;
                }
                
                .player-score {
                    font-size: 24px;
                    font-weight: bold;
                }
                
                .vs {
                    color: var(--text-muted);
                    font-size: 14px;
                }
                
                .game-controls {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 15px;
                }
                
                .status {
                    font-size: 18px;
                    font-weight: bold;
                    color: var(--text-primary);
                    padding: 10px 20px;
                    background: var(--bg-secondary);
                    border-radius: var(--border-radius);
                }
                
                .control-buttons {
                    display: flex;
                    gap: 10px;
                }
                
                .control-btn {
                    background: var(--bg-secondary);
                    color: var(--text-primary);
                    border: 1px solid var(--border-color);
                    padding: 8px 16px;
                    border-radius: var(--border-radius);
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    gap: 5px;
                    transition: all var(--transition-fast);
                }
                
                .control-btn:hover {
                    background: var(--primary-color);
                    color: white;
                    border-color: var(--primary-color);
                }
                
                .game-board {
                    display: flex;
                    justify-content: center;
                    padding: 20px;
                }
                
                .board {
                    display: grid;
                    grid-template-columns: repeat(3, 100px);
                    grid-template-rows: repeat(3, 100px);
                    gap: 10px;
                    background: var(--text-primary);
                    padding: 10px;
                    border-radius: 10px;
                }
                
                .cell {
                    width: 100px;
                    height: 100px;
                    background: var(--bg-card);
                    border: 2px solid var(--border-color);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 48px;
                    font-weight: bold;
                    cursor: pointer;
                    transition: all var(--transition-fast);
                    border-radius: 8px;
                }
                
                .cell:hover {
                    background: var(--bg-secondary);
                    border-color: var(--primary-color);
                    transform: scale(1.05);
                }
                
                .cell.x {
                    color: var(--primary-color);
                }
                
                .cell.o {
                    color: var(--secondary-color);
                }
                
                .cell.winning {
                    background: var(--success-color);
                    color: white;
                }
                
                .game-options {
                    display: flex;
                    justify-content: center;
                    gap: 40px;
                    background: var(--bg-card);
                    padding: 20px;
                    border-radius: var(--border-radius);
                    border: 1px solid var(--border-color);
                }
                
                .option-group {
                    display: flex;
                    flex-direction: column;
                    gap: 10px;
                }
                
                .mode-selector {
                    display: flex;
                    gap: 10px;
                }
                
                .mode-btn {
                    padding: 8px 16px;
                    background: var(--bg-secondary);
                    border: 1px solid var(--border-color);
                    color: var(--text-primary);
                    border-radius: var(--border-radius);
                    cursor: pointer;
                    transition: all var(--transition-fast);
                }
                
                .mode-btn.active {
                    background: var(--primary-color);
                    color: white;
                    border-color: var(--primary-color);
                }
                
                .difficulty-select {
                    padding: 8px 16px;
                    background: var(--bg-secondary);
                    border: 1px solid var(--border-color);
                    color: var(--text-primary);
                    border-radius: var(--border-radius);
                    cursor: pointer;
                }
                
                @media (max-width: 768px) {
                    .game-info {
                        flex-direction: column;
                        gap: 20px;
                    }
                    
                    .board {
                        grid-template-columns: repeat(3, 80px);
                        grid-template-rows: repeat(3, 80px);
                    }
                    
                    .cell {
                        width: 80px;
                        height: 80px;
                        font-size: 36px;
                    }
                    
                    .game-options {
                        flex-direction: column;
                        gap: 20px;
                    }
                }
            </style>
        `;
        
        // Add to container
        this.gameContainer.innerHTML = styles + gameHTML;
        
        // Initialize game logic
        this.initializeTicTacToe();
    }
    
    initializeTicTacToe() {
        const board = document.getElementById('ticTacToeBoard');
        const cells = board.querySelectorAll('.cell');
        const status = document.getElementById('gameStatus');
        const resetBtn = document.getElementById('resetBtn');
        const newGameBtn = document.getElementById('newGameBtn');
        const modeButtons = document.querySelectorAll('.mode-btn');
        const backBtn = document.querySelector('.back-btn');
        const scoreX = document.getElementById('scoreX');
        const scoreO = document.getElementById('scoreO');
        
        let currentPlayer = 'X';
        let gameBoard = ['', '', '', '', '', '', '', '', ''];
        let gameActive = true;
        let gameMode = 'pvp'; // pvp or pvc
        let scores = { X: 0, O: 0 };
        
        const winningConditions = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6]             // Diagonals
        ];
        
        // Handle cell click
        cells.forEach(cell => {
            cell.addEventListener('click', () => handleCellClick(cell));
        });
        
        function handleCellClick(cell) {
            const index = parseInt(cell.dataset.index);
            
            // Check if cell is empty and game is active
            if (gameBoard[index] !== '' || !gameActive) {
                return;
            }
            
            // Make move
            makeMove(index);
            
            // If playing against AI and it's AI's turn
            if (gameMode === 'pvc' && gameActive && currentPlayer === 'O') {
                setTimeout(makeAIMove, 500);
            }
        }
        
        function makeMove(index) {
            gameBoard[index] = currentPlayer;
            cells[index].textContent = currentPlayer;
            cells[index].classList.add(currentPlayer.toLowerCase());
            
            // Check for win or draw
            if (checkWin()) {
                gameActive = false;
                scores[currentPlayer]++;
                updateScores();
                highlightWinningCells();
                status.textContent = `Player ${currentPlayer} Wins!`;
                playSound('win');
            } else if (checkDraw()) {
                gameActive = false;
                status.textContent = "Game Draw!";
                playSound('draw');
            } else {
                // Switch player
                currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
                status.textContent = `Player ${currentPlayer}'s Turn`;
                playSound('move');
            }
        }
        
        function makeAIMove() {
            if (!gameActive) return;
            
            // Simple AI logic
            let availableMoves = gameBoard
                .map((val, idx) => val === '' ? idx : null)
                .filter(val => val !== null);
            
            if (availableMoves.length === 0) return;
            
            // Try to win
            for (let move of availableMoves) {
                gameBoard[move] = 'O';
                if (checkWin()) {
                    gameBoard[move] = '';
                    makeMove(move);
                    return;
                }
                gameBoard[move] = '';
            }
            
            // Block player win
            for (let move of availableMoves) {
                gameBoard[move] = 'X';
                if (checkWin()) {
                    gameBoard[move] = '';
                    makeMove(move);
                    return;
                }
                gameBoard[move] = '';
            }
            
            // Take center if available
            if (availableMoves.includes(4)) {
                makeMove(4);
                return;
            }
            
            // Take corners
            const corners = [0, 2, 6, 8];
            const availableCorners = corners.filter(corner => availableMoves.includes(corner));
            if (availableCorners.length > 0) {
                const randomCorner = availableCorners[Math.floor(Math.random() * availableCorners.length)];
                makeMove(randomCorner);
                return;
            }
            
            // Random move
            const randomMove = availableMoves[Math.floor(Math.random() * availableMoves.length)];
            makeMove(randomMove);
        }
        
        function checkWin() {
            for (let condition of winningConditions) {
                const [a, b, c] = condition;
                if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
                    return true;
                }
            }
            return false;
        }
        
        function checkDraw() {
            return !gameBoard.includes('');
        }
        
        function highlightWinningCells() {
            for (let condition of winningConditions) {
                const [a, b, c] = condition;
                if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
                    cells[a].classList.add('winning');
                    cells[b].classList.add('winning');
                    cells[c].classList.add('winning');
                    break;
                }
            }
        }
        
        function updateScores() {
            scoreX.textContent = scores.X;
            scoreO.textContent = scores.O;
        }
        
        function resetBoard() {
            gameBoard = ['', '', '', '', '', '', '', '', ''];
            gameActive = true;
            currentPlayer = 'X';
            status.textContent = `Player ${currentPlayer}'s Turn`;
            
            cells.forEach(cell => {
                cell.textContent = '';
                cell.classList.remove('x', 'o', 'winning');
            });
            
            playSound('reset');
        }
        
        function newMatch() {
            scores = { X: 0, O: 0 };
            updateScores();
            resetBoard();
        }
        
        function playSound(type) {
            // In a full implementation, you would play audio files
            // For now, we'll just log the sound event
            const isSoundOn = localStorage.getItem('gameHubSound') !== 'false';
            if (isSoundOn) {
                console.log(`Playing sound: ${type}`);
                // You could add Web Audio API here
            }
        }
        
        // Event Listeners
        resetBtn.addEventListener('click', resetBoard);
        newGameBtn.addEventListener('click', newMatch);
        
        modeButtons.forEach(button => {
            button.addEventListener('click', () => {
                modeButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                gameMode = button.dataset.mode;
                resetBoard();
            });
        });
        
        backBtn.addEventListener('click', () => {
            const event = new Event('backToHub');
            document.dispatchEvent(event);
        });
        
        // Initialize game
        resetBoard();
    }
    
    // Placeholder for other games
    showPlaceholder(gameId) {
        const gameName = gameId.split('-').map(word => 
            word.charAt(0).toUpperCase() + word.slice(1)
        ).join(' ');
        
        this.gameContainer.innerHTML = `
            <div class="game-wrapper">
                <div class="game-header">
                    <h2>${gameName}</h2>
                    <button class="back-btn" id="backBtn">
                        <i class="fas fa-arrow-left"></i> Back to Hub
                    </button>
                </div>
                
                <div class="placeholder-content">
                    <div class="placeholder-icon">
                        <i class="fas fa-gamepad"></i>
                    </div>
                    <h3>Coming Soon!</h3>
                    <p>${gameName} is currently under development.</p>
                    <p>Check back soon for updates!</p>
                    
                    <div class="placeholder-features">
                        <div class="feature">
                            <i class="fas fa-code"></i>
                            <span>In Development</span>
                        </div>
                        <div class="feature">
                            <i class="fas fa-rocket"></i>
                            <span>Launching Soon</span>
                        </div>
                    </div>
                </div>
            </div>
            
            <style>
                .placeholder-content {
                    text-align: center;
                    padding: 60px 20px;
                    background: var(--bg-card);
                    border-radius: var(--border-radius);
                    border: 2px dashed var(--border-color);
                }
                
                .placeholder-icon {
                    font-size: 80px;
                    color: var(--primary-color);
                    margin-bottom: 30px;
                    opacity: 0.5;
                }
                
                .placeholder-content h3 {
                    font-size: 32px;
                    margin-bottom: 15px;
                    color: var(--text-primary);
                }
                
                .placeholder-content p {
                    font-size: 18px;
                    color: var(--text-secondary);
                    margin-bottom: 10px;
                }
                
                .placeholder-features {
                    display: flex;
                    justify-content: center;
                    gap: 40px;
                    margin-top: 40px;
                }
                
                .feature {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 10px;
                }
                
                .feature i {
                    font-size: 24px;
                    color: var(--secondary-color);
                }
            </style>
        `;
        
        document.getElementById('backBtn').addEventListener('click', () => {
            const event = new Event('backToHub');
            document.dispatchEvent(event);
        });
    }
    
    showError(gameId, error) {
        this.gameContainer.innerHTML = `
            <div class="game-wrapper">
                <div class="game-header">
                    <h2>Error Loading Game</h2>
                    <button class="back-btn" id="backBtn">
                        <i class="fas fa-arrow-left"></i> Back to Hub
                    </button>
                </div>
                
                <div class="error-content">
                    <div class="error-icon">
                        <i class="fas fa-exclamation-triangle"></i>
                    </div>
                    <h3>Failed to load ${gameId}</h3>
                    <p>${error}</p>
                    <p>Please try again later or contact support.</p>
                </div>
            </div>
            
            <style>
                .error-content {
                    text-align: center;
                    padding: 60px 20px;
                    background: var(--bg-card);
                    border-radius: var(--border-radius);
                    border: 2px solid var(--danger-color);
                }
                
                .error-icon {
                    font-size: 80px;
                    color: var(--danger-color);
                    margin-bottom: 30px;
                }
            </style>
        `;
        
        document.getElementById('backBtn').addEventListener('click', () => {
            const event = new Event('backToHub');
            document.dispatchEvent(event);
        });
    }
    
    cleanup() {
        // Clean up any game-specific resources
        if (this.currentGame) {
            // Stop any game loops, remove event listeners, etc.
            console.log(`Cleaning up ${this.currentGame}`);
        }
        this.currentGame = null;
    }
    
    // Stub methods for other games
    async loadSnake() { this.showPlaceholder('snake'); }
    async loadRockPaperScissors() { this.showPlaceholder('rock-paper-scissors'); }
    async loadMemoryMatch() { this.showPlaceholder('memory-match'); }
    async loadNumberGuessing() { this.showPlaceholder('number-guessing'); }
    async loadWhackAMole() { this.showPlaceholder('whack-a-mole'); }
    async loadPong() { this.showPlaceholder('pong'); }
    async loadFlappyBird() { this.showPlaceholder('flappy-bird'); }
    async loadHangman() { this.showPlaceholder('hangman'); }
    async loadBreakout() { this.showPlaceholder('breakout'); }
    async loadDiceRoll() { this.showPlaceholder('dice-roll'); }
    async loadQuizGame() { this.showPlaceholder('quiz-game'); }
    async loadSimonSays() { this.showPlaceholder('simon-says'); }
    async loadClickSpeedTest() { this.showPlaceholder('click-speed-test'); }
    async load2048() { this.showPlaceholder('2048'); }
}

// Export for use in main.js
window.GameLoader = GameLoader;