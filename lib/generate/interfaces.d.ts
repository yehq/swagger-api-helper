export declare type Url = string | [string, // swagger url
string];
export interface Options {
    urls: Url[];
    hasBasePath?: boolean;
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
export declare const enum ParaPayloadName {
    query = "query",
    body = "body"
}
export interface PayloadContent {
    name: ParaPayloadName | string;
    typeName: string;
    description?: string;
}
export declare enum Status {
    success = "success",
    error = "error"
}
export interface GenMessage {
    outputPath: string;
    message: string;
    status: Status;
}
export declare enum CommentType {
    single = 0,
    singleRight = 1,
    multiline = 2
}
