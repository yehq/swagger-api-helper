import { Mockjs } from 'mockjs';
import { Type, Methods, Path, SwaggerFetchOptions } from '../interfaces';
export declare type PropertyResolver = (dataKey: string, type: Type, Mock: Mockjs) => any;
export declare type ResultResolver = (payload: {
    url: string;
    method: Methods;
    path: string;
    swaggerPath: Path;
}) => any;
export declare type Url = string | [string, // swagger url
string, SwaggerFetchOptions | undefined];
export interface Options {
    fetchOptions?: SwaggerFetchOptions;
    enableWatcher?: boolean;
    urls?: Url[];
    propertyResolver?: PropertyResolver;
    resultResolver?: ResultResolver;
    basePath?: string;
}
