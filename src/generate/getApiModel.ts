import { CustomPath, Type, Parameter, Response, Schema } from '../interfaces';

import path from 'path';
import { firstCharUpper } from '../utils';
import getInterface from './getInterface';
import getRefModelTitle from './getRefModelTitle';
import { isEnum } from './isTypes';
import typeMap from './typeMap';
import { InterfaceNames, ParaPayloadName, PayloadContent, Options } from './interfaces';

const extraFetchOptionsInterfaceName = 'ExtraFetchOptions';
const extraFetchOptionsParaName = 'extraFetchOptions';

export default (
    items: CustomPath[],
    key: string,
    basePath: string,
    filename: string,
    {
        importExtraFetchOptions = () =>
            `import { ${extraFetchOptionsInterfaceName} } from '@/types';`,
        importRequest = () => `import request from '@/utils/request';`,
        importStringify = () => `import stringify from '@/utils/stringify';`,
        hasExtraFetchOptions = true,
        hasBasePath = true,
    }: Options
) => {
    const currentBasePath = hasBasePath ? basePath : '';
    const imports = [
        importRequest(filename),
        hasExtraFetchOptions && importExtraFetchOptions(filename),
    ].filter(Boolean);
    const { content, globalInterfaceNames, hasQuery } = renderContent(items, currentBasePath);
    if (globalInterfaceNames.length > 0) {
        imports.push(
            `import { ${globalInterfaceNames.join(', ')} } from '${key
                .split('/')
                .map((item, index) => (index === 0 ? './' : '../'))
                .join('')}interfaces'`
        );
    }
    if (hasQuery) {
        imports.unshift(importStringify(filename));
    }
    return `${imports.join('\n')}\n\n${content}`;

    function renderContent(items: CustomPath[], basePath: string) {
        const globalInterfaceNames = new Set();
        const content = `
${items
    .map(item => {
        const {
            pathKey,
            url,
            method,
            parametersInBody = [],
            parametersInQuery = [],
            deprecated,
            summary,
        } = item;
        const fullUrl = path.join(basePath, url);
        const interfacePrefix = firstCharUpper(pathKey);
        const interfaceNames = {
            query: `${interfacePrefix}Query`,
            body: `${interfacePrefix}Body`,
            payload: `${interfacePrefix}Payload`,
        };
        const { interfaces, itemInterfaceNames, responseInterfaceName } = renderMethodInterface(
            item,
            interfaceNames
        );
        itemInterfaceNames.forEach(itemInterfaceName =>
            globalInterfaceNames.add(itemInterfaceName)
        );
        const paramsString = renderParams(item);
        return `${interfaces}

/**
 * ${deprecated ? '废弃不用 ' : ''}${summary}
 * ${deprecated ? '@deprecated' : ''}
 */
export async function ${pathKey}(${renderArgs(interfaces, interfaceNames.payload)}) {${paramsString}
    return request<${responseInterfaceName}>(\`${fullUrl}${
            parametersInQuery.length > 0 ? '?${stringify(query)}' : ''
        }\`, {${paramsString ? `\n\t\t...${extraFetchOptionsParaName},` : ''}
        method: '${method}',${parametersInBody.length > 0 ? '\n\t\tbody,' : ''}
    });
}
`;
    })
    .join('')}
`;
        return {
            content,
            globalInterfaceNames: [...globalInterfaceNames],
            hasQuery: items.some(item => (item.parametersInQuery || []).length > 0),
        };
    }

    /**
     * 返回 方法中的参数内容  如  const { body, query, ...extraFetchOptions } = payload;
     * @param {object} item
     */
    function renderParams(item: CustomPath) {
        const { parametersInPath = [], parametersInBody = [], parametersInQuery = [] } = item;
        const params = [
            ...(parametersInPath.length > 0 ? parametersInPath.map(({ name }) => name) : []),
            ...(parametersInBody.length > 0 ? ['body'] : []),
            ...(parametersInQuery.length > 0 ? ['query'] : []),
        ];
        const paramsString = `{ ${params.join(', ')}, ...${extraFetchOptionsParaName} }`;
        return `\n\tconst ${
            params.length === 0 ? extraFetchOptionsParaName : paramsString
        } = payload;`;
    }

    /**
     * 返回方法参数  如 payload: Payload
     * @param {string} interfaces
     * @param {object} payloadInterfaceName
     */
    function renderArgs(interfaces: string, payloadInterfaceName: string) {
        if (interfaces) {
            return `payload: ${payloadInterfaceName}`;
        }
        return '';
    }

    /**
     * 生成方法参数的interface  如 export interface InterfaceName extends ExtraFetchOptions { id: number }
     * @param {array} item
     */
    function renderPayloadInterface(items: PayloadContent[], interfaceName: string) {
        return `export interface ${interfaceName} ${
            hasExtraFetchOptions ? `extends ${extraFetchOptionsInterfaceName} ` : ''
        }{\n\t${items
            .map(
                item => `${getPayloadInterfaceParaDescription(item)}${item.name}: ${item.typeName}`
            )
            .join('\n\t')}\n}`;
    }

    // 生成 payload 中的 description
    function getPayloadInterfaceParaDescription(item: PayloadContent) {
        return item.description
            ? `/**\n\t * ${item.description.replace(/\n/g, '\n\t * ').replace(/$/g, '\n\t */\n\t')}`
            : '';
    }

    /**
     * 返回单个方法 字符串形式的所有接口 和 关联的 body 的interface名称
     * @param {object} item
     * @param {string} interfaceNames
     */
    function renderMethodInterface(item: CustomPath, interfaceNames: InterfaceNames) {
        const {
            parametersInQuery = [],
            parametersInBody = [],
            parametersInFormData = [],
            parametersInPath = [],
            responses,
        } = item;
        const itemInterfaceNames: string[] = [];
        let responseInterfaceName: string | undefined = Type.any;
        const payloadContent: PayloadContent[] = parametersInPath.map(paraInPath => ({
            name: paraInPath.name,
            typeName: getType(paraInPath.type!),
        }));
        const queryInterface = renderInterface(parametersInQuery, interfaceNames.query);
        if (queryInterface) {
            payloadContent.push({
                name: ParaPayloadName.query,
                typeName: interfaceNames.query,
            });
        }
        const getTypeName = (target: Response | Parameter) => {
            if (!target.schema) return;
            let typeName = '';
            const addInterfaceName = (typeName: string, type: Type) => {
                itemInterfaceNames.push(typeName);
                return type === 'array' ? `${typeName}[]` : typeName;
            };
            // 处理对象
            if (target.schema.$$ref) {
                typeName = getRefModelTitle(target.schema);
                typeName = addInterfaceName(typeName, target.schema.type!);
            } else if (target.schema.items && target.schema.items.$$ref) {
                // 处理数组
                typeName = getRefModelTitle(target.schema.items);
                typeName = addInterfaceName(typeName, target.schema.type!);
            } else {
                typeName = getType(target.schema.type!, target.schema.items);
            }
            return typeName;
        };
        Object.keys(responses).forEach(status => {
            responseInterfaceName = getTypeName(responses[status]);
        });
        if (parametersInBody.length > 0) {
            const body = parametersInBody[0];
            const typeName = getTypeName(body);
            if (typeName)
                payloadContent.push({
                    name: ParaPayloadName.body,
                    typeName,
                    description: body.description,
                });
        }
        if (parametersInFormData.length > 0) {
            payloadContent.push({
                name: ParaPayloadName.body,
                typeName: 'FormData',
                description: `${renderInterface(parametersInFormData, 'FormContent')}`,
            });
        }
        const payloadInterface = renderPayloadInterface(payloadContent, interfaceNames.payload);
        const interfaceArray = [queryInterface, payloadInterface].filter(item => !!item);
        return {
            interfaces: interfaceArray.join('\n'),
            itemInterfaceNames,
            responseInterfaceName,
        };
    }

    /**
     * 返回一个字符串形式的接口
     * @param {object} parameters
     * @param {string} name
     */
    function renderInterface(parameters: Parameter[], name: string) {
        if (parameters.length === 0) return '';
        const schema = parameters.reduce<Schema>(
            (target, item) => {
                // 特殊处理 body 中的 request 对象
                if (item.schema) {
                    target.properties = item.schema.properties;
                    target.items = item.schema.items;
                    target.type = item.schema.type;
                } else {
                    if (!target.properties) {
                        target.properties = {};
                    }
                    const { required, ...rest } = item;
                    target.properties[item.name] = {
                        type: Type.object,
                        ...rest,
                    };
                }
                return target;
            },
            {
                properties: {},
                required: parameters.reduce<string[]>((target, item) => {
                    if (item.required) {
                        target.push(item.name);
                    }
                    return target;
                }, []),
                type: Type.object,
            }
        );
        const result = getInterface(schema, 1);
        if (result.trim().indexOf('{') === 0) {
            return `\nexport interface ${name} ${result}\n`;
        }
        return `\nexport type ${name} = ${result}`;
    }

    /**
     * 将后端给的type转化为 typescript 中的type
     * @param {string} type
     */
    function getType(type: string, items: Schema = { type: Type.any }): string {
        if (type === Type.array) {
            if (isEnum(items)) {
                return `Array<${items.enum!.map(name => `'${name}'`).join(' | ')}>`;
            }
            if (items.type) {
                return `${getType(items.type)}[]`;
            }
        }
        return typeMap[type] ? typeMap[type] : type;
    }
};
