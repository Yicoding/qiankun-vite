/// <reference types="vite/client" />

/**
 * 编译环境
 */
declare type BuildEnv = 'development' | 'mock' | 'test' | 'production';

/**
 * 多编译环境变量约束
 */
declare type MultiEnv<T = string> = Record<BuildEnv, T>;

interface ImportMetaEnv {
  /** 主应用名称 */
  readonly VITE_REACT_APP_NAME: string;
  /** 路由basename */
  readonly VITE_BASE_ROUTE_NAME: BuildEnv;
  /** 静态资源 url */
  readonly VITE_PUBLIC_URL: string;
  /** 接口请求域名 */
  readonly VITE_ORIGIN: string;
  /** ant样式前缀 */
  readonly VITE_ANT_PREFIXCLS: string;
  // 更多环境变量...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
