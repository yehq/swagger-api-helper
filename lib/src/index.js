"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var swagger_client_1 = __importDefault(require("swagger-client"));
var chokidar_1 = __importDefault(require("chokidar"));
var parseSwaggerJson_1 = __importDefault(require("./parseSwaggerJson"));
var parseMockData_1 = __importDefault(require("./parseMockData"));
// const defaultUrl = 'https://enterprise-api.creams.io/settlement/v2/api-docs';
var swaggerMock = function (app, _a) {
    var _b = _a === void 0 ? {} : _a, _c = _b.urls, urls = _c === void 0 ? [] : _c, propertyResolver = _b.propertyResolver, resultResolver = _b.resultResolver, _d = _b.watchPaths, watchPaths = _d === void 0 ? [] : _d;
    loadRouters(urls);
    var watcher = chokidar_1.default.watch(watchPaths);
    watcher.addListener('change', function (path) {
        console.log(path);
        loadRouters(urls);
    });
    function loadRouters(urls) {
        urls.forEach(function (url) {
            swagger_client_1.default({
                url: url,
            }).then(setRouters);
        });
    }
    function setRouters(swaggerData) {
        var _a = parseSwaggerJson_1.default(swaggerData), paths = _a.paths, definitions = _a.definitions, basePath = _a.basePath;
        app.all(basePath + "/*", function (req, res) {
            var targetPath = req.path.split(basePath)[1];
            var path = paths[targetPath] && paths[targetPath][req.method.toLowerCase()] ? paths[targetPath][req.method.toLowerCase()] : undefined;
            if (!path) {
                res.json({
                    url: req.url,
                    method: req.method,
                    status: 404,
                    message: '没找到该 url 的api',
                });
            }
            else {
                var result = resultResolver
                    ? resultResolver({
                        url: req.url,
                        path: req.path,
                        method: req.method,
                        swaggerPath: path,
                    })
                    : parseMockData_1.default(path.responses[200], definitions, propertyResolver);
                res.json(result);
            }
        });
    }
};
exports.default = swaggerMock;
//# sourceMappingURL=index.js.map