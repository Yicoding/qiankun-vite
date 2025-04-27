---
title: 快速开始
order: 1
toc: content
group:
  title: 初始化
  order: 1
nav:
  title: 指南
  order: 1
---

# 快速上手

## 环境准备

确保正确安装 [Node.js](https://nodejs.org/en) 且版本为 `16+` 即可。（注意：云效发布的 node 版本也需要选择 v16+）

```bash
$ node -v
v16.15.1
```

![](images/node-version.png)

## 下载模版

### 下载主应用

```bash
$ npx -p @xmly/create-project create-project download @xmly/qiankun-main-template
```

### 下载子应用

```bash
$ npx -p @xmly/create-project create-project download @xmly/qiankun-mic-template
```

### 通过可视化工具下载

目前主应用和子应用的模版已经集成到可视化工具中，也可以通过可视化工具一键下载

![](images/down-by-ele.png)

## demo

[测试环境 demo 地址](https://ops.test.ximalaya.com/gatekeeper/qiankun-main-app)

## 参考文档

[qiankun 官方文档](https://qiankun.umijs.org/zh)
