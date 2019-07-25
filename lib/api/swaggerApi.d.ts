import { Options, GenMessage } from './interfaces';
declare const swaggerApi: ({ urls, hasBasePath, outputPath }: Options) => Promise<{
    successMessages: GenMessage[];
    errorMessages: GenMessage[];
}[]>;
export default swaggerApi;
