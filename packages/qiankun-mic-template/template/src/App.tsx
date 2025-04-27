import getRouter from '@/router';
import type { BearState } from '@/store';
import { useBearStore } from '@/store';
import { FC, useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';
import { QiankunProps } from 'vite-plugin-qiankun/dist/helper';

const App: FC<QiankunProps> = (props) => {
  const { setMainNavigate } = useBearStore((state: BearState) => state);

  const { rootBasename, rootNavigate } = props;

  useEffect(() => {
    if (rootNavigate) {
      setMainNavigate(rootNavigate);
    }
  }, [rootNavigate]);

  return <RouterProvider router={getRouter(rootBasename)} />;
};

export default App;
