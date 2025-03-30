import connectDB from '@/lib/db';
import Category from '@/models/Category';

/**
 * 初始化种子数据
 */
async function seedData() {
  try {
    console.log('开始连接数据库...');
    await connectDB();
    console.log('数据库连接成功');
    
    // 检查是否已有分类数据
    const existingCategories = await Category.countDocuments();
    if (existingCategories > 0) {
      console.log(`数据库中已存在 ${existingCategories} 个分类，无需初始化`);
      return;
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
  } catch (error) {
    console.error('初始化种子数据失败:', error instanceof Error ? error.message : String(error));
    process.exit(1);
  } finally {
    // 断开连接
    process.exit(0);
  }
}

// 执行种子数据初始化
seedData(); 