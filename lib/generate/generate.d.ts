import { Options, GenMessage } from './interfaces';
declare const generate: (options: Options) => Promise<{
    successMessages: GenMessage[];
    errorMessages: GenMessage[];
}[]>;
export default generate;
