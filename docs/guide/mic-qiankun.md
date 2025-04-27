---
title: 适配qiankun
order: 4
toc: content
group:
  title: 子应用
  order: 2
nav:
  title: 指南
  order: 1
---

# 适配 qiankun

子应用的根节点需要由原来的 `#root` 设置为 `#子应用名-root`

## html 文件

```html | pure
<div id="%VITE_REACT_APP_NAME%-root"></div>
```

## render 时

使用时也需要由原来的 `#root` 改为对应的 `#子应用名-root`

```ts | pure
import '@assets/styles/index.less';

import ReactDOM from 'react-dom/client';
import {
  QiankunProps,
  qiankunWindow,
} from 'vite-plugin-qiankun/dist/helper';
import App from './App';
import { ConfigProvider } from 'antd';
import locale from 'antd/locale/zh_CN';
import dayjs from 'dayjs';

import 'dayjs/locale/zh-cn';

dayjs.locale('zh-cn');

const { VITE_REACT_APP_NAME, VITE_ANT_PREFIXCLS } = import.meta.env;

const rootDom = `${VITE_REACT_APP_NAME}-root`;

let root: ReactDOM.Root | null = null;

const render = (props: QiankunProps) => {
  const { container, ...restProps } = props;
  // 如果是在主应用的环境下就挂载主应用的节点，否则挂载到本地
  const mountNode = (container
    ? container?.querySelector(`#${rootDom}`)
    : document.getElementById(rootDom)) as HTMLElement;

  root = ReactDOM.createRoot(mountNode);
  root.render(
    <ConfigProvider locale={locale} prefixCls={VITE_ANT_PREFIXCLS}>
      <App {...restProps} />
    </ConfigProvider>
  );
};
```

## 环境判断

```ts | pure
import { qiankunWindow } from 'vite-plugin-qiankun/dist/helper';

// 判断当前应用是否在主应用中
qiankunWindow.__POWERED_BY_QIANKUN__ ? initQianKun() : render({});
```

## 导出相应的生命周期钩子

```ts | pure
import {
  QiankunProps,
  ,
} from 'vite-plugin-qiankun/dist/helper';

const initQianKun = () => {
  ({
    // 当前应用在主应用中的生命周期
    // 文档 https://qiankun.umijs.org/zh/guide/getting-started#

    mount(props: QiankunProps) {
      render(props);
    },
    update() { },
    bootstrap() {
      console.log('react app bootstraped');
    },
    unmount() {
      root?.unmount();
      root = null;
    }
  });
};
```
