"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var swagger_client_1 = __importDefault(require("swagger-client"));
exports.default = (function (url) {
    return new Promise(function (resolve, reject) {
        swagger_client_1.default({
            url: url,
        })
            .then(function (swaggerData) { return resolve(swaggerData); })
            .catch(function (e) {
            reject(e);
        });
    });
});
//# sourceMappingURL=fetchSwaggerJson.js.map