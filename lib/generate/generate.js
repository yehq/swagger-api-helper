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
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("../utils");
var getApiModel_1 = __importDefault(require("./getApiModel"));
var getInterfacesModel_1 = __importDefault(require("./getInterfacesModel"));
var interfaces_1 = require("./interfaces");
var parseSwaggerJson_1 = __importDefault(require("../parseSwaggerJson"));
var path_1 = require("path");
var interfaceModelsName = 'interfaces';
var generate = function (options) {
    var urls = options.urls, outputPath = options.outputPath;
    var targetUrls = urls.map(function (url, index) {
        if (typeof url === 'string') {
            return [url, "swaggerApi" + index];
        }
        return url;
    });
    var genApis = targetUrls.map(function (_a, index) {
        var _b = __read(_a, 2), url = _b[0], dirname = _b[1];
        return new Promise(function (resolve, reject) {
            var successMessages = [];
            var errorMessages = [];
            return utils_1.fetchSwaggerJson(url)
                .then(function (data) {
                var count = 0;
                var _a = parseSwaggerJson_1.default(data), swaggerObj = _a.swaggerObj, basePath = _a.basePath, definitions = _a.definitions;
                var apiModelPromises = Object.keys(swaggerObj).map(function (key) {
                    var filename = path_1.join(outputPath, dirname + "/" + key + ".ts");
                    var contents = getApiModel_1.default(swaggerObj[key].paths, key, basePath, filename, options);
                    return function () { return genFile(filename, contents); };
                });
                var interfaceModelsContent = getInterfacesModel_1.default(definitions);
                var interfacesFilename = path_1.join(outputPath, dirname + "/" + interfaceModelsName + ".ts");
                var interfacesModelPromise = function () {
                    return genFile(interfacesFilename, interfaceModelsContent);
                };
                var allPromises = __spread(apiModelPromises, [interfacesModelPromise]);
                allPromises.forEach(function (item) {
                    item()
                        .then(function (successMessage) {
                        successMessages.push(successMessage);
                    })
                        .catch(function (errMessage) {
                        errorMessages.push(errMessage);
                    })
                        .finally(function () {
                        count++;
                        if (count === allPromises.length) {
                            resolve({
                                successMessages: successMessages,
                                errorMessages: errorMessages,
                            });
                        }
                    });
                });
            })
                .catch(function (e) {
                console.log(e);
                reject(e);
            });
        });
    });
    return Promise.all(genApis);
};
exports.default = generate;
function genFile(filename, content) {
    var fileBasename = path_1.basename(filename);
    return new Promise(function (resolve, reject) {
        utils_1.writeFile(filename, content)
            .then(function () {
            resolve(getSuccessMessage(filename));
            console.log(fileBasename + " saved!");
        })
            .catch(function (err) {
            reject(getErrorMessage(filename));
            return console.error("Failed to store " + fileBasename + ":" + err.message);
        });
    });
}
function getSuccessMessage(outputPath) {
    return {
        outputPath: outputPath,
        message: outputPath + " generation succeeded",
        status: interfaces_1.Status.success,
    };
}
function getErrorMessage(outputPath) {
    return {
        outputPath: outputPath,
        message: outputPath + " generation failed",
        status: interfaces_1.Status.error,
    };
}
//# sourceMappingURL=generate.js.map