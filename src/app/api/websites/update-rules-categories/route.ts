import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import Website from '@/models/Website';
import connectDB from '@/lib/db';

export async function POST() {
  try {
    await connectDB();
    
    // 更新所有Cursor Rules相关网站的分类
    const rulesWebsites = [
      'Cursor List',
      'Cursor Directory Rules',
      'Cursor Rule Maker',
      'Dot Cursor Rules',
      'Cursor Rules Org'
    ];

    const updatePromises = rulesWebsites.map(name => 
      Website.updateOne(
        { name },
        { $set: { category: 'Cursor Rules' } }
      )
    );

    // 更新其他未分类网站
    const otherWebsites = [
      {name: 'Smithery AI', category: 'Cursor MCP'},
      {name: 'Pulse MCP', category: 'Cursor MCP'},
      {name: 'MCP Servers', category: 'Cursor MCP'},
      {name: 'MCP.so', category: 'Cursor MCP'},
      {name: 'Glama AI MCP', category: 'Cursor MCP'},
      {name: 'Cursor Directory', category: 'Cursor MCP'}
    ];

    const otherUpdatePromises = otherWebsites.map(({name, category}) => 
      Website.updateOne(
        { name },
        { $set: { category } }
      )
    );

    await Promise.all([...updatePromises, ...otherUpdatePromises]);

    return NextResponse.json({ message: '分类更新成功' });
  } catch (error) {
    console.error('更新分类失败:', error);
    return NextResponse.json({ error: '更新分类失败' }, { status: 500 });
  }
} 