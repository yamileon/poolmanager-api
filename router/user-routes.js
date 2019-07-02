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
        return sch.userModel.find({ firstName }).then(
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

router.delete('/deleteUserByFirstName/:fname', async (req, res, next) => {
    try{
        console.log(req.params);
        const {fname} = req.params;
        await sch.userModel.findOneAndDelete(fname);
        res.status(204).send();
    }catch (exception){
        return next({message: exception.message});
    }
});

router.put('/updateUser/:fname/:newfname',async (req,res,next) => {
    try{
        console.log(req.params);
        const {fname, newfname} = req.params;
        return sch.userModel.findOneAndUpdate(fname,newfname,(doc) => {
            return res.send(doc),console.log("returned ", doc)
        });
    } catch (exception) {
        return next({message: exception.message});
    }
})

module.exports = router;