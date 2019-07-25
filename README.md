# swagger-mocker

### 根据 swagger url 生成 mock 数据

## mock
#### express
```
const { mock } = require('../lib');
const app = express();
mock(app, {
    basePath: '/api',
    urls,
});
```

#### webpack
```
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

#### interface

```
mock = (app: Application // express app, Options = {}) => void;


type PropertyResolver = (dataKey: string, type: Type, Mock: Mockjs) => any;
type ResultResolver = (payload: { url: string; method: Methods; path: string; swaggerPath: Path }) => any;

type Url =
    | string // swagger url
    | [
          string, // swagger url
          // 需要监听的路由 监听变化来改变mock
          string
      ];

interface Options {
    // 是否开启监听api目录
    enableWatcher?: boolean;
    // swagger urls
    urls?: Url[];
    // 处理单个参数的生成结果
    propertyResolver?: PropertyResolver;
    // 处理单个接口的生成结果
    resultResolver?: ResultResolver;
    // mock api 的 url 基本路径
    basePath?: string;
}
```

## generate api file
```
const { api } = require('../lib');
const outputPath = path.join(__dirname, './services');
const urls = [['https://petstore.swagger.io/v2/swagger.json', 'swaggerDirname'], [`https://petstore.swagger.io/v2/swagger.json`, 'swaggerDirname2']];
api({ urls, outputPath }).then(message => {
    console.log(message)
})
```
