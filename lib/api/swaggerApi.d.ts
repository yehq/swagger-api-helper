import { Options, GenMessage } from './interfaces';
declare const swaggerApi: (options: Options) => Promise<{
    successMessages: GenMessage[];
    errorMessages: GenMessage[];
}[]>;
export default swaggerApi;
