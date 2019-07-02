var sch = require('./schmeas/sch')
let mong = require('mongoose');

mong.connect('mongodb://localhost/qac', { useNewUrlParser: true }, (err) => {
    if (err) { console.log(err); }
    else
        console.log('connected');
});


let test = new sch.rulesets({
    link:'redx'
})

test.save()