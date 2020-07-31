import { Definitions } from '../interfaces';
import getInterface from './getInterface';
import renderRefModelTitle from './getRefModelTitle';
import { CommentType } from './interfaces';

/**
 * 将 definitions 结构转化为 interface 结构
 * @params definitions
 * @params includeInterfaceNames 需要生成的 interface 名称 includeInterfaceNames 接口关联的 其他接口也需要生成
 */
export default (definitions: Definitions, includeInterfaceNames: string[]): string => {
    /**
     * 需要生成的 接口名称
     * 包括了
     * 1. 传入的 includeInterfaceNames
     * 2. includeInterfaceNames 关联的其他 接口名称
     */
    const includeInterfaceNamesWithRelated = new Set(includeInterfaceNames);
    const interfaceContentByName = new Map<string, string>();

    const definitionKeys = Object.keys(definitions);
    definitionKeys.forEach(key => {
        const interfaceName = renderRefModelTitle({
            ...definitions[key],
            title: key,
        });
        const { content: interfaceContent, relatedInterfaceNames } = getInterface(
            definitions[key],
            CommentType.singleRight
        );

        interfaceContentByName.set(interfaceName, interfaceContent);
        if (includeInterfaceNames.includes(interfaceName)) {
            relatedInterfaceNames.forEach(name => includeInterfaceNamesWithRelated.add(name));
        }
    });

    const interfaceContents: string[] = [];
    interfaceContentByName.forEach((interfaceContent, interfaceName) => {
        if (includeInterfaceNamesWithRelated.has(interfaceName)) {
            interfaceContents.push(
                interfaceContent.trim().indexOf('{') === 0
                    ? `export interface ${interfaceName} ${interfaceContent}`
                    : `export type ${interfaceName} = ${interfaceContent}`
            );
        }
    });

    return interfaceContents.join('\n');
};
