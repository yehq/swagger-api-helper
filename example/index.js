const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const { fetchSwaggerJson } = require('../lib/utils');
const swagger = require('../lib');
const swaggerMock = swagger.mock;
const swaggerGenerate = swagger.generate;

const app = express();

const urls = [
    ['https://petstore.swagger.io/v2/swagger.json', 'swaggerDirname'],
    [`https://petstore.swagger.io/v2/swagger.json`, 'swaggerDirname2'],
];
const outputPath = path.join(__dirname, './services');

// parse application/json
app.use(bodyParser.json());
// 可以访问 http://localhost:3000/api/v2/pet/findByStatus 测试
swaggerMock(app, {
    basePath: '/api',
    urls: urls.map(url => url[0]),
});

app.get('/genApi', (req, res) => {
    swaggerGenerate({
        tagAlias: {
            pet: 'petAlias',
        },
        fetchOptions: {
            headers: {
                Authorization: '',
            },
        },
        urls,
        outputPath,
        hasExtraFetchOptions: true,
        importExtraFetchOptions: filename => {
            const relativePath = path.join(path.relative(filename, outputPath), 'utils');
            return `import { ExtraFetchOptions } from '${relativePath}';`;
        },
        importStringify: filename => {
            const relativePath = path.join(path.relative(filename, outputPath), 'utils');
            return `import { stringify } from '${relativePath}';`;
        },
        importRequest: filename => {
            const relativePath = path.join(path.relative(filename, outputPath), 'utils');
            return `import { request } from '${relativePath}';`;
        },
    }).then(message => {
        res.json(message);
    });
});

app.get('/swaggerJson', (req, res) => {
    fetchSwaggerJson(urls[0][0]).then(data => {
        res.json(data);
    });
});

app.get('/v2/swaggerJson', (req, res) => {
    fetchSwaggerJson(urls[1][0]).then(data => {
        res.json(data);
    });
});

app.listen(3000);
