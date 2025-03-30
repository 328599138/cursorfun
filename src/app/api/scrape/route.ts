import { NextRequest, NextResponse } from 'next/server';
import { scrapeWebsite } from '@/lib/scraper';

export async function POST(request: NextRequest) {
  try {
    const { url } = await request.json();
    
    if (!url) {
      return NextResponse.json(
        { error: '请提供有效的URL' },
        { status: 400 }
      );
    }

    const websiteInfo = await scrapeWebsite(url);
    
    return NextResponse.json(websiteInfo);
  } catch (error) {
    console.error('抓取API错误:', error);
    return NextResponse.json(
      { error: '抓取网站失败' },
      { status: 500 }
    );
  }
} 