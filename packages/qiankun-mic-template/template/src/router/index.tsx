/*
 * react-router-dom 官方文档
 * https://reactrouter.com/en/main
 */
import Suspenselazy from '@/components/Suspenselazy';
import { RouteObject, createBrowserRouter } from 'react-router-dom';
import { qiankunWindow } from 'vite-plugin-qiankun/dist/helper';

import { isLocal } from '@/utils/env';

const Home = Suspenselazy(
  () => import(/* webpackChunkName:"Home" */ '@/pages/Home')
);
const Foo = Suspenselazy(
  () => import(/* webpackChunkName:"Foo" */ '@/pages/Foo')
);

const Empty = Suspenselazy(
  () => import(/* webpackChunkName:"Empty" */ '@/pages/Empty')
);

const routes: RouteObject[] = [
  {
    path: '/',
    element: Home
  },
  {
    path: 'foo',
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

const { VITE_BASE_ROUTE_NAME } = import.meta.env;

function getRouter(rootBasename?: string) {

  console.log('rootBasename kooo', rootBasename)

  console.log('koooo', qiankunWindow.__POWERED_BY_QIANKUN__
    ? rootBasename
    : isLocal
      ? '/'
      : VITE_BASE_ROUTE_NAME)
  return createBrowserRouter(routes, {
    // 设置basename
    basename: qiankunWindow.__POWERED_BY_QIANKUN__
      ? rootBasename
      : isLocal
        ? '/'
        : VITE_BASE_ROUTE_NAME
  });
}

export default getRouter;
