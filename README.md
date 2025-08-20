# AppGuide Hugo Theme

一个现代化、响应式的 Hugo 主题，专为应用程序文档和指南网站设计。支持下载中心、教程系统、FAQ 页面等功能。

![AppGuide Theme Preview](https://via.placeholder.com/800x400/4f46e5/ffffff?text=AppGuide+Hugo+Theme)

## ✨ 主要特性

- 🎨 **现代化设计** - 清爽简洁的界面设计
- 📱 **完全响应式** - 完美适配所有设备
- 📥 **下载中心** - 内置应用下载页面
- 📚 **教程系统** - 完整的教程和指南管理
- ❓ **FAQ 支持** - 优雅的常见问题解答页面
- 🔍 **内置搜索** - 快速查找内容
- 🎯 **多内容类型** - 支持多种内容类型
- ⚡ **性能优化** - 快速加载和渲染
- 🌐 **多语言支持** - 国际化就绪
- 🛠️ **高度可定制** - 灵活的配置选项

## 🚀 快速开始

### 1. 创建新的 Hugo 站点

```bash
hugo new site my-app-site
cd my-app-site
```

### 2. 安装主题

#### 作为 Git 子模块（推荐）

```bash
git submodule add https://github.com/kxnotes/hugo-appguide-theme.git themes/appguide
```

#### 直接下载

```bash
git clone https://github.com/kxnotes/hugo-appguide-theme.git themes/appguide
```

### 3. 配置网站

复制示例配置文件：

```bash
cp themes/appguide/exampleSite/config.yaml .
```

### 4. 启动开发服务器

```bash
hugo server -D
```

现在访问 http://localhost:1313 查看你的网站！

## 🎯 使用教程

### 第一步：基本设置

1. **安装 Hugo**
   - Windows: 下载 [Hugo Extended](https://github.com/gohugoio/hugo/releases) 版本
   - macOS: `brew install hugo`
   - Linux: 参考 [Hugo 官方安装指南](https://gohugo.io/installation/)

2. **创建新站点**
   ```bash
   hugo new site my-app-guide
   cd my-app-guide
   ```

3. **安装主题**
   ```bash
   git submodule add https://github.com/kxnotes/hugo-appguide-theme.git themes/appguide
   ```

### 第二步：配置网站

复制并编辑配置文件：

```bash
cp themes/appguide/exampleSite/config.yaml config.yaml
```

编辑 `config.yaml` 文件：

```yaml
baseURL: 'https://yourapp.com'
languageCode: 'zh-CN'
title: 'Your App Name - 官方指南'
theme: 'appguide'

# 网站参数
params:
  # 应用信息
  app:
    name: 'Your App Name'
    tagline: '一句话描述你的应用'
    description: '详细描述你的应用功能和特点'
    github: 'https://github.com/yourorg/yourapp'
    logo: '/images/logo.png'
  
  # 首页特性展示
  features:
    - icon: '🚀'
      title: '快速启动'
      description: '一键安装，快速上手'
    - icon: '🔒'
      title: '安全可靠'
      description: '企业级安全保障'
    - icon: '⚡'
      title: '高性能'
      description: '优化性能，流畅体验'
    - icon: '🌐'
      title: '跨平台'
      description: '支持 Windows、macOS、Android'
  
  # 下载配置
  downloads:
    latest_version: 'v1.0.0'
    release_date: '2024-01-01'
    github_releases: 'https://github.com/yourorg/yourapp/releases'
    platforms:
      - name: 'Windows (x64)'
        icon: '🖥️'
        description: 'Windows 10/11 (64位)'
        files:
          - type: 'exe'
            label: '安装包 (.exe)'
            url: 'https://github.com/yourorg/yourapp/releases/download/v1.0.0/yourapp-windows-x64.exe'
            size: '25.8 MB'
          - type: 'zip'
            label: '绿色版 (.zip)'
            url: 'https://github.com/yourorg/yourapp/releases/download/v1.0.0/yourapp-windows-x64.zip'
            size: '23.5 MB'
      - name: 'macOS'
        icon: '🍎'
        description: 'macOS 11.0+'
        files:
          - type: 'dmg'
            label: '安装包 (.dmg)'
            url: 'https://github.com/yourorg/yourapp/releases/download/v1.0.0/yourapp-macos.dmg'
            size: '28.2 MB'
      - name: 'Android'
        icon: '🤖'
        description: 'Android 7.0+'
        files:
          - type: 'apk'
            label: '安装包 (.apk)'
            url: 'https://github.com/yourorg/yourapp/releases/download/v1.0.0/yourapp-android.apk'
            size: '15.3 MB'

# 菜单配置
menu:
  main:
    - name: '首页'
      url: '/'
      weight: 1
    - name: '教程'
      url: '/guides/'
      weight: 2
    - name: '下载'
      url: '/download/'
      weight: 3
    - name: 'FAQ'
      url: '/faq/'
      weight: 4
    - name: '关于'
      url: '/about/'
      weight: 5

# 分类法
taxonomies:
  category: categories
  tag: tags
```

### 第三步：创建内容

#### 1. 创建首页内容

```bash
hugo new _index.md
```

编辑 `content/_index.md`：

```yaml
---
title: "Your App Name - 官方指南"
description: "Your App Name 的完整使用指南和下载资源"
---

欢迎使用 Your App Name！这里是你获取最新版本、学习使用技巧的官方指南网站。
```

#### 2. 创建教程页面

```bash
hugo new guides/_index.md
hugo new guides/getting-started.md
hugo new guides/advanced-features.md
```

教程页面示例 (`content/guides/getting-started.md`)：

```yaml
---
title: "快速入门指南"
description: "从零开始学习如何使用 Your App Name"
date: 2024-01-01
categories: ["入门指南"]
tags: ["新手", "安装", "配置"]
difficulty: "简单"
icon: "🚀"
featured: true
weight: 1
---

## 1. 下载与安装

### Windows 用户

1. 前往 [下载页面](/download/) 下载最新版本
2. 双击运行安装程序
3. 按照安装向导完成安装

### macOS 用户

1. 下载 `.dmg` 文件
2. 打开 DMG 文件
3. 将应用拖拽到应用程序文件夹

## 2. 首次设置

{{< tip >}}
首次启动时，应用会引导你完成基本设置。
{{< /tip >}}

1. 启动应用
2. 选择语言（支持中文）
3. 配置基本参数
4. 完成设置

## 3. 基本使用

这里描述应用的基本使用方法...

{{< warning >}}
请确保按照步骤操作，避免配置错误。
{{< /warning >}}
```

#### 3. 创建下载页面

```bash
hugo new download.md
```

编辑 `content/download.md`：

```yaml
---
title: "下载中心"
description: "下载 Your App Name 最新版本"
layout: "download"
---

在这里下载 Your App Name 的最新版本。所有下载链接均来自官方 GitHub Releases。
```

#### 4. 创建 FAQ 页面

```bash
hugo new faq.md
```

编辑 `content/faq.md`：

```yaml
---
title: "常见问题"
description: "Your App Name 使用过程中的常见问题解答"
layout: "faq"
faqs:
  - question: "如何安装应用？"
    answer: "请参考我们的[快速入门指南](/guides/getting-started/)了解详细安装步骤。"
    category: "安装"
  
  - question: "应用支持哪些操作系统？"
    answer: "目前支持 Windows 10/11、macOS 11.0+ 和 Android 7.0+。"
    category: "兼容性"
  
  - question: "如何更新到最新版本？"
    answer: "应用内会自动检查更新，或者你可以到[下载页面](/download/)手动下载最新版本。"
    category: "更新"
  
  - question: "遇到问题如何求助？"
    answer: "你可以在 [GitHub Issues](https://github.com/yourorg/yourapp/issues) 提交问题或查看解决方案。"
    category: "支持"
---

这里是一些常见问题的解答。如果你的问题没有在下面列出，请查看我们的[教程页面](/guides/)或提交 Issue。
```

#### 5. 创建关于页面

```bash
hugo new about.md
```

编辑 `content/about.md`：

```yaml
---
title: "关于"
description: "关于 Your App Name 和本网站"
---

## 关于 Your App Name

Your App Name 是一个...（应用介绍）

## 关于本网站

这是 Your App Name 的官方指南网站，提供：

- 📥 安全的下载链接
- 📚 详细的使用教程  
- ❓ 常见问题解答
- 🔧 技术支持信息

## 联系我们

- GitHub: [yourorg/yourapp](https://github.com/yourorg/yourapp)
- Issues: [提交问题](https://github.com/yourorg/yourapp/issues)
- Email: support@yourapp.com
```

### 第四步：本地预览

启动开发服务器：

```bash
hugo server -D
```

访问 http://localhost:1313 预览网站效果。

### 第五步：部署上线

#### GitHub Pages 部署

1. 创建 `.github/workflows/hugo.yml`：

```yaml
name: Deploy Hugo site to Pages

on:
  push:
    branches: ["main"]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

defaults:
  run:
    shell: bash

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
        with:
          submodules: recursive
          fetch-depth: 0
      - name: Setup Hugo
        uses: peaceiris/actions-hugo@v2
        with:
          hugo-version: 'latest'
          extended: true
      - name: Setup Pages
        id: pages
        uses: actions/configure-pages@v3
      - name: Install Node.js dependencies
        run: "[[ -f package-lock.json || -f npm-shrinkwrap.json ]] && npm ci || true"
      - name: Build with Hugo
        env:
          HUGO_ENVIRONMENT: production
          HUGO_ENV: production
        run: |
          hugo \
            --gc \
            --minify \
            --baseURL "${{ steps.pages.outputs.base_url }}/"
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v2
        with:
          path: ./public

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v2
```

2. 推送代码到 GitHub
3. 在仓库设置中启用 GitHub Pages

#### Netlify 部署

1. 连接 GitHub 仓库到 Netlify
2. 构建设置：
   - 构建命令：`hugo --gc --minify`
   - 发布目录：`public`
   - 环境变量：`HUGO_VERSION=0.120.0`

## 📁 主题结构

```
appguide/
├── assets/                  # 静态资源
│   ├── css/                # 样式文件
│   └── js/                 # JavaScript 文件
├── exampleSite/            # 示例站点
│   └── config.yaml         # 示例配置
├── layouts/                # 模板文件
│   ├── _default/           # 默认模板
│   ├── partials/           # 部分模板
│   └── shortcodes/         # 短代码
├── static/                 # 静态文件
└── theme.yaml              # 主题信息
```

## ⚙️ 配置

### 基本配置

```yaml
baseURL: 'https://yoursite.com'
languageCode: 'zh-CN'
title: 'Your App Name'
theme: 'appguide'

params:
  app:
    name: 'Your App Name'
    tagline: '您的应用标语'
    description: '应用描述'
    github: 'https://github.com/yourorg/yourapp'
    logo: '/images/logo.png'
  
  # 网站特性
  features:
    - icon: '🚀'
      title: '快速启动'
      description: '一键启动，简单易用'
    - icon: '🔒'
      title: '安全可靠'
      description: '企业级安全保障'
    - icon: '⚡'
      title: '高性能'
      description: '优化性能，流畅体验'
```

### 下载配置

```yaml
params:
  downloads:
    latest_version: 'v1.0.0'
    release_date: '2024-01-01'
    platforms:
      - name: 'Windows (x64)'
        icon: '🖥️'
        description: 'Windows 10/11'
        files:
          - type: 'exe'
            label: '下载 .exe'
            url: 'https://github.com/yourorg/yourapp/releases/download/v1.0.0/app-windows-x64.exe'
      - name: 'macOS'
        icon: '🍎'
        description: 'macOS 11.0+'
        files:
          - type: 'dmg'
            label: '下载 .dmg'
            url: 'https://github.com/yourorg/yourapp/releases/download/v1.0.0/app-macos.dmg'
```

## 📝 内容创建

### 教程页面

创建教程：

```bash
hugo new guides/my-tutorial.md
```

Front matter 示例：

```yaml
---
title: "教程标题"
description: "教程描述"
date: 2024-01-01
categories: ["入门指南"]  # 入门指南、进阶技巧、故障排除
tags: ["Windows", "安装"]
difficulty: "简单"        # 简单、中等、困难
icon: "📖"
featured: true           # 是否在首页显示
---

这里是教程内容...
```

### FAQ 页面

创建 FAQ：

```bash
hugo new faq.md
```

使用 FAQ 布局：

```yaml
---
title: "常见问题"
layout: "faq"
---
```

### 下载页面

创建下载页面：

```bash
hugo new download.md
```

使用下载布局：

```yaml
---
title: "下载中心"
layout: "download"
---
```

## 🎨 短代码

主题提供了多个有用的短代码：

### 提示框

```markdown
{{< tip >}}
这是一个提示信息
{{< /tip >}}

{{< warning >}}
这是一个警告信息
{{< /warning >}}

{{< success >}}
这是一个成功信息
{{< /success >}}

{{< info >}}
这是一个信息提示
{{< /info >}}
```

## 🎨 自定义

### 自定义样式

创建 `assets/css/custom.css`：

```css
/* 自定义样式 */
:root {
  --primary-color: #your-color;
}

.custom-class {
  /* 你的样式 */
}
```

### 自定义 JavaScript

创建 `assets/js/custom.js`：

```javascript
// 自定义功能
document.addEventListener('DOMContentLoaded', function() {
  // 你的代码
});
```

## 🚀 部署

### GitHub Pages

1. 在仓库设置中启用 GitHub Pages
2. 创建 `.github/workflows/hugo.yml`：

```yaml
name: Deploy Hugo site to Pages

on:
  push:
    branches: ["main"]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
        with:
          submodules: recursive
      - name: Setup Hugo
        uses: peaceiris/actions-hugo@v2
        with:
          hugo-version: 'latest'
          extended: true
      - name: Build
        run: hugo --minify
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v2
        with:
          path: ./public

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v2
```

### Netlify

1. 连接 GitHub 仓库到 Netlify
2. 构建设置：
   - 构建命令：`hugo --minify`
   - 发布目录：`public`

## 🤝 贡献

欢迎贡献代码！请遵循以下步骤：

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 打开 Pull Request

## 📄 许可证

本项目采用 MIT 许可证。查看 [LICENSE](LICENSE) 文件了解详情。

## 🙏 致谢

- [Hugo](https://gohugo.io/) - 快速的静态网站生成器
- [Tailwind CSS](https://tailwindcss.com/) - 实用优先的 CSS 框架
- 所有贡献者和用户的支持

## 📞 支持

如果您遇到问题或有建议：

- 提交 [Issue](https://github.com/kxnotes/hugo-appguide-theme/issues)
- 查看 [文档](https://github.com/kxnotes/hugo-appguide-theme/wiki)
- 参与 [讨论](https://github.com/kxnotes/hugo-appguide-theme/discussions)

---

如果您喜欢这个主题，请给我们一个 ⭐️！