const dotenv = require('dotenv');
const mongoose = require('mongoose');
const express = require('express');
//const { default: mongoose } = require('mongoose');
const app = express(); 
const path = require('path');

mongoose.set('strictQuery', true); //removing deprecating warning

dotenv.config({path: './config.env'});

const cookieParser = require('cookie-parser');
app.use(cookieParser ());

//MongoDB
require('./db/conn');

app.use(express.json()); 

//link router files to make app.js less cluttered.
app.use(require('./router/auth'));


//renderer
app.use(express.static(path.join(__dirname, './heuristic-tool/build')));

app.get('*', function(req, res){
    res.sendFile(path.join(__dirname, './heuristic-tool/build/index.html'));
});

//const User = require('./model/userSchema');
const PORT = process.env.PORT || 5000;

//Middleware (checks if user is logged in or not, if not redirects to login page)

//app.listen(port, callback)
app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
});