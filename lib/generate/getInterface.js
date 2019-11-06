"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var getRefModelTitle_1 = __importDefault(require("./getRefModelTitle"));
var isTypes_1 = require("./isTypes");
var typeMap_1 = __importDefault(require("./typeMap"));
var interfaces_1 = require("./interfaces");
var renderComment_1 = __importDefault(require("./renderComment"));
/**
 *
 * @param {object} schema { type: string, properties: schema, items: schema[]， title: string, description: string, required: string[], example: string }
 */
function loopInterface(schema, commentType, level) {
    if (level === void 0) { level = 1; }
    var type = schema.type, properties = schema.properties, items = schema.items, required = schema.required;
    var getFullType = function (model) {
        if (!model)
            return 'any\t// 解析该字段出错 请联系后台修改格式';
        var tabs = new Array(level).fill('\t').join('');
        var items = Object.keys(model).map(function (key) {
            var target = model[key];
            var isRequired = Array.isArray(required) ? required.indexOf(key) > -1 : required;
            var content = "" + key + (isRequired ? '' : '?') + ": " + loopInterface(target, commentType, level + 1) + ";";
            return "" + renderContentWithDescription(target, content, commentType, tabs);
        });
        return "{\n" + items.join('\n') + "\n" + new Array(level - 1).fill('\t').join('') + "}";
    };
    switch (type) {
        case "array" /* array */:
            if (schema.$$ref)
                return "Array<" + getRefModelTitle_1.default(schema) + ">";
            return "Array<" + loopInterface(items, level) + ">";
        case "object" /* object */:
            if (schema.$$ref)
                return getRefModelTitle_1.default(schema);
            return getFullType(properties);
        case "string" /* string */:
            if (isTypes_1.isEnum(schema))
                return schema.enum.map(function (item) { return "'" + item + "'"; }).join(' | ');
        case "boolean" /* boolean */:
        case "integer" /* integer */:
        case "file" /* file */:
        default:
            return typeMap_1.default[type];
    }
}
/**
 * 注释中返回字段的描述信息
 * @param {object} target
 */
function renderContentWithDescription(target, content, commentType, tabs) {
    var description = target.description ? target.description : '';
    var example = target.example ? "example: " + JSON.stringify(target.example) : '';
    var defaultValue = target.default ? "default: " + target.default : '';
    var allowEmptyValue = target.allowEmptyValue
        ? "allowEmptyValue: " + target.allowEmptyValue
        : '';
    var result = [description, example, defaultValue, allowEmptyValue].filter(Boolean);
    return renderComment_1.default(commentType, commentType === interfaces_1.CommentType.singleRight ? result.join('; ') : result.join('\n'), content, tabs);
}
exports.default = loopInterface;
//# sourceMappingURL=getInterface.js.map