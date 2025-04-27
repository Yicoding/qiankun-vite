---
title: 环境变量
order: 2
toc: content
group:
  title: 初始化
  order: 1
nav:
  title: 指南
  order: 1
---

# 环境变量

## .env 文件

```bash
.env                            # 公共配置
.env.development                # 本地开发环境配置文件
.env.mock                       # 本地mock环境配置文件
.env.test                       # 测试环境配置文件
.env.uat                        # uat环境配置文件
.env.production                 # 正式环境配置文件
```

## 默认环境变量

### VITE_REACT_APP_NAME

当前项目的 `package name`

### VITE_BASE_ROUTE_NAME

线上路由的 `basename`，例如：云效部署的项目都会放在 `/gatekeeper/项目名` 下

### VITE_ANT_PREFIXCLS

ant 样式前缀，解决主应用和子应用的样式问题

### VITE_BUILD_ENV（编译环境）

| 编译环境    | 含义         |
| :---------- | :----------- |
| development | 本地开发环境 |
| mock        | mock 环境    |
| test        | 测试环境     |
| uat         | uat 环境     |
| production  | 正式环境     |

### VITE_YX_STATIC_ORIGIN（云效静态资源前缀）

| 编译环境    | 对应的值                            |
| :---------- | :---------------------------------- |
| development | 本地开发环境无需配置                |
| mock        | mock 环境无需配置                   |
| test        | `https://static2.test.ximalaya.com` |
| uat         | `https://s1.uat.xmcdn.com`          |
| production  | `https://s1.xmcdn.com`              |

### VITE_PUBLIC_URL

云效静态资源存放地址：`$VITE_YX_STATIC_ORIGIN/yx/$npm_package_name/last/dist`

### VITE_ORIGIN（接口请求域名）

可根据具体项目进行配置，也可配置多个

| 编译环境    | 对应的值                                   |
| :---------- | :----------------------------------------- |
| development | `/dev_proxy_ops`：本地开发可能需要配置跨域 |
| mock        | mock 环境无需配置                          |
| test        | `http://ops.$VITE_BUILD_ENV.ximalaya.com`  |
| uat         | `http://ops.$VITE_BUILD_ENV.ximalaya.com`  |
| production  | `http://ops.ximalaya.com`                  |

### VITE_SOURCE_MAPPING_URL（sourcemap 文件引用地址）

云效发布会默认将 sourcemap 文件上传到内网 cdn，因此需要修改 sourcemap 文件引用地址

## 定义环境变量 ts 类型

`vite-env.d.ts` 文件

```ts | pure
/// <reference types="vite/client" />

/**
 * 编译环境
 */
declare type BuildEnv = 'development' | 'mock' | 'test' | 'uat' | 'production';

/**
 * 多编译环境变量约束
 */
declare type MultiEnv<T = string> = Record<BuildEnv, T>;

interface ImportMetaEnv {
  /** 主应用名称 */
  readonly VITE_REACT_APP_NAME: string;
  /** 路由basename */
  readonly VITE_BASE_ROUTE_NAME: BuildEnv;
  /** 编译环境 */
  readonly VITE_BUILD_ENV: BuildEnv;
  /** 静态资源 url */
  readonly VITE_PUBLIC_URL: string;
  /** 接口请求域名 */
  readonly VITE_ORIGIN: string;
  /** sourcemap上传地址 */
  readonly VITE_SOURCE_MAPPING_URL: string;
  /** ant样式前缀 */
  readonly VITE_ANT_PREFIXCLS: string;
  // 更多环境变量...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
```

## 注入环境变量

使用 `--mode` 注入对应的文件

```js
"scripts": {
  "dev": "vite --mode development"
},
```

直接注入环境变量：

```js
"scripts": {
  "build-analyze": "VITE_BUILD_ANALYZER=true yarn build-prod"
},
```

## 使用环境变量

### 在 vite 配置中使用

使用 vite 导出的 `loadEnv` 函数来加载指定的 `.env` 文件。

```js
export default defineConfig(({ mode, command }: ConfigEnv) => {
  const { VITE_PUBLIC_URL = '/', VITE_BUILD_ENV } = loadEnv(
    mode,
    process.cwd(),
  );
});
```

### 在代码中使用

```js
const { VITE_BUILD_ENV } = import.meta.env;
```
