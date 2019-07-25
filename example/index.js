const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const swaggerMock = require('../lib');

const app = express();

const urls = [
    /** swagger urls */
];

// parse application/json
app.use(bodyParser.json());
swaggerMock.default(app, {
    basePath: '/api',
    urls,
});

app.listen(3000);
