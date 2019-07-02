let mongoose = require('mongoose');

exports.usersSchema = new mongoose.Schema({
    fname: String,
    lname: String,
    gamesPlayed: Number,
    wins: Number,
    losses: Number,
    winstreak: Number,
    rank: Number
});

exports.queueSchema = new mongoose.Schema({
    p1name: String,
    p2name: String,
    gameRules: Number
})

exports.rulesetSchema = new mongoose.Schema({
    link: String
})

exports.championSchema = new mongoose.Schema({
    fname: String,
    lname: String,
    currentWinStreak: Number,
    recentTournyWinner: { fname: String, lname: String },
    tourmentWinStreak: Number
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