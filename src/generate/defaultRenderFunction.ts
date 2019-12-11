import path from 'path';
import { RenderFunctionOptions } from './interfaces';

export default ({
    basePath,
    url,
    name,
    method,
    hasBody,
    hasParams,
    hasQuery,
    responseType,
    payloadType,
    queryType,
    paramsTypeMap,
    extraFetchOptionsParaName,
}: RenderFunctionOptions): string => {
    const fullUrl = path.join(basePath, url);
    const paramsString = renderParams({
        hasBody,
        hasParams,
        hasQuery,
        paramsTypeMap,
        extraFetchOptionsParaName,
    });
    return `
export async function ${name}(${renderArgs(payloadType)}) {${paramsString}
    return request<${responseType}>(\`${fullUrl}${hasQuery ? '?${stringify(query)}' : ''}\`, {${
        paramsString ? `\n\t\t...${extraFetchOptionsParaName},` : ''
    }
        method: '${method}',${hasBody ? '\n\t\tbody,' : ''}
    });
}
`;
};

/**
 * 返回方法参数  如 payload: Payload
 * @param {string} interfaces
 * @param {object} payloadInterfaceName
 */
function renderArgs(payloadType?: string) {
    if (payloadType) {
        return `payload: ${payloadType}`;
    }
    return '';
}

/**
 * 返回 方法中的参数内容  如  const { body, query, ...extraFetchOptions } = payload;
 * @param {object} item
 */
function renderParams({
    hasBody,
    hasQuery,
    hasParams,
    paramsTypeMap,
    extraFetchOptionsParaName,
}: {
    hasBody: boolean;
    hasQuery: boolean;
    hasParams: boolean;
    paramsTypeMap: { [name: string]: string };
    extraFetchOptionsParaName: string;
}) {
    const allPara = [
        ...(hasParams ? Object.keys(paramsTypeMap) : []),
        ...(hasBody ? ['body'] : []),
        ...(hasQuery ? ['query'] : []),
    ];
    const paramsString = `{ ${allPara.join(', ')}, ...${extraFetchOptionsParaName} }`;
    return `\n\tconst ${
        allPara.length === 0 ? extraFetchOptionsParaName : paramsString
    } = payload;`;
}
