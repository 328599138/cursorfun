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
// categorySchema.index({ slug: 1 });
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
 * 初始化种子数据
 */
async function seedData() {
  try {
    const connected = await connectDB();
    if (!connected) {
      console.error('无法连接到数据库，退出程序');
      process.exit(1);
    }
    
    // 检查是否已有分类数据
    const existingCategories = await Category.countDocuments();
    if (existingCategories > 0) {
      console.log(`数据库中已存在 ${existingCategories} 个分类，无需初始化`);
      mongoose.disconnect();
      process.exit(0);
    }
    
    console.log('开始创建初始分类数据...');
    
    // 创建初始分类数据
    const categories = [
      {
        name: '搜索引擎',
        slug: 'search-engines',
        description: '各种搜索引擎和信息检索工具',
        order: 1,
      },
      {
        name: '社交媒体',
        slug: 'social-media',
        description: '社交网络和交流平台',
        order: 2,
      },
      {
        name: '生产工具',
        slug: 'productivity',
        description: '提高工作效率的应用和服务',
        order: 3,
      },
      {
        name: '学习资源',
        slug: 'learning',
        description: '在线教育和学习资源',
        order: 4,
      },
      {
        name: 'AI工具',
        slug: 'ai-tools',
        description: '人工智能和机器学习相关工具',
        order: 5,
      },
    ];
    
    // 批量插入分类
    await Category.insertMany(categories);
    
    console.log(`成功创建了 ${categories.length} 个初始分类`);
    
    // 断开数据库连接
    await mongoose.disconnect();
    console.log('数据库连接已关闭');
    
    process.exit(0);
  } catch (error) {
    console.error('初始化种子数据失败:', error.message);
    // 确保断开连接
    try {
      await mongoose.disconnect();
    } catch (err) {
      // 忽略断开连接时的错误
    }
    process.exit(1);
  }
}

// 执行种子数据初始化
seedData(); 