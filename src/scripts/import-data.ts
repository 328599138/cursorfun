import { ObjectId } from 'mongodb';

interface Website {
  name: string;
  url: string;
  description: string;
  icon: string;
  categorySlug?: string;
}

const websites: Website[] = [
  {
    name: 'Portkey AI MCP',
    url: 'https://portkey.ai/mcp-servers',
    description: 'Portkey AI MCP server list and documentation',
    icon: '🔑',
    categorySlug: 'cursor-mcp'
  },
  {
    name: 'MCP Protocol Github',
    url: 'https://github.com/modelcontextprotocol/servers',
    description: 'MCP协议官方Github',
    icon: '📦',
    categorySlug: 'cursor-mcp'
  },
  {
    name: 'MCP Marketplace',
    url: 'https://github.com/cline/mcp-marketplace',
    description: 'Marketplace for MCP plugins and extensions',
    icon: '🏪',
    categorySlug: 'cursor-mcp'
  },
  {
    name: 'Fleur MCP',
    url: 'https://www.fleurmcp.com/',
    description: 'Fleur MCP服务',
    icon: '🌸',
    categorySlug: 'cursor-mcp'
  },
  {
    name: 'Reddit MCP',
    url: 'https://www.reddit.com/r/mcp/',
    description: 'MCP Reddit社区',
    icon: '💬',
    categorySlug: 'cursor-mcp'
  },
  {
    name: 'Cursor MCP Directory',
    url: 'https://cursor.directory/mcp',
    description: 'Directory of Cursor MCP resources',
    icon: '📑',
    categorySlug: 'cursor-mcp'
  },
  {
    name: 'Awesome MCP Servers',
    url: 'https://github.com/punkpeye/awesome-mcp-servers',
    description: 'Curated list of awesome MCP servers',
    icon: '⭐',
    categorySlug: 'cursor-mcp'
  }
]; 