import { Application } from 'express';
import chokidar from 'chokidar';
import pathToRegexp from 'path-to-regexp';
import parseMockData from './parseMockData';
import { SwaggerResponse, Methods, Paths, SwaggerFetchOptions } from '../interfaces';
import { fetchSwaggerJson } from '../utils';
import { Options } from './interfaces';

const swaggerMock = (
    app: Application,
    {
        urls = [],
        propertyResolver,
        resultResolver,
        basePath: mockBasePath = '',
        enableWatcher = true,
        fetchOptions = {},
        cors = false,
    }: Options = {}
) => {
    const currentUrls = urls.map(url => (Array.isArray(url) ? url[0] : url));
    loadRouters(currentUrls, false);

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
        watcher.addListener('addDir', (path: string) => {
            const url = findUrlByWatchPath(path);
            if (url) loadRouters([url]);
        });
    }

    function loadRouters(curUrls: string[], showMessage?: boolean) {
        curUrls.forEach((url, index) => {
            let currentFetchOptions: SwaggerFetchOptions | undefined = fetchOptions;
            const targetUrl = urls[index];
            if (Array.isArray(targetUrl)) {
                currentFetchOptions = targetUrl[2];
            }
            fetchSwaggerJson(url, currentFetchOptions)
                .then(swaggerData => {
                    setRoutes(swaggerData, showMessage);
                })
                .catch((e: Error) => {
                    console.log(`[swagger-api-mock ERROR] ${e.message} ${e.stack}`);
                    console.warn(`[swagger-api-mock ERROR] 请求 swagger url: ${url} 失败`);
                });
        });
    }

    function setRoutes(swaggerData: SwaggerResponse, showMessage?: boolean) {
        const currentShowMessage = typeof showMessage === 'undefined' ? true : showMessage;
        const {
            spec: { paths, definitions, basePath },
        } = swaggerData;
        app.all(`${mockBasePath}${basePath}/*`, (req, res, next) => {
            if (cors) {
                res.header('Access-Control-Allow-Origin', '*');
                res.header('Access-Control-Allow-Methods', '*');
                res.header('Access-Control-Allow-Headers', '*');
            }
            const targetPath = req.path.split(`${mockBasePath}${basePath}`)[1];
            const currentPaths = matchPath(targetPath, paths);
            const currentPath = currentPaths.find(
                currentPath => !!currentPath[req.method.toLowerCase() as Methods]
            );
            const path =
                currentPath && currentPath[req.method.toLowerCase() as Methods]
                    ? currentPath[req.method.toLowerCase() as Methods]
                    : undefined;

            if (!path) {
                res.json({
                    url: req.url,
                    method: req.method,
                    status: 404,
                    message: '没找到该 url 的api',
                });
            } else {
                const { responses = {} } = path;
                let status = '200';
                if (Object.keys(responses).length > 0) {
                    const statuses = Object.keys(responses);
                    status = statuses.find(item => +item >= 200 && +item < 300) || statuses[0];
                }
                let result = parseMockData(responses[status] || {}, definitions, propertyResolver);
                if (resultResolver) {
                    result = resultResolver({
                        url: req.url,
                        path: req.path,
                        method: req.method as Methods,
                        swaggerPath: path,
                    });
                }
                res.status(+status).json(result);
            }
        });
        // 将 router 放在第四个在 webpack 相关中间件之前
        if (app._router.stack.length > 0) {
            app._router.stack.splice(
                3,
                0,
                app._router.stack.splice(app._router.stack.length - 1, 1)[0]
            );
        }
        if (currentShowMessage) {
            console.log(`[swagger-api-mock SUCCESS] 加载 ${swaggerData.url} 成功`);
        }
    }
    /**
     * 找到被监听的 url
     * @param watchPath
     */
    function findUrlByWatchPath(watchPath: string) {
        const url = urls.find(url => Array.isArray(url) && url[1] === watchPath);
        return url ? (url as [string, string, SwaggerFetchOptions | undefined])[0] : url;
    }
};

/**
 * 匹配 path
 * @param path
 * @param paths
 */
function matchPath(path: string, paths: Paths) {
    const pathKeys = Object.keys(paths).filter(pathKey => {
        const regexp = pathToRegexp(
            pathKey.replace(/\{(.+?)\}/g, (searchValue, replaceValue) => {
                return `:${replaceValue}`;
            })
        );
        return regexp.test(path);
    });
    return pathKeys.map(key => paths[key]);
}

export default swaggerMock;
