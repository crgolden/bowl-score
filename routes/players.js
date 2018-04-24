const express = require('express'),
    router = express.Router(),
    playerController = require('../controllers/playerController');

router.post('/', playerController.create);

router.post('/throw', playerController.throw);

router.delete('/:gameId/:name', playerController.delete);

module.exports = router;