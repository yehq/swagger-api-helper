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
var getInterface_1 = __importDefault(require("./getInterface"));
var getRefModelTitle_1 = __importDefault(require("./getRefModelTitle"));
exports.default = (function (definitions) {
    return Object.keys(definitions)
        .map(function (key) {
        var interfaceName = getRefModelTitle_1.default(__assign({ title: key }, definitions[key]));
        var interfaceContent = getInterface_1.default(definitions[key]);
        return interfaceContent.trim().indexOf('{') === 0 ? "export interface " + interfaceName + " " + interfaceContent : "export type " + interfaceName + " = " + interfaceContent;
    })
        .join('\n');
});
//# sourceMappingURL=interfacesModel.js.map