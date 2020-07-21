// 属性类型
export const enum Type {
    object = 'object',
    number = 'number',
    integer = 'integer',
    array = 'array',
    string = 'string',
    any = 'any',
    boolean = 'boolean',
    file = 'file',
}

// swagger tag
export interface Tag {
    description: string;
    name: string;
    example: any;
    format: Format;
    $ref: string;
}

// swagger 基本信息
export interface Info {
    description: string;
    title: string;
    version: string;
}

// 通用的模型
export interface Definitions {
    [ModelName: string]: Definition;
}

export interface Properties {
    [propertyName: string]: Schema;
}

export interface Definition {
    type: Type;
    title: string;
    properties: Properties;
}

export type Methods = 'delete' | 'get' | 'post' | 'put';

// 请求参数的载体
export const enum In {
    header = 'header',
    query = 'query',
    body = 'body',
    path = 'path',
    formData = 'formData',
}

// 数据格式
export type Format = string | 'int64' | 'date-time';

// 结构的模型
export interface Schema {
    format?: Format;
    enum?: string[];
    type?: Type;
    $$ref?: string;
    $ref?: string;
    items?: Schema;
    properties?: Properties;
    // 存在时不存在 ref
    additionalProperties?: Schema;
    title?: string;
    xml?: { name: string };
    required?: string[];

    description?: string;
    example?: any;
    default?: string;
    allowEmptyValue?: boolean;
}

// 请求参数类型
export interface Parameter<T = In> {
    // 默认值
    default?: any;
    format?: Format;
    description: string;
    in: T;
    name: string;
    required: boolean;
    type?: Type;
    allowEmptyValue?: boolean;
    schema?: Schema;
    collectionFormat?: string;
    items?: Schema;
}

// 请求返回结果
export interface Response {
    description: string;
    schema?: Schema;
}

export type Path = {
    consumes?: string[];
    deprecated: boolean;
    operationId: string;
    parameters?: Parameter[];
    produces: string[];
    responses?: { [key: string]: Response };
    summary?: string;
    description?: string;
    tags: string[];
    __originalOperationId?: string;
};
export interface Paths {
    [pathName: string]: { [method in Methods]?: Path };
}
export interface SwaggerJson {
    basePath: string;
    definitions: Definitions;
    host: string;
    // swagger 版本号
    swagger: string;
    tags: Tag[];
    info: Info;
    paths: Paths;
}

export interface SwaggerResponse {
    url?: string;
    riginalSpec?: any;
    spec: SwaggerJson;
}

export interface SwaggerFetchOptions {
    query?: object;
    method?: string;
    body?: any;
    headers?: HeadersInit;
}

export interface CustomPath extends Path {
    pathKey: string;
    url: string;
    method: Methods;
    parametersInPath?: Parameter<In.path>[];
    parametersInQuery?: Parameter<In.query>[];
    parametersInBody?: Parameter<In.body>[];
    parametersInFormData?: Parameter<In.formData>[];
    parametersInHeader?: Parameter<In.header>[];
}

// 当前所需要的结构
export interface SwaggerModel {
    [tagName: string]: {
        name: string;
        description: string;
        paths: CustomPath[];
    };
}
