# swagger-api-helper

## install

```
npm install swagger-api-helper --save-dev
```

## generate

### 根据 swagger json 数据生成 typescript 类型支持的 接口 请求方法文件，包括了 后台定义的数据模型

```ts
const { generate, ApiGenerator } = require('swagger-api-helper');
const path = require('path');

const outputPath = path.join(__dirname, './services');
const urls = [
    ['https://petstore.swagger.io/v2/swagger.json', 'swaggerDirname'],
    [`https://petstore.swagger.io/v2/swagger.json`, 'swaggerDirname2'],
];

const options = {
    // swagger json url 地址
    urls,
    // 生成的文件 输入路径
    outputPath,
    // 用作生成文件的 别名
    tagAlias: {
        pet: 'petAlias',
    },
    // 自定义 import 模块的 字符串
    // extraImport: '',
    // 自定义 导出的方法 () => string
    // renderFunction: () => '',
    // 请求 swagger json url 的参数配置，设置请求权限等
    fetchOptions: {
        headers: {
            Authorization: 'Basic YWRtaW46dENmcWU4JEph',
        },
    },
    // 需要生成的接口(使用 tag 来匹配) 优先级大于 exclude
    // include?: RegExp | string[];
    // 不需要生成的接口(使用 tag 来匹配)
    // exclude?: RegExp | string[];
};

// 第一种方式
generate(options).then(message => {
    console.log(message);
});

/**
 * 第二种方式
 * 拆分了 发起请求 和 生成文件
 */

(async () {
    const apiGenerator = new ApiGenerator(options);
    await apiGenerator.fetch();
    const messages = await apiGenerator.generate();
})()
```

### generate options

| 字段                    | 类型                                                                                 | 必填 | 默认值                                               | 描述                                                                                |
| ----------------------- | ------------------------------------------------------------------------------------ | ---- | ---------------------------------------------------- | ----------------------------------------------------------------------------------- |
| urls                    | string[] \| [string, string, { headers, query, method, body }][]                     | 是   | -                                                    | 单个 url 为数组时，第二个属性为生成文件的名称, 第三个属性为 请求属性                |
| fetchOptions            | { headers, query, method, body }                                                     | 否   | -                                                    | swagger 请求 属性 包括 header, body, method, query                                  |
| extraImport             | string                                                                               | 否   | -                                                    | 生成文件的顶部 import 字符串, 自定义 renderFunction 时可能需要                      |
| renderFunction          | { options: RenderFunctionOptions, path: CustomPath } 参考 src/generate/interfaces.ts | 否   | -                                                    | 自定义生成的请求方法                                                                |
| tagAlias                | { [key: string]: string }                                                            | 否   | -                                                    | 生成的文件名默认使用 tag，配置 tagAlias 能修改生成的文件名称                        |
| outputPath              | string                                                                               | 是   | -                                                    | 生成文件输出的路径                                                                  |
| include                 | RegExp \| string[]                                                                   | 否   | -                                                    | 需要生成的接口(使用 tag 来匹配) 优先级大于 exclude                                  |
| exclude                 | RegExp \| string[]                                                                   | 否   | -                                                    | 不需要生成的接口(使用 tag 来匹配)                                                   |
| hasBasePath             | boolean                                                                              | 否   | true                                                 | 生成的 API 接口中 url 属性是否需要携带 swagger 中的 basePath                        |
| hasExtraFetchOptions    | string                                                                               | 否   | true                                                 | 发送请求时是否需要传入自定义的属性, 为 false 时, importExtraFetchOptions 不会被调用 |
| importRequest           | (filename: string) => string                                                         | 否   | () => `import request from '@/utils/request';`       | 返回 导入 request 的字符串, request 用来发请求的方法                                |
| importStringify         | (filename: string) => string                                                         | 否   | () => `import stringify from '@/utils/stringify';`   | 返回 导入 stringify 方法的字符串, stringify 用来处理 url 上的 query 值              |
| importExtraFetchOptions | (filename: string) => string                                                         | 否   | () => `import { ExtraFetchOptions } from '@/types';` | 返回 导入 ExtraFetchOptions 的字符串                                                |

### 部分生成的文件内容

```
import { stringify } from '../../utils';
import { request } from '../../utils';
import { ExtraFetchOptions } from '../../utils';
import { Pet } from './interfaces';

export interface PostPetPayload extends ExtraFetchOptions {
    /**
     * Pet object that needs to be added to the store
     */
    body: Pet;
}

/**
 * Add a new pet to the store
 *
 */
export async function postPet(payload: PostPetPayload) {
    const { body, ...extraFetchOptions } = payload;
    return request<undefined>(`/pet`,
        {
            ...extraFetchOptions,
            method: 'post',
            body,
        }
    );
}
```

```js
// ./interfaces
export interface Pet {
	id?: number
	category?: Category
	name: string	//  example: "doggie"
	photoUrls: Array<string>
	tags?: Array<Tag>
	status?: 'available' | 'pending' | 'sold'	// pet status in the store
}
```

## mock

### 根据 swagger json 数据 生成 mock 数据

#### express

```ts
const { mock } = require('swagger-api-helper');
const app = express();
const urls = ['https://petstore.swagger.io/v2/swagger.json'];
mock(app, {
    basePath: '/api',
    // 是否允许所有跨域 默认 false
    cors: false,
    urls,
    fetchOptions: {
        headers: {
            Authorization: 'Basic YWRtaW46dENmcWU4JEph',
        },
    },
});
```

#### webpack

```ts
const { mock } = require('swagger-api-helper');
devServer: {
    before: app => {
        mock(app, {
            basePath: '/api',
            urls,
            // 是否允许所有跨域 默认 false
            cors: false,
        });
    },
},
```

#### mock options

| 字段             | 类型                                                                                | 必填 | 描述                                                                                                                 |
| ---------------- | ----------------------------------------------------------------------------------- | ---- | -------------------------------------------------------------------------------------------------------------------- |
| enableWatcher    | boolean                                                                             | 否   | 是否开启监听 api 目录, 开启后将监听目录, 目录变化时重新请求 swagger 数据                                             |
| urls             | string[] \| [string, string, { headers, query, method, body }][]                    | 是   | 单个 url 为数组时，第二个属性为需要监听的目录路径, 当目录中文件变化时，重新生成定义 mock 数据, 第三个属性为 请求属性 |
| fetchOptions     | { headers, query, method, body }                                                    | 否   | swagger 请求 属性 包括 header, body, method, query                                                                   |
| propertyResolver | (dataKey: string, type: Type, Mock: Mockjs) => any                                  | 否   | 处理单个请求 response 中的单个属性的 mock 结果                                                                       |
| resultResolver   | (payload: { url: string; method: Methods; path: string; swaggerPath: Path }) => any | 否   | 处理单个请求 response 的 mock 结果                                                                                   |
| basePath         | string                                                                              | 否   | 请求 mock api 时的接口前缀                                                                                           |
| cors             | boolean                                                                             | 否   | 默认 false, 是否开启跨域                                                                                             |
