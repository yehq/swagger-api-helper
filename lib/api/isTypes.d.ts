import { Schema } from '../interfaces';
export declare function isLong({ type, format }: Schema): boolean;
export declare function isEnum({ enum: enumArray }: Schema): boolean;
