// 模拟数据库模块
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// 定义数据类型
export interface Category {
  id: string;
  name: string;
  description: string;
  order: number;
}

export interface NavItem {
  id: string;
  title: string;
  description: string;
  href: string;
  icon?: string;
  categoryId: string;
  order: number;
}

export interface QRCode {
  id: string;
  name: string;
  imageUrl: string;
}

// 初始数据
const initialCategories: Category[] = [
  {
    id: '1',
    name: 'Cursor 基础',
    description: '学习和掌握 Cursor IDE 的基础知识和使用技巧',
    order: 0
  },
  {
    id: '2',
    name: 'Web 开发',
    description: '使用 Cursor 进行网站开发的教程和资源',
    order: 1
  }
];

const initialNavItems: NavItem[] = [
  {
    id: '1',
    title: 'Cursor 基础',
    description: '学习和掌握 Cursor IDE 的基础知识和使用技巧',
    href: '/basic',
    categoryId: '1',
    order: 0
  },
  {
    id: '2',
    title: 'Cursor Rules',
    description: '学习和掌握 Cursor IDE 的使用规则和最佳实践',
    href: '/rules',
    categoryId: '1',
    order: 1
  },
  {
    id: '3',
    title: 'Cursor MCP',
    description: '探索 Cursor 的 MCP 功能和高级特性',
    href: '/mcp',
    categoryId: '1',
    order: 2
  },
  {
    id: '4',
    title: 'Web 站搭建',
    description: '从域名注册到部署上线的完整建站指南',
    href: '/web',
    categoryId: '2',
    order: 0
  },
  {
    id: '5',
    title: 'API 开发',
    description: 'API 设计、开发和测试的最佳实践',
    href: '/api',
    categoryId: '2',
    order: 1
  }
];

const initialQRCodes: QRCode[] = [
  {
    id: '1',
    name: '微信群',
    imageUrl: '/qrcode.jpg'
  }
];

// 创建状态管理
export interface DBState {
  categories: Category[];
  navItems: NavItem[];
  qrCodes: QRCode[];
  addCategory: (category: Omit<Category, 'id'>) => void;
  updateCategory: (id: string, category: Partial<Category>) => void;
  deleteCategory: (id: string) => void;
  addNavItem: (item: Omit<NavItem, 'id'>) => void;
  updateNavItem: (id: string, item: Partial<NavItem>) => void;
  deleteNavItem: (id: string) => void;
  updateQRCode: (id: string, qrCode: Partial<QRCode>) => void;
}

// 创建状态存储，使用zustand进行状态管理，并使用localStorage持久化
export const useDB = create<DBState>()(
  persist(
    (set) => ({
      categories: initialCategories,
      navItems: initialNavItems,
      qrCodes: initialQRCodes,
      
      // 分类管理方法
      addCategory: (category) => 
        set((state) => ({
          categories: [...state.categories, { ...category, id: Date.now().toString() }]
        })),
      
      updateCategory: (id, category) =>
        set((state) => ({
          categories: state.categories.map(c => 
            c.id === id ? { ...c, ...category } : c
          )
        })),
      
      deleteCategory: (id) =>
        set((state) => ({
          categories: state.categories.filter(c => c.id !== id),
          navItems: state.navItems.filter(item => item.categoryId !== id)
        })),
      
      // 导航项管理方法
      addNavItem: (item) =>
        set((state) => ({
          navItems: [...state.navItems, { ...item, id: Date.now().toString() }]
        })),
      
      updateNavItem: (id, item) =>
        set((state) => ({
          navItems: state.navItems.map(i => 
            i.id === id ? { ...i, ...item } : i
          )
        })),
      
      deleteNavItem: (id) =>
        set((state) => ({
          navItems: state.navItems.filter(i => i.id !== id)
        })),
      
      // 二维码管理方法
      updateQRCode: (id, qrCode) =>
        set((state) => ({
          qrCodes: state.qrCodes.map(q => 
            q.id === id ? { ...q, ...qrCode } : q
          )
        })),
    }),
    {
      name: 'cursor-fun-db'
    }
  )
); 