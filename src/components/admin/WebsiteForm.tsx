"use client";

import React, { useState } from 'react';
import { WebsiteFormData, Category } from '@/types';
import { ScrapedWebsiteInfo } from '@/lib/scraper';

interface WebsiteFormProps {
  initialData?: WebsiteFormData;
  categories: Category[];
  onSubmit: (data: WebsiteFormData) => void;
  isSubmitting: boolean;
}

const WebsiteForm: React.FC<WebsiteFormProps> = ({
  initialData,
  categories,
  onSubmit,
  isSubmitting
}) => {
  const [formData, setFormData] = useState<WebsiteFormData>({
    name: initialData?.name || '',
    url: initialData?.url || '',
    description: initialData?.description || '',
    icon: initialData?.icon || '',
    categoryId: initialData?.categoryId || (categories[0]?.id || ''),
  });
  
  const [urlInput, setUrlInput] = useState(initialData?.url || '');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };
  
  const handleFetchInfo = async () => {
    if (!urlInput) {
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
        body: JSON.stringify({ url: urlInput }),
      });
      
      if (!response.ok) {
        throw new Error('抓取网站信息失败');
      }
      
      const websiteInfo: ScrapedWebsiteInfo = await response.json();
      
      setFormData({
        name: websiteInfo.title,
        url: websiteInfo.url,
        description: websiteInfo.description,
        icon: websiteInfo.icon,
        categoryId: formData.categoryId,
      });
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
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
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
          <label htmlFor="categoryId" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            分类 *
          </label>
          <select
            id="categoryId"
            name="categoryId"
            value={formData.categoryId}
            onChange={handleInputChange}
            className="w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-4 py-2 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          >
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
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
          disabled={isSubmitting}
        >
          {isSubmitting ? "提交中..." : initialData ? "更新网站" : "添加网站"}
        </button>
      </div>
    </form>
  );
};

export default WebsiteForm; 