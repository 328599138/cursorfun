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

// 只保留一个索引定义，避免警告
categorySchema.index({ order: 1 });

// 获取模型
const Category = models.Category || model('Category', categorySchema);

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
 * 初始化Cursor相关分类数据
 */
async function seedCursorCategories() {
  try {
    const connected = await connectDB();
    if (!connected) {
      console.error('无法连接到数据库，退出程序');
      process.exit(1);
    }
    
    console.log('开始创建Cursor相关分类数据...');
    
    // 创建Cursor相关分类数据
    const cursorCategories = [
      {
        name: 'Cursor 基础',
        slug: 'cursor-basics',
        description: 'Cursor的基础学习资源',
        order: 1,
      },
      {
        name: 'Cursor Rules',
        slug: 'cursor-rules',
        description: 'Cursor的规则和配置资源',
        order: 2,
      },
      {
        name: 'Cursor MCP',
        slug: 'cursor-mcp',
        description: 'Model Context Protocol相关资源',
        order: 3,
      },
    ];
    
    for (const categoryData of cursorCategories) {
      // 检查分类是否已存在
      const existingCategory = await Category.findOne({ slug: categoryData.slug });
      if (existingCategory) {
        console.log(`分类已存在，跳过: ${categoryData.name} (${categoryData.slug})`);
        continue;
      }
      
      // 创建新分类
      const category = new Category(categoryData);
      await category.save();
      console.log(`创建了新分类: ${categoryData.name} (${categoryData.slug})`);
    }
    
    console.log('Cursor相关分类数据创建完成');
    
    // 断开数据库连接
    await mongoose.disconnect();
    console.log('数据库连接已关闭');
    
    process.exit(0);
  } catch (error) {
    console.error('初始化Cursor相关分类数据失败:', error.message);
    // 确保断开连接
    try {
      await mongoose.disconnect();
    } catch (_) {
      // 忽略断开连接时的错误
    }
    process.exit(1);
  }
}

// 执行Cursor相关分类数据初始化
seedCursorCategories(); 