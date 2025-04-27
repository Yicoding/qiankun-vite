---
title: vite配置
order: 1
toc: content
group:
  title: 子应用
  order: 3
nav:
  title: 指南
  order: 1
---

# vite 配置

## 需要引入 qiankun 插件

```ts | pure
import { defineConfig, loadEnv } from 'vite';
import qiankun from 'vite-plugin-qiankun';

export default defineConfig(({ mode, command }) => {
  const { VITE_REACT_APP_NAME } = loadEnv(mode, process.cwd());

  return {
    plugins: [
      // 微应用名字，与主应用注册的微应用名字保持一致
      qiankun(VITE_REACT_APP_NAME, {
        useDevMode: true,
      }),
    ],
  };
});
```

## 完整配置

```ts | pure
import { defineConfig, loadEnv } from 'vite';
import type { ConfigEnv } from 'vite';
import react from '@vitejs/plugin-react';
import legacy from '@vitejs/plugin-legacy';
import qiankun from 'vite-plugin-qiankun';
import autoprefixer from 'autoprefixer';
import { visualizer } from 'rollup-plugin-visualizer';
import { viteMockServe } from 'vite-plugin-mock';
import { manualChunksPlugin } from 'vite-plugin-webpackchunkname';
import checker from 'vite-plugin-checker';
import { moveScriptsToBody } from './plugins/moveScriptsToBody';

// 引入 path 包注意两点:
// 1. 为避免类型报错，你需要通过 `pnpm i @types/node -D` 安装类型
// 2. tsconfig.node.json 中设置 `allowSyntheticDefaultImports: true`，以允许下面的 default 导入方式
import { resolve } from 'path';

// https://vitejs.dev/config/
/** @type {import('vite').UserConfig} */
export default defineConfig(({ mode, command }: ConfigEnv) => {
  const {
    VITE_PUBLIC_URL = '/',
    VITE_BUILD_ANALYZER,
    VITE_REACT_APP_NAME
  } = loadEnv(mode, process.cwd());

  return {
    // 静态资源路径
    base: command === 'build' ? VITE_PUBLIC_URL : '/',
    resolve: {
      // 设置路径别名
      alias: {
        '@': resolve(__dirname, 'src'),
        src: resolve(__dirname, 'src'),
        '@assets': resolve(__dirname, 'src/assets')
      }
    },
    css: {
      // 进行 PostCSS 配置
      postcss: {
        plugins: [autoprefixer()]
      }
    },
    // 本地开发配置
    server: {
      host: true,
      port: 9091,
      open: true,
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      // 配置代理，处理本地开发跨域问题
      proxy: {
        '/proxy_url': {
          target: 'https://xxx.test.xxx.com',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/proxy_url/, '')
        }
      }
    },
    // 构建配置
    build: {
      // 生成sourcemap文件
      sourcemap: true,
      minify: 'terser',
      terserOptions: {
        compress: {
          // 生产环境删除console.log
          pure_funcs: mode === 'production' ? ['console.log'] : []
        }
      },
    },
    plugins: [
      checker({
        typescript: true
      }),
      react({
        jsxImportSource: "@emotion/react",
      }),
      // 微应用名字，与主应用注册的微应用名字保持一致
      qiankun(VITE_REACT_APP_NAME, {
        useDevMode: true
      }),
      // 打包后的产物自定义命名
      manualChunksPlugin(),
      // 语法降级与Polyfill
      legacy({
        // 设置目标浏览器，browserslist 配置语法
        targets: [
          'chrome >= 64',
          'edge >= 79',
          'safari >= 11.1',
          'firefox >= 67'
        ],
      }),
      // 自定义插件，将脚本移动到body底部
      moveScriptsToBody(),
      // mock服务
      mode === 'mock' &&
      viteMockServe({
        // default
        mockPath: 'mock'
      }),
      // 构建产物分析
      VITE_BUILD_ANALYZER &&
      visualizer({
        // 打包完成后自动打开浏览器，显示产物体积报告
        open: true,
        gzipSize: true,
        brotliSize: true
      }),
    ]
  };
});
```
