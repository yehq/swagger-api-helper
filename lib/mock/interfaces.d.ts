import { Mockjs } from 'mockjs';
import { Type, Methods, Path } from '../interfaces';
export declare type PropertyResolver = (dataKey: string, type: Type, Mock: Mockjs) => any;
export declare type ResultResolver = (payload: {
    url: string;
    method: Methods;
    path: string;
    swaggerPath: Path;
}) => any;
export declare type Url = string | [string, // swagger url
string];
export interface Options {
    enableWatcher?: boolean;
    urls?: Url[];
    propertyResolver?: PropertyResolver;
    resultResolver?: ResultResolver;
    basePath?: string;
}
