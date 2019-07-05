let mongoose = require('mongoose');

exports.usersSchema = new mongoose.Schema({
    username: String,
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
    id:{
        type: Number,
        auto:true
    },
    player1name: {
        type: String,
        required: true,
    },
    player2name: {
        type: String,
        required: true,
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

exports.tournamentSchema = new mongoose.Schema({
    tournamentName: {
        type: String,
        required: true,
        unique: true
    },
    players: [{
        playerName: {
            type: String,
            required: true,
            unique: true
        },
        playerSeed: Number
    }],
    gameQueue: this.queueSchema
})

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

exports.tournamentModel = mongoose.model(
    'tournaments',
    this.tournamentSchema
);