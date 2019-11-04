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
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 获取制定 tag 的 path
 * @param {Path} item
 */
var getPathsByTagName = function (item) {
    return (item.parameters || []).reduce(function (paraTarget, parameter) {
        if (!paraTarget[parameter.in])
            paraTarget[parameter.in] = [];
        paraTarget[parameter.in].push(parameter);
        return paraTarget;
    }, {});
};
/**
 * url 比如 /v2/users/id
 * url 转化为 getV2UsersId
 */
var getPathKey = function (method, url) {
    return (method +
        url.replace(/[{}]/g, '').replace(/(?:\/|-)([a-zA-Z])/g, function ($, $1) { return $1.toUpperCase(); }));
};
exports.default = (function (data) {
    var _a = data.spec, basePath = _a.basePath, paths = _a.paths, tags = _a.tags, definitions = _a.definitions;
    var getPathsGroupByTagName = function (tagName) {
        return Object.keys(paths).reduce(function (customPaths, pathName) {
            var path = paths[pathName];
            Object.keys(path).forEach(function (method) {
                var item = path[method];
                if (item && item.tags.some(function (tag) { return tag === tagName; })) {
                    var parametersGroup = getPathsByTagName(item);
                    customPaths.push(__assign(__assign({}, item), { method: method, url: pathName.replace(/{/g, '${'), pathKey: getPathKey(method, pathName), parametersInBody: parametersGroup["body" /* body */], parametersInQuery: parametersGroup["query" /* query */], parametersInPath: parametersGroup["path" /* path */], parametersInHeader: parametersGroup["header" /* header */], parametersInFormData: parametersGroup["formData" /* formData */] }));
                }
            });
            return customPaths;
        }, []);
    };
    var swaggerObj = tags.reduce(function (target, tag) {
        target[tag.name] = {
            name: tag.name,
            description: tag.description,
            paths: getPathsGroupByTagName(tag.name),
        };
        return target;
    }, {});
    return {
        swaggerObj: swaggerObj,
        basePath: basePath,
        definitions: definitions,
        paths: paths,
    };
});
//# sourceMappingURL=parseSwaggerJson.js.map