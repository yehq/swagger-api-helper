/*
 * @Author: yehq
 * @Date: 2019-12-11 11:22:08
 * @Last Modified by: yehq
 * @Last Modified time: 2019-12-11 11:28:11
 * 转换对象形式的 query 到 url 上的形式
 */

interface Options {
    delimiter: string;
}

const stringify = (payload: any, options?: Options): string => {
    const { delimiter = '&' } = options ? options : {};
    if (typeof payload === 'string') {
        return payload;
    }

    if (Array.isArray(payload)) {
        return payload.join(',');
    }

    if (typeof payload === 'object') {
        return Object.keys(payload)
            .map(key => {
                let value = payload[key];
                if (typeof value === 'undefined') return undefined;

                if (Array.isArray(value)) {
                    if (value.length === 0) {
                        return;
                    }
                    value = value.map(item => encodeURIComponent(item));
                } else {
                    value = encodeURIComponent(value);
                }

                return `${encodeURIComponent(key)}=${value}`;
            })
            .filter(Boolean)
            .join(delimiter);
    }
    return payload.toString();
};

export default stringify;
