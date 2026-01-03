class SnakeGame {
    constructor() {
        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.gridSize = 20;
        this.tileCount = this.canvas.width / this.gridSize;
        
        this.snake = [{x: 10, y: 10}];
        this.food = {};
        this.dx = 0;
        this.dy = 0;
        this.score = 0;
        this.highScore = localStorage.getItem('snakeHighScore') || 0;
        this.snakeLength = 1;
        this.speed = 5;
        this.gameRunning = false;
        this.gameLoop = null;
        this.snakeColor = '#00b894';
        
        this.init();
    }
    
    init() {
        this.generateFood();
        this.draw();
        this.setupEventListeners();
        this.updateDisplay();
    }
    
    setupEventListeners() {
        // Keyboard controls
        document.addEventListener('keydown', (e) => this.handleKeyDown(e));
        
        // Start button
        document.getElementById('startBtn').addEventListener('click', () => this.startGame());
        
        // Restart button
        document.getElementById('restartBtn').addEventListener('click', () => this.resetGame());
        
        // Speed control
        document.getElementById('speedRange').addEventListener('input', (e) => {
            this.speed = parseInt(e.target.value);
            document.getElementById('speedValue').textContent = this.speed;
            if (this.gameRunning) {
                clearInterval(this.gameLoop);
                this.startGameLoop();
            }
        });
        
        // Color control
        document.getElementById('snakeColor').addEventListener('change', (e) => {
            this.snakeColor = e.target.value;
            if (this.gameRunning) {
                this.draw();
            }
        });
        
        // Mobile controls
        document.getElementById('upBtn').addEventListener('click', () => this.changeDirection(0, -1));
        document.getElementById('leftBtn').addEventListener('click', () => this.changeDirection(-1, 0));
        document.getElementById('downBtn').addEventListener('click', () => this.changeDirection(0, 1));
        document.getElementById('rightBtn').addEventListener('click', () => this.changeDirection(1, 0));
    }
    
    handleKeyDown(e) {
        if (!this.gameRunning) {
            if (e.code === 'Space') {
                this.startGame();
            }
            return;
        }
        
        if ([37, 38, 39, 40].includes(e.keyCode)) {
            e.preventDefault();
        }
        
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
    }
    
    startGame() {
        if (this.gameRunning) return;
        
        this.gameRunning = true;
        this.dx = 1;
        this.dy = 0;
        
        document.getElementById('gameStatus').textContent = 'Game Running';
        document.getElementById('startBtn').disabled = true;
        document.getElementById('startBtn').innerHTML = '<i class="fas fa-pause"></i> Playing';
        
        this.startGameLoop();
    }
    
    startGameLoop() {
        clearInterval(this.gameLoop);
        const interval = Math.max(50, 200 - (this.speed * 15));
        this.gameLoop = setInterval(() => this.update(), interval);
    }
    
    update() {
        if (!this.gameRunning) return;
        
        const head = {x: this.snake[0].x + this.dx, y: this.snake[0].y + this.dy};
        
        // Wall collision
        if (head.x < 0 || head.x >= this.tileCount || head.y < 0 || head.y >= this.tileCount) {
            this.gameOver();
            return;
        }
        
        // Self collision
        for (let segment of this.snake) {
            if (head.x === segment.x && head.y === segment.y) {
                this.gameOver();
                return;
            }
        }
        
        this.snake.unshift(head);
        
        // Food collision
        if (head.x === this.food.x && head.y === this.food.y) {
            this.score += 10;
            this.snakeLength++;
            this.generateFood();
            
            if (this.score > this.highScore) {
                this.highScore = this.score;
                localStorage.setItem('snakeHighScore', this.highScore);
            }
            
            this.updateDisplay();
        } else {
            this.snake.pop();
        }
        
        this.draw();
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
            if (index === 0) {
                // Head
                this.ctx.fillStyle = this.snakeColor;
            } else {
                // Body - gradient
                const intensity = 1 - (index / this.snake.length * 0.5);
                const r = parseInt(this.snakeColor.slice(1, 3), 16);
                const g = parseInt(this.snakeColor.slice(3, 5), 16);
                const b = parseInt(this.snakeColor.slice(5, 7), 16);
                this.ctx.fillStyle = `rgb(${Math.floor(r * intensity)}, ${Math.floor(g * intensity)}, ${Math.floor(b * intensity)})`;
            }
            
            this.ctx.fillRect(segment.x * this.gridSize, segment.y * this.gridSize, this.gridSize - 2, this.gridSize - 2);
            
            // Border
            this.ctx.strokeStyle = '#007a63';
            this.ctx.lineWidth = 1;
            this.ctx.strokeRect(segment.x * this.gridSize, segment.y * this.gridSize, this.gridSize - 2, this.gridSize - 2);
            
            // Eyes on head
            if (index === 0) {
                this.ctx.fillStyle = 'white';
                const eyeSize = this.gridSize / 5;
                const eyeOffset = this.gridSize / 3;
                
                this.ctx.beginPath();
                this.ctx.arc(
                    segment.x * this.gridSize + eyeOffset,
                    segment.y * this.gridSize + eyeOffset,
                    eyeSize, 0, Math.PI * 2
                );
                this.ctx.fill();
                
                this.ctx.beginPath();
                this.ctx.arc(
                    segment.x * this.gridSize + this.gridSize - eyeOffset,
                    segment.y * this.gridSize + eyeOffset,
                    eyeSize, 0, Math.PI * 2
                );
                this.ctx.fill();
            }
        });
        
        // Draw food (apple)
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
        
        document.getElementById('gameStatus').textContent = 'Game Over! Final Score: ' + this.score;
        document.getElementById('startBtn').disabled = false;
        document.getElementById('startBtn').innerHTML = '<i class="fas fa-play"></i> Start Game';
    }
    
    resetGame() {
        this.snake = [{x: 10, y: 10}];
        this.dx = 0;
        this.dy = 0;
        this.score = 0;
        this.snakeLength = 1;
        this.gameRunning = false;
        
        clearInterval(this.gameLoop);
        this.generateFood();
        
        document.getElementById('gameStatus').textContent = 'Press SPACE to Start';
        document.getElementById('startBtn').disabled = false;
        document.getElementById('startBtn').innerHTML = '<i class="fas fa-play"></i> Start Game';
        
        this.updateDisplay();
        this.draw();
    }
    
    updateDisplay() {
        document.getElementById('score').textContent = this.score;
        document.getElementById('highScore').textContent = this.highScore;
        document.getElementById('length').textContent = this.snakeLength;
    }
}

// Start game
document.addEventListener('DOMContentLoaded', () => {
    window.snakeGame = new SnakeGame();
});