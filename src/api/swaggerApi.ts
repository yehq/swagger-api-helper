import { fetchSwaggerJson, writeFile } from '../utils';
import getApiModel from './getApiModel';
import getInterfacesModel from './getInterfacesModel';
import { Options, Status, GenMessage } from './interfaces';
import parseSwaggerJson from '../parseSwaggerJson';
import { join, basename } from 'path';

const interfaceModelsName = 'interfaces';

const swaggerApi = ({ urls, hasBasePath = true, outputPath }: Options) => {
    const targetUrls = urls.map((url, index) => {
        if (typeof url === 'string') {
            return [url, `swaggerApi${index}`];
        }
        return url;
    });
    const genApis = targetUrls.map(([url, dirname], index) => {
        return new Promise((resolve, reject) => {
            const successMessages = [];
            const errorMessages = [];
            return fetchSwaggerJson(url)
                .then((data) => {
                    const { swaggerObj, basePath, definitions } = parseSwaggerJson(data);
                    const apiModelPromises = Object.keys(swaggerObj).map((key) => {
                        const contents = getApiModel(swaggerObj[key].paths, key, hasBasePath ? basePath : '', false);
                        const filename = join(outputPath, `${dirname}/${key}.ts`);
                        return genFile(filename, contents);
                    });
                    const interfaceModelsContent = getInterfacesModel(definitions);
                    const interfacesFilename = join(outputPath, `${dirname}/${interfaceModelsName}.ts`);
                    const interfacesModelPromise = genFile(interfacesFilename, interfaceModelsContent);
                })
                .catch((e) => {
                    console.log(e);
                });
        });
    });
    return Promise.all(genApis).then((messages) => {
        console.log(messages);
        return messages;
    });
};

export default swaggerApi;

function genFile(filename: string, content: string) {
    const fileBasename = basename(filename);
    return new Promise<GenMessage>((resolve, reject) => {
        writeFile(filename, content)
            .then(() => {
                resolve(getSuccessMessage(filename));
                console.log(`${fileBasename}.ts saved!`);
            })
            .catch((err) => {
                reject(getErrorMessage(filename));
                return console.error(`Failed to store ${fileBasename}.ts:${err.message}`);
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
