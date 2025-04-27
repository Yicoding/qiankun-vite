import '@assets/styles/index.less';

import ReactDOM from 'react-dom/client';
import App from './App';
import { ConfigProvider } from 'antd';
import locale from 'antd/locale/zh_CN';
import dayjs from 'dayjs';

import 'dayjs/locale/zh-cn';

dayjs.locale('zh-cn');

const { VITE_REACT_APP_NAME, VITE_ANT_PREFIXCLS } = import.meta.env;

ReactDOM
  .createRoot(document.getElementById(`${VITE_REACT_APP_NAME}-root`) as HTMLElement)
  .render(
    <ConfigProvider locale={locale} prefixCls={VITE_ANT_PREFIXCLS}>
      <App />
    </ConfigProvider>
  );