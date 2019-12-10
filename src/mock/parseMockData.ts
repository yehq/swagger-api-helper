import Mock from 'mockjs';
import { Response, Type, Definitions, Schema } from '../interfaces';
import { isPropNameLike } from './utils';
import { PropertyResolver } from './interfaces';
import { getRef } from '../utils';

const dateTimeLikePropNames = ['Date', 'Time', 'date', 'time'];
const nameLikePropNames = ['Name', 'name'];
const idLikePropNames = ['Id'];

export default (
    response: Response,
    definitions: Definitions,
    propertyResolver?: PropertyResolver
) => {
    return response.schema ? Mock.mock(getMockData(response.schema, definitions)) : undefined;

    /**
     * 根据swagger schema 生成 mock
     * @param schema
     * @param definitions
     * @param dataKey
     */
    function getMockData(schema: Schema, definitions: Definitions, dataKey?: string): any {
        switch (schema.type) {
            case Type.array:
                return new Array(Mock.Random.natural(1, 10))
                    .fill('')
                    .map(() => getMockData(schema.items!, definitions));
            case Type.object:
                let properties = schema.properties;
                const ref = getRef(schema);
                if (!properties && ref) {
                    const model = getModelByRef(definitions, ref);
                    properties = model.properties;
                }
                const mockData = properties
                    ? Object.keys(properties).reduce<{ [key: string]: any }>((target, key) => {
                          const property = properties![key];
                          target[key] = getMockData(property, definitions, key);
                          return target;
                      }, {})
                    : {};
                return mockData;
            case Type.number:
            case Type.integer:
            case Type.string:
                if (propertyResolver) propertyResolver(dataKey || '', schema.type, Mock);
                if (schema.type === Type.number || schema.type === Type.integer) {
                    return getNumber(dataKey);
                } else if (schema.type === Type.string) {
                    if (schema.enum && schema.enum.length > 0) {
                        return schema.enum[Mock.Random.natural(0, schema.enum.length - 1)];
                    }
                    return getString(dataKey);
                }
                return undefined;
            default:
                return undefined;
        }
    }
};

/**
 *
 * @param definitions
 * @param (string) ref  #/definitions/modelNames
 */
function getModelByRef(definitions: Definitions, ref: string) {
    return definitions[ref.split('#/definitions/')[1]];
}

function getString(key?: string) {
    if (key) {
        if (isPropNameLike(key, dateTimeLikePropNames)) {
            return Mock.Random.date();
        }
        if (isPropNameLike(key, nameLikePropNames)) {
            return Mock.Random.cname();
        }
    }
    return Mock.Random.character();
}

function getNumber(key?: string) {
    if (key) {
        if (isPropNameLike(key, idLikePropNames)) {
            return Mock.Random.increment(1);
        }
    }
    return Mock.Random.natural(1, 1000);
}
