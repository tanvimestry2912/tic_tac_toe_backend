const Game = require('../models/gameModel');
const User = require('../models/User');

// Start a new game
exports.startGame = async (req, res) => {
    const { player2Id } = req.body;
    const player1Id = req.userId;

    const game = new Game({
        player1: player1Id,
        player2: player2Id,
        board: [['', '', ''], ['', '', ''], ['', '', '']],
        currentPlayer: 'player1',
        status: 'ongoing',
        moves: [],
    });

    await game.save();
    res.status(201).json({ gameId: game._id });
};

// Make a move
exports.makeMove = async (req, res) => {
    const { gameId, position } = req.body;
    const game = await Game.findById(gameId);

    if (!game || game.status !== 'ongoing') return res.status(400).json({ error: "Invalid game" });

    const currentPlayer = req.userId === game.player1.toString() ? 'player1' : 'player2';
    if (game.currentPlayer !== currentPlayer) return res.status(400).json({ error: "It's not your turn" });

    const row = Math.floor(position / 3);
    const col = position % 3;
    if (game.board[row][col] !== '') return res.status(400).json({ error: "Spot already taken" });

    game.board[row][col] = currentPlayer === 'player1' ? 'X' : 'O';
    game.moves.push({ player: req.userId, position, timestamp: new Date() });

    game.currentPlayer = currentPlayer === 'player1' ? 'player2' : 'player1';
    const winner = checkWinner(game.board);
    if (winner) {
        game.status = 'completed';
        game.winner = winner === 'X' ? game.player1 : game.player2;
    }

    await game.save();
    res.status(200).json(game);
};

// Check winner (simple check)
function checkWinner(board) {
    const winningCombinations = [
        [[0, 0], [0, 1], [0, 2]],
        [[1, 0], [1, 1], [1, 2]],
        [[2, 0], [2, 1], [2, 2]],
        [[0, 0], [1, 0], [2, 0]],
        [[0, 1], [1, 1], [2, 1]],
        [[0, 2], [1, 2], [2, 2]],
        [[0, 0], [1, 1], [2, 2]],
        [[0, 2], [1, 1], [2, 0]],
    ];
    for (let combo of winningCombinations) {
        const [a, b, c] = combo;
        if (board[a[0]][a[1]] && board[a[0]][a[1]] === board[b[0]][b[1]] && board[b[0]][b[1]] === board[c[0]][c[1]]) {
            return board[a[0]][a[1]];  // 'X' or 'O'
        }
    }
    return null;
}
