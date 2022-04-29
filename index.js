// Place your server entry point code here
const args = require('minimist')(process.argv.slice(2))
args['port']
const port = args['port'] || process.env.PORT || 5000

var express = require('express');
var app = express()

app.use(express.static('./public'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

if (args['help']) {
    console.log(`index.js [options]
    --port, -p	Set the port number for the server to listen on. Must be an integer
    between 1 and 65535. Defaults to 5000.

    --debug, -d If set to true, creates endlpoints /app/log/access/ which returns
    a JSON access log from the database and /app/error which throws 
    an error with the message "Error test successful." Defaults to 
    false.