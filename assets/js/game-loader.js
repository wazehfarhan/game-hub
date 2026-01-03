// Game Loader - Loads and manages games
class GameLoader {
    constructor() {
        this.currentGame = null;
        this.gameInstance = null;
    }
    
    loadGame(gameId, container) {
        switch(gameId) {
            case 'tic-tac-toe':
                this.loadTicTacToe(container);
                break;
            case 'snake':
                this.loadSnake(container);
                break;
            case 'rock-paper-scissors':
                this.loadRPS(container);
                break;
            default:
                this.showPlaceholder(container, gameId);
        }
    }
    
    loadTicTacToe(container) {
        container.innerHTML = `
            <div class="game-wrapper">
                <div class="game-header">
                    <div class="game-title">
                        <h2>Tic Tac Toe</h2>
                    </div>
                    <button class="back-btn" id="backBtn">
                        <i class="fas fa-arrow-left"></i> Back to Hub
                    </button>
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
                    
                    <div style="display: flex; justify-content: center; padding: 20px;">
                        <div class="tic-tac-toe-board" id="board" style="
                            display: grid;
                            grid-template-columns: repeat(3, 100px);
                            grid-template-rows: repeat(3, 100px);
                            gap: 10px;
                            background: var(--text-primary);
                            padding: 10px;
                            border-radius: 10px;
                        ">
                            ${Array(9).fill().map((_, i) => 
                                `<div class="cell" data-index="${i}" style="
                                    width: 100px;
                                    height: 100px;
                                    background: var(--bg-card);
                                    border: 2px solid var(--border-color);
                                    border-radius: 8px;
                                    display: flex;
                                    align-items: center;
                                    justify-content: center;
                                    font-size: 48px;
                                    font-weight: bold;
                                    cursor: pointer;
                                    transition: all 0.2s ease;
                                "></div>`
                            ).join('')}
                        </div>
                    </div>
                    
                    <div style="text-align: center; margin: 20px 0;">
                        <div id="status" style="
                            font-size: 1.2rem;
                            font-weight: bold;
                            color: var(--text-primary);
                            margin-bottom: 20px;
                        ">Player X's Turn</div>
                        
                        <div style="display: flex; gap: 10px; justify-content: center; margin-bottom: 20px;">
                            <button class="mode-btn active" data-mode="pvp" style="
                                padding: 10px 20px;
                                background: var(--primary-color);
                                border: none;
                                border-radius: var(--border-radius);
                                color: white;
                                cursor: pointer;
                            ">Player vs Player</button>
                            <button class="mode-btn" data-mode="pvc" style="
                                padding: 10px 20px;
                                background: var(--bg-secondary);
                                border: 2px solid var(--border-color);
                                border-radius: var(--border-radius);
                                color: var(--text-primary);
                                cursor: pointer;
                            ">Player vs AI</button>
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
                    
                    <div style="
                        background: var(--bg-secondary);
                        padding: 20px;
                        border-radius: var(--border-radius);
                        margin-top: 20px;
                    ">
                        <h3 style="margin-bottom: 10px; color: var(--text-primary);">
                            <i class="fas fa-info-circle"></i> How to Play
                        </h3>
                        <ul style="color: var(--text-secondary); padding-left: 20px;">
                            <li>Players take turns placing X and O on the 3×3 grid</li>
                            <li>First to get 3 in a row (horizontal, vertical, or diagonal) wins</li>
                            <li>If all squares are filled, it's a draw</li>
                        </ul>
                    </div>
                </div>
            </div>
        `;
        
        // Initialize Tic Tac Toe
        this.gameInstance = new TicTacToeGame();
        this.setupGameEvents();
    }
    
    loadSnake(container) {
        container.innerHTML = `
            <div class="game-wrapper">
                <div class="game-header">
                    <div class="game-title">
                        <h2>Snake Game</h2>
                    </div>
                    <button class="back-btn" id="backBtn">
                        <i class="fas fa-arrow-left"></i> Back to Hub
                    </button>
                </div>
                
                <div class="game-content">
                    <div class="game-stats">
                        <div class="stat-item">
                            <div class="stat-label">Score</div>
                            <div class="stat-value" id="score">0</div>
                        </div>
                        <div class="stat-item">
                            <div class="stat-label">High Score</div>
                            <div class="stat-value" id="highScore">0</div>
                        </div>
                        <div class="stat-item">
                            <div class="stat-label">Length</div>
                            <div class="stat-value" id="length">1</div>
                        </div>
                    </div>
                    
                    <div style="display: flex; justify-content: center; padding: 20px;">
                        <canvas id="snakeCanvas" width="400" height="400" style="
                            background: var(--bg-primary);
                            border: 2px solid var(--border-color);
                            border-radius: 10px;
                        "></canvas>
                    </div>
                    
                    <div style="text-align: center; margin: 20px 0;">
                        <div id="gameStatus" style="
                            font-size: 1.2rem;
                            font-weight: bold;
                            color: var(--text-primary);
                            margin-bottom: 20px;
                        ">Press Space to Start</div>
                        
                        <div style="color: var(--text-secondary); margin-bottom: 20px;">
                            Use Arrow Keys or WASD to control
                        </div>
                    </div>
                    
                    <div class="game-buttons">
                        <button class="game-btn game-btn-primary" id="startBtn">
                            <i class="fas fa-play"></i> Start Game
                        </button>
                        <button class="game-btn game-btn-secondary" id="restartBtn">
                            <i class="fas fa-redo"></i> Restart
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        // Initialize Snake
        this.gameInstance = new SnakeGame();
    }
    
    loadRPS(container) {
        container.innerHTML = `
            <div class="game-wrapper">
                <div class="game-header">
                    <div class="game-title">
                        <h2>Rock Paper Scissors</h2>
                    </div>
                    <button class="back-btn" id="backBtn">
                        <i class="fas fa-arrow-left"></i> Back to Hub
                    </button>
                </div>
                
                <div class="game-content">
                    <div class="game-stats">
                        <div class="stat-item">
                            <div class="stat-label">Player</div>
                            <div class="stat-value" id="playerScore">0</div>
                        </div>
                        <div class="stat-item">
                            <div class="stat-label">Round</div>
                            <div class="stat-value" id="round">1/5</div>
                        </div>
                        <div class="stat-item">
                            <div class="stat-label">Computer</div>
                            <div class="stat-value" id="computerScore">0</div>
                        </div>
                    </div>
                    
                    <div style="text-align: center; padding: 20px;">
                        <div style="display: flex; justify-content: center; gap: 20px; margin-bottom: 30px;">
                            <button class="choice-btn" data-choice="rock" style="
                                width: 100px;
                                height: 100px;
                                background: var(--bg-card);
                                border: 3px solid var(--border-color);
                                border-radius: 50%;
                                cursor: pointer;
                                font-size: 2.5rem;
                                color: #6c5ce7;
                            ">
                                <i class="fas fa-hand-rock"></i>
                            </button>
                            <button class="choice-btn" data-choice="paper" style="
                                width: 100px;
                                height: 100px;
                                background: var(--bg-card);
                                border: 3px solid var(--border-color);
                                border-radius: 50%;
                                cursor: pointer;
                                font-size: 2.5rem;
                                color: #00cec9;
                            ">
                                <i class="fas fa-hand-paper"></i>
                            </button>
                            <button class="choice-btn" data-choice="scissors" style="
                                width: 100px;
                                height: 100px;
                                background: var(--bg-card);
                                border: 3px solid var(--border-color);
                                border-radius: 50%;
                                cursor: pointer;
                                font-size: 2.5rem;
                                color: #fd79a8;
                            ">
                                <i class="fas fa-hand-scissors"></i>
                            </button>
                        </div>
                        
                        <div style="display: flex; justify-content: center; align-items: center; gap: 40px; margin-bottom: 30px;">
                            <div id="playerChoice" style="
                                width: 120px;
                                height: 120px;
                                background: var(--bg-card);
                                border: 4px solid var(--primary-color);
                                border-radius: 50%;
                                display: flex;
                                align-items: center;
                                justify-content: center;
                                font-size: 3rem;
                                color: var(--text-muted);
                            ">?</div>
                            
                            <div style="font-size: 2rem; font-weight: bold; color: var(--text-muted);">VS</div>
                            
                            <div id="computerChoice" style="
                                width: 120px;
                                height: 120px;
                                background: var(--bg-card);
                                border: 4px solid var(--secondary-color);
                                border-radius: 50%;
                                display: flex;
                                align-items: center;
                                justify-content: center;
                                font-size: 3rem;
                                color: var(--text-muted);
                            ">?</div>
                        </div>
                        
                        <div id="result" style="
                            padding: 20px;
                            background: var(--bg-secondary);
                            border-radius: var(--border-radius);
                            margin: 20px auto;
                            max-width: 400px;
                        ">
                            <h3 style="margin: 0; color: var(--text-primary);">Choose your move!</h3>
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
                </div>
            </div>
        `;
        
        // Initialize RPS
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
                    </div>
                    <button class="back-btn" id="backBtn">
                        <i class="fas fa-arrow-left"></i> Back to Hub
                    </button>
                </div>
                
                <div class="game-content" style="text-align: center; padding: 40px;">
                    <div style="font-size: 4rem; color: var(--text-muted); margin-bottom: 20px;">
                        <i class="fas fa-tools"></i>
                    </div>
                    <h3 style="margin-bottom: 10px; color: var(--text-primary);">Coming Soon!</h3>
                    <p style="color: var(--text-secondary); margin-bottom: 30px;">
                        ${gameName} is currently under development. Check back soon!
                    </p>
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
                if (window.utils && window.utils.playSound) {
                    window.utils.playSound('click');
                }
                const event = new Event('backToHub');
                document.dispatchEvent(event);
            });
        }
    }
}

// Tic Tac Toe Game Implementation
class TicTacToeGame {
    constructor() {
        this.board = ['', '', '', '', '', '', '', '', ''];
        this.currentPlayer = 'X';
        this.gameActive = true;
        this.gameMode = 'pvp';
        this.scores = { X: 0, O: 0 };
        this.round = 1;
        
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
        document.querySelectorAll('.cell').forEach(cell => {
            cell.addEventListener('click', () => this.handleCellClick(cell));
        });
        
        // Mode buttons
        document.querySelectorAll('.mode-btn').forEach(btn => {
            btn.addEventListener('click', () => this.changeMode(btn));
        });
        
        // Reset button
        document.getElementById('resetBtn')?.addEventListener('click', () => this.resetGame());
        
        // New match button
        document.getElementById('newMatchBtn')?.addEventListener('click', () => this.newMatch());
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
        const cell = document.querySelector(`.cell[data-index="${index}"]`);
        cell.textContent = this.currentPlayer;
        cell.style.color = this.currentPlayer === 'X' ? '#6c5ce7' : '#00cec9';
        cell.style.cursor = 'default';
        
        if (window.utils && window.utils.playSound) {
            window.utils.playSound('move');
        }
        
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
        
        // Simple AI: try to win, then block, then random
        let move = this.findWinningMove('O') || 
                   this.findWinningMove('X') || 
                   this.getRandomMove();
        
        if (move !== null) {
            this.makeMove(move);
        }
    }
    
    findWinningMove(player) {
        for (let i = 0; i < 9; i++) {
            if (this.board[i] === '') {
                this.board[i] = player;
                if (this.checkWinFor(player)) {
                    this.board[i] = '';
                    return i;
                }
                this.board[i] = '';
            }
        }
        return null;
    }
    
    getRandomMove() {
        const available = [];
        for (let i = 0; i < 9; i++) {
            if (this.board[i] === '') available.push(i);
        }
        return available.length > 0 ? available[Math.floor(Math.random() * available.length)] : null;
    }
    
    checkWin() {
        return this.checkWinFor(this.currentPlayer);
    }
    
    checkWinFor(player) {
        return this.winningCombos.some(combo => 
            combo.every(index => this.board[index] === player)
        );
    }
    
    checkDraw() {
        return !this.board.includes('');
    }
    
    handleWin() {
        this.gameActive = false;
        this.scores[this.currentPlayer]++;
        
        // Highlight winning cells
        for (let combo of this.winningCombos) {
            const [a, b, c] = combo;
            if (this.board[a] && this.board[a] === this.board[b] && this.board[a] === this.board[c]) {
                combo.forEach(index => {
                    const cell = document.querySelector(`.cell[data-index="${index}"]`);
                    cell.style.background = '#00b894';
                    cell.style.color = 'white';
                });
                break;
            }
        }
        
        if (window.utils && window.utils.playSound) {
            window.utils.playSound('win');
        }
        
        setTimeout(() => {
            alert(`Player ${this.currentPlayer} wins!`);
            this.nextRound();
        }, 500);
    }
    
    handleDraw() {
        this.gameActive = false;
        
        if (window.utils && window.utils.playSound) {
            window.utils.playSound('move');
        }
        
        setTimeout(() => {
            alert('Game draw!');
            this.nextRound();
        }, 500);
    }
    
    switchPlayer() {
        this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
        document.getElementById('status').textContent = `Player ${this.currentPlayer}'s Turn`;
    }
    
    changeMode(button) {
        document.querySelectorAll('.mode-btn').forEach(btn => {
            btn.style.background = 'var(--bg-secondary)';
            btn.style.color = 'var(--text-primary)';
            btn.style.border = '2px solid var(--border-color)';
        });
        
        button.style.background = 'var(--primary-color)';
        button.style.color = 'white';
        button.style.border = 'none';
        
        this.gameMode = button.dataset.mode;
        
        if (window.utils && window.utils.playSound) {
            window.utils.playSound('click');
        }
        
        this.resetGame();
    }
    
    resetGame() {
        this.board = ['', '', '', '', '', '', '', '', ''];
        this.gameActive = true;
        this.currentPlayer = 'X';
        
        document.querySelectorAll('.cell').forEach(cell => {
            cell.textContent = '';
            cell.style.background = 'var(--bg-card)';
            cell.style.color = 'var(--text-primary)';
            cell.style.cursor = 'pointer';
        });
        
        document.getElementById('status').textContent = `Player ${this.currentPlayer}'s Turn`;
        
        if (window.utils && window.utils.playSound) {
            window.utils.playSound('click');
        }
    }
    
    newMatch() {
        this.scores = { X: 0, O: 0 };
        this.round = 1;
        this.resetGame();
        
        if (window.utils && window.utils.playSound) {
            window.utils.playSound('click');
        }
    }
    
    nextRound() {
        this.round++;
        this.resetGame();
    }
    
    updateDisplay() {
        document.getElementById('scoreX').textContent = this.scores.X;
        document.getElementById('scoreO').textContent = this.scores.O;
        document.getElementById('round').textContent = this.round;
    }
}

// Snake Game Implementation
class SnakeGame {
    constructor() {
        this.canvas = document.getElementById('snakeCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.gridSize = 20;
        this.tileCount = this.canvas.width / this.gridSize;
        
        this.snake = [{x: 10, y: 10}];
        this.food = {x: 15, y: 15};
        this.dx = 0;
        this.dy = 0;
        this.score = 0;
        this.highScore = window.utils ? window.utils.getHighScore('snake') : 0;
        this.gameRunning = false;
        this.gameLoop = null;
        
        this.init();
    }
    
    init() {
        this.draw();
        this.setupEventListeners();
    }
    
    setupEventListeners() {
        // Keyboard controls
        document.addEventListener('keydown', (e) => this.handleKeyDown(e));
        
        // Start button
        document.getElementById('startBtn')?.addEventListener('click', () => this.startGame());
        
        // Restart button
        document.getElementById('restartBtn')?.addEventListener('click', () => this.resetGame());
    }
    
    handleKeyDown(e) {
        if (!this.gameRunning) {
            if (e.code === 'Space') {
                this.startGame();
            }
            return;
        }
        
        // Prevent default behavior for arrow keys
        if ([37, 38, 39, 40].includes(e.keyCode)) {
            e.preventDefault();
        }
        
        // Arrow keys or WASD
        switch(e.key) {
            case 'ArrowUp':
            case 'w':
            case 'W':
                if (this.dy !== 1) {
                    this.dx = 0;
                    this.dy = -1;
                    if (window.utils && window.utils.playSound) {
                        window.utils.playSound('move');
                    }
                }
                break;
            case 'ArrowLeft':
            case 'a':
            case 'A':
                if (this.dx !== 1) {
                    this.dx = -1;
                    this.dy = 0;
                    if (window.utils && window.utils.playSound) {
                        window.utils.playSound('move');
                    }
                }
                break;
            case 'ArrowDown':
            case 's':
            case 'S':
                if (this.dy !== -1) {
                    this.dx = 0;
                    this.dy = 1;
                    if (window.utils && window.utils.playSound) {
                        window.utils.playSound('move');
                    }
                }
                break;
            case 'ArrowRight':
            case 'd':
            case 'D':
                if (this.dx !== -1) {
                    this.dx = 1;
                    this.dy = 0;
                    if (window.utils && window.utils.playSound) {
                        window.utils.playSound('move');
                    }
                }
                break;
        }
    }
    
    startGame() {
        if (this.gameRunning) return;
        
        this.gameRunning = true;
        this.dx = 1;
        this.dy = 0;
        
        document.getElementById('gameStatus').textContent = 'Game Running';
        document.getElementById('startBtn').disabled = true;
        document.getElementById('startBtn').innerHTML = '<i class="fas fa-pause"></i> Playing';
        
        if (window.utils && window.utils.playSound) {
            window.utils.playSound('click');
        }
        
        this.gameLoop = setInterval(() => this.update(), 100);
    }
    
    update() {
        if (!this.gameRunning) return;
        
        // Move snake
        const head = {x: this.snake[0].x + this.dx, y: this.snake[0].y + this.dy};
        
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
            
            if (window.utils && window.utils.playSound) {
                window.utils.playSound('win');
            }
            
            // Generate new food
            this.food = {
                x: Math.floor(Math.random() * this.tileCount),
                y: Math.floor(Math.random() * this.tileCount)
            };
            
            // Check if food is on snake
            let foodOnSnake;
            do {
                foodOnSnake = false;
                for (let segment of this.snake) {
                    if (segment.x === this.food.x && segment.y === this.food.y) {
                        foodOnSnake = true;
                        this.food = {
                            x: Math.floor(Math.random() * this.tileCount),
                            y: Math.floor(Math.random() * this.tileCount)
                        };
                        break;
                    }
                }
            } while (foodOnSnake);
            
            // Update high score
            if (this.score > this.highScore) {
                this.highScore = this.score;
                if (window.utils && window.utils.saveHighScore) {
                    window.utils.saveHighScore('snake', this.score);
                }
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
        this.ctx.fillStyle = 'var(--bg-primary)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Draw snake
        this.snake.forEach((segment, index) => {
            if (index === 0) {
                // Head - green
                this.ctx.fillStyle = '#00b894';
            } else {
                // Body - gradient green
                const intensity = 1 - (index / this.snake.length * 0.5);
                this.ctx.fillStyle = `rgb(0, ${Math.floor(184 * intensity)}, ${Math.floor(148 * intensity)})`;
            }
            
            this.ctx.fillRect(segment.x * this.gridSize, segment.y * this.gridSize, this.gridSize - 2, this.gridSize - 2);
            
            // Draw border
            this.ctx.strokeStyle = '#007a63';
            this.ctx.lineWidth = 1;
            this.ctx.strokeRect(segment.x * this.gridSize, segment.y * this.gridSize, this.gridSize - 2, this.gridSize - 2);
            
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
        
        // Draw food (red apple)
        this.ctx.fillStyle = '#ff6b6b';
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
    }
    
    gameOver() {
        this.gameRunning = false;
        clearInterval(this.gameLoop);
        
        document.getElementById('gameStatus').textContent = 'Game Over! Press Space to restart';
        document.getElementById('startBtn').disabled = false;
        document.getElementById('startBtn').innerHTML = '<i class="fas fa-play"></i> Start Game';
        
        if (window.utils && window.utils.playSound) {
            window.utils.playSound('lose');
        }
        
        setTimeout(() => {
            alert(`Game Over! Score: ${this.score}`);
        }, 100);
    }
    
    resetGame() {
        this.snake = [{x: 10, y: 10}];
        this.food = {x: 15, y: 15};
        this.dx = 0;
        this.dy = 0;
        this.score = 0;
        this.gameRunning = false;
        
        clearInterval(this.gameLoop);
        
        document.getElementById('gameStatus').textContent = 'Press Space to Start';
        document.getElementById('startBtn').disabled = false;
        document.getElementById('startBtn').innerHTML = '<i class="fas fa-play"></i> Start Game';
        
        this.updateDisplay();
        this.draw();
        
        if (window.utils && window.utils.playSound) {
            window.utils.playSound('click');
        }
    }
    
    updateDisplay() {
        document.getElementById('score').textContent = this.score;
        document.getElementById('highScore').textContent = this.highScore;
        document.getElementById('length').textContent = this.snake.length;
    }
}

// Rock Paper Scissors Game Implementation
class RPSGame {
    constructor() {
        this.playerScore = 0;
        this.computerScore = 0;
        this.round = 1;
        this.totalRounds = 5;
        this.gameActive = true;
        this.highScore = window.utils ? window.utils.getHighScore('rock-paper-scissors') : 0;
        
        this.choices = ['rock', 'paper', 'scissors'];
        this.rules = {
            rock: 'scissors',
            paper: 'rock',
            scissors: 'paper'
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
    }
    
    playerChoice(choice) {
        if (!this.gameActive) return;
        
        // Update UI
        document.querySelectorAll('.choice-btn').forEach(btn => {
            btn.style.opacity = '0.6';
            btn.style.cursor = 'not-allowed';
        });
        event.target.style.opacity = '1';
        
        if (window.utils && window.utils.playSound) {
            window.utils.playSound('click');
        }
        
        // Show player choice
        const playerChoiceEl = document.getElementById('playerChoice');
        const iconClass = {
            rock: 'fas fa-hand-rock',
            paper: 'fas fa-hand-paper',
            scissors: 'fas fa-hand-scissors'
        };
        playerChoiceEl.innerHTML = `<i class="${iconClass[choice]}"></i>`;
        playerChoiceEl.style.color = this.getChoiceColor(choice);
        
        // Computer choice after delay
        setTimeout(() => {
            const computerChoice = this.getComputerChoice();
            const computerChoiceEl = document.getElementById('computerChoice');
            computerChoiceEl.innerHTML = `<i class="${iconClass[computerChoice]}"></i>`;
            computerChoiceEl.style.color = this.getChoiceColor(computerChoice);
            
            // Determine winner
            setTimeout(() => this.determineWinner(choice, computerChoice), 500);
        }, 1000);
    }
    
    getComputerChoice() {
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
        let message = '';
        let color = '';
        
        switch(result) {
            case 'win':
                message = `${this.capitalize(player)} beats ${computer}! You win!`;
                color = '#00b894';
                if (window.utils && window.utils.playSound) {
                    window.utils.playSound('win');
                }
                break;
            case 'lose':
                message = `${this.capitalize(computer)} beats ${player}! Computer wins!`;
                color = '#ff7675';
                if (window.utils && window.utils.playSound) {
                    window.utils.playSound('lose');
                }
                break;
            case 'draw':
                message = 'Both chose ' + player + '. It\'s a draw!';
                color = '#fdcb6e';
                if (window.utils && window.utils.playSound) {
                    window.utils.playSound('move');
                }
                break;
        }
        
        resultEl.innerHTML = `<h3 style="margin: 0; color: ${color}">${message}</h3>`;
        
        this.updateDisplay();
        
        // Enable next round button
        document.getElementById('nextRoundBtn').disabled = false;
        
        // Check if game is over
        setTimeout(() => this.checkGameOver(), 1000);
    }
    
    checkGameOver() {
        if (this.round >= this.totalRounds) {
            this.gameActive = false;
            
            let finalMessage = '';
            if (this.playerScore > this.computerScore) {
                finalMessage = `You win the game ${this.playerScore}-${this.computerScore}!`;
                // Update high score
                if (this.playerScore > this.highScore) {
                    this.highScore = this.playerScore;
                    if (window.utils && window.utils.saveHighScore) {
                        window.utils.saveHighScore('rock-paper-scissors', this.playerScore);
                    }
                }
            } else if (this.computerScore > this.playerScore) {
                finalMessage = `Computer wins ${this.computerScore}-${this.playerScore}. Better luck next time!`;
            } else {
                finalMessage = `Game ended in a tie ${this.playerScore}-${this.computerScore}!`;
            }
            
            setTimeout(() => {
                alert(finalMessage);
                this.resetGame();
            }, 500);
        }
    }
    
    nextRound() {
        if (this.round >= this.totalRounds) return;
        
        this.round++;
        
        // Reset UI
        document.querySelectorAll('.choice-btn').forEach(btn => {
            btn.style.opacity = '1';
            btn.style.cursor = 'pointer';
        });
        
        document.getElementById('playerChoice').innerHTML = '?';
        document.getElementById('playerChoice').style.color = 'var(--text-muted)';
        document.getElementById('computerChoice').innerHTML = '?';
        document.getElementById('computerChoice').style.color = 'var(--text-muted)';
        
        const resultEl = document.getElementById('result');
        resultEl.innerHTML = '<h3 style="margin: 0; color: var(--text-primary)">Choose your move!</h3>';
        
        document.getElementById('nextRoundBtn').disabled = true;
        
        this.updateDisplay();
        
        if (window.utils && window.utils.playSound) {
            window.utils.playSound('click');
        }
    }
    
    resetGame() {
        this.playerScore = 0;
        this.computerScore = 0;
        this.round = 1;
        this.gameActive = true;
        
        // Reset UI
        document.querySelectorAll('.choice-btn').forEach(btn => {
            btn.style.opacity = '1';
            btn.style.cursor = 'pointer';
        });
        
        document.getElementById('playerChoice').innerHTML = '?';
        document.getElementById('playerChoice').style.color = 'var(--text-muted)';
        document.getElementById('computerChoice').innerHTML = '?';
        document.getElementById('computerChoice').style.color = 'var(--text-muted)';
        
        const resultEl = document.getElementById('result');
        resultEl.innerHTML = '<h3 style="margin: 0; color: var(--text-primary)">Choose your move!</h3>';
        
        document.getElementById('nextRoundBtn').disabled = true;
        
        this.updateDisplay();
        
        if (window.utils && window.utils.playSound) {
            window.utils.playSound('click');
        }
    }
    
    updateDisplay() {
        document.getElementById('playerScore').textContent = this.playerScore;
        document.getElementById('computerScore').textContent = this.computerScore;
        document.getElementById('round').textContent = `${this.round}/${this.totalRounds}`;
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
}