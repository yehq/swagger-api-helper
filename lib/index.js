"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var swagger_client_1 = __importDefault(require("swagger-client"));
var chokidar_1 = __importDefault(require("chokidar"));
var path_to_regexp_1 = __importDefault(require("path-to-regexp"));
var parseSwaggerJson_1 = __importDefault(require("./parseSwaggerJson"));
var parseMockData_1 = __importDefault(require("./parseMockData"));
// const defaultUrl = 'https://enterprise-api.creams.io/settlement/v2/api-docs';
var swaggerMock = function (app, _a) {
    var _b = _a === void 0 ? {} : _a, _c = _b.urls, urls = _c === void 0 ? [] : _c, propertyResolver = _b.propertyResolver, resultResolver = _b.resultResolver, _d = _b.basePath, mockBasePath = _d === void 0 ? '' : _d, _e = _b.enableWatcher, enableWatcher = _e === void 0 ? true : _e;
    var currentUrls = urls.map(function (url) { return (Array.isArray(url) ? url[0] : url); });
    loadRouters(currentUrls);
    if (enableWatcher) {
        var watchPaths = urls.reduce(function (target, url) {
            if (Array.isArray(url) && url[1]) {
                target.push(url[1]);
            }
            return target;
        }, []);
        var watcher = chokidar_1.default.watch(watchPaths, {
            interval: 1000,
            ignoreInitial: true,
        });
        watcher.addListener('addDir', function (path) {
            var url = findUrlByWatchPath(path);
            if (url)
                loadRouters([url]);
        });
    }
    function loadRouters(urls) {
        urls.forEach(function (url) {
            swagger_client_1.default({
                url: url,
            })
                .then(setRoutes)
                .catch(function (e) {
                console.log("[swagger-mocker ERROR] " + e.message);
                console.warn("[swagger-mocker ERROR] \u8BF7\u6C42 swagger url: " + url + " \u5931\u8D25");
            });
        });
    }
    function setRoutes(swaggerData) {
        var _a = parseSwaggerJson_1.default(swaggerData), paths = _a.paths, definitions = _a.definitions, basePath = _a.basePath;
        app.all("" + mockBasePath + basePath + "/*", function (req, res, next) {
            var targetPath = req.path.split("" + mockBasePath + basePath)[1];
            var currentPath = matchPath(targetPath, paths);
            console.log(req.path, req.url, currentPath);
            var path = currentPath && currentPath[req.method.toLowerCase()] ? currentPath[req.method.toLowerCase()] : undefined;
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
                    : parseMockData_1.default(path.responses[200] || {}, definitions, propertyResolver);
                res.json(result);
            }
        });
        // 将 router 放在第四个在 webpack 相关中间件之前
        if (app._router.stack.length > 0) {
            app._router.stack.splice(3, 0, app._router.stack.splice(app._router.stack.length - 1, 1)[0]);
        }
        console.log("[swagger-mocker SUCCESS] \u52A0\u8F7D " + swaggerData.url + " \u6210\u529F");
    }
    /**
     * 找到被监听的 url
     * @param watchPath
     */
    function findUrlByWatchPath(watchPath) {
        var url = urls.find(function (url) { return Array.isArray(url) && url[1] === watchPath; });
        return url ? url[0] : url;
    }
};
/**
 * 匹配 path
 * @param path
 * @param paths
 */
function matchPath(path, paths) {
    var pathKey = Object.keys(paths).find(function (pathKey) {
        var regexp = path_to_regexp_1.default(pathKey.replace(/\{(.+?)\}/g, function (searchValue, replaceValue) {
            return ":" + replaceValue;
        }));
        return regexp.test(path);
    });
    return pathKey ? paths[pathKey] : undefined;
}
exports.default = swaggerMock;
//# sourceMappingURL=index.js.map