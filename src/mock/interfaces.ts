import { Mockjs } from 'mockjs';
import { Type, Methods, Path } from '../interfaces';

export type PropertyResolver = (dataKey: string, type: Type, Mock: Mockjs) => any;
export type ResultResolver = (payload: {
    url: string;
    method: Methods;
    path: string;
    swaggerPath: Path;
}) => any;

export type Url =
    | string // swagger url
    | [
          string, // swagger url
          // 需要监听的路由 监听变化来改变mock
          string
      ];

export interface Options {
    // 是否开启监听api目录
    enableWatcher?: boolean;
    // swagger urls
    urls?: Url[];
    // 处理单个参数的生成结果
    propertyResolver?: PropertyResolver;
    // 处理单个接口的生成结果
    resultResolver?: ResultResolver;
    // mock api 的 url 基本路径
    basePath?: string;
}
