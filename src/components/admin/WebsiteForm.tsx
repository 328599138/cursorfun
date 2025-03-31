"use client";

import React, { useState, useEffect } from 'react';
import { WebsiteFormData, Category } from '@/types';
import { ScrapedWebsiteInfo } from '@/lib/scraper';
import { useRouter } from 'next/navigation';

interface WebsiteFormProps {
  websiteId?: string;
}

const WebsiteForm: React.FC<WebsiteFormProps> = ({ websiteId }) => {
  const router = useRouter();
  const [formData, setFormData] = useState<WebsiteFormData>({
    name: '',
    url: '',
    description: '',
    icon: '',
    category: '',
  });
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  useEffect(() => {
    fetchCategories();
    if (websiteId) {
      fetchWebsiteData();
    }
  }, [websiteId]);
  
  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/categories');
      if (!response.ok) throw new Error('获取分类列表失败');
      const data = await response.json();
      setCategories(data);
      
      // 如果没有选择分类，默认选择第一个分类
      if (!formData.category && data.length > 0) {
        setFormData(prev => ({ ...prev, category: data[0].name }));
      }
    } catch (err) {
      setError('获取分类列表失败');
      console.error('获取分类列表失败:', err);
    }
  };
  
  const fetchWebsiteData = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`/api/websites/${websiteId}`);
      if (!response.ok) throw new Error('获取网站信息失败');
      const data = await response.json();
      setFormData({
        name: data.name || '',
        url: data.url || '',
        description: data.description || '',
        icon: data.icon || '',
        category: data.category || '',
      });
    } catch (err) {
      setError('获取网站信息失败');
      console.error('获取网站信息失败:', err);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const url = websiteId ? `/api/websites/${websiteId}` : '/api/websites';
      const method = websiteId ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || '保存失败');
      }

      router.push('/admin/websites');
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : '保存网站信息失败');
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleFetchInfo = async () => {
    if (!formData.url) {
      setError('请输入网站链接');
      return;
    }
    
    setIsLoading(true);
    setError('');
    
    try {
      const response = await fetch('/api/scrape', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url: formData.url }),
      });
      
      if (!response.ok) {
        throw new Error('抓取网站信息失败');
      }
      
      const websiteInfo: ScrapedWebsiteInfo = await response.json();
      
      setFormData(prev => ({
        ...prev,
        name: websiteInfo.title,
        description: websiteInfo.description,
        icon: websiteInfo.icon,
      }));
    } catch (err) {
      setError(err instanceof Error ? err.message : '抓取网站信息失败');
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <form onSubmit={handleFormSubmit} className="space-y-6">
      <div className="space-y-4">
        <div>
          <label htmlFor="url" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            网站链接 *
          </label>
          <div className="flex">
            <input
              type="url"
              id="url"
              name="url"
              value={formData.url}
              onChange={handleInputChange}
              placeholder="https://example.com"
              className="flex-1 rounded-l-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-4 py-2 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
            <button
              type="button"
              onClick={handleFetchInfo}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-r-md transition-colors"
              disabled={isLoading}
            >
              {isLoading ? "获取中..." : "获取信息"}
            </button>
          </div>
          {error && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{error}</p>}
        </div>
        
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            网站名称 *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="网站名称"
            className="w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-4 py-2 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>
        
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            网站描述 *
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            rows={3}
            placeholder="网站描述"
            className="w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-4 py-2 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>
        
        <div>
          <label htmlFor="icon" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            图标链接 *
          </label>
          <input
            type="text"
            id="icon"
            name="icon"
            value={formData.icon}
            onChange={handleInputChange}
            placeholder="/icons/placeholder.svg"
            className="w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-4 py-2 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
          {formData.icon && (
            <div className="mt-2 flex items-center">
              <span className="mr-2 text-sm text-gray-500 dark:text-gray-400">图标预览:</span>
              <img
                src={formData.icon}
                alt="图标预览"
                className="h-10 w-10 object-contain border border-gray-200 dark:border-gray-700 rounded"
                onError={(e) => {
                  e.currentTarget.src = '/icons/placeholder.svg';
                }}
              />
            </div>
          )}
        </div>
        
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            分类 *
          </label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            className="w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-4 py-2 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          >
            <option value="">请选择分类</option>
            {categories.map((category) => (
              <option key={category._id} value={category.name}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      
      <div className="flex justify-end">
        <button
          type="submit"
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md transition-colors"
          disabled={isLoading}
        >
          {isLoading ? "提交中..." : websiteId ? "更新网站" : "添加网站"}
        </button>
      </div>
    </form>
  );
};

export default WebsiteForm; 