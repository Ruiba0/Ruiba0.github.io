# Personal Blog

一个基于 `Next.js 16 + TypeScript + Tailwind CSS + Markdown` 的个人静态博客模板，默认适配 GitHub Pages 自动部署。

## 特性

- 纯展示型博客，无后台管理
- 本地 `content/posts/*.md` 或 `content/posts/*.mdx` 写文章
- 首页、文章列表、文章详情、About 页面
- 静态导出，适合 GitHub Pages
- GitHub Actions 自动构建和发布
- SEO 基础支持：`metadata`、`sitemap`、`robots`

## 本地开发

```bash
npm install
npm run dev
```

打开 `http://localhost:3000` 查看页面。

## 写文章

在 `content/posts` 目录下新增 `.md` 或 `.mdx` 文件，使用下面的 frontmatter：

```md
---
title: "文章标题"
publishedAt: "2026-04-24"
summary: "一句话摘要（可选，不写会自动取正文开头）"
featured: false
---

这里是正文内容。
```

## 自定义站点信息

站点名称、简介、作者等集中在：

- `src/lib/site-config.ts`

## GitHub Pages 部署

1. 把仓库推到 GitHub。
2. 默认发布分支使用 `main`。
3. 在 GitHub 仓库中打开 `Settings -> Pages`。
4. `Build and deployment` 选择 `GitHub Actions`。
5. 推送到 `main` 后会自动构建并发布。

工作流文件位于：

- `.github/workflows/deploy.yml`

## 构建静态产物

```bash
npm run build
```

构建完成后，静态文件会输出到 `out/`。

## 预览导出结果

```bash
npm run preview
```
