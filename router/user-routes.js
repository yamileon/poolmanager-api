var express = require('express');
var router = express.Router();
var sch = require('../schemas/sch');
var paramHandler = require('../handlers/param-handler');
var utils = require('../utils');
const yeah = require('lodash');


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
        return sch.userModel.findOne({username}).then(
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

router.put('/updateUser/:username/:newUsername',async (req,res,next) => {
    try{
        const {username, newUsername} = req.params;
        return sch.userModel.findOneAndUpdate({ username: username }, { $set : { username: newUsername}}).then((user) => {
            return sch.userModel.findOne({username: newUsername}).then((updatedUser) => {
                return res.send(updatedUser),console.log("returned ", updatedUser);
            })
            
        });
    } catch (exception) {
        return next({message: exception.message});
    }
});

router.put('/updateUser/:username/',async (req,res,next) => {
    try{
        const {username} = req.params;
        const updatedValues = yeah.pickBy(req.body);
        return sch.userModel.updateOne({ username: username },
            updatedValues
            ,{upsert: true}).then((user) => {
                return sch.userModel.findOne({username: username}).then((updatedUser) => {
                    return res.send(updatedUser),console.log("returned ", updatedUser);
            })
            
        });
    } catch (exception) {
        return next({message: exception.message});
    }
});

router.put('/updateUserInfo/win/:username/',async (req,res,next) => {
    try{
        const {username} = req.params;
        let user = await sch.userModel.findOne({ username: username}).select('wins');
        let { wins } = user;
        wins++;
        return sch.userModel.updateOne({ username: username },
            {wins: wins}
            ,{upsert: true}).then((user) => {
                return sch.userModel.findOne({username: username}).then((updatedUser) => {
                    return res.send(updatedUser),console.log("returned ", updatedUser);
            })
            
        });
    } catch (exception) {
        return next({message: exception.message});
    }
});

router.put('/updateUserInfo/loss/:username/',async (req,res,next) => {
    try{
        const {username} = req.params;
        let user = await sch.userModel.findOne({ username: username}).select('losses');
        let { losses } = user;
        losses++;
        return sch.userModel.updateOne({ username: username },
            {losses: losses}
            ,{upsert: true}).then((user) => {
                return sch.userModel.findOne({username: username}).then((updatedUser) => {
                    return res.send(updatedUser),console.log("returned ", updatedUser);
            })
            
        });
    } catch (exception) {
        return next({message: exception.message});
    }
});

router.put('/updateUserInfo/gamesPlayed/:username/',async (req,res,next) => {
    try{
        const {username} = req.params;
        let user = await sch.userModel.findOne({ username: username}).select('gamesPlayed');
        let { gamesPlayed } = user;
        gamesPlayed++;
        return sch.userModel.updateOne({ username: username },
            {gamesPlayed: gamesPlayed}
            ,{upsert: true}).then((user) => {
                return sch.userModel.findOne({username: username}).then((updatedUser) => {
                    return res.send(updatedUser),console.log("returned ", updatedUser);
            })
            
        });
    } catch (exception) {
        return next({message: exception.message});
    }
});

module.exports = router;