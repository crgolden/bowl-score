// POST /games
exports.create = (req, res) => {
    let alley = req.app.get('alley'),
        game = alley.addGame();

    res.status(201).json({
        message: `Game ${game.id} created successfully`,
        game: game});
};

// GET /games
exports.index = (req, res) => {
    let alley = req.app.get('alley');

    res.status(200).json({
        message: 'Games read successfully',
        games: alley.games
    });
};

// GET /games/:gameId
exports.read = (req, res) => {
    let alley = req.app.get('alley'),
        gameId = parseInt(req.params.gameId),
        game = alley.getGame(gameId),
    message = null,
    status = 400;

    if (game == null) {
        message = `Unable to read game ${gameId}`;
    } else {
        message = `Game id ${gameId} read successfully`;
        status = 200;
    }

    res.status(status).json({
        message: message,
        game: game
    });
};

// GET /games/:gameId/players
exports.players = (req, res) => {
    let alley = req.app.get('alley'),
        gameId = parseInt(req.params.gameId),
        game = alley.getGame(gameId),
        players = null,
        message = null,
        status = 400;

    if (game == null) {
        message = `Unable to read game ${gameId}`;
    } else {
        message = `Players for game id ${gameId} read successfully`;
        players = game.players;
        status = 200;
    }

    res.status(status).json({
        message: message,
        players: players
    });
};

// GET /games/:gameId/player/:name
exports.player = (req, res) => {
    let alley = req.app.get('alley'),
        gameId = parseInt(req.params.gameId),
        game = alley.getGame(gameId),
        playerName = req.params.name,
        player = null,
        message = null,
        status = 400;

    if (game == null) {
        message = `Unable to read game ${gameId}`;
    } else {
        player = game.getPlayer(playerName);
    }
    if (player == null) {
        message = `Unable to read player ${playerName} for game ${gameId}`;
    } else {
        message = `Player ${playerName} for game id ${gameId} read successfully`;
        status = 200;
    }

    res.status(status).json({
        message: message,
        player: player
    });
};

// DELETE /games/:gameId
exports.delete = (req, res) => {
    let alley = req.app.get('alley'),
        gameId = parseInt(req.params.gameId),
        message = null,
        status = 400;

    if (alley.deleteGame(gameId)) {
        message = `Game ${gameId} deleted successfully`;
        status = 200;
    } else {
        message = `Unable to delete game ${gameId}`;
    }

    res.status(status).json({
        message: message
    });
};