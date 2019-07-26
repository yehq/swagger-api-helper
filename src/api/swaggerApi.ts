import { fetchSwaggerJson, writeFile } from '../utils';
import getApiModel from './getApiModel';
import getInterfacesModel from './getInterfacesModel';
import { Options, Status, GenMessage } from './interfaces';
import parseSwaggerJson from '../parseSwaggerJson';
import { join, basename } from 'path';

const interfaceModelsName = 'interfaces';

const swaggerApi = (options: Options) => {
    const { urls, outputPath } = options;
    const targetUrls = urls.map((url, index) => {
        if (typeof url === 'string') {
            return [url, `swaggerApi${index}`];
        }
        return url;
    });
    const genApis = targetUrls.map(([url, dirname], index) => {
        return new Promise<{ successMessages: GenMessage[]; errorMessages: GenMessage[] }>(
            (resolve, reject) => {
                const successMessages: GenMessage[] = [];
                const errorMessages: GenMessage[] = [];
                return fetchSwaggerJson(url)
                    .then(data => {
                        let count = 0;
                        const { swaggerObj, basePath, definitions } = parseSwaggerJson(data);
                        const apiModelPromises = Object.keys(swaggerObj).map(key => {
                            const filename = join(outputPath, `${dirname}/${key}.ts`);
                            const contents = getApiModel(
                                swaggerObj[key].paths,
                                key,
                                basePath,
                                filename,
                                options
                            );
                            return () => genFile(filename, contents);
                        });
                        const interfaceModelsContent = getInterfacesModel(definitions);
                        const interfacesFilename = join(
                            outputPath,
                            `${dirname}/${interfaceModelsName}.ts`
                        );
                        const interfacesModelPromise = () =>
                            genFile(interfacesFilename, interfaceModelsContent);

                        const allPromises = [...apiModelPromises, interfacesModelPromise];
                        allPromises.forEach(item => {
                            item()
                                .then(successMessage => {
                                    successMessages.push(successMessage);
                                })
                                .catch(errMessage => {
                                    errorMessages.push(errMessage);
                                })
                                .finally(() => {
                                    count++;
                                    if (count === allPromises.length) {
                                        resolve({
                                            successMessages,
                                            errorMessages,
                                        });
                                    }
                                });
                        });
                    })
                    .catch(e => {
                        console.log(e);
                        reject(e);
                    });
            }
        );
    });
    return Promise.all(genApis);
};

export default swaggerApi;

function genFile(filename: string, content: string) {
    const fileBasename = basename(filename);
    return new Promise<GenMessage>((resolve, reject) => {
        writeFile(filename, content)
            .then(() => {
                resolve(getSuccessMessage(filename));
                console.log(`${fileBasename} saved!`);
            })
            .catch(err => {
                reject(getErrorMessage(filename));
                return console.error(`Failed to store ${fileBasename}:${err.message}`);
            });
    });
}

function getSuccessMessage(outputPath: string): GenMessage {
    return {
        outputPath,
        message: `${outputPath} generation succeeded`,
        status: Status.success,
    };
}

function getErrorMessage(outputPath: string): GenMessage {
    return {
        outputPath,
        message: `${outputPath} generation failed`,
        status: Status.error,
    };
}
