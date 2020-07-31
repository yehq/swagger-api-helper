import renderRefModelTitle from './getRefModelTitle';
import { isEnum } from './isTypes';
import typeMap from './typeMap';
import { Schema, Properties, Type } from '../interfaces';
import { CommentType, InterfaceModel } from './interfaces';
import renderComment from './renderComment';
import { getRef } from '../utils';

export default (schema: Schema, commentType: CommentType, level = 1): InterfaceModel => {
    const relatedInterfaceNames = new Set<string>();

    /**
     *
     * @param {object} schema { type: string, properties: schema, items: schema[]， title: string, description: string, required: string[], example: string }
     */
    function loopInterface(schema: Schema, commentType: CommentType, level = 1): string {
        const { properties, items, required } = schema;
        const getFullType = (model?: Properties): string => {
            if (!model) return 'any';
            const tabs = new Array(level).fill('\t').join('');
            const items = Object.keys(model).map(key => {
                const target = model[key];
                const isRequired = Array.isArray(required) ? required.indexOf(key) > -1 : required;
                const content = `${key}${isRequired ? '' : '?'}: ${loopInterface(
                    target,
                    commentType,
                    level + 1
                )};`;
                return `${renderContentWithDescription(target, content, commentType, tabs)}`;
            });
            return `{\n${items.join('\n')}\n${new Array(level - 1).fill('\t').join('')}}`;
        };
        let type = schema.type;
        /**
         * 当 type 不存在，当作 object 处理
         */
        if (!type) {
            type = Type.object;
        }

        switch (type) {
            case Type.array:
                if (getRef(items || {})) {
                    const relatedInterfaceName = renderRefModelTitle(items || {});
                    relatedInterfaceNames.add(relatedInterfaceName);
                    return `Array<${relatedInterfaceName}>`;
                }
                return `Array<${loopInterface(items!, level)}>`;
            case Type.object:
                if (getRef(schema)) {
                    const relatedInterfaceName = renderRefModelTitle(schema);
                    relatedInterfaceNames.add(relatedInterfaceName);
                    return relatedInterfaceName;
                }
                return getFullType(properties);
            case Type.string:
                if (isEnum(schema)) return schema.enum!.map(item => `'${item}'`).join(' | ');
            case Type.boolean:
            case Type.integer:
            case Type.file:
            default:
                return typeMap[type!];
        }
    }

    return {
        content: loopInterface(schema, commentType, level),
        relatedInterfaceNames: [...relatedInterfaceNames],
    };
};

/**
 * 注释中返回字段的描述信息
 * @param {object} target
 */
function renderContentWithDescription(
    target: Schema,
    content: string,
    commentType: CommentType,
    tabs: string
) {
    const description = target.description ? target.description : '';
    const example = target.example ? `example: ${JSON.stringify(target.example)}` : '';
    const defaultValue = target.default ? `default: ${target.default}` : '';
    const allowEmptyValue = target.allowEmptyValue
        ? `allowEmptyValue: ${target.allowEmptyValue}`
        : '';
    const result = [description, example, defaultValue, allowEmptyValue].filter(Boolean);
    return renderComment(
        commentType,
        commentType === CommentType.singleRight ? result.join('; ') : result.join('\n'),
        content,
        tabs
    );
}
