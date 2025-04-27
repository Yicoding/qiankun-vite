---
title: 路由配置
order: 2
toc: content
group:
  title: 子应用
  order: 3
nav:
  title: 指南
  order: 1
---

# 路由配置

## 配置 basename

子应用需要判断，如果在 `qiankun` 环境下，需要使用主应用传过来的根路径作为子应用的 `basename`

```ts | pure
import { createBrowserRouter } from 'react-router-dom';
import { qiankunWindow } from 'vite-plugin-qiankun/dist/helper';

function getRouter(rootBasename?: string) {
  const { MODE, VITE_BASE_ROUTE_NAME } = import.meta.env;
  return createBrowserRouter(routes, {
    /**
     * 设置basename
     * 1.区分是否为qiankun环境
     * 2.区分是否为本地开发环境
     */
    basename: qiankunWindow.__POWERED_BY_QIANKUN__
      ? rootBasename
      : MODE === 'development'
      ? '/'
      : VITE_BASE_ROUTE_NAME,
  });
}

export default getRouter;
```
