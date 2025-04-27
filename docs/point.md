---
title: 相关问题
order: 1
toc: content
nav:
  title: 相关问题
  order: 2
---

# 相关问题

## 路由设置问题

`activeRule` 不能和微应用的真实访问路径一样，否则在主应用页面刷新会直接变成微应用页面。

例如：

> 子应用的真实访问地址为`https://ops.test.xxx.com/gatekeeper/qiankun-mic-a`

> 主应用的真实访问地址为`https://ops.test.xxx.com/gatekeeper`

> 主应用在设置子应用的`activeRule`时不能设置成`qiankun-mic-a`

> 解决方法：可以取个别名赋值给`activeRule`，例如 `child-a`

## 主子应用样式相互影响

各个应用样式隔离 这个问题乾坤框架做了一定的处理，在运行时有一个 sandbox 的参数，默认情况下沙箱可以确保单实例场景子应用之间的样式隔离，但是无法确保主应用跟子应用、或者多实例场景的子应用样式隔离。如果要解决主应用和子应用的样式问题，目前有 2 种方式：

### 1.配置 strictStyleIsolation

在乾坤中配置 { strictStyleIsolation: true } 时表示开启严格的样式隔离模式。这种模式下 qiankun 会为每个微应用的容器包裹上一个 shadow dom 节点，从而确保微应用的样式不会对全局造成影响。但是基于 ShadowDOM 的严格样式隔离并不是一个可以无脑使用的方案，大部分情况下都需要接入应用做一些适配后才能正常在 ShadowDOM 中运行起来，这个在 qiankun 的 issue 里面有一些讨论和使用经验。

### 2.约定命名规则

`BEM` 规范或统一给所有选择器名添加前缀，比如 antd 例子：

`vite`配置：

```js | pure
css: {
  // 进行 PostCSS 配置
  postcss: {
    preprocessorOptions: {
      less: {
        modifyVars: {
          '@ant-prefix': 'yourPrefix'
        },
      }
    }
  }
},
```

配置 `antd ConfigProvider`：

```js | pure
import { ConfigProvider } from 'antd';

<ConfigProvider prefixCls="yourPrefix">
  <App />
</ConfigProvider>;
```

### 3.CSS Modules

`CSS Modules` 是解决命名空间问题的一种方案，它可以基于指定的规则生成选择器名称，无需开发者遵守严格的规范，同时也避免对全局样式造成污染。

### 4.CSS in JS

由于选择器名称都是动态生成的，所以开发时不需要遵守命名规范，也无需考虑命名冲突。

```js
import styled from 'styled-components';
const Test = styled.div`
  color: red;
`;
// ...
<Test />;
```

### 5.Tailwind CSS

[Tailwind CSS](https://tailwindcss.com/) 是一个可定制化的 CSS 框架，最大的特点是功能类优先，和我们知道的 bootstrap，element ui，antd，veui 等框架一样。将一些 CSS 样式封装好，用来加速我们开发的一个工具

## 应用通信

### 1.通过 props 传递

在注册子应用时，可以将主应用的数据或方法通过 props 传递给子应用：

```ts | pure
import { registerMicroApps } from 'qiankun';

registerMicroApps([
  {
    name: 'app1',
    entry: '//localhost:8080',
    container: '#container',
    activeRule: '/react',
    props: {
      name: 'kuitos',
      func: {
        getSomething, //传递方法
      },
    },
  },
]);
```

子应用使用：

```js | pure
export function mount(props) {
  const { name, func } = props;
  console.log(name, func);
  render(props);
}
```

### 2.使用 initGlobalState

主应用：

```js | pure
import { initGlobalState, MicroAppStateActions } from 'qiankun';

// 初始化 state
const actions: MicroAppStateActions = initGlobalState(state);

actions.onGlobalStateChange((state, prev) => {
  // state: 变更后的状态; prev 变更前的状态
  console.log(state, prev);
});
actions.setGlobalState(state);
actions.offGlobalStateChange();
```

子应用：

```js | pure
// 从生命周期 mount 中获取通信方法，使用方式和 master 一致
export function mount(props) {
  props.onGlobalStateChange((state, prev) => {
    // state: 变更后的状态; prev 变更前的状态
    console.log(state, prev);
  });

  props.setGlobalState(state);
}
```

## window 变量

### 1.主应用和子应用

主应用和子应用是共享 window 变量的，即设置和修改 window 变量，主应用和子应用都会受到影响。

原因：qiankun 中的代码使用 Proxy 去代理父页面的 window，来实现的沙箱，在微应用中访问 window.Vue 时，会先在自己的 window 里查找有没有 Vue 属性，如果没有就去父应用里查找。

### 2.子应用和子应用

子应用和子应用之间的 window 变量是隔离的，即设置和修改各自的 window 变量，互不影响
