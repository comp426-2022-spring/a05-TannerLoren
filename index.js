// Place your server entry point code here
const args = require('minimist')(process.argv.slice(2))
args['port']
const port = args['port'] || process.env.PORT || 5000

var express = require('express');
var app = express()

app.use(express.static('./public'));