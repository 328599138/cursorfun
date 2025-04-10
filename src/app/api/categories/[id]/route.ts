import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Category from '@/models/Category';

// 获取单个分类
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    const category = await Category.findById(params.id);
    
    if (!category) {
      return NextResponse.json(
        { error: '分类不存在' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(category);
  } catch (error) {
    console.error('获取分类失败:', error);
    return NextResponse.json(
      { error: '获取分类失败' },
      { status: 500 }
    );
  }
}

// 更新分类
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const data = await request.json();
    
    await connectDB();
    
    // 验证slug是否已被其他分类使用
    if (data.slug) {
      const existing = await Category.findOne({ 
        slug: data.slug,
        _id: { $ne: params.id }
      });
      
      if (existing) {
        return NextResponse.json(
          { error: '此Slug已被其他分类使用' },
          { status: 400 }
        );
      }
    }
    
    const updatedCategory = await Category.findByIdAndUpdate(
      params.id,
      { $set: data },
      { new: true, runValidators: true }
    );
    
    if (!updatedCategory) {
      return NextResponse.json(
        { error: '分类不存在' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(updatedCategory);
  } catch (error) {
    console.error('更新分类失败:', error);
    return NextResponse.json(
      { error: '更新分类失败' },
      { status: 500 }
    );
  }
}

// 删除分类
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    
    const deletedCategory = await Category.findByIdAndDelete(params.id);
    
    if (!deletedCategory) {
      return NextResponse.json(
        { error: '分类不存在' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ message: '分类已成功删除' });
  } catch (error) {
    console.error('删除分类失败:', error);
    return NextResponse.json(
      { error: '删除分类失败' },
      { status: 500 }
    );
  }
} 
