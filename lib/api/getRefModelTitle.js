"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (function (schema) {
    var targetName = '_Error_';
    if (schema.title) {
        targetName = schema.title;
    }
    else if (schema.xml && schema.xml.name) {
        targetName = schema.xml.name;
    }
    else if (schema.$$ref) {
        targetName = schema.$$ref.substr(schema.$$ref.lastIndexOf('/') + 1);
    }
    return targetName.replace(/(«|»|,)([a-zA-Z]?)/g, function (searchValue, replaceValue) {
        return searchValue.substring(1).toUpperCase();
    });
});
//# sourceMappingURL=getRefModelTitle.js.map