"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FiGrid, FiList, FiPlusCircle, FiExternalLink, FiBarChart2, FiAlertTriangle } from 'react-icons/fi';
import AdminLayout from '@/components/admin/AdminLayout';

interface DashboardStats {
  categories: number;
  websites: number;
}

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<DashboardStats>({ categories: 0, websites: 0 });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [errorDetails, setErrorDetails] = useState('');

  useEffect(() => {
    // 客户端认证检查已经在 AdminLayout 组件中处理
    // 这里的代码不会执行，除非用户已经认证

    const fetchStats = async () => {
      try {
        setIsLoading(true);
        setError('');
        setErrorDetails('');
        
        // 获取分类数量
        const categoriesResponse = await fetch('/api/categories');
        if (!categoriesResponse.ok) {
          const errorData = await categoriesResponse.json();
          throw new Error(errorData.error || '获取分类数据失败', { 
            cause: errorData.details 
          });
        }
        const categoriesData = await categoriesResponse.json();

        // 获取网站数量
        const websitesResponse = await fetch('/api/websites');
        if (!websitesResponse.ok) {
          const errorData = await websitesResponse.json();
          throw new Error(errorData.error || '获取网站数据失败', {
            cause: errorData.details
          });
        }
        const websitesData = await websitesResponse.json();

        setStats({
          categories: categoriesData.length,
          websites: websitesData.length,
        });
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : '获取统计数据失败';
        const errorDetails = err instanceof Error && err.cause ? String(err.cause) : '';
        
        setError(errorMessage);
        setErrorDetails(errorDetails);
        
        // 如果无法获取数据，设置默认值为0
        setStats({ categories: 0, websites: 0 });
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <AdminLayout>
      <div className="p-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">仪表盘</h1>

        {/* 错误提示 */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md">
            <div className="flex items-start">
              <FiAlertTriangle className="mt-0.5 h-5 w-5 text-red-600 dark:text-red-400" />
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-600 dark:text-red-400">{error}</h3>
                {errorDetails && (
                  <div className="mt-2">
                    <p className="text-sm text-red-500 dark:text-red-300">{errorDetails}</p>
                  </div>
                )}
                <div className="mt-3">
                  <h4 className="text-sm font-medium text-red-600 dark:text-red-400">可能的解决方案:</h4>
                  <ul className="mt-1 list-disc list-inside text-sm text-red-500 dark:text-red-300">
                    <li>确保MongoDB服务正在运行</li>
                    <li>检查.env.local文件中的MONGODB_URI配置</li>
                    <li>运行 <code className="px-1 py-0.5 bg-red-100 dark:bg-red-900/30 rounded">npm run seed</code> 初始化数据库</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 统计卡片 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 border-l-4 border-indigo-500">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-300">
                <FiGrid className="h-6 w-6" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">分类总数</p>
                {isLoading ? (
                  <div className="h-8 w-16 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                ) : (
                  <p className="text-2xl font-semibold text-gray-900 dark:text-white">{stats.categories}</p>
                )}
              </div>
            </div>
            <div className="mt-4">
              <Link
                href="/admin/categories"
                className="text-sm text-indigo-600 dark:text-indigo-400 hover:underline flex items-center"
              >
                管理分类 <FiExternalLink className="ml-1 h-3 w-3" />
              </Link>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 border-l-4 border-blue-500">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300">
                <FiList className="h-6 w-6" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">网站总数</p>
                {isLoading ? (
                  <div className="h-8 w-16 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                ) : (
                  <p className="text-2xl font-semibold text-gray-900 dark:text-white">{stats.websites}</p>
                )}
              </div>
            </div>
            <div className="mt-4">
              <Link
                href="/admin/websites"
                className="text-sm text-blue-600 dark:text-blue-400 hover:underline flex items-center"
              >
                管理网站 <FiExternalLink className="ml-1 h-3 w-3" />
              </Link>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 border-l-4 border-green-500">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-300">
                <FiBarChart2 className="h-6 w-6" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">平均网站/分类</p>
                {isLoading ? (
                  <div className="h-8 w-16 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                ) : (
                  <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                    {stats.categories ? (stats.websites / stats.categories).toFixed(1) : '0'}
                  </p>
                )}
              </div>
            </div>
            <div className="mt-4">
              <Link
                href="/"
                className="text-sm text-green-600 dark:text-green-400 hover:underline flex items-center"
              >
                查看前台 <FiExternalLink className="ml-1 h-3 w-3" />
              </Link>
            </div>
          </div>
        </div>

        {/* 快捷操作 */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">快捷操作</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <Link
              href="/admin/categories"
              className="flex items-center p-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-colors"
            >
              <div className="p-2 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-300">
                <FiGrid className="h-5 w-5" />
              </div>
              <div className="ml-3">
                <p className="font-medium text-gray-900 dark:text-white">管理分类</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">添加、编辑或删除分类</p>
              </div>
            </Link>

            <Link
              href="/admin/websites"
              className="flex items-center p-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
            >
              <div className="p-2 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300">
                <FiList className="h-5 w-5" />
              </div>
              <div className="ml-3">
                <p className="font-medium text-gray-900 dark:text-white">管理网站</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">添加、编辑或删除网站</p>
              </div>
            </Link>

            <Link
              href="/admin/websites"
              className="flex items-center p-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50 hover:bg-green-50 dark:hover:bg-green-900/20 transition-colors"
            >
              <div className="p-2 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-300">
                <FiPlusCircle className="h-5 w-5" />
              </div>
              <div className="ml-3">
                <p className="font-medium text-gray-900 dark:text-white">添加网站</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">利用自动抓取功能快速添加</p>
              </div>
            </Link>
          </div>
        </div>

        {/* 系统信息 */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">系统信息</h2>

          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">系统状态</h3>
              <div className="flex items-center">
                {error ? (
                  <>
                    <div className="h-3 w-3 rounded-full bg-red-500 mr-2"></div>
                    <p className="text-red-600 dark:text-red-400">数据库连接异常</p>
                  </>
                ) : (
                  <>
                    <div className="h-3 w-3 rounded-full bg-green-500 mr-2"></div>
                    <p className="text-gray-900 dark:text-white">正常运行中</p>
                  </>
                )}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">版本信息</h3>
              <p className="text-gray-900 dark:text-white">CursorFun 管理系统 v1.0.0</p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">开发者</h3>
              <p className="text-gray-900 dark:text-white">
                <a 
                  href="https://github.com/328599138" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-indigo-600 dark:text-indigo-400 hover:underline"
                >
                  GitHub: 328599138
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
} 