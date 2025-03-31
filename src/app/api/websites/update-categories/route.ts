import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import Website from '@/models/Website';
import connectDB from '@/lib/db';

export async function POST() {
  try {
    await connectDB();
    
    // 更新所有MCP相关网站的分类
    const mcpWebsites = [
      'Portkey AI MCP',
      'MCP Protocol Github',
      'MCP Marketplace',
      'Fleur MCP',
      'Reddit MCP',
      'Cursor MCP Directory',
      'Awesome MCP Servers'
    ];

    const updatePromises = mcpWebsites.map(name => 
      Website.updateOne(
        { name },
        { $set: { category: 'Cursor MCP' } }
      )
    );

    await Promise.all(updatePromises);

    return NextResponse.json({ message: '分类更新成功' });
  } catch (error) {
    console.error('更新分类失败:', error);
    return NextResponse.json({ error: '更新分类失败' }, { status: 500 });
  }
} 