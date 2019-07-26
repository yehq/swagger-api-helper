import { Schema } from '../interfaces';

// 是否是 long 类型 对应是 int64
export function isLong({ type, format }: Schema) {
    return type === 'integer' && format === 'int64';
}

// 判断是否是 enum
export function isEnum({ enum: enumArray }: Schema) {
    return Array.isArray(enumArray);
}
