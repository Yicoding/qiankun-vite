---
title: 子应用配置
order: 2
toc: content
group:
  title: 主应用
  order: 2
nav:
  title: 指南
  order: 1
---

# 子应用配置

## 配置菜单

```ts | pure
import { ORIGIN_OPS } from '@/utils/origin';
import { HomeOutlined, SettingOutlined } from '@ant-design/icons';
/**
 * 获取子应用静态 HTML 的地址
 * @param name 应用名
 * @returns 静态 HTML 的地址
 */
function getOpsWebPath(name: string) {
  return `${ORIGIN_OPS}/gatekeeper/${name}?v=${Date.now()}`; // 加时间戳防止缓存
}

export interface Router {
  title: string;
  /** 子应用的路由路径 */
  path: string;
  /**
   * 本地调试时，子应用 html 入口地址
   *  - 示例 ☞  http://localhost:9001/
   *  - 如不需要在基座中调试，直接移除或注释 devEntryUrl
   */
  devEntryUrl?: string;
  /** 子应用的 html 入口地址 */
  entryUrl?: string;
  activeIcon: React.ReactNode;
  inactiveIcon: React.ReactNode;
  childRoutes?: Router[];
}

export const ROUTES: Router[] = [
  {
    title: '子应用A',
    path: 'qiankun-mic-a',
    // 本地调试子应用的地址，不配置则不调试本地
    devEntryUrl: '//localhost:9091',
    entryUrl: getOpsWebPath('qiankun-mic-a'),
    activeIcon: <HomeOutlined twoToneColor="#eb2f96" />,
    inactiveIcon: <HomeOutlined />,
  },
  {
    title: '嵌套菜单',
    path: 'global-config',
    activeIcon: <SettingOutlined twoToneColor="#eb2f96" />,
    inactiveIcon: <SettingOutlined />,
    childRoutes: [
      {
        title: '子应用B',
        path: 'qiankun-mic-b',
        // 本地调试子应用的地址，不配置则不调试本地
        devEntryUrl: '//localhost:9092',
        entryUrl: getOpsWebPath('qiankun-mic-b'),
        activeIcon: <HomeOutlined twoToneColor="#eb2f96" />,
        inactiveIcon: <HomeOutlined />,
      },
    ],
  },
];
```

**效果**

![](images/menu.png)

## 注册子应用

### 获取子应用配置

```tsx | pure
/**
 * 获取子应用配置
 * @param route 路由
 * @param state 需要向子应用传递的状态数据
 * @returns 子应用
 */
function getMicroApp(
  { path, devEntryUrl, entryUrl }: Router,
  rootNavigate: NavigateFunction,
): RegistrableApp<object> {
  const { MODE, VITE_REACT_APP_NAME } = import.meta.env;
  // 允许本地调试微前端子应用
  const isLocalMode =
    MODE === 'development' && (isDev || isMock) && !!devEntryUrl;
  const entry = isLocalMode ? devEntryUrl : entryUrl;

  const rootBasename =
    MODE === 'development' ? `/${path}` : `${ROOT_BASENAME}/${path}`;

  return {
    name: path, // app name registered
    entry: entry as string,
    container: `#${VITE_REACT_APP_NAME}-content`,
    activeRule: rootBasename,
    props: {
      // 子应用需要设置的basename
      rootBasename,
      // 主应用路由方法
      rootNavigate,
    },
  };
}
```

### 启动微前端应用

```ts | pure
import { FLATTENED_ROUTES } from '@/router/mic-routes';
import { registerMicroApps, start } from 'qiankun';
import type { NavigateFunction } from 'react-router-dom';

type State = {
  rootNavigate: NavigateFunction;
};

/**
 * 启动微前端应用
 * @param state 需要向子应用传递的状态数据
 */
export function startMicroApp({ rootNavigate }: State) {
  const microApps = FLATTENED_ROUTES.filter((route) => !!route.entryUrl).map(
    (route) => getMicroApp(route, rootNavigate),
  );
  // 注册子应用
  registerMicroApps(microApps);
  // 启动子应用
  start();
}
```

## 设置 container

子应用挂载的节点

```tsx | pure
<div id={`${import.meta.env.VITE_REACT_APP_NAME}-content`}></div>
```
