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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = __importDefault(require("path"));
var utils_1 = require("../utils");
var getInterface_1 = __importDefault(require("./getInterface"));
var getRefModelTitle_1 = __importDefault(require("./getRefModelTitle"));
var isTypes_1 = require("./isTypes");
var typeMap_1 = __importDefault(require("./typeMap"));
var interfaces_1 = require("./interfaces");
var renderComment_1 = __importDefault(require("./renderComment"));
var extraFetchOptionsInterfaceName = 'ExtraFetchOptions';
var extraFetchOptionsParaName = 'extraFetchOptions';
exports.default = (function (items, key, basePath, filename, _a) {
    var _b = _a.importExtraFetchOptions, importExtraFetchOptions = _b === void 0 ? function () {
        return "import { " + extraFetchOptionsInterfaceName + " } from '@/types';";
    } : _b, _c = _a.importRequest, importRequest = _c === void 0 ? function () { return "import request from '@/utils/request';"; } : _c, _d = _a.importStringify, importStringify = _d === void 0 ? function () { return "import stringify from '@/utils/stringify';"; } : _d, _e = _a.hasExtraFetchOptions, hasExtraFetchOptions = _e === void 0 ? true : _e, _f = _a.hasBasePath, hasBasePath = _f === void 0 ? true : _f;
    var currentBasePath = hasBasePath ? basePath : '';
    var imports = [
        importRequest(filename),
        hasExtraFetchOptions && importExtraFetchOptions(filename),
    ].filter(Boolean);
    var _g = renderContent(items, currentBasePath), content = _g.content, globalInterfaceNames = _g.globalInterfaceNames, hasQuery = _g.hasQuery;
    if (globalInterfaceNames.length > 0) {
        imports.push("import { " + globalInterfaceNames.join(', ') + " } from '" + key
            .split('/')
            .map(function (item, index) { return (index === 0 ? './' : '../'); })
            .join('') + "interfaces'");
    }
    if (hasQuery) {
        imports.unshift(importStringify(filename));
    }
    return content.trim() ? imports.join('\n') + "\n\n" + content : '';
    function renderContent(items, basePath) {
        var globalInterfaceNames = new Set();
        var content = "\n" + items
            .map(function (item) {
            var pathKey = item.pathKey, url = item.url, method = item.method, _a = item.parametersInBody, parametersInBody = _a === void 0 ? [] : _a, _b = item.parametersInQuery, parametersInQuery = _b === void 0 ? [] : _b, deprecated = item.deprecated, summary = item.summary;
            var fullUrl = path_1.default.join(basePath, url);
            var interfacePrefix = utils_1.firstCharUpper(pathKey);
            var interfaceNames = {
                query: interfacePrefix + "Query",
                body: interfacePrefix + "Body",
                payload: interfacePrefix + "Payload",
            };
            var _c = renderMethodInterface(item, interfaceNames), interfaces = _c.interfaces, itemInterfaceNames = _c.itemInterfaceNames, responseInterfaceName = _c.responseInterfaceName;
            itemInterfaceNames.forEach(function (itemInterfaceName) {
                return globalInterfaceNames.add(itemInterfaceName);
            });
            var paramsString = renderParams(item);
            return interfaces + "\n\n/**\n * " + (deprecated ? '废弃不用 ' : '') + summary + "\n * " + (deprecated ? '@deprecated' : '') + "\n */\nexport async function " + pathKey + "(" + renderArgs(interfaces, interfaceNames.payload) + ") {" + paramsString + "\n    return request<" + responseInterfaceName + ">(`" + fullUrl + (parametersInQuery.length > 0 ? '?${stringify(query)}' : '') + "`, {" + (paramsString ? "\n\t\t..." + extraFetchOptionsParaName + "," : '') + "\n        method: '" + method + "'," + (parametersInBody.length > 0 ? '\n\t\tbody,' : '') + "\n    });\n}\n";
        })
            .join('') + "\n";
        return {
            content: content,
            globalInterfaceNames: __spread(globalInterfaceNames),
            hasQuery: items.some(function (item) { return (item.parametersInQuery || []).length > 0; }),
        };
    }
    /**
     * 返回 方法中的参数内容  如  const { body, query, ...extraFetchOptions } = payload;
     * @param {object} item
     */
    function renderParams(item) {
        var _a = item.parametersInPath, parametersInPath = _a === void 0 ? [] : _a, _b = item.parametersInBody, parametersInBody = _b === void 0 ? [] : _b, _c = item.parametersInQuery, parametersInQuery = _c === void 0 ? [] : _c;
        var params = __spread((parametersInPath.length > 0 ? parametersInPath.map(function (_a) {
            var name = _a.name;
            return name;
        }) : []), (parametersInBody.length > 0 ? ['body'] : []), (parametersInQuery.length > 0 ? ['query'] : []));
        var paramsString = "{ " + params.join(', ') + ", ..." + extraFetchOptionsParaName + " }";
        return "\n\tconst " + (params.length === 0 ? extraFetchOptionsParaName : paramsString) + " = payload;";
    }
    /**
     * 返回方法参数  如 payload: Payload
     * @param {string} interfaces
     * @param {object} payloadInterfaceName
     */
    function renderArgs(interfaces, payloadInterfaceName) {
        if (interfaces) {
            return "payload: " + payloadInterfaceName;
        }
        return '';
    }
    /**
     * 生成方法参数的interface  如 export interface InterfaceName extends ExtraFetchOptions { id: number }
     * @param {array} item
     */
    function renderPayloadInterface(items, interfaceName) {
        return "export interface " + interfaceName + " " + (hasExtraFetchOptions ? "extends " + extraFetchOptionsInterfaceName + " " : '') + "{\n" + items
            .map(function (item) {
            var content = item.name + ": " + item.typeName + ";";
            return renderComment_1.default(interfaces_1.CommentType.multiline, item.description, content, '\t');
        })
            .join('\n') + "\n}";
    }
    /**
     * 返回单个方法 字符串形式的所有接口 和 关联的 body 的interface名称
     * @param {object} item
     * @param {string} interfaceNames
     */
    function renderMethodInterface(item, interfaceNames) {
        var _a = item.parametersInQuery, parametersInQuery = _a === void 0 ? [] : _a, _b = item.parametersInBody, parametersInBody = _b === void 0 ? [] : _b, _c = item.parametersInFormData, parametersInFormData = _c === void 0 ? [] : _c, _d = item.parametersInPath, parametersInPath = _d === void 0 ? [] : _d, responses = item.responses;
        var itemInterfaceNames = [];
        var responseInterfaceName = "any" /* any */;
        var payloadContent = parametersInPath.map(function (paraInPath) { return ({
            name: paraInPath.name,
            typeName: getType(paraInPath.type),
        }); });
        var queryInterface = renderInterface(parametersInQuery, interfaceNames.query, interfaces_1.CommentType.singleRight);
        if (queryInterface) {
            payloadContent.push({
                name: "query" /* query */,
                typeName: interfaceNames.query,
            });
        }
        var getTypeName = function (target) {
            if (!target.schema)
                return;
            var typeName = '';
            var addInterfaceName = function (typeName, type) {
                itemInterfaceNames.push(typeName);
                return type === 'array' ? typeName + "[]" : typeName;
            };
            // 处理对象
            if (utils_1.getRef(target.schema)) {
                typeName = getRefModelTitle_1.default(target.schema);
                typeName = addInterfaceName(typeName, target.schema.type);
            }
            else if (target.schema.items && utils_1.getRef(target.schema.items)) {
                // 处理数组
                typeName = getRefModelTitle_1.default(target.schema.items);
                typeName = addInterfaceName(typeName, target.schema.type);
            }
            else {
                typeName = getType(target.schema.type, target.schema.items);
            }
            return typeName;
        };
        Object.keys(responses).forEach(function (status) {
            responseInterfaceName = getTypeName(responses[status]);
        });
        if (parametersInBody.length > 0) {
            var body = parametersInBody[0];
            var typeName = getTypeName(body);
            if (typeName)
                payloadContent.push({
                    name: "body" /* body */,
                    typeName: typeName,
                    description: body.description,
                });
        }
        if (parametersInFormData.length > 0) {
            payloadContent.push({
                name: "body" /* body */,
                typeName: 'FormData',
                description: "" + renderInterface(parametersInFormData, 'FormContent', interfaces_1.CommentType.singleRight),
            });
        }
        var payloadInterface = renderPayloadInterface(payloadContent, interfaceNames.payload);
        var interfaceArray = [queryInterface, payloadInterface].filter(function (item) { return !!item; });
        return {
            interfaces: interfaceArray.join('\n'),
            itemInterfaceNames: itemInterfaceNames,
            responseInterfaceName: responseInterfaceName,
        };
    }
    /**
     * 返回一个字符串形式的接口
     * @param {object} parameters
     * @param {string} name
     */
    function renderInterface(parameters, name, commentType) {
        if (parameters.length === 0)
            return '';
        var schema = parameters.reduce(function (target, item) {
            // 特殊处理 body 中的 request 对象
            if (item.schema) {
                target.properties = item.schema.properties;
                target.items = item.schema.items;
                target.type = item.schema.type;
            }
            else {
                if (!target.properties) {
                    target.properties = {};
                }
                var required = item.required, rest = __rest(item, ["required"]);
                target.properties[item.name] = __assign({ type: "object" /* object */ }, rest);
            }
            return target;
        }, {
            properties: {},
            required: parameters.reduce(function (target, item) {
                if (item.required) {
                    target.push(item.name);
                }
                return target;
            }, []),
            type: "object" /* object */,
        });
        var result = getInterface_1.default(schema, commentType, 1);
        if (result.trim().indexOf('{') === 0) {
            return "\nexport interface " + name + " " + result + "\n";
        }
        return "\nexport type " + name + " = " + result;
    }
    /**
     * 将后端给的type转化为 typescript 中的type
     * @param {string} type
     */
    function getType(type, items) {
        if (items === void 0) { items = { type: "any" /* any */ }; }
        if (type === "array" /* array */) {
            if (isTypes_1.isEnum(items)) {
                return "Array<" + items.enum.map(function (name) { return "'" + name + "'"; }).join(' | ') + ">";
            }
            if (items.type) {
                return getType(items.type) + "[]";
            }
        }
        return typeMap_1.default[type] ? typeMap_1.default[type] : type;
    }
});
//# sourceMappingURL=getApiModel.js.map