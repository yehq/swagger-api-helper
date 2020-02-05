import Mock from 'mockjs';
import { Response, Type, Definitions, Schema } from '../interfaces';
import { isPropNameLike } from './utils';
import { PropertyResolver } from './interfaces';
import { getRef } from '../utils';

const dateTimeLikePropNames = ['Date', 'Time', 'date', 'time'];
const nameLikePropNames = ['Name', 'name'];
const idLikePropNames = ['Id'];
// 类型递归中 mock 的最大嵌套数
const maxCount = 4;

export default (
    response: Response,
    definitions: Definitions,
    propertyResolver?: PropertyResolver
) => {
    /**
     * 记录下 同 key 且 同关联类型名称的 字段出现次数，用来防止死循环
     */
    const uniqueKeyPaths: { [key: string]: Set<string> } = {};
    return response.schema ? Mock.mock(getMockData(response.schema, definitions)) : undefined;

    /**
     * 根据swagger schema 生成 mock
     * @param schema
     * @param definitions
     * @param dataKey 数据路径 类似 a.b.c[0]
     */
    function getMockData(schema: Schema, definitions: Definitions, dataKey?: string): any {
        // type 不存在时，当作 object 处理
        const type = schema.type || Type.object;
        switch (type) {
            case Type.array:
                /**
                 * 通过判断，数组中 依次 生成的mock数据是不是 undefined 来确认 是否应该继续递归
                 * 生成的是 getMockData 方法 返回 undefined 表示需要停止 接下来的其他操作
                 */
                return new Array(Mock.Random.natural(1, 10)).fill('').reduce((target, _, index) => {
                    const setTarget = () => {
                        const result = getMockData(
                            schema.items!,
                            definitions,
                            `${dataKey || ''}[]`
                        );
                        if (result) {
                            target.push(result);
                        }
                    };
                    if (index === 0 || target.length > 0) {
                        setTarget();
                    }
                    return target;
                }, []);
            case Type.object:
                let properties = schema.properties;
                const ref = getRef(schema);
                let definitionName: string | undefined;
                /**
                 * 链接到已有结构
                 */
                if (!properties && ref) {
                    definitionName = getDefinitionName(ref);
                    const model = definitions[definitionName];
                    properties = model.properties;
                }

                if (definitionName) {
                    const key = dataKey ? dataKey.substring(dataKey.lastIndexOf('.')) : '';
                    const uniqueKey = `${key}-${definitionName}`;
                    if (!uniqueKeyPaths[uniqueKey]) {
                        uniqueKeyPaths[uniqueKey] = new Set();
                    }
                    if (uniqueKeyPaths[uniqueKey].size + 1 > maxCount) {
                        /**
                         * 此递归是 深度优先
                         * 一个分支到达最大深度时，停止继续加深。
                         * 通过删除最后一个添加的 dataKey，让他继续执行。
                         */
                        if (uniqueKeyPaths[uniqueKey].size > 0) {
                            const targetKey = [...uniqueKeyPaths[uniqueKey].keys()][
                                uniqueKeyPaths[uniqueKey].size - 1
                            ];
                            uniqueKeyPaths[uniqueKey].delete(targetKey);
                        }
                        return undefined;
                    }
                    uniqueKeyPaths[uniqueKey].add(dataKey!);
                }

                const mockData = properties
                    ? Object.keys(properties).reduce<{ [key: string]: any }>((target, key) => {
                          const property = properties![key];
                          target[key] = getMockData(
                              property,
                              definitions,
                              `${dataKey || ''}.${key}`
                          );
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
 * 获得定义 model 的名称
 * @param ref  #/definitions/modelNames
 */
function getDefinitionName(ref: string) {
    return ref.split('#/definitions/')[1];
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
