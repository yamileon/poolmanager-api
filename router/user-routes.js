var express = require('express');
var router = express.Router();
var sch = require('../schemas/sch');
var paramHandler = require('../handlers/param-handler');
var utils = require('../utils');


router.get('/all', (req, res) => {
    return sch.userModel.find().then((doc) => {
        return res.send(doc);
    });
});

router.post('/create', (req, res, next) => {
    const newUser = new sch.userModel(req.body);
    console.log(req.body)
    // return res.send(200)
    return newUser.save().then(
        doc => res.status(201).send(doc),
        error => next(error)
    );
});

router.get('/byFirstName', (req, res) =>{
        const {fname} = req.query;        
        return sch.userModel.find({fname}).then(
            doc => {
                console.log(doc)
                res.send(doc)
            },
            error => res.sendStatus(400)
        );
    });

router.delete('/deleteUser', (req, res, next) => {
    paramHandler(req, res, ['id'], async () => {
        try {
            const id = utils.toObjectId(req.query.id);
            try {
                await sch.userModel.findByIdAndDelete(id);
                res.status(204).send();
            } catch (exc) {
                next(exc);
            }
        } catch (exc) {
            next({ message: exc.message });
            return;
        }
    })
})

module.exports = router;