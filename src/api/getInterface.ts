import renderRefModelTitle from './getRefModelTitle';
import { isEnum, isLong } from './isTypes';
import typeMap from './typeMap';
import { Schema, Properties } from '../interfaces';

/**
 *
 * @param {object} schema { type: string, properties: schema, items: schema[]， title: string, description: string, required: string[], example: string }
 */
function loopInterface(schema: Schema, level = 1, translateLongToString: boolean = false): string {
    const { type, properties, items, required } = schema;
    const getFullType = (model?: Properties): string => {
        if (!model) return 'any\t// 解析该字段出错 请联系后台修改格式';
        const tabs = new Array(level).fill('\t').join('');
        const items = Object.keys(model).map((key) => {
            const target = model[key];
            const isRequired = Array.isArray(required) ? required.indexOf(key) > -1 : required;
            return `${tabs}${key}${isRequired ? '' : '?'}: ${loopInterface(target, level + 1, translateLongToString)}\t${renderDescription(target)}`;
        });
        return `{\n${items.join('\n')}\n${new Array(level - 1).fill('\t').join('')}}`;
    };

    switch (type) {
        case 'array':
            if (schema.$$ref) return `Array<${renderRefModelTitle(schema)}>`;
            return `Array<${loopInterface(items!, level)}>`;
        case 'object':
            if (schema.$$ref) return renderRefModelTitle(schema);
            return getFullType(properties);
        case 'integer':
            return isLong(schema) && translateLongToString ? 'string' : 'number';
        case 'string':
            if (isEnum(schema)) return schema.enum!.map((item) => `'${item}'`).join(' | ');
        case 'boolean':
        case 'file':
        default:
            return typeMap[type!];
    }
}

/**
 * 注释中返回字段的描述信息
 * @param {object} target
 */
function renderDescription(target: Schema) {
    const description = target.description ? target.description : '';
    const example = target.example ? `example: ${JSON.stringify(target.example)}` : '';
    const defaultValue = target.default ? `default: ${target.default}` : '';
    const allowEmptyValue = target.allowEmptyValue ? `allowEmptyValue: ${target.allowEmptyValue}` : '';
    const result = [description, example, defaultValue, allowEmptyValue];
    return result.some((item) => item !== '') ? `// ${result.join(' ')}` : '';
}

export default loopInterface;
