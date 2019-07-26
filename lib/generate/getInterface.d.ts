import { Schema } from '../interfaces';
/**
 *
 * @param {object} schema { type: string, properties: schema, items: schema[]， title: string, description: string, required: string[], example: string }
 */
declare function loopInterface(schema: Schema, level?: number, translateLongToString?: boolean): string;
export default loopInterface;
