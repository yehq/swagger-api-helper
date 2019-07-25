const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const { fetchSwaggerJson } = require('../lib/utils');
const swagger = require('../lib');
const swaggerMock = swagger.mock;
const swaggerApi = swagger.api;

const app = express();

const urls = [['https://petstore.swagger.io/v2/swagger.json', 'swaggerDirname'], [`https://petstore.swagger.io/v2/swagger.json`, 'swaggerDirname2']];
const outputPath = path.join(__dirname, './services');

// parse application/json
app.use(bodyParser.json());
swaggerMock(app, {
    basePath: '/api',
    urls: urls.map((url) => url[0]),
});

app.get('/genApi', (req, res) => {
    swaggerApi({ urls, outputPath });
    res.json({
        message: 'success',
    });
});

app.get('/swaggerJson', (req, res) => {
    fetchSwaggerJson(urls[0][0]).then((data) => {
        res.json(data);
    });
});

app.get('/v2/swaggerJson', (req, res) => {
    fetchSwaggerJson(urls[1][0]).then((data) => {
        res.json(data);
    });
});

app.listen(3000);
