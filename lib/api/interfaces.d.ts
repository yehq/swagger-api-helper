export declare type Url = string | [string, // swagger url
string];
export interface Options {
    urls: Url[];
    hasBasePath?: boolean;
    outputPath: string;
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
