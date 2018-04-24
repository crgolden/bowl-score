const Player = require('./player');

class Game {
    constructor(gameId) {
        this.id = gameId;
        this.players = [];
    }

    addPlayer(playerName) {
        if (Game.validPlayerName(playerName)) {
            let player = this.getPlayer(playerName);
            if (player == null) {
                player = new Player(playerName);
                this.players.push(player);
            }
            return player;
        }
        return null;
    };

    getPlayer(playerName) {
        if (Game.validPlayerName(playerName)) {
            return this.players.find((player) => {
                return playerName === player.name;
            });
        }
    };

    deletePlayer(playerName) {
        if (Game.validPlayerName(playerName)) {
            this.players = this.players.filter((player) => {
                return player.name !== playerName;
            });
            return true;
        }
        return false;
    };

    static validPlayerName(playerName) {
        return (playerName != null && (typeof playerName === 'string') && playerName.length > 0);
    };
}

module.exports = Game;
