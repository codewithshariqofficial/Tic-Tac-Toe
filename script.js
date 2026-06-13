const board = document.getElementById('board');
const cells = document.querySelectorAll('.cell');
const statusText = document.getElementById('status');
const restartBtn = document.getElementById('restart-btn');
const pvpBtn = document.getElementById('pvp-btn');
const pvaBtn = document.getElementById('pva-btn');
const winningLine = document.getElementById('winning-line');

let currentPlayer = 'X';
let gameActive = true;
let gameState = ["", "", "", "", "", "", "", "", ""];
let gameMode = 'pvp'; // 'pvp' or 'pva'

const winningConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]             // Diagonals
];

function handleCellClick(clickedCellEvent) {
    const clickedCell = clickedCellEvent.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-index'));

    if (gameState[clickedCellIndex] !== "" || !gameActive) return;

    makeMove(clickedCell, clickedCellIndex);
    
    if (gameActive && gameMode === 'pva' && currentPlayer === 'O') {
        setTimeout(makeAiMove, 500);
    }
}

function makeMove(cell, index) {
    gameState[index] = currentPlayer;
    cell.classList.add(currentPlayer.toLowerCase());
    
    checkResult();
    
    if (gameActive) {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        statusText.innerText = `Player ${currentPlayer}'s Turn`;
    }
}

function checkResult() {
    let roundWon = false;
    let winningCondition = null;

    for (let i = 0; i < winningConditions.length; i++) {
        const condition = winningConditions[i];
        let a = gameState[condition[0]];
        let b = gameState[condition[1]];
        let c = gameState[condition[2]];

        if (a === '' || b === '' || c === '') continue;
        if (a === b && b === c) {
            roundWon = true;
            winningCondition = condition;
            break;
        }
    }

    if (roundWon) {
        statusText.innerText = `Player ${currentPlayer} Wins!`;
        gameActive = false;
        drawWinningLine(winningCondition);
        return;
    }

    if (!gameState.includes("")) {
        statusText.innerText = "It's a Draw!";
        gameActive = false;
        return;
    }
}

function drawWinningLine(condition) {
    const firstCell = cells[condition[0]];
    const lastCell = cells[condition[2]];
    
    const firstRect = firstCell.getBoundingClientRect();
    const lastRect = lastCell.getBoundingClientRect();
    const boardRect = board.getBoundingClientRect();

    const x1 = firstRect.left + firstRect.width / 2 - boardRect.left;
    const y1 = firstRect.top + firstRect.height / 2 - boardRect.top;
    const x2 = lastRect.left + lastRect.width / 2 - boardRect.left;
    const y2 = lastRect.top + lastRect.height / 2 - boardRect.top;

    const length = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
    const angle = Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;

    winningLine.style.width = `${length}px`;
    winningLine.style.transform = `translate(${x1}px, ${y1}px) rotate(${angle}deg)`;
    winningLine.style.transformOrigin = "0 50%";
    winningLine.style.display = 'block';
}

function restartGame() {
    currentPlayer = 'X';
    gameActive = true;
    gameState = ["", "", "", "", "", "", "", "", ""];
    statusText.innerText = "Player X's Turn";
    cells.forEach(cell => {
        cell.classList.remove('x', 'o');
    });
    winningLine.style.display = 'none';
}

// AI Logic (Minimax)
function makeAiMove() {
    if (!gameActive) return;
    
    let bestScore = -Infinity;
    let move;
    
    for (let i = 0; i < 9; i++) {
        if (gameState[i] === "") {
            gameState[i] = 'O';
            let score = minimax(gameState, 0, false);
            gameState[i] = "";
            if (score > bestScore) {
                bestScore = score;
                move = i;
            }
        }
    }
    
    const cell = document.querySelector(`.cell[data-index="${move}"]`);
    makeMove(cell, move);
}

function minimax(state, depth, isMaximizing) {
    let result = checkWinner(state);
    if (result !== null) {
        return result === 'O' ? 10 - depth : result === 'X' ? depth - 10 : 0;
    }

    if (isMaximizing) {
        let bestScore = -Infinity;
        for (let i = 0; i < 9; i++) {
            if (state[i] === "") {
                state[i] = 'O';
                let score = minimax(state, depth + 1, false);
                state[i] = "";
                bestScore = Math.max(score, bestScore);
            }
        }
        return bestScore;
    } else {
        let bestScore = Infinity;
        for (let i = 0; i < 9; i++) {
            if (state[i] === "") {
                state[i] = 'X';
                let score = minimax(state, depth + 1, true);
                state[i] = "";
                bestScore = Math.min(score, bestScore);
            }
        }
        return bestScore;
    }
}

function checkWinner(state) {
    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        if (state[a] && state[a] === state[b] && state[a] === state[c]) {
            return state[a];
        }
    }
    if (!state.includes("")) return 'draw';
    return null;
}

// Event Listeners
cells.forEach(cell => cell.addEventListener('click', handleCellClick));
restartBtn.addEventListener('click', restartGame);

pvpBtn.addEventListener('click', () => {
    gameMode = 'pvp';
    pvpBtn.classList.add('active');
    pvaBtn.classList.remove('active');
    restartGame();
});

pvaBtn.addEventListener('click', () => {
    gameMode = 'pva';
    pvaBtn.classList.add('active');
    pvpBtn.classList.remove('active');
    restartGame();
});
