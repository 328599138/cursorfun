"use client";

import { useState, useEffect } from "react";
import { Sidebar } from "@/components/Sidebar";
import { CategorySection } from "@/components/CategorySection";
import { Category, Website } from "@/types";
import { motion } from "framer-motion";

export default function Home() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [activeCategoryId, setActiveCategoryId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        
        // 获取所有分类
        const categoryRes = await fetch('/api/categories');
        if (!categoryRes.ok) throw new Error('获取分类失败');
        const categoriesData = await categoryRes.json();
        
        // 获取所有网站
        const websiteRes = await fetch('/api/websites');
        if (!websiteRes.ok) throw new Error('获取网站失败');
        const websitesData = await websiteRes.json();
        
        // 将网站数据关联到对应的分类中
        const categoriesWithWebsites = categoriesData.map((category: Category) => ({
          ...category,
          websites: websitesData.filter((website: Website) => 
            website.categoryId === (category._id || category.id)
          ),
        }));
        
        setCategories(categoriesWithWebsites);
        
        // 设置第一个分类为活动分类
        if (categoriesWithWebsites.length > 0) {
          setActiveCategoryId(categoriesWithWebsites[0]._id || categoriesWithWebsites[0].id);
        }
        
        setError(null);
      } catch (err) {
        console.error('数据加载错误:', err);
        setError('无法加载数据，请检查数据库连接');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleCategoryChange = (categoryId: string) => {
    setActiveCategoryId(categoryId);
    // 平滑滚动到分类区域
    const category = categories.find((cat) => (cat._id || cat.id) === categoryId);
    if (category) {
      const element = document.getElementById(category.slug);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center p-6 bg-red-50 dark:bg-red-900/20 rounded-lg max-w-md">
          <h2 className="text-xl font-bold text-red-600 dark:text-red-400 mb-2">出错了</h2>
          <p className="text-red-500 dark:text-red-300">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row relative">
      <div className="absolute inset-0 pointer-events-none grid-pattern opacity-30"></div>
      <div className="w-full md:w-[260px] flex-shrink-0 md:sticky md:top-16 md:h-[calc(100vh-4rem)] z-10">
        <Sidebar
          categories={categories}
          activeCategoryId={activeCategoryId}
          onCategoryChange={handleCategoryChange}
        />
      </div>
      <div className="flex-1 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto pt-4 md:pt-0 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="pt-8 pb-4 relative"
        >
          <div className="absolute w-64 h-64 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-5 -top-10 -left-10 animate-blob"></div>
          <div className="absolute w-64 h-64 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-5 -top-10 -right-10 animate-blob animation-delay-2000"></div>
          <div className="absolute w-64 h-64 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-5 -bottom-10 -left-10 animate-blob animation-delay-4000"></div>
          <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-purple-500 via-violet-500 to-indigo-500 text-transparent bg-clip-text mb-4 relative z-10">
            Cursor Navigation Hub
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-lg max-w-2xl relative z-10">
            Discover the best resources for Cursor - the AI-first code editor.
          </p>
        </motion.div>

        <div className="divide-y divide-gray-200 dark:divide-gray-800 relative z-10">
          {categories.map((category) => (
            <CategorySection key={category._id || category.id} category={category} />
          ))}
        </div>
      </div>
    </div>
  );
}
