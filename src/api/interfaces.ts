export type Url =
    | string // swagger url
    | [
          string, // swagger url
          string // swagger url 生成接口所在对应的文件夹名称
      ];

export interface Options {
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
