"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = __importDefault(require("fs"));
var mkdirp_1 = __importDefault(require("mkdirp"));
var path_1 = require("path");
function writeFile(path, contents) {
    return new Promise(function (resolve, reject) {
        mkdirp_1.default(path_1.dirname(path), function (err) {
            if (err)
                return reject(err);
            fs_1.default.writeFile(path, contents, function (error) {
                if (error)
                    reject(error);
                resolve();
            });
        });
    });
}
exports.default = writeFile;
//# sourceMappingURL=writeFile.js.map