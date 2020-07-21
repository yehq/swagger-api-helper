import { Options } from './interfaces';
import ApiGenerator from './ApiGenerator';

const generate = async (options: Options) => {
    const apiGenerator = new ApiGenerator(options);
    await apiGenerator.fetch();
    return apiGenerator.generate();
};

export default generate;
