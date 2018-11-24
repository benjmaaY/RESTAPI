const express = require('express');
const morgan = require('morgan')
const app = express();
const path = require('path')
const { mongoose } = require('./database')
//to start type nodemon server.js // to start front-end type npm start in another terminal
//Settings
app.set('port', 5000)
//Middleware
app.use(morgan('dev'));
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, DELETE, PUT')
    next();
});
app.use(express.json())

//Routes
app.use('/api/tasks', require('./routes/task.routes'))

//Static Files
app.use('/', express.static(path.join(__dirname, '/routes')))

const port = 5000

//Starting Server
app.listen(port, () => {
    console.log('server started on port' + ' ' + port)
})