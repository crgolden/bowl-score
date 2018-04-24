const app = require('../app.js'),
    chai = require('chai'),
    chaiHttp = require('chai-http'),
    Game = require('../models/game'),
    Player = require('../models/player');

chai.should();
chai.use(chaiHttp);

describe('/players', () => {

    before(() => {
        let alley = app.get('alley'),
            game = new Game(1),
            steve = new Player('Steve'),
            linda = new Player('Linda'),
            bob = new Player('Bob');

        // Using test values from sample found at
        // https://www.thoughtco.com/bowling-scoring-420895
        steve.updateScore(10);
        steve.updateScore(7);
        steve.updateScore(3);
        steve.updateScore(7);
        steve.updateScore(2);
        steve.updateScore(9);
        steve.updateScore(1);
        steve.updateScore(10);
        steve.updateScore(10);
        steve.updateScore(10);
        steve.updateScore(2);
        steve.updateScore(3);
        steve.updateScore(6);
        steve.updateScore(4);
        steve.updateScore(7);
        steve.updateScore(3);

        game.players.push(steve);
        game.players.push(linda);
        game.players.push(bob);

        alley.games.push(game);
    });

    // POST /players
    it('should create a new player with valid gameId and name', () => {
        return chai.request(app)
            .post('/players')
            .send({gameId: 1, name: 'Tammy'})
            .then((res) => {
                res.should.be.json;
                res.should.have.status(201);
                res.body.should.be.an('object');

                res.body.should.have.property('message');
                res.body.message.should.be.a('string');
                res.body.message.should.be.eql('Player Tammy added to game 1');

                res.body.should.have.property('player');
                res.body.player.should.be.an('object');

                res.body.player.should.have.property('name');
                res.body.player.name.should.be.a('string');
                res.body.player.name.should.be.eql('Tammy');

                res.body.player.should.have.property('frames');
                res.body.player.frames.should.be.an('array');
                res.body.player.frames.length.should.be.eql(10);

                res.body.player.should.have.property('currentFrame');
                res.body.player.currentFrame.should.be.a('number');
                res.body.player.currentFrame.should.be.eql(1);

                res.body.player.should.have.property('currentThrow');
                res.body.player.currentThrow.should.be.a('number');
                res.body.player.currentThrow.should.be.eql(1);

                res.body.player.should.have.property('scores');
                res.body.player.scores.should.be.an('array');
                res.body.player.scores.length.should.be.eql(10);
            });
    });

    // POST /players/throw
    it('should create a new throw with valid gameId, name, and pins', () => {
        return chai.request(app)
            .post('/players/throw')
            .send({gameId: 1, name: 'Steve', pins: 3})
            .then((res) => {
                res.should.be.json;
                res.should.have.status(201);
                res.body.should.be.an('object');

                res.body.should.have.property('message');
                res.body.message.should.be.a('string');
                res.body.message.should.be.eql('Throw created for player Steve');

                res.body.should.have.property('player');
                res.body.player.should.be.an('object');

                res.body.player.should.have.property('name');
                res.body.player.name.should.be.a('string');
                res.body.player.name.should.be.eql('Steve');

                res.body.player.should.have.property('frames');
                res.body.player.frames.should.be.an('array');
                res.body.player.frames.length.should.be.eql(10);

                let frame1 = res.body.player.frames[0];
                frame1.should.be.an('object');
                frame1.should.have.property('throws');
                frame1.throws.should.be.an('array');
                frame1.throws[0].should.be.eql(10);
                frame1.throws[1].should.be.eql(0);
                frame1.throws[2].should.be.eql(0);
                frame1.should.have.property('score');
                frame1.score.should.be.a('number');
                frame1.score.should.be.eql(20);
                frame1.should.have.property('spare');
                frame1.spare.should.be.a('boolean');
                frame1.spare.should.be.eql(false);
                frame1.should.have.property('strike');
                frame1.strike.should.be.a('boolean');
                frame1.strike.should.be.eql(true);

                let frame2 = res.body.player.frames[1];
                frame2.should.be.an('object');
                frame2.should.have.property('throws');
                frame2.throws.should.be.an('array');
                frame2.throws[0].should.be.eql(7);
                frame2.throws[1].should.be.eql(3);
                frame2.throws[2].should.be.eql(0);
                frame2.should.have.property('score');
                frame2.score.should.be.a('number');
                frame2.score.should.be.eql(17);
                frame2.should.have.property('spare');
                frame2.spare.should.be.a('boolean');
                frame2.spare.should.be.eql(true);
                frame2.should.have.property('strike');
                frame2.strike.should.be.a('boolean');
                frame2.strike.should.be.eql(false);

                let frame3 = res.body.player.frames[2];
                frame3.should.be.an('object');
                frame3.should.have.property('throws');
                frame3.throws.should.be.an('array');
                frame3.throws[0].should.be.eql(7);
                frame3.throws[1].should.be.eql(2);
                frame3.throws[2].should.be.eql(0);
                frame3.should.have.property('score');
                frame3.score.should.be.a('number');
                frame3.score.should.be.eql(9);
                frame3.should.have.property('spare');
                frame3.spare.should.be.a('boolean');
                frame3.spare.should.be.eql(false);
                frame3.should.have.property('strike');
                frame3.strike.should.be.a('boolean');
                frame3.strike.should.be.eql(false);

                let frame4 = res.body.player.frames[3];
                frame4.should.be.an('object');
                frame4.should.have.property('throws');
                frame4.throws.should.be.an('array');
                frame4.throws[0].should.be.eql(9);
                frame4.throws[1].should.be.eql(1);
                frame4.throws[2].should.be.eql(0);
                frame4.should.have.property('score');
                frame4.score.should.be.a('number');
                frame4.score.should.be.eql(20);
                frame4.should.have.property('spare');
                frame4.spare.should.be.a('boolean');
                frame4.spare.should.be.eql(true);
                frame4.should.have.property('strike');
                frame4.strike.should.be.a('boolean');
                frame4.strike.should.be.eql(false);

                let frame5 = res.body.player.frames[4];
                frame5.should.be.an('object');
                frame5.should.have.property('throws');
                frame5.throws.should.be.an('array');
                frame5.throws[0].should.be.eql(10);
                frame5.throws[1].should.be.eql(0);
                frame5.throws[2].should.be.eql(0);
                frame5.should.have.property('score');
                frame5.score.should.be.a('number');
                frame5.score.should.be.eql(30);
                frame5.should.have.property('spare');
                frame5.spare.should.be.a('boolean');
                frame5.spare.should.be.eql(false);
                frame5.should.have.property('strike');
                frame5.strike.should.be.a('boolean');
                frame5.strike.should.be.eql(true);

                let frame6 = res.body.player.frames[5];
                frame6.should.be.an('object');
                frame6.should.have.property('throws');
                frame6.throws.should.be.an('array');
                frame6.throws[0].should.be.eql(10);
                frame6.throws[1].should.be.eql(0);
                frame6.throws[2].should.be.eql(0);
                frame6.should.have.property('score');
                frame6.score.should.be.a('number');
                frame6.score.should.be.eql(22);
                frame6.should.have.property('spare');
                frame6.spare.should.be.a('boolean');
                frame6.spare.should.be.eql(false);
                frame6.should.have.property('strike');
                frame6.strike.should.be.a('boolean');
                frame6.strike.should.be.eql(true);

                let frame7 = res.body.player.frames[6];
                frame7.should.be.an('object');
                frame7.should.have.property('throws');
                frame7.throws.should.be.an('array');
                frame7.throws[0].should.be.eql(10);
                frame7.throws[1].should.be.eql(0);
                frame7.throws[2].should.be.eql(0);
                frame7.should.have.property('score');
                frame7.score.should.be.a('number');
                frame7.score.should.be.eql(15);
                frame7.should.have.property('spare');
                frame7.spare.should.be.a('boolean');
                frame7.spare.should.be.eql(false);
                frame7.should.have.property('strike');
                frame7.strike.should.be.a('boolean');
                frame7.strike.should.be.eql(true);

                let frame8 = res.body.player.frames[7];
                frame8.should.be.an('object');
                frame8.should.have.property('throws');
                frame8.throws.should.be.an('array');
                frame8.throws[0].should.be.eql(2);
                frame8.throws[1].should.be.eql(3);
                frame8.throws[2].should.be.eql(0);
                frame8.should.have.property('score');
                frame8.score.should.be.a('number');
                frame8.score.should.be.eql(5);
                frame8.should.have.property('spare');
                frame8.spare.should.be.a('boolean');
                frame8.spare.should.be.eql(false);
                frame8.should.have.property('strike');
                frame8.strike.should.be.a('boolean');
                frame8.strike.should.be.eql(false);

                let frame9 = res.body.player.frames[8];
                frame9.should.be.an('object');
                frame9.should.have.property('throws');
                frame9.throws.should.be.an('array');
                frame9.throws[0].should.be.eql(6);
                frame9.throws[1].should.be.eql(4);
                frame9.throws[2].should.be.eql(0);
                frame9.should.have.property('score');
                frame9.score.should.be.a('number');
                frame9.score.should.be.eql(17);
                frame9.should.have.property('spare');
                frame9.spare.should.be.a('boolean');
                frame9.spare.should.be.eql(true);
                frame9.should.have.property('strike');
                frame9.strike.should.be.a('boolean');
                frame9.strike.should.be.eql(false);

                let frame10 = res.body.player.frames[9];
                frame10.should.be.an('object');
                frame10.should.have.property('throws');
                frame10.throws.should.be.an('array');
                frame10.throws[0].should.be.eql(7);
                frame10.throws[1].should.be.eql(3);
                frame10.throws[2].should.be.eql(3);
                frame10.should.have.property('score');
                frame10.score.should.be.a('number');
                frame10.score.should.be.eql(13);
                frame10.should.have.property('spare');
                frame10.spare.should.be.a('boolean');
                frame10.spare.should.be.eql(true);
                frame10.should.have.property('strike');
                frame10.strike.should.be.a('boolean');
                frame10.strike.should.be.eql(false);

                res.body.player.should.have.property('currentFrame');
                res.body.player.currentFrame.should.be.a('number');
                res.body.player.currentFrame.should.be.eql(10);

                res.body.player.should.have.property('currentThrow');
                res.body.player.currentThrow.should.be.a('number');
                res.body.player.currentThrow.should.be.eql(4);

                res.body.player.should.have.property('scores');
                res.body.player.scores.should.be.an('array');
                res.body.player.scores.length.should.be.eql(10);
                res.body.player.scores[0].should.be.a('number');
                res.body.player.scores[0].should.be.eql(20);
                res.body.player.scores[1].should.be.a('number');
                res.body.player.scores[1].should.be.eql(37);
                res.body.player.scores[2].should.be.a('number');
                res.body.player.scores[2].should.be.eql(46);
                res.body.player.scores[3].should.be.a('number');
                res.body.player.scores[3].should.be.eql(66);
                res.body.player.scores[4].should.be.a('number');
                res.body.player.scores[4].should.be.eql(96);
                res.body.player.scores[5].should.be.a('number');
                res.body.player.scores[5].should.be.eql(118);
                res.body.player.scores[6].should.be.a('number');
                res.body.player.scores[6].should.be.eql(133);
                res.body.player.scores[7].should.be.a('number');
                res.body.player.scores[7].should.be.eql(138);
                res.body.player.scores[8].should.be.a('number');
                res.body.player.scores[8].should.be.eql(155);
                res.body.player.scores[9].should.be.a('number');
                res.body.player.scores[9].should.be.eql(168);
            });
    });

    // DELETE /players/:gameId/:name
    it('should delete a player for a valid gameId and name', () => {
        return chai.request(app)
            .delete('/players/1/Tammy')
            .then((res) => {
                res.should.be.json;
                res.should.have.status(200);
                res.body.should.be.an('object');

                res.body.should.have.property('message');
                res.body.message.should.be.a('string');
                res.body.message.should.be.eql('Player Tammy deleted from game 1 successfully');
            })
    });

    after(() => {
        let alley = app.get('alley');

        alley.games = [];
    });
});
