import { Mockjs } from 'mockjs';
import { Type, Methods, Path, SwaggerFetchOptions } from '../interfaces';

export type PropertyResolver = (dataKey: string, type: Type | undefined, Mock: Mockjs) => any;
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
      ]
    | [
          string, // swagger url
          // 需要监听的路由 监听变化来改变mock
          string,
          SwaggerFetchOptions | undefined // 单个 swagger api url 请求 配置属性
      ];

export interface Options {
    // swagger api 请求 配置属性
    fetchOptions?: SwaggerFetchOptions;
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
    // 是否允许所有跨域 默认 false
    cors?: boolean;
}
