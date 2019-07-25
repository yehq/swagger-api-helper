import Swagger from 'swagger-client';
import { SwaggerResponse } from '../interfaces';

export default (url: string) => {
    return new Promise<SwaggerResponse>((resolve, reject) => {
        Swagger({
            url,
        })
            .then((swaggerData: SwaggerResponse) => resolve(swaggerData))
            .catch((e: Error) => {
                reject(e);
            });
    });
};
