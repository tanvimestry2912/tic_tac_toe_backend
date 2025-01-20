const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
    player1: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    player2: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    board: [[String]],
    currentPlayer: { type: String },
    status: { type: String, enum: ['ongoing', 'completed'] },
    winner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    moves: [{ player: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, position: Number, timestamp: Date }],
}, { timestamps: true });

module.exports = mongoose.model('Game', gameSchema);
