var express = require('express');
var router = express.Router();
var Users = require('../schemas/sch');
var paramHandler = require('../handlers/param-handler');
var utils = require('../utils');


router.get('/all', (req, res) => {
    return Users.UserModel.find().then((doc) => {
        return res.send(doc);
    });
});

router.post('/create', (req, res, next) => {
    const newUser = new Users.UserModel(req.body);
    return newUser.save().then(
        doc => res.status(201).send(doc),
        error => next(error)
    );
});

router.get('/byFirstName', (req, res) =>
    paramHandler(req, res, ['firstName'], () => {
        const { firstName } = req.query;
        return Users.UserModel.find({ firstName }).then(
            doc => res.send(doc),
            error => res.send(500).send(error)
        );
    }));

router.delete('/deleteUser', (req, res, next) => {
    paramHandler(req, res, ['id'], async () => {
        try {
            const id = utils.toObjectId(req.query.id);
            try {
                await Users.UserModel.findByIdAndDelete(id);
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