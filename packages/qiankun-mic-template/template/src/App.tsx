import { FC, useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';
import { QiankunProps } from 'vite-plugin-qiankun/dist/helper';

import getRouter from '@/router';
import { setState } from '@/store';
import { hideLoading, setTheme } from '@/utils/tools';

const App: FC<QiankunProps> = (props) => {

  const { rootBasename, rootNavigate } = props;

  // 获取主题
  useEffect(() => {
    const theme = localStorage.getItem('theme');
    if (theme) {
      setTheme(theme);
    }
  }, []);

  // 隐藏loading
  useEffect(() => {
    setTimeout(hideLoading, 500);
  }, []);

  // 设置主应用的导航
  useEffect(() => {
    if (rootNavigate) {
      setState({ rootNavigate });
    }
  }, [rootNavigate]);

  return <RouterProvider router={getRouter(rootBasename)} />;
};

export default App;
