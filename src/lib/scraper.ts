/**
 * 网站自动抓取工具
 * 用于从URL中提取网站的标题、描述和图标等信息
 */

export interface ScrapedWebsiteInfo {
  title: string;
  description: string;
  icon: string;
  url: string;
  metadata: Record<string, string>;
}

/**
 * 从URL中抓取网站信息
 * @param url 网站URL
 */
export async function scrapeWebsite(url: string): Promise<ScrapedWebsiteInfo> {
  try {
    // 确保URL格式正确
    let validUrl = url;
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      validUrl = `https://${url}`;
    }

    // 抓取网站内容
    const response = await fetch(validUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
      },
    });

    if (!response.ok) {
      throw new Error(`抓取网站失败: ${response.status} ${response.statusText}`);
    }

    const html = await response.text();
    
    // 解析网站标题
    const titleMatch = html.match(/<title[^>]*>(.*?)<\/title>/i);
    const title = titleMatch ? titleMatch[1].trim() : new URL(validUrl).hostname.replace('www.', '');
    
    // 解析网站描述
    const descriptionMatch = html.match(/<meta[^>]*name=['"]description['"][^>]*content=['"]([^'"]*)['"][^>]*>/i) 
      || html.match(/<meta[^>]*content=['"]([^'"]*)['"][^>]*name=['"]description['"][^>]*>/i);
    const description = descriptionMatch ? descriptionMatch[1].trim() : `${title} 网站`;
    
    // 提取网站图标
    const faviconMatch = html.match(/<link[^>]*rel=['"](?:shortcut )?icon['"][^>]*href=['"]([^'"]*)['"][^>]*>/i);
    let icon = faviconMatch ? faviconMatch[1] : '/favicon.ico';
    
    // 处理相对路径
    if (icon.startsWith('/')) {
      const urlObj = new URL(validUrl);
      icon = `${urlObj.protocol}//${urlObj.hostname}${icon}`;
    } else if (!icon.startsWith('http')) {
      const urlObj = new URL(validUrl);
      icon = `${urlObj.protocol}//${urlObj.hostname}/${icon}`;
    }

    // 提取其他元数据
    const metadata: Record<string, string> = {};
    
    // 查找关键字
    const keywordsMatch = html.match(/<meta[^>]*name=['"]keywords['"][^>]*content=['"]([^'"]*)['"][^>]*>/i)
      || html.match(/<meta[^>]*content=['"]([^'"]*)['"][^>]*name=['"]keywords['"][^>]*>/i);
    if (keywordsMatch) {
      metadata.keywords = keywordsMatch[1].trim();
    }
    
    // 提取语言
    const langMatch = html.match(/<html[^>]*lang=['"]([^'"]*)['"][^>]*>/i);
    if (langMatch) {
      metadata.language = langMatch[1].trim();
    }

    return {
      title,
      description,
      icon,
      url: validUrl,
      metadata,
    };
  } catch (error) {
    console.error('网站抓取失败:', error);
    
    // 创建基本信息作为备选
    const domain = new URL(url.startsWith('http') ? url : `https://${url}`).hostname.replace('www.', '');
    const name = domain.split('.')[0].charAt(0).toUpperCase() + domain.split('.')[0].slice(1);
    
    return {
      title: name,
      description: `${name} 网站`,
      icon: '/icons/placeholder.svg',
      url: url.startsWith('http') ? url : `https://${url}`,
      metadata: {},
    };
  }
} 