import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Website from '@/models/Website';

// 获取所有网站
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const categoryId = searchParams.get('categoryId');
    
    const query = categoryId ? { categoryId } : {};
    
    await connectDB();
    const websites = await Website.find(query).sort({ createdAt: -1 });
    
    return NextResponse.json(websites);
  } catch (error) {
    console.error('获取网站失败:', error);
    return NextResponse.json(
      { error: '获取网站失败' },
      { status: 500 }
    );
  }
}

// 创建新网站
export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    
    // 验证数据
    if (!data.name || !data.url || !data.description || !data.categoryId) {
      return NextResponse.json(
        { error: '名称、URL、描述和分类ID是必填项' },
        { status: 400 }
      );
    }
    
    await connectDB();
    
    // 检查URL是否已存在
    const existing = await Website.findOne({ url: data.url });
    if (existing) {
      return NextResponse.json(
        { error: '此URL已存在' },
        { status: 400 }
      );
    }
    
    // 处理元数据
    const metadata = new Map<string, string>();
    if (data.metadata && typeof data.metadata === 'object') {
      Object.entries(data.metadata).forEach(([key, value]) => {
        if (typeof value === 'string') {
          metadata.set(key, value);
        }
      });
    }
    
    // 创建新网站
    const newWebsite = new Website({
      name: data.name,
      url: data.url,
      description: data.description,
      icon: data.icon || '/icons/placeholder.svg',
      categoryId: data.categoryId,
      metadata
    });
    
    await newWebsite.save();
    
    return NextResponse.json(newWebsite, { status: 201 });
  } catch (error) {
    console.error('创建网站失败:', error);
    return NextResponse.json(
      { error: '创建网站失败' },
      { status: 500 }
    );
  }
} 