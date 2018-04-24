const Game = require('./game');

class Alley {
    constructor() {
        this.games = [];
    }

    addGame() {
        let gameId = this.games.length + 1,
            game = new Game(gameId);
        this.games.push(game);
        return game;
    };

    getGame(gameId) {
        if (this.validGameId(gameId)) {
            return this.games.find((game) => {
                return gameId === game.id;
            });
        }
        return null;
    };

    deleteGame(gameId) {
        if (this.validGameId(gameId)) {
            this.games = this.games.filter((game) => {
                return game.id !== gameId;
            });
            return true;
        }
        return false;
    };

    validGameId(gameId) {
        return (gameId != null && (typeof gameId === 'number') && gameId > 0 && (gameId <= this.games.length));
    }
}

module.exports = Alley;
