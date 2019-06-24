import { Application } from 'express';
import Swagger from 'swagger-client';
import chokidar from 'chokidar';
import pathToRegexp from 'path-to-regexp';
import parseSwaggerJson from './parseSwaggerJson';
import parseMockData from './parseMockData';
import { SwaggerResponse, Methods, Options, Paths } from './interfaces';

// const defaultUrl = 'https://enterprise-api.creams.io/settlement/v2/api-docs';

const swaggerMock = (app: Application, { urls = [], propertyResolver, resultResolver, basePath: mockBasePath = '', enableWatcher = true }: Options = {}) => {
    const currentUrls = urls.map((url) => (Array.isArray(url) ? url[0] : url));
    loadRouters(currentUrls);

    if (enableWatcher) {
        const watchPaths = urls.reduce<string[]>((target, url) => {
            if (Array.isArray(url) && url[1]) {
                target.push(url[1]);
            }
            return target;
        }, []);
        const watcher = chokidar.watch(watchPaths, {
            interval: 1000,
            ignoreInitial: true,
        });
        watcher.addListener('addDir', (path) => {
            const url = findUrlByWatchPath(path);
            if (url) loadRouters([url]);
        });
    }

    function loadRouters(urls: string[]) {
        urls.forEach((url) => {
            Swagger({
                url,
            })
                .then(setRoutes)
                .catch((e: Error) => {
                    console.log(`[swagger-mocker ERROR] ${e.message}`);
                    console.warn(`[swagger-mocker ERROR] 请求 swagger url: ${url} 失败`);
                });
        });
    }

    function setRoutes(swaggerData: SwaggerResponse) {
        const { paths, definitions, basePath } = parseSwaggerJson(swaggerData);
        app.all(`${mockBasePath}${basePath}/*`, (req, res, next) => {
            const targetPath = req.path.split(`${mockBasePath}${basePath}`)[1];
            const currentPath = matchPath(targetPath, paths);

            const path = currentPath && currentPath[req.method.toLowerCase() as Methods] ? currentPath[req.method.toLowerCase() as Methods] : undefined;
            if (!path) {
                res.json({
                    url: req.url,
                    method: req.method,
                    status: 404,
                    message: '没找到该 url 的api',
                });
            } else {
                const result = resultResolver
                    ? resultResolver({
                          url: req.url,
                          path: req.path,
                          method: req.method as Methods,
                          swaggerPath: path,
                      })
                    : parseMockData(path.responses[200] || {}, definitions, propertyResolver);
                res.json(result);
            }
        });
        // 将 router 放在第四个在 webpack 相关中间件之前
        if (app._router.stack.length > 0) {
            app._router.stack.splice(3, 0, app._router.stack.splice(app._router.stack.length - 1, 1)[0]);
        }
        console.log(`[swagger-mocker SUCCESS] 加载 ${swaggerData.url} 成功`);
    }
    /**
     * 找到被监听的 url
     * @param watchPath
     */
    function findUrlByWatchPath(watchPath: string) {
        const url = urls.find((url) => Array.isArray(url) && url[1] === watchPath);
        return url ? (url as [string, string])[0] : url;
    }
};

/**
 * 匹配 path
 * @param path
 * @param paths
 */
function matchPath(path: string, paths: Paths) {
    const pathKey = Object.keys(paths).find((pathKey) => {
        const regexp = pathToRegexp(
            pathKey.replace(/\{(.+?)\}/g, (searchValue, replaceValue) => {
                return `:${replaceValue}`;
            }),
        );
        return regexp.test(path);
    });
    return pathKey ? paths[pathKey] : undefined;
}

export default swaggerMock;
