const express = require('express');
const { startGame, makeMove } = require('../controllers/gameController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/start-game', authMiddleware, startGame);
router.post('/make-move', authMiddleware, makeMove);

module.exports = router;
