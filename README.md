# swagger-mocker

### 根据 swagger url 生成 mock 数据

## express

```
const app = express();
swaggerMock.default(app, {
    basePath: '/api',
    urls, // string[] swagger url
});
```

## webpack

```
devServer: {
    before: app => {
        swaggerMocker.default(app, {
            basePath: '/api',
            urls, // string[] swagger url
        });
    },
},
```
