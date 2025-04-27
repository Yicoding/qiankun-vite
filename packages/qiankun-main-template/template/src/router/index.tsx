/*
 * react-router-dom 官方文档
 * https://reactrouter.com/en/main
 */
import Suspenselazy from '@/components/Suspenselazy';
import { RouteObject, createBrowserRouter } from 'react-router-dom';
import { isLocal } from '@/utils/env';

const Home = Suspenselazy(
  () => import(/* webpackChunkName:"home" */ '@/pages/Home')
);

const Empty = Suspenselazy(
  () => import(/* webpackChunkName:"empty" */ '@/pages/Empty')
);

const routes: RouteObject[] = [
  {
    path: '/',
    element: Home,
    children: [
      {
        path: '*'
      }
    ]
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

// 获取基础路由名
const { VITE_BASE_ROUTE_NAME } = import.meta.env;

// 创建路由
const router = createBrowserRouter(routes, {
  // 区分本地和线上
  basename: isLocal ? '/' : VITE_BASE_ROUTE_NAME,
});

export default router;