"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { verifyAdminPassword, createAuthToken } from '@/lib/auth';
import Link from 'next/link';

export default function AdminLoginPage() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // 验证密码
      if (verifyAdminPassword(password)) {
        // 创建认证令牌并存储到本地存储
        const token = createAuthToken();
        localStorage.setItem('adminAuthToken', token);
        
        // 重定向到管理页面
        router.push('/admin');
      } else {
        setError('密码不正确');
      }
    } catch (err) {
      setError('登录失败，请重试');
      console.error('登录错误:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
            管理员登录
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
            请输入管理员密码
          </p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="password" className="sr-only">
                密码
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white bg-white dark:bg-gray-800 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="管理员密码"
              />
            </div>
          </div>

          {error && (
            <div className="text-sm text-red-600 dark:text-red-400 text-center">
              {error}
            </div>
          )}

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? '登录中...' : '登录'}
            </button>
          </div>
          
          <div className="text-sm text-center">
            <Link 
              href="/" 
              className="font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-500"
            >
              返回首页
            </Link>
          </div>
        </form>
        
        <div className="text-xs text-gray-500 dark:text-gray-400 text-center mt-8">
          <p>提示：默认密码为 admin123456</p>
          <p className="mt-1">仅管理员可访问</p>
        </div>
      </div>
    </div>
  );
} 