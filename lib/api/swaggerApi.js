"use strict";
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("../utils");
var service_1 = __importDefault(require("./service"));
var interfacesModel_1 = __importDefault(require("./interfacesModel"));
var parseSwaggerJson_1 = __importDefault(require("../parseSwaggerJson"));
var path_1 = require("path");
var interfaceModelsName = 'interfaces';
var swaggerApi = function (_a) {
    var urls = _a.urls, _b = _a.hasBasePath, hasBasePath = _b === void 0 ? true : _b, outputPath = _a.outputPath;
    var targetUrls = urls.map(function (url, index) {
        if (typeof url === 'string') {
            return [url, "swaggerApi" + index];
        }
        return url;
    });
    targetUrls.forEach(function (_a, index) {
        var _b = __read(_a, 2), url = _b[0], dirname = _b[1];
        return utils_1.fetchSwaggerJson(url)
            .then(function (data) {
            var _a = parseSwaggerJson_1.default(data), swaggerObj = _a.swaggerObj, basePath = _a.basePath, definitions = _a.definitions;
            Object.keys(swaggerObj).forEach(function (key) {
                var contents = service_1.default(swaggerObj[key].paths, key, hasBasePath ? basePath : '', false);
                utils_1.writeFile(path_1.join(outputPath, dirname + "/" + key + ".ts"), contents)
                    .then(function () {
                    console.log(key + ".ts Saved!");
                })
                    .catch(function (err) {
                    console.error("Failed to store " + key + ".ts: " + err.message + ".");
                });
            });
            var interfaceModelsContent = interfacesModel_1.default(definitions);
            utils_1.writeFile(path_1.join(outputPath, dirname + "/" + interfaceModelsName + ".ts"), interfaceModelsContent)
                .then(function () {
                console.log(interfaceModelsName + ".ts Saved!");
            })
                .catch(function (err) {
                return console.error("\u751F\u6210\u63A5\u53E3\u6A21\u578B\u51FA\u9519" + err.message);
            });
        })
            .catch(function (e) {
            console.log(e);
        });
    });
};
exports.default = swaggerApi;
//# sourceMappingURL=swaggerApi.js.map