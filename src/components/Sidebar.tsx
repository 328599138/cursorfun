"use client";

import { useState, useEffect } from "react";
import { Category } from "@/types";
import { ChevronRight, ChevronDown } from "lucide-react";
import { motion } from "framer-motion";

interface SidebarProps {
  categories: Category[];
  activeCategoryId: string | null;
  onCategoryChange: (categoryId: string) => void;
}

export function Sidebar({ categories, activeCategoryId, onCategoryChange }: SidebarProps) {
  const [isOpen, setIsOpen] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(activeCategoryId);

  // Update the selected category when activeCategoryId changes from parent
  useEffect(() => {
    if (activeCategoryId) {
      setSelectedCategory(activeCategoryId);
    }
  }, [activeCategoryId]);

  const handleCategoryClick = (category: Category) => {
    const categoryId = category._id || category.id;
    if (categoryId) {
      setSelectedCategory(categoryId);
      onCategoryChange(categoryId);
    }
  };

  return (
    <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-r border-gray-200 dark:border-gray-800/50 min-h-screen w-[260px] shadow-sm">
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Categories</h2>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-1 rounded-md hover:bg-gray-200/70 dark:hover:bg-gray-800/70 transition-colors"
          >
            {isOpen ? (
              <ChevronDown className="h-5 w-5 text-gray-500 dark:text-gray-400" />
            ) : (
              <ChevronRight className="h-5 w-5 text-gray-500 dark:text-gray-400" />
            )}
          </button>
        </div>
        {isOpen && (
          <div className="space-y-3">
            {categories.map((category) => {
              const categoryId = category._id || category.id;
              if (!categoryId) return null;
              
              return (
                <button
                  key={categoryId}
                  onClick={() => handleCategoryClick(category)}
                  className={`w-full text-left px-4 py-3 rounded-lg text-base font-medium flex items-center transition-all duration-200 ${
                    selectedCategory === categoryId
                      ? "bg-blue-500 dark:bg-blue-600 text-white shadow-md shadow-blue-500/10"
                      : "text-gray-700 dark:text-gray-200 hover:bg-gray-200/70 dark:hover:bg-gray-800/70 backdrop-blur-sm"
                  }`}
                >
                  <motion.div
                    initial={{ x: -10, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: categories.indexOf(category) * 0.1 }}
                    className="flex items-center w-full"
                  >
                    {/* 根据分类名称添加自定义图标 */}
                    {category.icon ? (
                      <div className="h-7 w-7 mr-3 rounded-md overflow-hidden flex items-center justify-center bg-white/20 dark:bg-white/10 backdrop-blur-sm">
                        <img src={category.icon} alt={category.name} className="h-5 w-5 object-contain" />
                      </div>
                    ) : (
                      <div className={`h-7 w-7 mr-3 flex items-center justify-center rounded-md ${
                        selectedCategory === categoryId 
                          ? "bg-white/20 text-white" 
                          : "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                      }`}>
                        {category.name.charAt(0).toUpperCase()}
                      </div>
                    )}
                    {category.name}
                  </motion.div>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
} 