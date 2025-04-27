import '@assets/styles/index.less';

import ReactDOM from 'react-dom/client';
import {
  QiankunProps,
  qiankunWindow,
  renderWithQiankun
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

const initQianKun = () => {
  renderWithQiankun({
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

// 判断当前应用是否在主应用中
qiankunWindow.__POWERED_BY_QIANKUN__ ? initQianKun() : render({});
