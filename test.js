var sch = require('./schmeas/sch')
let mong = require('mongoose');

mong.connect('mongodb://localhost/qac', { useNewUrlParser: true }, (err) => {
    if (err) { console.log(err); }
    else
        console.log('connected');
});

var myModel = sch.queues;


var app = express();
app.use(express.json());

app.post('/addQueue', async (req, res, next) => {
    try {
        const queue = new myModel({
            p1name: "Danny",
            p2name: "Sully",
            gameRules: 2
        });

        const newQueue = await queue.save();
        console.log(newQueue);
        res.send(newQueue);

    }catch(e){
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