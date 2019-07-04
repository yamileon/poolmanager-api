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

router.get('/byFirstName', (req, res) =>
    paramHandler(req, res, ['firstName'], () => {
        const { firstName } = req.query;
        console.log(firstName);
        return sch.userModel.find({ fname: firstName }).then(
            doc => res.send(doc),
            error => res.send(500).send(error)
        );
    })
);

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
});

router.put('/updateUser/:fname/:newUsername',async (req,res,next) => {
    try{
        console.log("1",req.params);
        const {fname, newUsername} = req.params;
        //const user = sch.userModel.find({fname}).select();
        //console.log("2",user);
        //const id = utils.toObjectId(fname);
        //const id = {_id} = user;
        //id = utils.toObjectId(id);
        //const id = user;
        updateName = `{ fname : ${newUsername} }`;
        //console.log("3",updateName);

        return sch.userModel.findOneAndUpdate({ fname: fname }, { $set : { fname: newUsername}}).then((user) => {
            console.log(user);
            // user.fname = newUsername;
            // console.log("fname", user.fname);
            // ;
            return sch.userModel.findOne({fname: newUsername}).then((updatedUser) => {
                return res.send(updatedUser),console.log("returned ", updatedUser);
            })
            
        });
    } catch (exception) {
        return next({message: exception.message});
    }
});

module.exports = router;