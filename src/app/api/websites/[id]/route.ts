import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Website from '@/models/Website';

interface Params {
  params: {
    id: string;
  };
}

// 获取单个网站
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    const website = await Website.findById(params.id);
    
    if (!website) {
      return NextResponse.json(
        { error: '网站不存在' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(website);
  } catch (error) {
    return NextResponse.json(
      { error: '获取网站信息失败' },
      { status: 500 }
    );
  }
}

// 更新网站
export async function PUT(request: NextRequest, { params }: Params) {
  try {
    const data = await request.json();
    
    await connectDB();
    
    // 验证URL是否已被其他网站使用
    if (data.url) {
      const existing = await Website.findOne({ 
        url: data.url,
        _id: { $ne: params.id }
      });
      
      if (existing) {
        return NextResponse.json(
          { error: '此URL已被其他网站使用' },
          { status: 400 }
        );
      }
    }
    
    // 处理元数据
    if (data.metadata && typeof data.metadata === 'object') {
      const metadata = new Map<string, string>();
      Object.entries(data.metadata).forEach(([key, value]) => {
        if (typeof value === 'string') {
          metadata.set(key, value);
        }
      });
      data.metadata = metadata;
    }
    
    const updatedWebsite = await Website.findByIdAndUpdate(
      params.id,
      { $set: data },
      { new: true, runValidators: true }
    );
    
    if (!updatedWebsite) {
      return NextResponse.json(
        { error: '网站不存在' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(updatedWebsite);
  } catch (error) {
    console.error('更新网站失败:', error);
    return NextResponse.json(
      { error: '更新网站失败' },
      { status: 500 }
    );
  }
}

// 删除网站
export async function DELETE(request: NextRequest, { params }: Params) {
  try {
    await connectDB();
    
    const deletedWebsite = await Website.findByIdAndDelete(params.id);
    
    if (!deletedWebsite) {
      return NextResponse.json(
        { error: '网站不存在' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ message: '网站已成功删除' });
  } catch (error) {
    console.error('删除网站失败:', error);
    return NextResponse.json(
      { error: '删除网站失败' },
      { status: 500 }
    );
  }
} 