"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("../utils");
exports.default = (function (schema) {
    var targetName = '_Error_';
    var ref = utils_1.getRef(schema);
    if (schema.title) {
        targetName = schema.title;
    }
    else if (schema.xml && schema.xml.name) {
        targetName = schema.xml.name;
    }
    else if (ref) {
        targetName = ref.substr(ref.lastIndexOf('/') + 1);
    }
    return targetName.replace(/(«|»|,)([a-zA-Z]?)/g, function (searchValue, replaceValue) {
        return searchValue.substring(1).toUpperCase();
    });
});
//# sourceMappingURL=getRefModelTitle.js.map