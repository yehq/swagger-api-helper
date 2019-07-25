import { fetchSwaggerJson, writeFile } from '../utils';
import serviceSource from './service';
import interfacesModelSource from './interfacesModel';
import { Options } from './interfaces';
import parseSwaggerJson from '../parseSwaggerJson';
import { join } from 'path';

const interfaceModelsName = 'interfaces';

const swaggerApi = ({ urls, hasBasePath = true, outputPath }: Options) => {
    const targetUrls = urls.map((url, index) => {
        if (typeof url === 'string') {
            return [url, `swaggerApi${index}`];
        }
        return url;
    });
    targetUrls.forEach(([url, dirname], index) =>
        fetchSwaggerJson(url)
            .then((data) => {
                const { swaggerObj, basePath, definitions } = parseSwaggerJson(data);
                Object.keys(swaggerObj).forEach((key) => {
                    const contents = serviceSource(swaggerObj[key].paths, key, hasBasePath ? basePath : '', false);
                    writeFile(join(outputPath, `${dirname}/${key}.ts`), contents)
                        .then(() => {
                            console.log(`${key}.ts Saved!`);
                        })
                        .catch((err) => {
                            console.error(`Failed to store ${key}.ts: ${err.message}.`);
                        });
                });

                const interfaceModelsContent = interfacesModelSource(definitions);
                writeFile(join(outputPath, `${dirname}/${interfaceModelsName}.ts`), interfaceModelsContent)
                    .then(() => {
                        console.log(`${interfaceModelsName}.ts Saved!`);
                    })
                    .catch((err) => {
                        return console.error(`生成接口模型出错${err.message}`);
                    });
            })
            .catch((e) => {
                console.log(e);
            }),
    );
};

export default swaggerApi;
