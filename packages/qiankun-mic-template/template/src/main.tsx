import '@assets/styles/index.less';

import React from 'react';
import { unmountComponentAtNode } from 'react-dom';
import ReactDOM from 'react-dom/client';
import {
  QiankunProps,
  qiankunWindow,
  renderWithQiankun
} from 'vite-plugin-qiankun/dist/helper';
import App from './App';
import './App.init';

const { VITE_REACT_APP_NAME } = import.meta.env;

const rootDom = `${VITE_REACT_APP_NAME}-root`;

const render = (props: QiankunProps) => {
  const { container, ...restProps } = props;
  // 如果是在主应用的环境下就挂载主应用的节点，否则挂载到本地
  ReactDOM.createRoot(
    (container
      ? container?.querySelector(`#${rootDom}`)
      : document.getElementById(rootDom)) as HTMLElement
  ).render(
    <React.StrictMode>
      <App {...restProps} />
    </React.StrictMode>
  );
};

const initQianKun = () => {
  renderWithQiankun({
    // 当前应用在主应用中的生命周期
    // 文档 https://qiankun.umijs.org/zh/guide/getting-started#

    mount(props: QiankunProps) {
      render(props);
    },
    update() {},
    bootstrap() {
      console.log('react app bootstraped');
    },
    unmount(props: QiankunProps) {
      const { container } = props;
      const mountRoot = container?.querySelector(`#${rootDom}`);
      unmountComponentAtNode(
        (mountRoot as Element) || document.querySelector(`#${rootDom}`)
      );
    }
  });
};

// 判断当前应用是否在主应用中
qiankunWindow.__POWERED_BY_QIANKUN__ ? initQianKun() : render({});
