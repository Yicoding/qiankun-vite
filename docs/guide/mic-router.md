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
/*
 * react-router-dom 官方文档
 * https://reactrouter.com/en/main
 */
import Suspenselazy from '@/components/Suspenselazy';
import { RouteObject, createBrowserRouter } from 'react-router-dom';
import { qiankunWindow } from 'vite-plugin-qiankun/dist/helper';

import { isLocal } from '@/utils/env';

const Home = Suspenselazy(
  () => import(/* webpackChunkName:"Home" */ '@/pages/Home')
);
const Foo = Suspenselazy(
  () => import(/* webpackChunkName:"Foo" */ '@/pages/Foo')
);

const Empty = Suspenselazy(
  () => import(/* webpackChunkName:"Empty" */ '@/pages/Empty')
);

const routes: RouteObject[] = [
  {
    path: '/',
    element: Home
  },
  {
    path: 'foo',
    element: Foo
  },
  {
    path: 'empty',
    element: Empty
  },
  // 未匹配到页面
  {
    path: '*',
    element: Empty
  }
];

const { VITE_BASE_ROUTE_NAME } = import.meta.env;

function getRouter(rootBasename?: string) {

  return createBrowserRouter(routes, {
    // 设置basename
    basename: qiankunWindow.__POWERED_BY_QIANKUN__
      ? rootBasename
      : isLocal
        ? '/'
        : VITE_BASE_ROUTE_NAME
  });
}

export default getRouter;

```
