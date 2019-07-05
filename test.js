var sch = require('./schemas/sch')
let mong = require('mongoose');
let express=require('express');

mong.connect('mongodb://localhost:27017/27017', { useNewUrlParser: true }, (err) => {
    if (err) { console.log(err); }
    else
        console.log('connected');
});





var app = express();
app.use(express.json());

app.update('/update', async (req, res) => {
    const docs = await sch.queueModel.updateOne({player1name:"Danny"}, {player1name:"Jay" ); //Value of the record wanted to be deleted
    res.send(docs);
})

app.use((err, _req, res, _next) => {
    console.error(err);
return res.status(500).send(err);
});


app.listen(8080, () => {
console.log('Listening on port 8080');
});
