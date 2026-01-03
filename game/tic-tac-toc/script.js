// Tic Tac Toe Game Logic
class TicTacToe {
    constructor() {
        this.board = document.getElementById('ticTacToeBoard');
        this.cells = this.board.querySelectorAll('.cell');
        this.status = document.getElementById('gameStatus');
        this.resetBtn = document.getElementById('resetBtn');
        this.newGameBtn = document.getElementById('newGameBtn');
        this.modeButtons = document.querySelectorAll('.mode-btn');
        this.aiDifficulty = document.getElementById('aiDifficulty');
        this.scoreX = document.getElementById('scoreX');
        this.scoreO = document.getElementById('scoreO');
        this.playerX = document.getElementById('playerX');
        this.playerO = document.getElementById('playerO');
        
        this.currentPlayer = 'X';
        this.gameState = ['', '', '', '', '', '', '', '', ''];
        this.gameActive = true;
        this.gameMode = 'pvp'; // pvp or pvc
        this.scores = { X: 0, O: 0 };
        
        this.winningConditions = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6]             // Diagonals
        ];
        
        this.init();
    }
    
    init() {
        this.setupEventListeners();
        this.resetBoard();
        this.updateScores();
    }
    
    setupEventListeners() {
        // Cell clicks
        this.cells.forEach(cell => {
            cell.addEventListener('click', () => this.handleCellClick(cell));
        });
        
        // Reset button
        this.resetBtn.addEventListener('click', () => this.resetBoard());
        
        // New game button
        this.newGameBtn.addEventListener('click', () => this.newMatch());
        
        // Mode buttons
        this.modeButtons.forEach(button => {
            button.addEventListener('click', () => this.changeMode(button));
        });
        
        // AI difficulty change
        this.aiDifficulty.addEventListener('change', () => {
            if (this.gameMode === 'pvc') {
                this.resetBoard();
            }
        });
    }
    
    handleCellClick(cell) {
        const index = parseInt(cell.dataset.index);
        
        if (this.gameState[index] !== '' || !this.gameActive) {
            return;
        }
        
        this.makeMove(index);
        
        // AI move if in PvC mode and it's AI's turn
        if (this.gameMode === 'pvc' && this.gameActive && this.currentPlayer === 'O') {
            setTimeout(() => this.makeAIMove(), 500);
        }
    }
    
    makeMove(index) {
        this.gameState[index] = this.currentPlayer;
        this.cells[index].textContent = this.currentPlayer;
        this.cells[index].classList.add(this.currentPlayer.toLowerCase());
        
        // Update active player indicator
        this.updatePlayerIndicators();
        
        if (this.checkWin()) {
            this.handleWin();
        } else if (this.checkDraw()) {
            this.handleDraw();
        } else {
            this.switchPlayer();
        }
    }
    
    makeAIMove() {
        if (!this.gameActive) return;
        
        const difficulty = this.aiDifficulty.value;
        let move;
        
        switch(difficulty) {
            case 'easy':
                move = this.getRandomMove();
                break;
            case 'medium':
                move = this.getMediumAIMove();
                break;
            case 'hard':
                move = this.getHardAIMove();
                break;
            default:
                move = this.getRandomMove();
        }
        
        if (move !== null) {
            this.makeMove(move);
        }
    }
    
    getRandomMove() {
        const availableMoves = this.getAvailableMoves();
        if (availableMoves.length === 0) return null;
        return availableMoves[Math.floor(Math.random() * availableMoves.length)];
    }
    
    getMediumAIMove() {
        // Try to win
        for (let move of this.getAvailableMoves()) {
            this.gameState[move] = 'O';
            if (this.checkWinForPlayer('O')) {
                this.gameState[move] = '';
                return move;
            }
            this.gameState[move] = '';
        }
        
        // Block player win
        for (let move of this.getAvailableMoves()) {
            this.gameState[move] = 'X';
            if (this.checkWinForPlayer('X')) {
                this.gameState[move] = '';
                return move;
            }
            this.gameState[move] = '';
        }
        
        // Take center
        if (this.gameState[4] === '') return 4;
        
        // Take random corner
        const corners = [0, 2, 6, 8];
        const availableCorners = corners.filter(corner => this.gameState[corner] === '');
        if (availableCorners.length > 0) {
            return availableCorners[Math.floor(Math.random() * availableCorners.length)];
        }
        
        // Random move
        return this.getRandomMove();
    }
    
    getHardAIMove() {
        // Minimax algorithm implementation
        const bestMove = this.minimax(this.gameState, 'O').index;
        return bestMove;
    }
    
    minimax(board, player) {
        const availableMoves = this.getAvailableMovesFromBoard(board);
        
        // Check terminal states
        if (this.checkWinForBoard(board, 'X')) {
            return { score: -10 };
        } else if (this.checkWinForBoard(board, 'O')) {
            return { score: 10 };
        } else if (availableMoves.length === 0) {
            return { score: 0 };
        }
        
        // Array to collect all possible moves
        const moves = [];
        
        for (let i = 0; i < availableMoves.length; i++) {
            const move = {};
            move.index = availableMoves[i];
            
            // Make the move
            board[availableMoves[i]] = player;
            
            // Collect score from resulting position
            if (player === 'O') {
                const result = this.minimax(board, 'X');
                move.score = result.score;
            } else {
                const result = this.minimax(board, 'O');
                move.score = result.score;
            }
            
            // Undo move
            board[availableMoves[i]] = '';
            
            // Add to list
            moves.push(move);
        }
        
        // Choose best move
        let bestMove;
        if (player === 'O') {
            let bestScore = -Infinity;
            for (let i = 0; i < moves.length; i++) {
                if (moves[i].score > bestScore) {
                    bestScore = moves[i].score;
                    bestMove = i;
                }
            }
        } else {
            let bestScore = Infinity;
            for (let i = 0; i < moves.length; i++) {
                if (moves[i].score < bestScore) {
                    bestScore = moves[i].score;
                    bestMove = i;
                }
            }
        }
        
        return moves[bestMove];
    }
    
    getAvailableMoves() {
        return this.gameState
            .map((val, idx) => val === '' ? idx : null)
            .filter(val => val !== null);
    }
    
    getAvailableMovesFromBoard(board) {
        return board
            .map((val, idx) => val === '' ? idx : null)
            .filter(val => val !== null);
    }
    
    checkWin() {
        return this.checkWinForPlayer(this.currentPlayer);
    }
    
    checkWinForPlayer(player) {
        for (let condition of this.winningConditions) {
            const [a, b, c] = condition;
            if (this.gameState[a] === player && 
                this.gameState[b] === player && 
                this.gameState[c] === player) {
                return true;
            }
        }
        return false;
    }
    
    checkWinForBoard(board, player) {
        for (let condition of this.winningConditions) {
            const [a, b, c] = condition;
            if (board[a] === player && 
                board[b] === player && 
                board[c] === player) {
                return true;
            }
        }
        return false;
    }
    
    checkDraw() {
        return !this.gameState.includes('');
    }
    
    handleWin() {
        this.gameActive = false;
        this.scores[this.currentPlayer]++;
        this.updateScores();
        this.highlightWinningCells();
        this.status.textContent = `Player ${this.currentPlayer} Wins!`;
        this.playSound('win');
    }
    
    handleDraw() {
        this.gameActive = false;
        this.status.textContent = "Game Draw!";
        this.playSound('draw');
    }
    
    switchPlayer() {
        this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
        this.status.textContent = `Player ${this.currentPlayer}'s Turn`;
        this.updatePlayerIndicators();
        this.playSound('move');
    }
    
    updatePlayerIndicators() {
        if (this.gameActive) {
            if (this.currentPlayer === 'X') {
                this.playerX.classList.add('active');
                this.playerO.classList.remove('active');
            } else {
                this.playerO.classList.add('active');
                this.playerX.classList.remove('active');
            }
        } else {
            this.playerX.classList.remove('active');
            this.playerO.classList.remove('active');
        }
    }
    
    highlightWinningCells() {
        for (let condition of this.winningConditions) {
            const [a, b, c] = condition;
            if (this.gameState[a] === this.currentPlayer && 
                this.gameState[b] === this.currentPlayer && 
                this.gameState[c] === this.currentPlayer) {
                this.cells[a].classList.add('winning');
                this.cells[b].classList.add('winning');
                this.cells[c].classList.add('winning');
                break;
            }
        }
    }
    
    updateScores() {
        this.scoreX.textContent = this.scores.X;
        this.scoreO.textContent = this.scores.O;
    }
    
    resetBoard() {
        this.gameState = ['', '', '', '', '', '', '', '', ''];
        this.gameActive = true;
        this.currentPlayer = 'X';
        this.status.textContent = `Player ${this.currentPlayer}'s Turn`;
        
        this.cells.forEach(cell => {
            cell.textContent = '';
            cell.classList.remove('x', 'o', 'winning');
        });
        
        this.updatePlayerIndicators();
        this.playSound('reset');
    }
    
    newMatch() {
        this.scores = { X: 0, O: 0 };
        this.updateScores();
        this.resetBoard();
    }
    
    changeMode(button) {
        this.modeButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        this.gameMode = button.dataset.mode;
        this.resetBoard();
    }
    
    playSound(type) {
        // Sound implementation would go here
        // For now, we'll just log the event
        console.log(`Play sound: ${type}`);
    }
}

// Initialize game when page loads
document.addEventListener('DOMContentLoaded', () => {
    window.ticTacToe = new TicTacToe();
});