'use strict';

/**
 * Created by Dino on 1/6/2017.
 */



// var express = require("express");
// var app = express();
var debug = require('debug')('ExamQuestionMEAN2b:server');
var http = require('http');
const cluster = require("cluster");
const numCPUs = require('os').cpus().length;
var appjs = require('./app');


/**
 * Get port from environment and store in Express.
 */

var port = normalizePort(process.env.PORT || '3000');
appjs.set('port', port);

/**
 * Create HTTP server.
 */

var server = http.createServer(appjs);

/**
 * Listen on provided port, on all network interfaces.
 */

if (cluster.isMaster) {
    console.log(`Master ${process.pid} is running`);

    // Fork workers.
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }

    cluster.on('exit', (worker, code, signal) => {
        console.log(`worker ${worker.process.pid} died`);
        if (worker.exitedAfterDisconnect === true) {
            console.log('Oh, it was just voluntary – no need to worry');
        }
    });
}
else {

    server.listen(port);
    console.log(`Worker ${process.pid} started and listening to ${port}`);
    // server.on('error', onError);
    // server.on('listening', onListening);
}

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
    var port = parseInt(val, 10);

    if (isNaN(port)) {
        // named pipe
        return val;
    }

    if (port >= 0) {
        // port number
        return port;
    }

    return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    var bind = typeof port === 'string'
        ? 'Pipe ' + port
        : 'Port ' + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
    var addr = server.address();
    var bind = typeof addr === 'string'
        ? 'pipe ' + addr
        : 'port ' + addr.port;
    debug('Listening on ' + bind);
}


// app.use('/', appjs);




