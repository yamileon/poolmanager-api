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

router.post('/create', async(req, res, next) => {
    const newUser = new sch.userModel(req.body);
    const check = await sch.userModel.findOne({username: newUser.username});
    if(check) {
        res.status(409).send({});
    }
    else {
        console.log(req.body)
        // return res.send(200)
        return newUser.save().then(
            doc => res.status(201).send(doc),
            error => next(error)
        );
    }
});

router.get('/byUsername', (req, res) =>{
        const {username} = req.query;        
        return sch.userModel.find({username}).then(
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
});

router.put('/updateUser/:fname/:newUsername',async (req,res,next) => {
    try{
        const {fname, newUsername} = req.params;
        return sch.userModel.findOneAndUpdate({ fname: fname }, { $set : { fname: newUsername}}).then((user) => {
            return sch.userModel.findOne({fname: newUsername}).then((updatedUser) => {
                return res.send(updatedUser),console.log("returned ", updatedUser);
            })
            
        });
    } catch (exception) {
        return next({message: exception.message});
    }
});

module.exports = router;