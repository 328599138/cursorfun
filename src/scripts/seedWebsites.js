// 使用 CommonJS 语法，避免出现 ESM 相关的问题
const mongoose = require('mongoose');
const { Schema, models, model } = mongoose;

// MongoDB 连接字符串 - 使用127.0.0.1替换localhost
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/cursorfun';

// 定义 Category 模型
const categorySchema = new Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String },
    order: { type: Number, required: true, default: 0 },
  },
  { timestamps: true }
);

// 获取 Category 模型
const Category = models.Category || model('Category', categorySchema);

// 定义 Website 模型
const websiteSchema = new Schema(
  {
    name: { type: String, required: true },
    url: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    icon: { type: String, required: true },
    categoryId: { 
      type: String, 
      required: true,
      ref: 'Category'
    },
    metadata: { 
      type: Map,
      of: String,
      default: new Map()
    }
  },
  { timestamps: true }
);

// 获取 Website 模型
const Website = models.Website || model('Website', websiteSchema);

/**
 * 连接数据库
 */
async function connectDB() {
  try {
    console.log('正在连接MongoDB...');
    console.log('使用连接字符串:', MONGODB_URI);
    await mongoose.connect(MONGODB_URI, {});
    console.log('MongoDB连接成功');
    return true;
  } catch (error) {
    console.error('MongoDB连接失败:', error.message);
    console.error('错误详情:', error);
    return false;
  }
}

/**
 * 获取分类ID
 */
async function getCategoryId(slug) {
  const category = await Category.findOne({ slug });
  if (!category) {
    console.log(`未找到分类: ${slug}`);
    return null;
  }
  return category._id.toString();
}

/**
 * 添加网站数据
 */
async function seedWebsites() {
  try {
    const connected = await connectDB();
    if (!connected) {
      console.error('无法连接到数据库，退出程序');
      process.exit(1);
    }

    // 获取分类ID
    const basicsCategoryId = await getCategoryId('cursor-basics');
    const rulesCategoryId = await getCategoryId('cursor-rules');
    const mcpCategoryId = await getCategoryId('cursor-mcp');
    
    if (!basicsCategoryId || !rulesCategoryId || !mcpCategoryId) {
      console.error('缺少必要的分类，请先运行 npm run seed:categories');
      process.exit(1);
    }

    // 基础分类网站
    const basicsWebsites = [
      {
        name: '编程学习',
        url: 'https://www.coderwithai.top/',
        description: 'AI辅助编程学习资源',
        icon: '/icons/placeholder.svg',
        categoryId: basicsCategoryId,
      },
      {
        name: 'Cursor 文档',
        url: 'https://cursor.document.top/',
        description: 'Cursor编辑器文档',
        icon: '/icons/placeholder.svg',
        categoryId: basicsCategoryId,
      }
    ];

    // Rules分类网站
    const rulesWebsites = [
      {
        name: 'Cursor List',
        url: 'https://cursorlist.com/?tags=.cursorrules',
        description: 'Cursor规则列表',
        icon: '/icons/placeholder.svg',
        categoryId: rulesCategoryId,
      },
      {
        name: 'Cursor Directory Rules',
        url: 'https://cursor.directory/rules',
        description: 'Cursor规则目录',
        icon: '/icons/placeholder.svg',
        categoryId: rulesCategoryId,
      },
      {
        name: 'Cursor Rule Maker',
        url: 'https://cursorrules.agnt.one/chat',
        description: '自动生成Cursor规则',
        icon: '/icons/placeholder.svg',
        categoryId: rulesCategoryId,
      },
      {
        name: 'Dot Cursor Rules',
        url: 'https://dotcursorrules.com/',
        description: 'Cursor规则集合',
        icon: '/icons/placeholder.svg',
        categoryId: rulesCategoryId,
      },
      {
        name: 'Cursor Rules Org',
        url: 'https://www.cursorrules.org/',
        description: 'Cursor规则组织',
        icon: '/icons/placeholder.svg',
        categoryId: rulesCategoryId,
      }
    ];

    // MCP分类网站
    const mcpWebsites = [
      {
        name: 'Smithery.ai',
        url: 'https://smithery.ai/',
        description: 'MCP服务',
        icon: '/icons/placeholder.svg',
        categoryId: mcpCategoryId,
      },
      {
        name: 'Pulse MCP',
        url: 'https://www.pulsemcp.com/',
        description: 'Pulse MCP服务',
        icon: '/icons/placeholder.svg',
        categoryId: mcpCategoryId,
      },
      {
        name: 'MCP Servers',
        url: 'https://mcpservers.org/',
        description: 'MCP服务器目录',
        icon: '/icons/placeholder.svg',
        categoryId: mcpCategoryId,
      },
      {
        name: 'MCP.so',
        url: 'https://mcp.so/',
        description: 'MCP服务平台',
        icon: '/icons/placeholder.svg',
        categoryId: mcpCategoryId,
      },
      {
        name: 'Glama AI MCP',
        url: 'https://glama.ai/mcp/servers',
        description: 'Glama AI的MCP服务',
        icon: '/icons/placeholder.svg',
        categoryId: mcpCategoryId,
      },
      {
        name: 'Cursor Directory',
        url: 'https://cursor.directory/',
        description: 'Cursor资源目录',
        icon: '/icons/placeholder.svg',
        categoryId: mcpCategoryId,
      },
      {
        name: 'Portkey AI MCP',
        url: 'https://portkey.ai/mcp-servers',
        description: 'Portkey AI的MCP服务器',
        icon: '/icons/placeholder.svg',
        categoryId: mcpCategoryId,
      },
      {
        name: 'MCP Servers GitHub',
        url: 'https://github.com/modelcontextprotocol/servers',
        description: 'MCP服务器GitHub仓库',
        icon: '/icons/placeholder.svg',
        categoryId: mcpCategoryId,
      },
      {
        name: 'MCP Marketplace',
        url: 'https://github.com/cline/mcp-marketplace',
        description: 'MCP市场GitHub仓库',
        icon: '/icons/placeholder.svg',
        categoryId: mcpCategoryId,
      },
      {
        name: 'Fleur MCP',
        url: 'https://www.fleurmcp.com/',
        description: 'Fleur MCP服务',
        icon: '/icons/placeholder.svg',
        categoryId: mcpCategoryId,
      },
      {
        name: 'Reddit MCP',
        url: 'https://www.reddit.com/r/mcp/',
        description: 'MCP Reddit社区',
        icon: '/icons/placeholder.svg',
        categoryId: mcpCategoryId,
      },
      {
        name: 'Cursor Directory MCP',
        url: 'https://cursor.directory/mcp',
        description: 'Cursor目录MCP部分',
        icon: '/icons/placeholder.svg',
        categoryId: mcpCategoryId,
      },
      {
        name: 'Awesome MCP Servers',
        url: 'https://github.com/punkpeye/awesome-mcp-servers',
        description: '优秀MCP服务器列表',
        icon: '/icons/placeholder.svg',
        categoryId: mcpCategoryId,
      }
    ];

    // 合并所有网站
    const allWebsites = [...basicsWebsites, ...rulesWebsites, ...mcpWebsites];

    // 添加网站数据
    for (const websiteData of allWebsites) {
      try {
        // 检查URL是否已存在
        const existingWebsite = await Website.findOne({ url: websiteData.url });
        if (existingWebsite) {
          console.log(`跳过已存在的网站: ${websiteData.name} (${websiteData.url})`);
          continue;
        }

        const website = new Website(websiteData);
        await website.save();
        console.log(`添加了新网站: ${websiteData.name} (${websiteData.url})`);
      } catch (error) {
        console.error(`添加网站时出错 ${websiteData.name}: ${error.message}`);
      }
    }

    console.log('网站数据添加完成!');
    
    // 断开数据库连接
    await mongoose.disconnect();
    console.log('数据库连接已关闭');
    
    process.exit(0);
  } catch (error) {
    console.error('添加网站数据失败:', error.message);
    
    // 确保断开连接
    try {
      await mongoose.disconnect();
    } catch (_) {
      // 忽略断开连接时的错误
    }
    
    process.exit(1);
  }
}

// 执行网站数据添加
seedWebsites(); 