# CursorFun.com

CursorFun.com 是一个专注于 Cursor IDE 相关资源的导航网站。网站采用现代化的 Apple Design 设计风格，提供了丰富的 Cursor IDE 相关资源和教程。

## 特性

- 🎨 Apple Design 设计风格
  - 系统原生字体
  - 苹果标准色板
  - 精致的圆角和阴影
  - 流畅的动画效果
- 🌓 完整的深色模式支持
- 📱 响应式布局，完美适配移动端
- 🔍 快速导航和搜索
- 💬 在线交流群
- 🔐 内置管理后台，方便内容管理

## 技术栈

- Next.js 14
- TypeScript
- Tailwind CSS
- next-themes (深色模式)
- zustand (状态管理)

## 设计规范

项目遵循 Apple Design 设计规范：

### 颜色系统
- 主色调：蓝色 (#007AFF)
- 成功：绿色 (#34C759)
- 警告：橙色 (#FF9500)
- 错误：红色 (#FF3B30)
- 信息：浅蓝 (#5AC8FA)

### 字体
使用系统字体堆栈：
- iOS/macOS: -apple-system, SF Pro
- Windows: Segoe UI
- Android: Roboto
- 其他: 无衬线字体

### 间距和圆角
- 标准间距：4px, 8px, 16px, 24px, 32px
- 圆角：8px, 12px, 16px (根据组件大小)

## 本地开发

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

## 管理后台

本项目内置了一个管理后台，用于管理导航站点的内容。访问路径为 `/admin`。

管理后台功能：
- 分类管理：添加、编辑、删除分类
- 导航项管理：添加、编辑、删除导航项
- 群二维码管理：更新交流群二维码

## 部署

项目使用 Vercel 进行部署，每次推送到 main 分支会自动触发部署。

## 联系方式

- WeChat: fengakon
- 地址: 中国辽宁铁岭

## 许可证

MIT 