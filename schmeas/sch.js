// let mongoose = require('mongoose');

// mongoose.connect('mongodb://localhost/qac', { useNewUrlParser: true }, (err) => {
//     if (err) { console.log(err); }
//     else
//         console.log('connected');
// });

const usersSchema = new mongoose.Schema({
    fname: String,
    lname: String,
    gamesPlayed: Number,
    wins: Number,
    losses: Number,
    winstreak: Number,
    rank: Number
});

const queueSchema = new mongoose.Schema({
    p1name: String,
    p2name: String,
    gameRules: Number
})

const rulesetSchema = new mongoose.Schema({
    link: String
})

const championSchema = new mongoose.Schema({
    fname: String,
    lname: String,
    currentWinStreak: Number,
    recentTournyWinner: { fname: String, lname: String },
    tourmentWinStreak: Number
})

let queues = mongoose.model(
    'queue',
    queueSchema
);

let users = mongoose.model(
    'users',
    usersSchema
);

let rulesets = mongoose.model(
    'rulesets',
    rulesetSchema
);

let champions = mongoose.model(
    'champions',
    championSchema
);
