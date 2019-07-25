"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 判断参数名称是不是带指定后缀
 * @param keyName
 * @param likePropNames
 */
exports.isPropNameLike = function (keyName, likePropNames) {
    return likePropNames.some(function (name) { return keyName.endsWith(name); });
};
//# sourceMappingURL=utils.js.map