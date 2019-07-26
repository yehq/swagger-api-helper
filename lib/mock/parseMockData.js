"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mockjs_1 = __importDefault(require("mockjs"));
var utils_1 = require("./utils");
var dateTimeLikePropNames = ['Date', 'Time', 'date', 'time'];
var nameLikePropNames = ['Name', 'name'];
var idLikePropNames = ['Id'];
exports.default = (function (response, definitions, propertyResolver) {
    return response.schema ? mockjs_1.default.mock(getMockData(response.schema, definitions)) : undefined;
    /**
     * 根据swagger schema 生成 mock
     * @param schema
     * @param definitions
     * @param dataKey
     */
    function getMockData(schema, definitions, dataKey) {
        switch (schema.type) {
            case "array" /* array */:
                return new Array(mockjs_1.default.Random.natural(1, 10))
                    .fill('')
                    .map(function () { return getMockData(schema.items, definitions); });
            case "object" /* object */:
                var properties_1 = schema.properties;
                if (!properties_1 && schema.$$ref) {
                    var model = getModelByRef(definitions, schema.$$ref);
                    properties_1 = model.properties;
                }
                var mockData = properties_1
                    ? Object.keys(properties_1).reduce(function (target, key) {
                        var property = properties_1[key];
                        target[key] = getMockData(property, definitions, key);
                        return target;
                    }, {})
                    : {};
                return mockData;
            case "number" /* number */:
            case "integer" /* integer */:
            case "string" /* string */:
                if (propertyResolver)
                    propertyResolver(dataKey || '', schema.type, mockjs_1.default);
                if (schema.type === "number" /* number */ || schema.type === "integer" /* integer */) {
                    return getNumber(dataKey);
                }
                else if (schema.type === "string" /* string */) {
                    if (schema.enum && schema.enum.length > 0) {
                        return schema.enum[mockjs_1.default.Random.natural(0, schema.enum.length - 1)];
                    }
                    return getString(dataKey);
                }
                return undefined;
            default:
                return undefined;
        }
    }
});
/**
 *
 * @param definitions
 * @param (string) ref  #/definitions/modelNames
 */
function getModelByRef(definitions, ref) {
    return definitions[ref.split('#/definitions/')[1]];
}
function getString(key) {
    if (key) {
        if (utils_1.isPropNameLike(key, dateTimeLikePropNames)) {
            return mockjs_1.default.Random.date();
        }
        if (utils_1.isPropNameLike(key, nameLikePropNames)) {
            return mockjs_1.default.Random.cname();
        }
    }
    return mockjs_1.default.Random.character();
}
function getNumber(key) {
    if (key) {
        if (utils_1.isPropNameLike(key, idLikePropNames)) {
            return mockjs_1.default.Random.increment(1);
        }
    }
    return mockjs_1.default.Random.natural(1, 1000);
}
//# sourceMappingURL=parseMockData.js.map