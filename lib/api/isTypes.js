"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// 是否是 long 类型 对应是 int64
function isLong(_a) {
    var type = _a.type, format = _a.format;
    return type === 'integer' && format === 'int64';
}
exports.isLong = isLong;
// 判断是否是 enum
function isEnum(_a) {
    var enumArray = _a.enum;
    return Array.isArray(enumArray);
}
exports.isEnum = isEnum;
//# sourceMappingURL=isTypes.js.map