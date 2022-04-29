// Place your server entry point code here
const args = require('minimist')(process.argv.slice(2))
args['port']
const port = args['port'] || process.env.PORT || 5000