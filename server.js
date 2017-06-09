const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// Get our API routes
const api = require('./server/routes/api')

const app = express();
mongoose.connect('localhost:27017/resumes');


// Parsers for Post data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Point static path to dist
app.use(express.static(path.join(__dirname, 'dist')))

// API routes
app.use('/api', api);

// all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

// get port from environment
const port = process.env.PORT || '3000';
app.set('port', port);

// HTTP server
const server = http.createServer(app);

// Listen on port
server.listen(port, () => console.log(`API running on localhost:${port}`));
