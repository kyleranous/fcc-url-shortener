require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');

// Basic Configuration
const port = process.env.PORT || 3000;

// Import Middleware Functions
const middleware = require('./middleware');

// Import Handlers
const {
  shorturlPostRequest,
  shorturlRedirect,
} = require('./handlers');

app.use(cors());

app.use('/public', express.static(`${process.cwd()}/public`));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(middleware.requestLogger);

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint
app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
});

app.use(bodyParser.urlencoded({ extended: false }));
app.post('/api/shorturl', shorturlPostRequest);

app.get('/api/shorturl/:id', shorturlRedirect);

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
