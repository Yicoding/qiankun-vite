import { useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';
import router from '@/router';

import { hideLoading, setTheme } from '@/utils/tools';


function App() {

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


  return (
    <RouterProvider
      router={router}
    />
  )
}

export default App;
