import { SwaggerFetchOptions, CustomPath } from '../interfaces';

export type Url =
    | string // swagger url
    | [
          string, // swagger url
          string // swagger url 生成接口所在对应的文件夹名称
      ]
    | [
          string, // swagger url
          string, // swagger url 生成接口所在对应的文件夹名称
          SwaggerFetchOptions | undefined // 单个 swagger api url 请求 配置属性
      ];

export interface Options {
    // 额外的导入模块 (字符串形式) 自定义 renderFunction 时可能需要
    extraImport?: string;
    /**
     * 同来替换 默认 生成的方法字符串
     */
    renderFunction?: (options: RenderFunctionOptions, path: CustomPath) => string;
    // 生成的文件名，别名设置，用来自定义文件名，默认将 tag 做文件名
    tagAlias?: TagAlias;
    // 需要生成的接口(使用 tag 来匹配) 优先级大于 exclude
    include?: RegExp | string[];
    // 不需要生成的接口(使用 tag 来匹配)
    exclude?: RegExp | string[];
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

/**
 * renderFunction 的参数
 */
export interface RenderFunctionOptions {
    // 基本路由
    basePath: string;
    // 当前路由
    url: string;
    // 方法名称
    name: string;
    // 请求返回的类型
    responseType: string;
    // 请求入口参数类型
    payloadType?: string;
    // 请求query参数类型
    queryType?: string;
    // 请求path参数类型
    paramsType?: string;
    // 请求path 单独类型
    paramsTypeMap: { [name: string]: string };
    // api method
    method: string;
    // 是否存在 body
    hasBody: boolean;
    // 是否存在 query
    hasQuery: boolean;
    // 是否存在 path params
    hasParams: boolean;
    // 额外的属性参数名
    extraFetchOptionsParaName: string;
}

/**
 * swagger tag 别名
 * 用作生成的文件夹名称
 */
export interface TagAlias {
    [key: string]: string;
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

// 单文件生成后的返回信息接口
export interface GenMessage {
    outputPath: string;
    message: string;
    status: Status;
}

// 一个 swagger 地址 生成后的返回信息接口
export interface GenMessageWrapper {
    successMessages: GenMessage[];
    errorMessages: GenMessage[];
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

/**
 * 需要生成的 interface 结构
 */
export interface InterfaceModel {
    /**
     * interface 字符串形式的结构
     */
    content: string;
    /**
     * 这个 interface 关联的 其他 interface 名称
     */
    relatedInterfaceNames: string[];
}

/**
 * 需要生成的 一个文件 结构
 */
export interface ApiModel extends InterfaceModel {
    // 是否存在 query 参数
    hasQuery: boolean;
}
