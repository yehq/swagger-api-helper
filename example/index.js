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
// app.get('/', function(req, res) {
//     res.send('Hello World1');
// });

app.listen(3000);
