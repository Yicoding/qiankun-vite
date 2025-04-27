import type { NavigateFunction } from 'react-router-dom';
import { RegistrableApp, registerMicroApps, start } from 'qiankun';
import { FLATTENED_ROUTES, Router } from '@/router/mic-routes';
import { ROOT_BASENAME, isDev, isMock } from '@/utils/env';

/**
 * 获取子应用配置
 * @param route 路由
 * @param state 需要向子应用传递的状态数据
 * @returns 子应用
 */
function getMicroApp(
  { path, devEntryUrl, entryUrl }: Router,
  rootNavigate: NavigateFunction
): RegistrableApp<object> {
  const { MODE, VITE_REACT_APP_NAME } = import.meta.env;
  // 允许本地调试微前端子应用
  const isLocalMode =
    MODE === 'development' && (isDev || isMock) && !!devEntryUrl;
  const entry = isLocalMode ? devEntryUrl : entryUrl;

  const rootBasename =
    MODE === 'development' ? `/${path}` : `${ROOT_BASENAME}/${path}`;

  return {
    name: path, // app name registered
    entry: entry as string,
    container: `#${VITE_REACT_APP_NAME}-content`,
    activeRule: rootBasename,
    props: {
      // 子应用需要设置的basename
      rootBasename,
      // 主应用路由方法
      rootNavigate
    }
  };
}

type State = {
  rootNavigate: NavigateFunction;
};

/**
 * 启动微前端应用
 * @param state 需要向子应用传递的状态数据
 */
export function startMicroApp({ rootNavigate }: State) {
  const microApps = FLATTENED_ROUTES.filter((route) => !!route.entryUrl).map(
    (route) => getMicroApp(route, rootNavigate)
  );
  registerMicroApps(microApps);
  start();
}
