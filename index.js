/* eslint-disable import/order */
require('dotenv').config();
require('./db').sync();

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');

const app = express();

app.use(cors());
app.disable('etag');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ limit: '20mb' }));

const logger = (req, res, next) => {
    if (req.url === '/favicon.ico') {
        next();
    } else {
        morgan('dev')(req, res, next);
    }
};
app.use(logger);

const server = require('http').createServer(app);

const setup = require('./setup');
const routes = require('./app/routes');

setup.init(app, routes);

server.listen(8000, () => console.log('Listening on PORT: 8000'));
