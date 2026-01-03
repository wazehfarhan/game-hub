class RockPaperScissors {
    constructor() {
        this.playerScore = 0;
        this.computerScore = 0;
        this.round = 1;
        this.totalRounds = 5;
        this.difficulty = 'medium';
        this.gameActive = true;
        this.highScore = localStorage.getItem('rpsHighScore') || 0;
        
        this.choices = ['rock', 'paper', 'scissors'];
        this.rules = {
            rock: 'scissors',
            paper: 'rock',
            scissors: 'paper'
        };
        
        this.init();
    }
    
    init() {
        this.setupEventListeners();
        this.updateDisplay();
    }
    
    setupEventListeners() {
        // Choice buttons
        document.querySelectorAll('.choice-btn').forEach(btn => {
            btn.addEventListener('click', () => this.playerChoice(btn.dataset.choice));
        });
        
        // Next round button
        document.getElementById('nextRoundBtn').addEventListener('click', () => this.nextRound());
        
        // Reset game button
        document.getElementById('resetGameBtn').addEventListener('click', () => this.resetGame());
        
        // Difficulty select
        document.getElementById('difficulty').addEventListener('change', (e) => {
            this.difficulty = e.target.value;
        });
        
        // Rounds select
        document.getElementById('rounds').addEventListener('change', (e) => {
            this.totalRounds = parseInt(e.target.value);
            this.resetGame();
        });
    }
    
    playerChoice(choice) {
        if (!this.gameActive) return;
        
        // Disable choice buttons
        document.querySelectorAll('.choice-btn').forEach(btn => {
            btn.disabled = true;
        });
        
        // Show player choice
        const playerChoiceEl = document.getElementById('playerChoice');
        const iconClass = {
            rock: 'fas fa-hand-rock',
            paper: 'fas fa-hand-paper',
            scissors: 'fas fa-hand-scissors'
        };
        playerChoiceEl.innerHTML = `<i class="${iconClass[choice]}"></i>`;
        
        // Computer choice after delay
        setTimeout(() => {
            const computerChoice = this.getComputerChoice();
            const computerChoiceEl = document.getElementById('computerChoice');
            computerChoiceEl.innerHTML = `<i class="${iconClass[computerChoice]}"></i>`;
            
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
                const options = this.choices.filter(c => c !== this.getMostCommonPlayerChoice());
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
        // In a full implementation, track player history
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
        resultEl.className = 'result-container ' + result;
        
        let message = '';
        switch(result) {
            case 'win':
                message = `${this.capitalize(player)} beats ${computer}! You win!`;
                break;
            case 'lose':
                message = `${this.capitalize(computer)} beats ${player}! Computer wins!`;
                break;
            case 'draw':
                message = 'Both chose ' + player + '. It\'s a draw!';
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
        if (this.round >= this.totalRounds) {
            this.gameActive = false;
            
            let finalMessage = '';
            if (this.playerScore > this.computerScore) {
                finalMessage = `You win the game ${this.playerScore}-${this.computerScore}!`;
                // Update high score
                if (this.playerScore > this.highScore) {
                    this.highScore = this.playerScore;
                    localStorage.setItem('rpsHighScore', this.highScore);
                }
            } else if (this.computerScore > this.playerScore) {
                finalMessage = `Computer wins ${this.computerScore}-${this.playerScore}. Better luck next time!`;
            } else {
                finalMessage = `Game ended in a tie ${this.playerScore}-${this.computerScore}!`;
            }
            
            setTimeout(() => {
                alert(finalMessage);
            }, 500);
        }
    }
    
    nextRound() {
        if (this.round >= this.totalRounds) return;
        
        this.round++;
        
        // Reset UI
        document.querySelectorAll('.choice-btn').forEach(btn => {
            btn.disabled = false;
        });
        
        document.getElementById('playerChoice').innerHTML = '<div class="placeholder">?</div>';
        document.getElementById('computerChoice').innerHTML = '<div class="placeholder">?</div>';
        
        const resultEl = document.getElementById('result');
        resultEl.className = 'result-container';
        resultEl.innerHTML = '<h3>Choose your move!</h3>';
        
        document.getElementById('nextRoundBtn').disabled = true;
        
        this.updateDisplay();
    }
    
    resetGame() {
        this.playerScore = 0;
        this.computerScore = 0;
        this.round = 1;
        this.gameActive = true;
        
        // Reset UI
        document.querySelectorAll('.choice-btn').forEach(btn => {
            btn.disabled = false;
        });
        
        document.getElementById('playerChoice').innerHTML = '<div class="placeholder">?</div>';
        document.getElementById('computerChoice').innerHTML = '<div class="placeholder">?</div>';
        
        const resultEl = document.getElementById('result');
        resultEl.className = 'result-container';
        resultEl.innerHTML = '<h3>Choose your move!</h3>';
        
        document.getElementById('nextRoundBtn').disabled = true;
        
        this.updateDisplay();
    }
    
    updateDisplay() {
        document.getElementById('playerScore').textContent = this.playerScore;
        document.getElementById('computerScore').textContent = this.computerScore;
        document.getElementById('round').textContent = `${this.round}/${this.totalRounds}`;
    }
    
    capitalize(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
}

// Start game
document.addEventListener('DOMContentLoaded', () => {
    window.rpsGame = new RockPaperScissors();
});