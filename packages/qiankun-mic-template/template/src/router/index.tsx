/*
 * react-router-dom 官方文档
 * https://reactrouter.com/en/main
 */
import Suspenselazy from '@/components/Suspenselazy';
import { RouteObject, createBrowserRouter } from 'react-router-dom';
import { qiankunWindow } from 'vite-plugin-qiankun/dist/helper';

const Home = Suspenselazy(
  () => import(/* webpackChunkName:"Empty" */ '@/view/Home')
);
const Foo = Suspenselazy(
  () => import(/* webpackChunkName:"Empty" */ '@/view/Foo')
);

const Empty = Suspenselazy(
  () => import(/* webpackChunkName:"Empty" */ '@/view/Empty')
);

const routes: RouteObject[] = [
  {
    path: '/',
    element: Home
  },
  {
    path: '/foo',
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

function getRouter(rootBasename?: string) {
  const { MODE, VITE_BASE_ROUTE_NAME } = import.meta.env;
  return createBrowserRouter(routes, {
    /**
     * 设置basename
     * 1.区分是否为qiankun环境
     * 2.区分是否为本地开发环境
     */
    basename: qiankunWindow.__POWERED_BY_QIANKUN__
      ? rootBasename
      : MODE === 'development'
      ? '/'
      : VITE_BASE_ROUTE_NAME
  });
}

export default getRouter;
