// POST /players
exports.create = (req, res) => {
    let alley = req.app.get('alley'),
        gameId = parseInt(req.body.gameId),
        game = alley.getGame(gameId),
        playerName = req.body.name,
        player = null,
        message = null,
        status = 400;

    if (game == null) {
        message = `Unable to read game ${gameId}`;
    } else {
        player = game.addPlayer(playerName);
    }
    if (player == null) {
        message = `Unable to add player ${playerName}`;
    } else {
        message = `Player ${playerName} added to game ${gameId}`;
        status = 201;
    }

    res.status(status).json({
        message: message,
        player: player
    });
};

// DELETE /players/:gameId/:name
exports.delete = (req, res) => {
    let alley = req.app.get('alley'),
        gameId = parseInt(req.params.gameId),
        game = alley.getGame(gameId),
        playerName = req.params.name,
        message = null,
        status = 400;

    if (game == null) {
        message = `Game ${gameId} not found`;
    } else {
        if (game.deletePlayer(playerName)) {
            message = `Player ${playerName} deleted from game ${gameId} successfully`;
            status = 200;
        } else {
            message = `Unable to delete player ${playerName} from game ${gameId}`;
        }
    }

    res.status(status).json({
        message: message
    });
};

// POST /players/throw
exports.throw = (req, res) => {
    let alley = req.app.get('alley'),
        gameId = parseInt(req.body.gameId),
        game = alley.getGame(gameId),
        playerName = req.body.name,
        player = null,
        pins = req.body.pins,
        message = null,
        status = 400;

    if (game == null) {
        message = `Unable to read game ${gameId}`;
    } else {
        player = game.getPlayer(playerName)
    }
    if (player == null) {
        message = `Unable to read player ${playerName} for game ${gameId}`;
    } else if (player.gameFinished()) {
        message = `Game ${gameId} is complete for player ${playerName}`;
    } else if (pins == null || pins < 1 || pins > 10) {
        message = `Pins must be greater than 0 and less than 10`;
    } else {
        let frame = player.frames[player.currentFrame - 1],
            firstThrow = frame.throws[0],
            secondThrow = frame.throws[1];
        if (player.currentFrame !== 10 && ((firstThrow + pins) > 10)) {
            message = 'Pins can\'t total more than 10 (unless it\'s the last frame)';
        } else if (player.currentFrame === 10 && ((firstThrow + secondThrow + pins) > 30)) {
            message = 'Pins in the last frame can\'t total more than 30';
        } else {
            player.updateScore(pins);
            message = `Throw created for player ${playerName}`;
            status = 201;
        }
    }

    res.status(status).json({
        message: message,
        player: player
    });
};