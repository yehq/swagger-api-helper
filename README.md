# swagger-mocker

### 根据 swagger url 生成 mock 数据

## mock

#### express

```ts
const { mock } = require('../lib');
const app = express();
mock(app, {
    basePath: '/api',
    urls,
});
```

#### webpack

```ts
const { mock } = require('../lib');
devServer: {
    before: app => {
        mock(app, {
            basePath: '/api',
            urls,
        });
    },
},
```

#### mock options

| 字段             | 类型                                                                                | 必填 | 描述                                                                     |
| ---------------- | ----------------------------------------------------------------------------------- | ---- | ------------------------------------------------------------------------ |
| enableWatcher    | boolean                                                                             | 否   | 是否开启监听 api 目录, 开启后将监听目录, 目录变化时重新请求 swagger 数据 |
| urls             | string[] \| [string, string][]                                                      | 是   | 单个 url 为数组时，第二个属性为需要监听的目录路径                        |
| propertyResolver | (dataKey: string, type: Type, Mock: Mockjs) => any                                  | 否   | 处理单个请求 response 中的单个属性的 mock 结果                           |
| resultResolver   | (payload: { url: string; method: Methods; path: string; swaggerPath: Path }) => any | 否   | 处理单个请求 response 的 mock 结果                                       |
| basePath         | string                                                                              | 否   | 请求 mock api 时的接口前缀                                               |

## generate api file

```ts
const { api } = require('../lib');
const outputPath = path.join(__dirname, './services');
const urls = [
    ['https://petstore.swagger.io/v2/swagger.json', 'swaggerDirname'],
    [`https://petstore.swagger.io/v2/swagger.json`, 'swaggerDirname2'],
];
api({
    urls,
    outputPath,
}).then(message => {
    console.log(message);
});
```

### api options

| 字段                    | 类型                           | 必填 | 默认值                                              | 描述                                                                                |
| ----------------------- | ------------------------------ | ---- | --------------------------------------------------- | ----------------------------------------------------------------------------------- |
| urls                    | string[] \| [string, string][] | 是   | -                                                   | 单个 url 为数组时，第二个属性为生成文件的名称                                       |
| outputPath              | string                         | 是   | -                                                   | 生成文件输出的路径                                                                  |
| hasBasePath             | boolean                        | 否   | true                                                | 生成的 API 接口中 url 属性是否需要携带 swagger 中的 basePath                        |
| hasExtraFetchOptions    | string                         | 否   | true                                                | 发送请求时是否需要传入自定义的属性, 为 false 时, importExtraFetchOptions 不会被调用 |
| importRequest           | (filename: string) => string   | 否   | () => `import request from '@/utils/request'`       | 返回 导入 request 的字符串, request 用来发请求的方法                                |
| importStringify         | (filename: string) => string   | 否   | () => `import stringify from '@/utils/stringify'`   | 返回 导入 stringify 方法的字符串, stringify 用来处理 url 上的 query 值              |
| importExtraFetchOptions | (filename: string) => string   | 否   | () => `import { ExtraFetchOptions } from '@/types'` | 返回 导入 ExtraFetchOptions 的字符串                                                |
