var config = require('./config');
var mongoose = require('mongoose');
var express = require('express');
var config = require('./config');
var UserRoutes = require('./router/user-routes');
var schema = require('./schemas/sch')
var app = express();

app.use(express.json());

app.use('/user', UserRoutes);

app.use((err, req, res, next) => {
    if (config.app.logErrors) {
        console.error(err);
    }
    return res.status(500).send(err);
});

mongoose.connect(
    config.app.MONGODB_URI,
    { useNewUrlParser: true })
    .then((res) => {
        console.log('Connection to MongoDB established.');
    }, (error) => {
        console.error('Failed to connect to MongoDB. Exitting.');
        console.error(error);
        process.exit(1);
    }).then(() => {
        // If the connection is successful, set up Express to listen for incoming requests.
        app.listen(config.app.PORT, () => {
            console.log(`Server running on port ${config.app.PORT}`);
        });
    });