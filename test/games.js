const app = require('../app.js'),
    chai = require('chai'),
    chaiHttp = require('chai-http'),
    Game = require('../models/game'),
    Player = require('../models/player');

chai.should();
chai.use(chaiHttp);

describe('/games', () => {

    before(() => {
        let alley = app.get('alley');

        for (let i = 1; i <= 5; i++) {
            alley.games.push(new Game(i));
        }
        alley.games[0].players.push(new Player('Joe'));
    });

    // POST /games
    it('should create a new game', () => {
        return chai.request(app)
            .post('/games')
            .then((res) => {
                res.should.be.json;
                res.should.have.status(201);
                res.body.should.be.an('object');

                res.body.should.have.property('message');
                res.body.message.should.be.a('string');
                res.body.message.should.be.eql('Game 6 created successfully');

                res.body.should.have.property('game');
                res.body.game.should.be.an('object');

                res.body.game.should.have.property('id');
                res.body.game.id.should.be.a('number');
                res.body.game.id.should.be.eql(6);

                res.body.game.should.have.property('players');
                res.body.game.players.should.be.an('array');
                res.body.game.players.length.should.be.eql(0);
            });
    });

    // GET /games
    it('should read all games in an alley', () => {
        return chai.request(app)
            .get('/games')
            .then((res) => {
                res.should.be.json;
                res.should.have.status(200);
                res.body.should.be.an('object');

                res.body.should.have.property('message');
                res.body.message.should.be.a('string');
                res.body.message.should.be.eql('Games read successfully');

                res.body.should.have.property('games');
                res.body.games.should.be.an('array');
                res.body.games.length.should.be.eql(6);

                for (let i = 0; i < res.body.games.length; i++) {
                    let game = res.body.games[i];
                    game.should.be.an('object');

                    game.should.have.property('id');
                    game.id.should.be.a('number');
                    game.id.should.be.eql(i + 1);

                    game.should.have.property('players');
                    game.players.should.be.an('array');
                    if (i === 0) {
                        game.players.length.should.be.eql(1);
                    } else {
                        game.players.length.should.be.eql(0);
                    }
                }
            })
    });

    // GET /games/:gameId
    it('should read a game for a valid gameId', () => {
        return chai.request(app)
            .get('/games/1')
            .then((res) => {
                res.should.be.json;
                res.should.have.status(200);
                res.body.should.be.an('object');

                res.body.should.have.property('message');
                res.body.message.should.be.a('string');
                res.body.message.should.be.eql('Game id 1 read successfully');

                res.body.should.have.property('game');
                res.body.game.should.be.an('object');

                res.body.game.should.have.property('id');
                res.body.game.id.should.be.a('number');
                res.body.game.id.should.be.eql(1);

                res.body.game.should.have.property('players');
                res.body.game.players.should.be.an('array');
                res.body.game.players.length.should.be.eql(1);
            })
    });

    // GET /games/:gameId/players
    it('should read all players for a valid gameId', () => {
        return chai.request(app)
            .get('/games/1/players')
            .then((res) => {
                res.should.be.json;
                res.should.have.status(200);
                res.body.should.be.an('object');

                res.body.should.have.property('message');
                res.body.message.should.be.a('string');
                res.body.message.should.be.eql('Players for game id 1 read successfully');

                res.body.should.have.property('players');
                res.body.players.should.be.an('array');
                res.body.players.length.should.be.eql(1);
            })
    });

    // GET /games/:gameId/player/:name
    it('should read a player for a valid gameId and name', () => {
        return chai.request(app)
            .get('/games/1/player/Joe')
            .then((res) => {
                res.should.be.json;
                res.should.have.status(200);
                res.body.should.be.an('object');

                res.body.should.have.property('message');
                res.body.message.should.be.a('string');
                res.body.message.should.be.eql('Player Joe for game id 1 read successfully');

                res.body.should.have.property('player');
                res.body.player.should.be.an('object');
            })
    });

    // DELETE /games/:gameId
    it('should delete a game for a valid gameId', () => {
        return chai.request(app)
            .delete('/games/6')
            .then((res) => {
                res.should.be.json;
                res.should.have.status(200);
                res.body.should.be.an('object');

                res.body.should.have.property('message');
                res.body.message.should.be.a('string');
                res.body.message.should.be.eql('Game 6 deleted successfully');
            })
    });

    after(() => {
        let alley = app.get('alley');

        alley.games = [];
    });

});
