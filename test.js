var sch = require('./schemas/sch')
let mong = require('mongoose');
let express = require('express');
var cors = require('cors');

mong.connect('mongodb://localhost:27017/test', { useNewUrlParser: true }, (err) => {
    if (err) { console.log(err); }
    else
        console.log('connected');
});




var app = express();
app.use(cors());
app.use(express.json());

app.get('/get', async (req, res) => {
    const docs = await sch.queueModel.find();
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

app.use((err, _req, res, _next) => {
    console.error(err);
    return res.status(500).send(err);
});


app.listen(8080, () => {
    console.log('Listening on port 8080');
});