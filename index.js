
var config = require('./config');

var mongoose = require('mongoose');
var express = require('express');
var config = require('./config');
var UserRoutes = require('./routes/user-routes');
var app = express();


// Automatically parse request bodies as JSON
app.use(express.json());

// Routes middleware
app.use('/user', UserRoutes); // Hook the user routes up to '/user'
