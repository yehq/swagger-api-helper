import { Schema } from '../interfaces';
import { CommentType } from './interfaces';
/**
 *
 * @param {object} schema { type: string, properties: schema, items: schema[]， title: string, description: string, required: string[], example: string }
 */
declare function loopInterface(schema: Schema, commentType: CommentType, level?: number): string;
export default loopInterface;
