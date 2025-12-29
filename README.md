
# 九宫格切图工具 - 发布指南

这是一个基于 React + TypeScript + Vite 构建的纯前端工具。

## 如何在本地运行

1. 安装 [Node.js](https://nodejs.org/)。
2. 在终端进入项目目录，执行：
   ```bash
   npm install
   npm run dev
   ```

## 部署到 Cloudflare Pages (推荐)

Cloudflare Pages 是托管此类静态工具的最佳选择，速度快且完全免费。

### 方案 A：关联 GitHub 自动部署（最推荐）
1. 将你的代码上传到 **GitHub** 仓库。
2. 登录 [Cloudflare Dashboard](https://dash.cloudflare.com/)。
3. 进入 **Workers & Pages** > **Create application** > **Pages** > **Connect to Git**。
4. 选择你的仓库，在 **Build settings** 中配置：
   - **Framework preset**: `Vite`
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
5. 点击 **Save and Deploy**。以后你每次推送代码，网站都会自动更新。

### 方案 B：使用 Wrangler 命令行上传
如果你不想使用 Git，可以安装 `wrangler` 直接上传编译后的文件：
1. 编译项目：`npm run build`
2. 部署：`npx wrangler pages deploy dist`

## 部署到其他平台
- **Vercel / Netlify**: 同样选择 Vite 预设，构建命令为 `npm run build`，输出目录为 `dist`。
- **虚拟主机/传统服务器**: 运行 `npm run build` 后，将生成的 `dist` 文件夹内的内容全部上传至服务器 Web 根目录即可。

## 技术特性
- **纯前端处理**: 使用 Canvas API 进行图像裁切，不经过任何后端服务器。
- **隐私保护**: 用户上传的图片仅在本地内存中处理，刷新页面即消失，极度安全。
- **响应式设计**: 完美适配手机端和 PC 端浏览器。
