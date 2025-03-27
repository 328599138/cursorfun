"use client";

import React, { useState, useEffect, createContext, useContext } from "react";

// 定义数据类型
export interface Category {
  id: string;
  name: string;
  description?: string;
  icon?: string;
  slug: string;
  order?: number;
}

export interface NavItem {
  id: string;
  title: string;
  description?: string;
  url: string;
  icon?: string;
  categoryId: string;
  isHot?: boolean;
  isNew?: boolean;
  order: number;
}

export interface QRCode {
  id: string;
  name: string;
  imageUrl: string;
}

// 创建上下文
interface DBContextType {
  categories: Category[];
  navItems: NavItem[];
  qrCodes: QRCode[];
  addCategory: (category: Omit<Category, "id">) => void;
  updateCategory: (id: string, category: Partial<Category>) => void;
  deleteCategory: (id: string) => void;
  addNavItem: (navItem: Omit<NavItem, "id">) => void;
  updateNavItem: (id: string, navItem: Partial<NavItem>) => void;
  deleteNavItem: (id: string) => void;
  updateQRCode: (id: string, qrCode: Partial<QRCode>) => void;
}

const DBContext = createContext<DBContextType | null>(null);

// 本地存储键
const STORAGE_KEYS = {
  CATEGORIES: "cursorfun_categories",
  NAV_ITEMS: "cursorfun_navitems",
  QR_CODES: "cursorfun_qrcodes",
};

// 初始数据
const initialCategories: Category[] = [
  {
    id: "1",
    name: "Cursor Rules",
    description: "Cursor rules and prompts",
    icon: "📜",
    slug: "rules",
    order: 1
  },
  {
    id: "2",
    name: "MCP Applications",
    description: "MCP applications and tools",
    icon: "🔌",
    slug: "mcp",
    order: 2
  },
  {
    id: "3",
    name: "Basic Tutorials",
    description: "Cursor basic tutorials",
    icon: "📚",
    slug: "basic",
    order: 3
  },
];

const initialNavItems: NavItem[] = [
  {
    id: "1",
    title: "Cursor Official Website",
    description: "Cursor AI Code Editor Official Website",
    url: "https://cursor.sh",
    categoryId: "3",
    isHot: true,
    order: 1
  },
  {
    id: "2",
    title: "Cursor Community",
    description: "Cursor Community Forum",
    url: "https://github.com/cursorchina",
    categoryId: "3",
    order: 2
  },
  {
    id: "3",
    title: "Cursor Rules Repository",
    description: "GitHub repository collecting various Cursor rules",
    url: "https://github.com/ruanyf/cursor-rule",
    categoryId: "1",
    isNew: true,
    order: 1
  },
];

const initialQRCodes: QRCode[] = [
  {
    id: "1",
    name: "WeChat Group QR Code",
    imageUrl: "/qrcode.jpg",
  },
];

// 提供者组件
export function DBProvider({ children }: { children: React.ReactNode }) {
  // 状态
  const [isClient, setIsClient] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [navItems, setNavItems] = useState<NavItem[]>([]);
  const [qrCodes, setQRCodes] = useState<QRCode[]>([]);

  // 检测客户端渲染
  useEffect(() => {
    setIsClient(true);
  }, []);

  // 初始化数据
  useEffect(() => {
    if (!isClient) return;

    const loadData = () => {
      try {
        const storedCategories = localStorage.getItem(STORAGE_KEYS.CATEGORIES);
        const storedNavItems = localStorage.getItem(STORAGE_KEYS.NAV_ITEMS);
        const storedQRCodes = localStorage.getItem(STORAGE_KEYS.QR_CODES);

        setCategories(storedCategories ? JSON.parse(storedCategories) : initialCategories);
        setNavItems(storedNavItems ? JSON.parse(storedNavItems) : initialNavItems);
        setQRCodes(storedQRCodes ? JSON.parse(storedQRCodes) : initialQRCodes);

        if (!storedCategories) {
          localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(initialCategories));
        }
        if (!storedNavItems) {
          localStorage.setItem(STORAGE_KEYS.NAV_ITEMS, JSON.stringify(initialNavItems));
        }
        if (!storedQRCodes) {
          localStorage.setItem(STORAGE_KEYS.QR_CODES, JSON.stringify(initialQRCodes));
        }
      } catch (error) {
        console.error("Error loading data from localStorage:", error);
        // 如果出错，使用初始数据
        setCategories(initialCategories);
        setNavItems(initialNavItems);
        setQRCodes(initialQRCodes);
      }
    };

    loadData();
  }, [isClient]);

  // 分类操作
  const addCategory = (category: Omit<Category, "id">) => {
    const newCategory = {
      ...category,
      id: Date.now().toString(),
    };
    const updatedCategories = [...categories, newCategory];
    setCategories(updatedCategories);
    localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(updatedCategories));
  };

  const updateCategory = (id: string, category: Partial<Category>) => {
    const updatedCategories = categories.map((cat) =>
      cat.id === id ? { ...cat, ...category } : cat
    );
    setCategories(updatedCategories);
    localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(updatedCategories));
  };

  const deleteCategory = (id: string) => {
    const updatedCategories = categories.filter((cat) => cat.id !== id);
    setCategories(updatedCategories);
    localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(updatedCategories));
  };

  // 导航项操作
  const addNavItem = (navItem: Omit<NavItem, "id">) => {
    const newNavItem = {
      ...navItem,
      id: Date.now().toString(),
    };
    const updatedNavItems = [...navItems, newNavItem];
    setNavItems(updatedNavItems);
    localStorage.setItem(STORAGE_KEYS.NAV_ITEMS, JSON.stringify(updatedNavItems));
  };

  const updateNavItem = (id: string, navItem: Partial<NavItem>) => {
    const updatedNavItems = navItems.map((item) =>
      item.id === id ? { ...item, ...navItem } : item
    );
    setNavItems(updatedNavItems);
    localStorage.setItem(STORAGE_KEYS.NAV_ITEMS, JSON.stringify(updatedNavItems));
  };

  const deleteNavItem = (id: string) => {
    const updatedNavItems = navItems.filter((item) => item.id !== id);
    setNavItems(updatedNavItems);
    localStorage.setItem(STORAGE_KEYS.NAV_ITEMS, JSON.stringify(updatedNavItems));
  };

  // 二维码操作
  const updateQRCode = (id: string, qrCode: Partial<QRCode>) => {
    const updatedQRCodes = qrCodes.map((code) =>
      code.id === id ? { ...code, ...qrCode } : code
    );
    setQRCodes(updatedQRCodes);
    localStorage.setItem(STORAGE_KEYS.QR_CODES, JSON.stringify(updatedQRCodes));
  };

  // 上下文值
  const value = {
    categories,
    navItems,
    qrCodes,
    addCategory,
    updateCategory,
    deleteCategory,
    addNavItem,
    updateNavItem,
    deleteNavItem,
    updateQRCode,
  };

  return React.createElement(
    DBContext.Provider,
    { value },
    children
  );
}

// 消费者钩子
export function useDB() {
  const context = useContext(DBContext);
  if (!context) {
    throw new Error("useDB must be used within a DBProvider");
  }
  return context;
} 