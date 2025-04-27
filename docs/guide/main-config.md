---
title: vite配置
order: 1
toc: content
group:
  title: 主应用
  order: 2
nav:
  title: 指南
  order: 1
---

# vite 配置

## 配置代理

本地开发时，子应用接口请求可能会发生跨域，因此可以在主应用中配置代理做接口转发，例如：

```js
// 配置代理，处理子应用开发跨域问题
proxy: {
  '/web-config': {
    target: 'https://ops.test.xxx.com',
    changeOrigin: true
  }
}
```

## 完整配置

```ts | pure
import legacy from '@vitejs/plugin-legacy';
import react from '@vitejs/plugin-react-swc';
import autoprefixer from 'autoprefixer';
import { visualizer } from 'rollup-plugin-visualizer';
import { minify } from 'terser'; // 引入手动安装的Terser
import type { ConfigEnv } from 'vite';
import { defineConfig, loadEnv } from 'vite';
import { viteMockServe } from 'vite-plugin-mock';
import { manualChunksPlugin } from 'vite-plugin-webpackchunkname';

// 引入 path 包注意两点:
// 1. 为避免类型报错，你需要通过 `pnpm i @types/node -D` 安装类型
// 2. tsconfig.node.json 中设置 `allowSyntheticDefaultImports: true`，以允许下面的 default 导入方式
import { resolve } from 'path';

// https://vitejs.dev/config/
/** @type {import('vite').UserConfig} */
export default defineConfig(({ mode, command }: ConfigEnv) => {
  const {
    VITE_PUBLIC_URL = '/',
    VITE_BUILD_ENV,
    VITE_SOURCE_MAPPING_URL,
    VITE_BUILD_ANALYZER,
    VITE_ANT_PREFIXCLS,
  } = loadEnv(mode, process.cwd());

  return {
    // 静态资源路径
    base: command === 'build' ? VITE_PUBLIC_URL : '/',
    resolve: {
      // 设置路径别名
      alias: {
        '@': resolve(__dirname, 'src'),
        src: resolve(__dirname, 'src'),
        '@assets': resolve(__dirname, 'src/assets'),
      },
    },
    css: {
      // 进行 PostCSS 配置
      postcss: {
        plugins: [autoprefixer()],
        preprocessorOptions: {
          less: {
            modifyVars: {
              '@ant-prefix': VITE_ANT_PREFIXCLS,
            },
          },
        },
      },
    },
    // 本地开发配置
    server: {
      host: true,
      port: 8080,
      open: true,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      // 配置代理，处理子应用开发跨域问题
      proxy: {
        '/web-config': {
          target: 'https://ops.test.xxx.com',
          changeOrigin: true,
        },
      },
    },
    // 构建配置
    build: {
      // 生成sourcemap文件
      sourcemap: !!VITE_SOURCE_MAPPING_URL,
      // rollup配置
      rollupOptions: {
        // 输出配置
        output: {
          // 设置sourcemap的路径引用，云效发布会默认将sourcemap文件上传到内网cdn
          sourcemapBaseUrl: VITE_SOURCE_MAPPING_URL,
          plugins: [
            {
              name: 'terser',
              async renderChunk(code) {
                const minified = await minify(code, {
                  compress: {
                    // 生产环境删除console
                    drop_console: VITE_BUILD_ENV === 'production',
                  },
                  sourceMap: !!VITE_SOURCE_MAPPING_URL,
                });
                return minified;
              },
            },
          ],
        },
      },
    },
    plugins: [
      react(),
      // 打包后的产物自定义命名
      manualChunksPlugin(),
      // 语法降级与Polyfill
      legacy({
        // 设置目标浏览器，browserslist 配置语法
        targets: ['ie >= 11'],
      }),
      // mock服务
      VITE_BUILD_ENV === 'mock' &&
        viteMockServe({
          // default
          mockPath: 'mock',
        }),
      // 构建产物分析
      VITE_BUILD_ANALYZER &&
        visualizer({
          // 打包完成后自动打开浏览器，显示产物体积报告
          open: true,
          gzipSize: true,
          brotliSize: true,
        }),
    ],
  };
});
```
