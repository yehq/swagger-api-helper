import { CustomPath, Type, Parameter, Response, Schema } from '../interfaces';
import { firstCharUpper, getRef } from '../utils';
import getInterface from './getInterface';
import getRefModelTitle from './getRefModelTitle';
import { isEnum } from './isTypes';
import typeMap from './typeMap';
import {
    InterfaceNames,
    ParaPayloadName,
    PayloadContent,
    Options,
    CommentType,
    ApiModel,
} from './interfaces';
import renderComment from './renderComment';
import defaultRenderFunction from './defaultRenderFunction';

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
        renderFunction,
        extraImport,
    }: Options
): ApiModel => {
    const currentBasePath = hasBasePath ? basePath : '';
    let imports = [
        importRequest(filename),
        hasExtraFetchOptions && importExtraFetchOptions(filename),
    ].filter(Boolean);
    const { content, relatedInterfaceNames, hasQuery } = renderContent(items, currentBasePath);
    /**
     * swagger models 接口导入
     */
    const relatedInterfaceNamesImport = `import { ${relatedInterfaceNames.join(', ')} } from '${key
        .split('/')
        .map((item, index) => (index === 0 ? './' : '../'))
        .join('')}interfaces';`;
    if (relatedInterfaceNames.length > 0) {
        imports.push(relatedInterfaceNamesImport);
    }
    if (hasQuery) {
        imports.unshift(importStringify(filename));
    }
    /**
     * 存在 renderFunction 时
     * 只需要引入 全局接口类型 和自定义导入
     */
    if (renderFunction) {
        imports = [relatedInterfaceNamesImport];
    }
    if (extraImport) {
        imports.unshift(extraImport);
    }
    return {
        content: content.trim() ? `${imports.join('\n')}\n\n${content}` : '',
        relatedInterfaceNames,
        hasQuery,
    };

    function renderContent(items: CustomPath[], basePath: string) {
        // 当前需要 从 interfaces 引入的接口名称
        const relatedInterfaceNames = new Set<string>();
        const content = `
${items
    .map(item => {
        const {
            pathKey,
            url,
            method,
            parametersInBody = [],
            parametersInQuery = [],
            parametersInPath = [],
            deprecated,
            summary,
            description,
        } = item;
        const interfacePrefix = firstCharUpper(pathKey);
        const interfaceNames = {
            query: `${interfacePrefix}Query`,
            body: `${interfacePrefix}Body`,
            payload: `${interfacePrefix}Payload`,
            params: `${interfacePrefix}Params`,
        };
        const { interfaces, itemInterfaceNames, responseInterfaceName } = renderMethodInterface(
            item,
            interfaceNames
        );
        itemInterfaceNames.forEach(itemInterfaceName =>
            relatedInterfaceNames.add(itemInterfaceName)
        );

        const paramsTypeMap = parametersInPath.reduce<{ [name: string]: string }>(
            (target, item) => {
                target[item.name] = getType(item.type!);
                return target;
            },
            {}
        );

        const hasBody = parametersInBody.length > 0;
        const hasParams = parametersInPath.length > 0;
        const parametersHasQuery = parametersInQuery.length > 0;
        const currentRenderFunction = renderFunction || defaultRenderFunction;
        const functionString = currentRenderFunction(
            {
                basePath,
                url,
                name: pathKey,
                method,
                hasBody,
                hasParams,
                hasQuery: parametersHasQuery,
                responseType: responseInterfaceName || 'undefined',
                payloadType: interfaces ? interfaceNames.payload : undefined,
                paramsType: hasParams ? interfaceNames.params : undefined,
                queryType: parametersHasQuery ? interfaceNames.query : undefined,
                paramsTypeMap: paramsTypeMap,
                extraFetchOptionsParaName,
            },
            item
        ).trim();

        return `${interfaces}
    
${renderComment(
    CommentType.multiline,
    `
${deprecated ? '废弃不用 ' : ''}
${deprecated ? '@deprecated' : ''}
${summary ? `@summary ${summary}` : ''}
${description ? `@description ${description}` : ''}
`.trim(),
    functionString
)}

`;
    })
    .join('')}
`;
        return {
            content,
            relatedInterfaceNames: [...relatedInterfaceNames],
            // 是否存在 query 参数
            hasQuery: items.some(item => (item.parametersInQuery || []).length > 0),
        };
    }

    /**
     * 生成方法参数的interface  如 export interface InterfaceName extends ExtraFetchOptions { id: number }
     * @param {array} item
     */
    function renderPayloadInterface(items: PayloadContent[], interfaceName: string) {
        return `export interface ${interfaceName} ${
            hasExtraFetchOptions ? `extends ${extraFetchOptionsInterfaceName} ` : ''
        }{\n${items
            .map(item => {
                const content = `${item.name}: ${item.typeName};`;
                return renderComment(CommentType.multiline, item.description, content, '\t');
            })
            .join('\n')}\n}`;
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
            responses = {},
        } = item;
        const itemInterfaceNames: string[] = [];
        let responseInterfaceName: string | undefined = Type.any;
        const payloadContent: PayloadContent[] = parametersInPath.map(paraInPath => ({
            name: paraInPath.name,
            typeName: getType(paraInPath.type!),
        }));
        const queryInterface = renderInterface(
            parametersInQuery,
            interfaceNames.query,
            CommentType.singleRight
        );
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
            if (getRef(target.schema)) {
                typeName = getRefModelTitle(target.schema);
                typeName = addInterfaceName(typeName, target.schema.type!);
            } else if (target.schema.items && getRef(target.schema.items)) {
                // 处理数组
                typeName = getRefModelTitle(target.schema.items);
                typeName = addInterfaceName(typeName, target.schema.type!);
            } else {
                typeName = getType(target.schema.type!, target.schema.items);
            }
            return typeName;
        };
        /**
         * 获取 response 中 status 为 [200, 300) 的结果作为返回值
         * 没有 则取第一个
         */
        if (Object.keys(responses).length > 0) {
            const statuses = Object.keys(responses);
            const status = statuses.find(item => +item >= 200 && +item < 300) || statuses[0];
            responseInterfaceName = getTypeName(responses[status]);
        }
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
                description: `${renderInterface(
                    parametersInFormData,
                    'FormContent',
                    CommentType.singleRight
                )}`,
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
    function renderInterface(parameters: Parameter[], name: string, commentType: CommentType) {
        if (parameters.length === 0) return '';
        const schema = parameters.reduce<Schema>(
            (target, item) => {
                if (!target.properties) {
                    target.properties = {};
                }
                const { required, ...rest } = item;
                target.properties[item.name] = {
                    type: Type.object,
                    ...rest,
                };
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
        const { content: result } = getInterface(schema, commentType, 1);
        if (!result) {
            return `\nexport type ${name} = any`;
        }
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
