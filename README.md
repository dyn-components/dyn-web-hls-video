# hls-video

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

开源地址：

## 目录

- [介绍](#介绍)
- [安装](#安装)
- [快速开始](#快速开始)
- [属性说明](#属性说明)
- [事件](#事件)
- [方法](#方法)
- [自定义样式](#自定义样式)
- [示例](#示例)
- [发布](#发布)
- [贡献指南](#贡献指南)
- [维护者](#维护者)
- [许可证](#许可证)
- [致谢](#致谢)

## 介绍

简要介绍该组件的功能和用途。

## 安装

```bash
pnpm add dyn-components --save-dev
```

修改 vite.config.js

```ts
import { defineConfig } from "vite";
import DynComponents from "dyn-components";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [DynComponents()],
});
```

## 快速开始

```ts
// global import theme.css
import "dyn-components/theme.css";
```

```vue
<template>
  <dyn-web-hls-video
    src="https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8"
    autoplay
    muted
    controls
  ></dyn-web-hls-video>
</template>
```

## 属性说明

详见 `video` 标签属性

## 发布

```bash
dyn-components publish
```
