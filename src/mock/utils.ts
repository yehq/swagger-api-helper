/**
 * 判断参数名称是不是带指定后缀
 * @param keyName
 * @param likePropNames
 */
export const isPropNameLike = (keyName: string, likePropNames: string[]) => {
    return likePropNames.some((name) => keyName.endsWith(name));
};
