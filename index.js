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

    --log, -l   If set to false, no log files are written. Defaults to true.
    Logs are always written to database.

    --help, -h	Return this message and exit.`)
    process.exit(0)
}

const server = app.listen(port, () => { 
    console.log('App listening on port %PORT%'.replace('%PORT%',port))
});

app.use(require('./src/middleware/mymiddleware.js'))

app.use(require('./src/routes/someroutes.js'))

app.get('/app/', (req, res) => { // Define Checkpoint
    // Respond with status 200
    res.statusCode = 200;
    // Respond with status message "OK"
    res.json({
        'message': "Your API works! (200)"
    })
});

if (args['log'] == true) {
    const fs = require('fs');

    const WRITESTREAM = fs.createWriteStream('access.log', { flags: 'a' });
    // Set up the access logging middleware
    app.use(morgan('accesslog', { stream: WRITESTREAM }));
}

if (args['debug'] == true) {
    // Endpoint to return all records in accesslog
    app.get('/app/log/access', (req, res) => {
        const stmt = db.prepare('SELECT * FROM accesslog').all()
        res.statusCode = 200;
        res.json(stmt);
    });

    app.get('/app/error', (req, res) => {
        throw new Error('Error test successful.')
    });
}