import { SwaggerFetchOptions } from '../interfaces';

export type Url =
    | string // swagger url
    | [
          string, // swagger url
          string, // swagger url 生成接口所在对应的文件夹名称
          SwaggerFetchOptions | undefined // 单个 swagger api url 请求 配置属性
      ];

export interface Options {
    // swagger api 请求 配置属性
    fetchOptions?: SwaggerFetchOptions;
    // swagger urls
    urls: Url[];
    // 是否携带 basePath 默认 true
    hasBasePath?: boolean;
    // 文件输出路径
    outputPath: string;
    /**
     * 发送请求时是否需要传入自定义的属性
     * @default true
     */
    hasExtraFetchOptions?: boolean;
    /**
     * 返回 导入 request 的字符串
     * @default () => `import request from '@/utils/request'`;
     */
    importRequest?: (path: string) => string;
    /**
     * 返回 导入 stringify 的字符串
     * @default () => `import stringify from '@/utils/stringify'`;
     */
    importStringify?: (path: string) => string;
    /**
     * 返回 导入 ExtraFetchOptions 的字符串
     * @default () => `import { ExtraFetchOptions } from '@/types'`;
     */
    importExtraFetchOptions?: (path: string) => string;
}

export interface InterfaceNames {
    query: string;
    body: string;
    payload: string;
}

// 参数接口名称
export const enum ParaPayloadName {
    query = 'query',
    body = 'body',
}

// 方法的参数类型和描述
export interface PayloadContent {
    name: ParaPayloadName | string;
    typeName: string;
    description?: string;
}

// 文件生成结果的状态
export enum Status {
    success = 'success',
    error = 'error',
}

// 文件生成后的返回接口
export interface GenMessage {
    outputPath: string;
    message: string;
    status: Status;
}

// 注释类型
export enum CommentType {
    // 使用单行注释且位于属性之前 (//)
    single,
    // 使用单行注释且位于属性后面 (//)
    singleRight,
    // 使用多行注释且位于属性之前 (/** */)
    multiline,
}
