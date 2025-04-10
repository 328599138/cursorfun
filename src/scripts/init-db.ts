import mongoose from 'mongoose';
import Category from '../src/models/Category';
import Website from '../src/models/Website';
import dotenv from 'dotenv';

// 加载环境变量
dotenv.config({ path: '.env.local' });

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/cursorfun';

console.log('使用的数据库连接字符串:', MONGODB_URI);

const initialCategories = [
  {
    name: 'Cursor Basics',
    slug: 'cursor-basics',
    description: 'Cursor编辑器基础和学习资源',
    iconName: 'BookOpen',
    order: 1
  },
  {
    name: 'Programming Learning',
    slug: 'programming-learning',
    description: 'Cursor相关编程学习资源',
    iconName: 'Code',
    order: 2
  },
  {
    name: 'Cursor Rules',
    slug: 'cursor-rules',
    description: 'Cursor规则和自动生成工具',
    iconName: 'List',
    order: 3
  },
  {
    name: 'Cursor MCP',
    slug: 'cursor-mcp',
    description: 'Model Context Protocol相关资源',
    iconName: 'Network',
    order: 4
  }
];

const initialWebsites = [
  // Cursor Rules
  {
    name: 'Cursor List',
    url: 'https://cursorlist.com/?tags=.cursorrules',
    description: 'Cursor规则列表',
    icon: '📝',
    category: 'cursor-rules'
  },
  {
    name: 'Cursor Directory Rules',
    url: 'https://cursor.directory/rules',
    description: 'Cursor规则目录',
    icon: '📚',
    category: 'cursor-rules'
  },
  {
    name: 'Cursor Rule Maker',
    url: 'https://cursorrules.agnt.one/chat',
    description: 'Cursor规则自动生成工具',
    icon: '⚙️',
    category: 'cursor-rules'
  },
  {
    name: 'Dot Cursor Rules',
    url: 'https://dotcursorrules.com/',
    description: 'Cursor规则资源',
    icon: '🎯',
    category: 'cursor-rules'
  },
  {
    name: 'Cursor Rules Org',
    url: 'https://www.cursorrules.org/',
    description: 'Cursor规则组织',
    icon: '🏢',
    category: 'cursor-rules'
  },
  
  // Cursor MCP
  {
    name: 'Smithery AI',
    url: 'https://smithery.ai/',
    description: 'MCP服务平台',
    icon: '⚒️',
    category: 'cursor-mcp'
  },
  {
    name: 'Pulse MCP',
    url: 'https://www.pulsemcp.com/',
    description: 'MCP脉冲服务',
    icon: '💫',
    category: 'cursor-mcp'
  },
  {
    name: 'MCP Servers',
    url: 'https://mcpservers.org/',
    description: 'MCP服务器列表',
    icon: '🖥️',
    category: 'cursor-mcp'
  },
  {
    name: 'MCP.so',
    url: 'https://mcp.so/',
    description: 'MCP资源中心',
    icon: '🌐',
    category: 'cursor-mcp'
  },
  {
    name: 'Glama AI MCP',
    url: 'https://glama.ai/mcp/servers',
    description: 'Glama AI的MCP服务器',
    icon: '🦙',
    category: 'cursor-mcp'
  },
  {
    name: 'Cursor Directory',
    url: 'https://cursor.directory/',
    description: 'Cursor资源目录',
    icon: '📂',
    category: 'cursor-mcp'
  },
  {
    name: 'Portkey AI MCP',
    url: 'https://portkey.ai/mcp-servers',
    description: 'Portkey MCP服务器列表',
    icon: '🔑',
    category: 'cursor-mcp'
  }
];

async function initDB() {
  try {
    console.log('正在连接到MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('成功连接到MongoDB');

    // 清空现有数据
    console.log('正在清空现有数据...');
    await Promise.all([
      Category.deleteMany({}),
      Website.deleteMany({})
    ]);
    console.log('现有数据已清空');

    // 插入分类
    console.log('正在插入初始分类...');
    const categories = await Category.insertMany(initialCategories);
    console.log(`成功插入 ${categories.length} 个分类`);

    // 准备网站数据
    console.log('正在准备网站数据...');
    const categoryMap = new Map(categories.map(cat => [cat.slug, cat._id]));
    
    const websitesWithCategories = initialWebsites.map(website => ({
      ...website,
      category: categoryMap.get(website.category)
    }));

    // 插入网站数据
    console.log('正在插入网站数据...');
    const websites = await Website.insertMany(websitesWithCategories);
    console.log(`成功插入 ${websites.length} 个网站`);

    console.log('数据库初始化完成！');
  } catch (error) {
    console.error('初始化数据库时出错:', error);
  } finally {
    await mongoose.disconnect();
    console.log('数据库连接已关闭');
    process.exit(0);
  }
}

initDB(); 
