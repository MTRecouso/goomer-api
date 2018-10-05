const express = require('express');

const bodyParser=require('body-parser');

const app = express();

const router = require('./routes');

//Import the mongoose module
const mongoose = require('mongoose');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static("public"));

//Set up default mongoose connection
const mongoDB = 'mongodb://mtrecouso:a1b2c3d4@ds259732.mlab.com:59732/goomer_api_db';
mongoose.connect(mongoDB);

// Get Mongoose to use the global promise library
mongoose.Promise = global.Promise;
//Get the default connection
const db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use('/api', router);

app.listen(8080);