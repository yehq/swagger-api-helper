import { Definitions } from '../interfaces';
import getInterface from './getInterface';
import renderRefModelTitle from './getRefModelTitle';
import { CommentType } from './interfaces';

export default (definitions: Definitions) => {
    return Object.keys(definitions)
        .map(key => {
            const interfaceName = renderRefModelTitle({
                title: key,
                ...definitions[key],
            });
            const interfaceContent = getInterface(definitions[key], CommentType.singleRight);
            return interfaceContent.trim().indexOf('{') === 0
                ? `export interface ${interfaceName} ${interfaceContent}`
                : `export type ${interfaceName} = ${interfaceContent}`;
        })
        .join('\n');
};
