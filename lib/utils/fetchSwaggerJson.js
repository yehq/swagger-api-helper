"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var swagger_client_1 = __importDefault(require("swagger-client"));
exports.default = (function (url, opts) {
    if (opts === void 0) { opts = {}; }
    return new Promise(function (resolve, reject) {
        var defaultHeaders = __assign({ Accept: 'application/json', 'Content-Type': 'application/json; charset=utf-8' }, opts.headers);
        swagger_client_1.default.http(__assign(__assign({ url: url }, opts), { headers: defaultHeaders }))
            .then(function (swaggerData) {
            resolve({ url: url, spec: JSON.parse(swaggerData.data) });
        })
            .catch(function (e) {
            reject(e);
        });
    });
});
//# sourceMappingURL=fetchSwaggerJson.js.map