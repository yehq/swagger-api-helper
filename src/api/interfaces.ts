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
