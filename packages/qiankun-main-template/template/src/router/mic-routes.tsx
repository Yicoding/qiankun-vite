import { HomeOutlined, SettingOutlined } from '@ant-design/icons';

const { VITE_ORIGIN } = import.meta.env;

/**
 * 获取子应用静态 HTML 的地址
 * @param name 应用名
 * @returns 静态 HTML 的地址
 */
function getOpsWebPath(name: string) {
  return `${VITE_ORIGIN}/gatekeeper/${name}?v=${Date.now()}`; // 加时间戳防止缓存
}

export interface Router {
  title: string;
  /** 子应用的路由路径 */
  path: string;
  /**
   * 本地调试时，子应用 html 入口地址
   *  - 示例 ☞  http://localhost:9001/
   *  - 如不需要在基座中调试，直接移除或注释 devEntryUrl
   */
  devEntryUrl?: string;
  /** 子应用的 html 入口地址 */
  entryUrl?: string;
  activeIcon: React.ReactNode;
  inactiveIcon: React.ReactNode;
  childRoutes?: Router[];
}

export const ROUTES: Router[] = [
  {
    title: '子应用A',
    path: 'qiankun-mic-a',
    // 本地调试子应用的地址，不配置则不调试本地
    devEntryUrl: '//localhost:9091',
    entryUrl: getOpsWebPath('qiankun-mic-a'),
    activeIcon: <HomeOutlined twoToneColor="#eb2f96" />,
    inactiveIcon: <HomeOutlined />
  },
  {
    title: '嵌套菜单',
    path: 'global-config',
    activeIcon: <SettingOutlined twoToneColor="#eb2f96" />,
    inactiveIcon: <SettingOutlined />,
    childRoutes: [
      {
        title: '子应用B',
        path: 'qiankun-mic-b',
        // 本地调试子应用的地址，不配置则不调试本地
        devEntryUrl: '//localhost:9092',
        entryUrl: getOpsWebPath('qiankun-mic-b'),
        activeIcon: <HomeOutlined twoToneColor="#eb2f96" />,
        inactiveIcon: <HomeOutlined />
      }
    ]
  }
];

export const FLATTENED_ROUTES = ROUTES.reduce((prev, route) => {
  if (!route.childRoutes) {
    return [...prev, route];
  }
  return [...prev, ...route.childRoutes.map((child) => child)];
}, [] as Router[]);
