/* 
 * get the packages for the application
 */
const express = require('express');
const app = express();
const connection = require('./lib/connection');
//const mongoose = require('mongoose');
const http = require('http');


const server = http.createServer(app);
server.listen(3000, () => {
    console.log('server is listening: ', server.address());
});