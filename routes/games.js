const express = require('express'),
    router = express.Router(),
    gameController = require('../controllers/gameController');

router.post('/', gameController.create);

router.get('/', gameController.index);

router.get('/:gameId', gameController.read);

router.get('/:gameId/players', gameController.players);

router.get('/:gameId/player/:name', gameController.player);

router.delete('/:gameId', gameController.delete);

module.exports = router;