import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Category from '@/models/Category';

// 获取所有分类
export async function GET() {
  try {
    console.log('正在连接数据库获取分类...');
    await connectDB();
    console.log('数据库连接成功，开始查询分类...');
    
    const categories = await Category.find({}).sort({ order: 1 });
    console.log(`成功获取 ${categories.length} 个分类`);
    
    return NextResponse.json(categories);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error('获取分类失败:', errorMessage);
    return NextResponse.json(
      { error: '获取分类失败', details: errorMessage },
      { status: 500 }
    );
  }
}

// 创建新分类
export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    
    // 验证数据
    if (!data.name || !data.slug) {
      return NextResponse.json(
        { error: '名称和Slug是必填项' },
        { status: 400 }
      );
    }
    
    console.log('正在连接数据库创建新分类...');
    await connectDB();
    console.log('数据库连接成功，开始验证分类数据...');
    
    // 检查slug是否已存在
    const existing = await Category.findOne({ slug: data.slug });
    if (existing) {
      return NextResponse.json(
        { error: '此Slug已被使用' },
        { status: 400 }
      );
    }
    
    // 获取最大order值
    const maxOrderCategory = await Category.findOne({}).sort({ order: -1 });
    const newOrder = maxOrderCategory ? maxOrderCategory.order + 1 : 1;
    
    // 创建新分类
    const newCategory = new Category({
      name: data.name,
      slug: data.slug,
      description: data.description || '',
      order: data.order || newOrder,
    });
    
    await newCategory.save();
    console.log('新分类创建成功:', newCategory.name);
    
    return NextResponse.json(newCategory, { status: 201 });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error('创建分类失败:', errorMessage);
    return NextResponse.json(
      { error: '创建分类失败', details: errorMessage },
      { status: 500 }
    );
  }
} 