export declare const enum Type {
    object = "object",
    number = "number",
    integer = "integer",
    array = "array",
    string = "string",
    any = "any",
    boolean = "boolean",
    file = "file"
}
export interface Tag {
    description: string;
    name: string;
    example: any;
    format: Format;
    $ref: string;
}
export interface Info {
    description: string;
    title: string;
    version: string;
}
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
export declare type Methods = 'delete' | 'get' | 'post' | 'put';
export declare const enum In {
    header = "header",
    query = "query",
    body = "body",
    path = "path",
    formData = "formData"
}
export declare type Format = string | 'int64' | 'date-time';
export interface Schema {
    format?: Format;
    enum?: string[];
    type?: Type;
    $$ref?: string;
    items?: Schema;
    properties?: Properties;
    additionalProperties?: Schema;
    title?: string;
    xml?: {
        name: string;
    };
    required?: string[];
    description?: string;
    example?: any;
    default?: string;
    allowEmptyValue?: boolean;
}
export interface Parameter<T = In> {
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
export interface Response {
    description: string;
    schema?: Schema;
}
export declare type Path = {
    consumes?: string[];
    deprecated: boolean;
    operationId: string;
    parameters?: Parameter[];
    produces: string[];
    responses: {
        [key: string]: Response;
    };
    summary: string;
    tags: string[];
    __originalOperationId?: string;
};
export interface Paths {
    [pathName: string]: {
        [method in Methods]?: Path;
    };
}
export interface SwaggerJson {
    basePath: string;
    definitions: Definitions;
    host: string;
    swagger: string;
    tags: Tag[];
    info: Info;
    paths: Paths;
}
export interface SwaggerResponse {
    url: string;
    riginalSpec: any;
    spec: SwaggerJson;
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
export interface SwaggerModel {
    [tagName: string]: {
        name: string;
        description: string;
        paths: CustomPath[];
    };
}
