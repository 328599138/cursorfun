import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Website from '@/models/Website';

// 获取所有网站
export async function GET() {
  try {
    await connectDB();
    const websites = await Website.find().sort({ createdAt: -1 });
    return NextResponse.json(websites);
  } catch (error) {
    return NextResponse.json(
      { error: '获取网站列表失败' },
      { status: 500 }
    );
  }
}

// 创建新网站
export async function POST(request: Request) {
  try {
    const body = await request.json();
    await connectDB();

    const website = await Website.create({
      name: body.name,
      url: body.url,
      description: body.description,
      icon: body.icon,
      category: body.category
    });

    return NextResponse.json(website);
  } catch (error) {
    return NextResponse.json(
      { error: '创建网站失败' },
      { status: 500 }
    );
  }
} 