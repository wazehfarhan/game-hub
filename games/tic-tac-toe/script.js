class TicTacToe {
    constructor() {
        this.board = ['', '', '', '', '', '', '', '', ''];
        this.currentPlayer = 'X';
        this.gameActive = true;
        this.gameMode = 'pvp';
        this.aiDifficulty = 'medium';
        this.scores = { X: 0, O: 0 };
        this.round = 1;
        
        this.winningCombos = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];
        
        this.init();
    }
    
    init() {
        this.setupEventListeners();
        this.updateDisplay();
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
        
        // AI difficulty
        document.getElementById('aiDifficulty').addEventListener('change', (e) => {
            this.aiDifficulty = e.target.value;
        });
        
        // Reset button
        document.getElementById('resetBtn').addEventListener('click', () => this.resetGame());
        
        // New game button
        document.getElementById('newGameBtn').addEventListener('click', () => this.newMatch());
    }
    
    handleCellClick(cell) {
        if (!this.gameActive) return;
        
        const cellIndex = parseInt(cell.dataset.cell);
        
        if (this.board[cellIndex] !== '') return;
        
        this.makeMove(cellIndex);
        
        // AI move if needed
        if (this.gameActive && this.gameMode === 'pvc' && this.currentPlayer === 'O') {
            setTimeout(() => this.makeAIMove(), 500);
        }
    }
    
    makeMove(index) {
        this.board[index] = this.currentPlayer;
        const cell = document.querySelector(`.cell[data-cell="${index}"]`);
        cell.textContent = this.currentPlayer;
        cell.classList.add(this.currentPlayer.toLowerCase());
        
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
        
        // Take center if available
        if (this.board[4] === '') return 4;
        
        // Take random corner
        const corners = [0, 2, 6, 8];
        const availableCorners = corners.filter(corner => this.board[corner] === '');
        if (availableCorners.length > 0) {
            return availableCorners[Math.floor(Math.random() * availableCorners.length)];
        }
        
        return this.getRandomMove();
    }
    
    getHardMove() {
        // Simple minimax
        let bestScore = -Infinity;
        let bestMove = null;
        
        for (let move of this.getAvailableMoves()) {
            this.board[move] = 'O';
            let score = this.minimax(0, false);
            this.board[move] = '';
            
            if (score > bestScore) {
                bestScore = score;
                bestMove = move;
            }
        }
        
        return bestMove;
    }
    
    minimax(depth, isMaximizing) {
        // Check terminal states
        if (this.checkWinFor('O')) return 10 - depth;
        if (this.checkWinFor('X')) return depth - 10;
        if (this.getAvailableMoves().length === 0) return 0;
        
        if (isMaximizing) {
            let bestScore = -Infinity;
            for (let move of this.getAvailableMoves()) {
                this.board[move] = 'O';
                let score = this.minimax(depth + 1, false);
                this.board[move] = '';
                bestScore = Math.max(score, bestScore);
            }
            return bestScore;
        } else {
            let bestScore = Infinity;
            for (let move of this.getAvailableMoves()) {
                this.board[move] = 'X';
                let score = this.minimax(depth + 1, true);
                this.board[move] = '';
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
                    const cell = document.querySelector(`.cell[data-cell="${index}"]`);
                    cell.classList.add('win');
                });
                break;
            }
        }
        
        setTimeout(() => {
            alert(`Player ${this.currentPlayer} wins round ${this.round}!`);
            this.nextRound();
        }, 500);
    }
    
    handleDraw() {
        this.gameActive = false;
        setTimeout(() => {
            alert(`Round ${this.round} ended in a draw!`);
            this.nextRound();
        }, 500);
    }
    
    switchPlayer() {
        this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
        document.getElementById('gameStatus').textContent = `Player ${this.currentPlayer}'s Turn`;
    }
    
    changeMode(button) {
        document.querySelectorAll('.mode-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        button.classList.add('active');
        this.gameMode = button.dataset.mode;
        this.resetGame();
    }
    
    resetGame() {
        this.board = ['', '', '', '', '', '', '', '', ''];
        this.gameActive = true;
        this.currentPlayer = 'X';
        
        document.querySelectorAll('.cell').forEach(cell => {
            cell.textContent = '';
            cell.className = 'cell';
        });
        
        document.getElementById('gameStatus').textContent = `Player ${this.currentPlayer}'s Turn`;
    }
    
    newMatch() {
        this.scores = { X: 0, O: 0 };
        this.round = 1;
        this.resetGame();
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

// Start game
document.addEventListener('DOMContentLoaded', () => {
    window.ticTacToe = new TicTacToe();
});