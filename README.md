# Tic Tac Toe

A simple Tic Tac Toe game built with vanilla HTML, CSS, and JavaScript. Play against a friend or challenge an AI opponent powered by the Minimax algorithm.

## About

This is a fully client-side Tic Tac Toe game with a clean, simple UI. It runs directly in the browser with no build tools, frameworks, or dependencies — just open `index.html` and play.

## Features

- Two modes: Player vs Player and Player vs AI
- AI uses the Minimax algorithm, so it never loses
- Winning line is drawn across the winning cells
- Responsive layout for desktop and mobile
- Restart button, and switching modes auto-restarts the game

## How to Play

1. Open the game in your browser.
2. Choose a mode:
   - **P v P** — two players take turns on the same device.
   - **P v AI** — you play as **X** and the computer plays as **O**.
3. Click any empty cell to place your mark.
4. The first player to line up three marks in a row, column, or diagonal wins.
5. If all nine cells are filled with no winner, the game ends in a draw.
6. Click **Restart Game** to play again.

## Tech Stack

| Technology | Purpose |
| ---------- | ------- |
| HTML5 | Page structure and game board |
| CSS3 | Styling and responsive layout |
| JavaScript (ES6) | Game logic, win detection, and Minimax AI |

## Project Structure

```
Tic-Tac-Toe/
├── index.html    # Page structure and game board
├── style.css     # Styling and responsive rules
├── script.js     # Game logic and Minimax AI
└── README.md     # Project documentation
```

## Getting Started

No installation or build step required.

Clone the repository and open `index.html` in your browser:

```bash
git clone https://github.com/shariqshahidofficial-coder/Tic-Tac-Toe.git
cd Tic-Tac-Toe
```

Or run a local server:

```bash
python -m http.server 8000
```

Then visit `http://localhost:8000`.

## How the AI Works

The AI uses the Minimax algorithm, a decision-making algorithm commonly used in two-player turn-based games.

- It simulates every possible future move from the current board state.
- Winning moves are scored positively, losing moves negatively, and draws as zero.
- It assumes both players play optimally and picks the move that maximizes its own score while minimizing the opponent's.
- Because it explores the entire game tree, the AI never loses — your best possible result is a draw.

## Author

**Shariq Shahid**

- GitHub: [@shariqshahidofficial-coder](https://github.com/shariqshahidofficial-coder)
