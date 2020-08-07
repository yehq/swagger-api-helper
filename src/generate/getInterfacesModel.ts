import { Definitions } from '../interfaces';
import getInterface from './getInterface';
import renderRefModelTitle from './getRefModelTitle';
import { CommentType, InterfaceModel } from './interfaces';

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
    const includeInterfaceNamesWithRelated = new Set();
    const interfaceModelByName = new Map<string, InterfaceModel>();

    const definitionKeys = Object.keys(definitions);
    definitionKeys.forEach(key => {
        const interfaceName = renderRefModelTitle({
            ...definitions[key],
            title: key,
        });
        const interfaceModel = getInterface(definitions[key], CommentType.singleRight);
        interfaceModelByName.set(interfaceName, interfaceModel);
    });
    /**
     * 递归获取需要生成的 interfaceName
     * @param relatedInterfaceNames 关联的接口名称(表示需要生成的接口)
     */
    const getRelatedInterfaceNames = (relatedInterfaceNames: string[]) => {
        if (relatedInterfaceNames.length === 0) return;
        interfaceModelByName.forEach((interfaceModel, interfaceName) => {
            if (relatedInterfaceNames.includes(interfaceName)) {
                includeInterfaceNamesWithRelated.add(interfaceName);
                /**
                 * 获得当前没有添加过的 关联 interfaceName
                 */
                const uniqueRelatedInterfaceNames = interfaceModel.relatedInterfaceNames.filter(
                    interfaceName => !includeInterfaceNamesWithRelated.has(interfaceName)
                );
                getRelatedInterfaceNames(uniqueRelatedInterfaceNames);
            }
        });
    };
    getRelatedInterfaceNames(includeInterfaceNames);
    const interfaceContents: string[] = [];
    interfaceModelByName.forEach(({ content: interfaceContent }, interfaceName) => {
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
