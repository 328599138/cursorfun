"use client";

import { useState, useEffect, Suspense } from 'react';
import { Website, Category } from '@/types';
import AdminLayout from '@/components/admin/AdminLayout';
import WebsiteForm from '@/components/admin/WebsiteForm';
import { FiEdit2, FiTrash2, FiSearch, FiLink } from 'react-icons/fi';
import { useSearchParams, useRouter } from 'next/navigation';

export default function WebsitesPage() {
  const [websites, setWebsites] = useState<Website[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedWebsite, setSelectedWebsite] = useState<Website | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState('');
  
  const searchParams = useSearchParams();
  const websiteId = searchParams.get('edit') || undefined;
  const router = useRouter();
  
  const fetchWebsites = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/websites');
      if (!response.ok) {
        throw new Error('获取网站列表失败');
      }
      const data = await response.json();
      setWebsites(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : '获取网站列表失败');
    } finally {
      setIsLoading(false);
    }
  };
  
  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/categories');
      if (!response.ok) {
        throw new Error('获取分类列表失败');
      }
      const data = await response.json();
      setCategories(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : '获取分类列表失败');
    }
  };
  
  useEffect(() => {
    fetchCategories();
    fetchWebsites();
  }, []);
  
  const handleDeleteWebsite = async (websiteId: string) => {
    try {
      const response = await fetch(`/api/websites/${websiteId}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || '删除网站失败');
      }
      
      // 重新获取网站列表
      await fetchWebsites();
      
      // 关闭弹窗
      setIsDeleteModalOpen(false);
      setSelectedWebsite(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : '删除网站失败');
    }
  };
  
  const getCategoryName = (category: string) => {
    return category || '未分类';
  };
  
  const filteredWebsites = websites.filter((website) => {
    if (!website) return false;
    const query = searchQuery.toLowerCase();
    return (
      (website.name?.toLowerCase() || '').includes(query) ||
      (website.description?.toLowerCase() || '').includes(query) ||
      (website.url?.toLowerCase() || '').includes(query) ||
      (website.category?.toLowerCase() || '').includes(query)
    );
  });
  
  return (
    <AdminLayout>
      <div className="p-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">网站管理</h1>
        
        {error && (
          <div className="mb-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md text-red-600 dark:text-red-400">
            {error}
          </div>
        )}
        
        <div className="mb-6">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="搜索网站..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>
        
        <div className="mb-8 bg-gray-50 dark:bg-gray-800/50 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            {websiteId ? '编辑网站' : '添加新网站'}
          </h2>
          
          <Suspense fallback={<div>加载中...</div>}>
            <WebsiteForm websiteId={websiteId} />
          </Suspense>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
          <h2 className="p-4 text-xl font-semibold text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700">
            网站列表
          </h2>
          
          {isLoading ? (
            <div className="p-8 text-center text-gray-500 dark:text-gray-400">
              加载中...
            </div>
          ) : filteredWebsites.length === 0 ? (
            <div className="p-8 text-center text-gray-500 dark:text-gray-400">
              没有找到网站
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full table-auto">
                <thead className="bg-gray-50 dark:bg-gray-900/50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      网站
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      分类
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      链接
                    </th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      操作
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {filteredWebsites.map((website) => (
                    <tr key={website._id.toString()} className="hover:bg-gray-50 dark:hover:bg-gray-800/80">
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <img
                            src={website.icon}
                            alt={website.name}
                            className="h-10 w-10 rounded-full object-contain bg-gray-100 dark:bg-gray-800"
                            onError={(e) => {
                              e.currentTarget.src = '/icons/placeholder.svg';
                            }}
                          />
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900 dark:text-white">
                              {website.name}
                            </div>
                            <div className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2">
                              {website.description}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <span className="px-2 py-1 text-xs rounded-full bg-indigo-50 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300">
                          {getCategoryName(website.category)}
                        </span>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm">
                        <a
                          href={website.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center text-indigo-600 dark:text-indigo-400 hover:underline"
                        >
                          <FiLink className="mr-1" />
                          访问
                        </a>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={() => router.push(`/admin/websites?edit=${website._id}`)}
                          className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-900 mr-4 cursor-pointer"
                        >
                          <FiEdit2 className="inline-block" />
                          <span className="sr-only">编辑</span>
                        </button>
                        <button
                          onClick={() => {
                            setSelectedWebsite(website);
                            setIsDeleteModalOpen(true);
                          }}
                          className="text-red-600 dark:text-red-400 hover:text-red-900 cursor-pointer"
                        >
                          <FiTrash2 className="inline-block" />
                          <span className="sr-only">删除</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
      
      {isDeleteModalOpen && selectedWebsite && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 max-w-md w-full">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
              确认删除
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              您确定要删除 <span className="font-medium">{selectedWebsite.name}</span> 吗？此操作无法撤销。
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                取消
              </button>
              <button
                onClick={() => handleDeleteWebsite(selectedWebsite._id)}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                删除
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
} 