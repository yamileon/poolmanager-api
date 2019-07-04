let mongoose = require('mongoose');

exports.usersSchema = new mongoose.Schema({
    fname: String,
    lname: String,
    gamesPlayed: {
        type: Number,
        default: 0
    },
    wins: {
        type: Number,
        default: 0
    },
    losses: {
        type: Number,
        default: 0
    },
    winstreak: {
        type: Number,
        default: 0
    },
    rank: {
        type: Number,
        default: 0
    }
});

exports.queueSchema = new mongoose.Schema({
    counter: {
        type: Number,
        unique: true,
        index: true
    },
    player1name: {
        type: String,
        required: true,
        unique: true
    },
    player2name: {
        type: String,
        required: true,
        unique: true
    },
    gameRules: Number
});

exports.rulesetSchema = new mongoose.Schema({
    link: String
});

exports.championSchema = new mongoose.Schema({
    fname: String,
    lname: String,
    currentWinStreak: Number,
    recentTournyWinner: { fname: String, lname: String },
    tourmentWinStreak: Number
});

exports.queueModel = mongoose.model(
    'queue',
    this.queueSchema
);

exports.userModel = mongoose.model(
    'users',
    this.usersSchema
);

exports.ruleModel = mongoose.model(
    'rulesets',
    this.rulesetSchema
);

exports.championModel = mongoose.model(
    'champions',
    this.championSchema
);