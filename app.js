const express = require('express'),
    bodyParser = require('body-parser'),
    games = require('./routes/games'),
    players = require('./routes/players'),
    Alley = require('./models/alley'),
    app = express();

app.set('alley', new Alley());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/games', games);
app.use('/players', players);

module.exports = app;
