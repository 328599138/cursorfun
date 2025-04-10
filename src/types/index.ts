# CursorFun 资源导航与后台管理系统

CursorFun 是一个专注于收集和展示 Cursor 编辑器相关资源的网站，包括前台资源展示和后台管理系统。

## 项目架构概览

```mermaid
graph TD
    A[用户界面] --> B[Next.js 前端]
    B --> C[API 路由]
    C --> D[数据库服务]
    D --> E[(MongoDB 数据库)]
    F[管理员界面] --> G[后台管理系统]
    G --> C
```

### 技术栈

- **前端框架**: Next.js 15.2.4 
- **UI 库**: React 19, TailwindCSS
- **数据库**: MongoDB, Mongoose
- **图标**: Lucide React, React Icons
- **动画**: Framer Motion
- **主题**: Next Themes (深色/浅色模式)

## 资源分类

### Cursor Basics
- 基础教程和文档
- 入门指南
- 使用技巧

### Programming Learning
- AI辅助编程
- 代码示例
- 学习资源

### Cursor Rules
- 规则列表和目录
- 规则生成工具
- 规则资源库
- 规则组织

### Cursor MCP
- MCP服务器列表
- MCP协议文档
- MCP插件市场
- MCP服务平台
- MCP社区资源

## 代码文件依赖关系

```mermaid
graph LR
    A[src/app] --> B[src/components]
    A --> C[src/lib]
    A --> D[src/models]
    C --> E[src/types]
    B --> E
    D --> E
    A --> F[src/app/api]
    F --> D
    F --> C
```

## 功能模块调用逻辑

### 前台展示流程

```mermaid
sequenceDiagram
    participant 用户
    participant 前台页面
    participant API
    participant 数据库
    
    用户->>前台页面: 访问网站
    前台页面->>API: 请求分类和网站数据
    API->>数据库: 查询数据
    数据库-->>API: 返回数据
    API-->>前台页面: 展示分类和网站内容
    前台页面-->>用户: 渲染最终页面
```

### 后台管理流程

```mermaid
sequenceDiagram
    participant 管理员
    participant 后台页面
    participant API
    participant 抓取服务
    participant 数据库
    
    管理员->>后台页面: 访问管理界面
    管理员->>后台页面: 输入网站URL
    后台页面->>抓取服务: 请求抓取网站信息
    抓取服务-->>后台页面: 返回抓取数据
    管理员->>后台页面: 确认或修改信息
    后台页面->>API: 保存网站数据
    API->>数据库: 写入数据
    数据库-->>API: 确认保存成功
    API-->>后台页面: 返回保存结果
    后台页面-->>管理员: 显示操作结果
```

## 关键代码文件定位索引

### 数据模型

- `src/models/Category.ts`: 分类数据模型
- `src/models/Website.ts`: 网站数据模型
- `src/types/index.ts`: TypeScript 类型定义

### API 端点

- `src/app/api/categories/route.ts`: 分类管理 API
- `src/app/api/websites/route.ts`: 网站管理 API
- `src/app/api/websites/update-categories/route.ts`: 分类更新 API
- `src/app/api/websites/update-rules-categories/route.ts`: 规则分类更新 API
- `src/app/api/scrape/route.ts`: 网站信息抓取 API

### 后台管理界面

- `src/app/admin/page.tsx`: 仪表盘
- `src/app/admin/categories/page.tsx`: 分类管理
- `src/app/admin/websites/page.tsx`: 网站管理
- `src/components/admin/AdminLayout.tsx`: 管理界面布局
- `src/components/admin/WebsiteForm.tsx`: 网站表单组件
- `src/components/admin/CategoryForm.tsx`: 分类表单组件

### 工具库

- `src/lib/db.ts`: 数据库连接
- `src/lib/scraper.ts`: 网站自动抓取工具
- `src/lib/data.ts`: 静态数据(开发用)

## 项目进度

- [x] 基础项目架构搭建
- [x] 前台页面开发
- [x] 后台管理系统框架
- [x] 数据库模型设计
- [x] API 端点实现
- [x] 分类管理功能
- [x] 网站管理功能
- [x] 网站自动抓取功能
- [x] 分类数据更新
- [ ] 用户认证功能
- [ ] 数据统计分析
- [ ] SEO 优化

## 如何开始

1. 克隆项目仓库
2. 安装依赖：`npm install`
3. 创建 `.env.local` 文件并配置 MongoDB 连接：
   ```
   MONGODB_URI=你的MongoDB连接字符串
   NODE_ENV=development
   ```
4. 初始化数据库：`npm run init-db`
5. 启动开发服务器：`npm run dev`
6. 访问：`http://localhost:3000`

## 部署说明

推荐使用 Vercel 一键部署：

1. 在 Vercel 导入 GitHub 仓库
2. 配置环境变量：
   - `MONGODB_URI`: MongoDB Atlas 连接字符串
3. 部署项目
4. 初始化数据库：`npm run init-db`

## 开发者信息

- GitHub: [328599138](https://github.com/328599138)
- 微信: fengakon
- 邮箱: 328599138@qq.com

const categories: Category[] = [
  {
    name: 'Cursor Basics',
    description: 'Cursor编辑器基础和学习资源',
    icon: '🔬',
    slug: 'cursor-basics'
  },
  {
    name: 'Programming Learning',
    description: 'Cursor相关编程学习资源',
    icon: '📚',
    slug: 'programming-learning'
  },
  {
    name: 'Cursor Rules',
    description: 'Cursor规则和自动生成工具',
    icon: '📋',
    slug: 'cursor-rules'
  },
  {
    name: 'Cursor MCP',
    description: 'Model Context Protocol相关资源',
    icon: '🔗',
    slug: 'cursor-mcp'
  }
];

const websites: Website[] = [
  // Cursor Rules
  {
    name: 'Cursor List',
    url: 'https://cursorlist.com/?tags=.cursorrules',
    description: 'Cursor规则列表',
    icon: '📝',
    categorySlug: 'cursor-rules'
  },
  {
    name: 'Cursor Directory Rules',
    url: 'https://cursor.directory/rules',
    description: 'Cursor规则目录',
    icon: '📚',
    categorySlug: 'cursor-rules'
  },
  {
    name: 'Cursor Rule Maker',
    url: 'https://cursorrules.agnt.one/chat',
    description: 'Cursor规则自动生成工具',
    icon: '⚙️',
    categorySlug: 'cursor-rules'
  },
  {
    name: 'Dot Cursor Rules',
    url: 'https://dotcursorrules.com/',
    description: 'Cursor规则资源',
    icon: '🎯',
    categorySlug: 'cursor-rules'
  },
  {
    name: 'Cursor Rules Org',
    url: 'https://www.cursorrules.org/',
    description: 'Cursor规则组织',
    icon: '🏢',
    categorySlug: 'cursor-rules'
  },
  
  // Cursor MCP
  {
    name: 'Smithery AI',
    url: 'https://smithery.ai/',
    description: 'MCP服务平台',
    icon: '⚒️',
    categorySlug: 'cursor-mcp'
  },
  {
    name: 'Pulse MCP',
    url: 'https://www.pulsemcp.com/',
    description: 'MCP脉冲服务',
    icon: '💫',
    categorySlug: 'cursor-mcp'
  },
  {
    name: 'MCP Servers',
    url: 'https://mcpservers.org/',
    description: 'MCP服务器列表',
    icon: '🖥️',
    categorySlug: 'cursor-mcp'
  },
  {
    name: 'MCP.so',
    url: 'https://mcp.so/',
    description: 'MCP资源中心',
    icon: '🌐',
    categorySlug: 'cursor-mcp'
  },
  {
    name: 'Glama AI MCP',
    url: 'https://glama.ai/mcp/servers',
    description: 'Glama AI的MCP服务器',
    icon: '🦙',
    categorySlug: 'cursor-mcp'
  },
  {
    name: 'Cursor Directory',
    url: 'https://cursor.directory/',
    description: 'Cursor资源目录',
    icon: '📂',
    categorySlug: 'cursor-mcp'
  },
  {
    name: 'Portkey AI MCP',
    url: 'https://portkey.ai/mcp-servers',
    description: 'Portkey MCP服务器列表',
    icon: '🔑',
    categorySlug: 'cursor-mcp'
  }
];
