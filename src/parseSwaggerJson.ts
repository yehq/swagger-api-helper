import {
    SwaggerResponse,
    SwaggerModel,
    CustomPath,
    Methods,
    In,
    Parameter,
    Path,
} from './interfaces';

/**
 * 获取制定 tag 的 path
 * @param {Path} item
 */
const getPathsByTagName = (item: Path) => {
    return (item.parameters || []).reduce<{ [key in In]?: Parameter<key>[] }>(
        (paraTarget, parameter) => {
            if (!paraTarget[parameter.in]) paraTarget[parameter.in] = [];
            paraTarget[parameter.in]!.push(parameter as any);
            return paraTarget;
        },
        {}
    );
};

/**
 * url 比如 /v2/users/id
 * url 转化为 getV2UsersId
 */
const getPathKey = (method: Methods, url: string) => {
    return (
        method +
        url.replace(/[{}]/g, '').replace(/(?:\/|-|_|\.)([a-zA-Z])/g, ($, $1) => $1.toUpperCase())
    );
};

export default (data: SwaggerResponse) => {
    const {
        spec: { basePath = '', paths, definitions },
    } = data;

    const tags =
        data.spec.tags ||
        [
            ...Object.values(paths).reduce((target, path) => {
                Object.values(path).forEach(item => {
                    if (item) {
                        item.tags.forEach(tag => target.add(tag));
                    }
                });
                return target;
            }, new Set<string>()),
        ].map(item => ({ name: item, description: item }));

    const getPathsGroupByTagName = (tagName: string) => {
        return Object.keys(paths).reduce((customPaths: CustomPath[], pathName) => {
            const path = paths[pathName];

            Object.keys(path).forEach((method: string) => {
                const item = path[method as Methods];
                if (item && item.tags.some(tag => tag === tagName)) {
                    const parametersGroup = getPathsByTagName(item);
                    customPaths.push({
                        ...item,
                        method: method as Methods,
                        url: pathName.replace(/{/g, '${'),
                        pathKey: getPathKey(method as Methods, pathName),
                        parametersInBody: parametersGroup[In.body],
                        parametersInQuery: parametersGroup[In.query],
                        parametersInPath: parametersGroup[In.path],
                        parametersInHeader: parametersGroup[In.header],
                        parametersInFormData: parametersGroup[In.formData],
                    });
                }
            });
            return customPaths;
        }, []);
    };

    const swaggerObj: SwaggerModel = tags.reduce((target: SwaggerModel, tag) => {
        target[tag.name] = {
            name: tag.name,
            description: tag.description,
            paths: getPathsGroupByTagName(tag.name),
        };
        return target;
    }, {});

    return {
        swaggerObj,
        basePath,
        definitions,
        paths,
    };
};
