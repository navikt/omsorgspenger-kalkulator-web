const express = require('express');
const rateLimit = require('express-rate-limit');
const path = require('path');
const server = express();
const cookieParser = require('cookie-parser')

const limiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 5, 
  message: 'Før mange requests.',
  standardHeaders: true,
  legacyHeaders: false, 
})

server.use(cookieParser);
server.use(express.static(path.join(__dirname, 'build')));

const PORT = process.env.PORT || 8080;

server.get('/isAlive', (req, res) => res.sendStatus(200));
server.get('/isReady', (req, res) => res.sendStatus(200));

server.get('/', limiter, function(req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

server.listen(PORT);

console.log('Started express server at port ' + PORT);
