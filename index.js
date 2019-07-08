var mongoose = require('mongoose');
var express = require('express');
var config = require('./config');
var UserRoutes = require('./router/user-routes');
var sch = require('./schemas/sch.js')
var cors = require('cors');
var app = express();
var cors = require('cors');

app.use(cors());
app.use(express.json());

app.use('/user', UserRoutes);

app.use((err, req, res, next) => {
    if (config.app.logErrors) {
        console.error(err);
    }
    return res.status(500).send(err);
});


app.get('/get', async (req, res) => {
    const docs = await sch.queueModel.find();
    res.send(docs);
})

app.get('/get-one', async (req, res) => {
    const docs = await sch.queueModel.findById(mongoose.Types.ObjectId(req.query.id));
    res.send(docs);
})

var p1name;

function update(name) {
    p1name = name;
}

app.post('/addQueue', async (req, res, next) => {


    try {
        const q = new sch.queueModel(req.body);
        const newQueue = await q.save();
        //console.log(newQueue);
        res.send(newQueue);

    } catch (e) {
        next(e);
    };
})

app.delete('/delete', async (req, res) => {
    const docs = await sch.queueModel.findByIdAndDelete(mongoose.Types.ObjectId(req.query.id));
    res.send(docs);
})

app.put('/update', async(req, res) => {
    console.log();

    const docs = await sch.queueModel.updateOne(req.body.currentGame,req.body.newGame);

    res.send(docs);
})

app.use((err, _req, res, _next) => {
    console.error(err);
    return res.status(500).send(err);
});


app.listen(8081, () => {
    console.log('Listening on port 8081');
});

mongoose.connect(
    config.app.MONGODB_URI,
    { useNewUrlParser: true })
    .then((res) => {
        console.log('Connection to MongoDB established.');
    }, (error) => {
        console.error('Failed to connect to MongoDB. Exitting.');
        console.error(error);
        process.exit(1);
    }).then(() => {
        // If the connection is successful, set up Express to listen for incoming requests.
        app.listen(config.app.PORT, () => {
            console.log(`Server running on port ${config.app.PORT}`);
        });
    });