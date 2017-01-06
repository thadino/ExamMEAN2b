'use strict';
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var converter = require("./converter");
var session = require("express-session");


var index = require('./routes/index');
var users = require('./routes/users');

var app = express();



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(session({secret: "llama", cookie: { maxAge: 60000 }, resave: true, saveUninitialized: true}));
app.use(express.static(path.join(__dirname, 'public')));

let testVar = "start value";

var sess;

app.get("/rgbToHex/:red/:green/:blue", function (req, res)
{
    //VIRKER IKKE FØRSTE GANG COS NO COOKIE YET!!!
    console.log("incomming req, her er color: " + req.session.color);
    sess = req.session
    var red = parseInt(req.params.red, 10);
    var green = parseInt(req.params.red, 10);
    var blue = parseInt(req.params.red, 10);
    var hex = converter.rgbToHex(red, green, blue);
    sess.color = hex;
    res.status(200).send(hex);
});

app.get("/hexToRgb", function (req, res)
{
    //VIRKER IKKE FØRSTE GANG COS NO COOKIE YET!!!
    console.log("incomming req, her er color: " + req.session.color);
    sess = req.session
    var hex = req.query.hex;
    var rgb = converter.hexToRgb(hex);
    sess.color = rgb;
    res.status(200).send(JSON.stringify(rgb));
});

app.use('/', index);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function (req, res, next)
{
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function (err, req, res, next)
{
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
