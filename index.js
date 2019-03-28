// Main starting point of our application

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const http = require('http');
const router = require('./router');
const mongoose = require('mongoose');
const passport = require('passport');

// DB setup
const DB_URL = 'mongodb://localhost/auth';
mongoose.connect(DB_URL, { useNewUrlParser: true });
mongoose.connection.once('open', () => console.log('\x1b[32m%s\x1b[0m', `Successfully connect to DB at ${DB_URL}`));
mongoose.connection.on('error', () => console.error('\x1b[31m%s\x1b[0m', `Ooops! Can not connect to DB at ${DB_URL}`));

// App Setup
app.use(morgan('combined'));
app.use(bodyParser.json({ type: '*/*' }));

// Config passport jwt strategy
// app.use(passport.initialize());
require('./services/passport');

// Routing
router(app);

// Server Setup
const port = process.env.PORT || 3090;
const server = http.createServer(app);
server.listen(port, () => {
    console.log('Server is listening on port', port);
})