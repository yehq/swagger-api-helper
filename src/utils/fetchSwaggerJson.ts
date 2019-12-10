import Swagger from 'swagger-client';
import { SwaggerFetchOptions, SwaggerResponse } from '../interfaces';

export default (url: string, opts: SwaggerFetchOptions = {}) => {
    return new Promise<SwaggerResponse>((resolve, reject) => {
        const defaultHeaders = {
            Accept: 'application/json',
            'Content-Type': 'application/json; charset=utf-8',
            ...opts.headers,
        };
        Swagger.http({ url, ...opts, headers: defaultHeaders })
            .then((swaggerData: { data: string }) => {
                resolve({ url, spec: JSON.parse(swaggerData.data) });
            })
            .catch((e: Error) => {
                reject(e);
            });
    });
};
