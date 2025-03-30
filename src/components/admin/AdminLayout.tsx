"use client";

import { ReactNode, useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { FiHome, FiGrid, FiList, FiLogOut, FiMenu, FiX } from 'react-icons/fi';
import { isAuthenticated as checkAuth } from '@/lib/auth';

interface AdminLayoutProps {
  children: ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAuth, setIsAuth] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // 客户端检查认证状态
    const verifyAuth = () => {
      const token = localStorage.getItem('adminAuthToken');
      const authValid = token ? checkAuth(token) : false;

      setIsAuth(authValid);
      setIsCheckingAuth(false);

      // 如果未认证且不在登录页，重定向到登录页
      if (!authValid && pathname !== '/admin/login') {
        router.push('/admin/login');
      }
    };

    verifyAuth();
  }, [pathname, router]);

  // 处理注销
  const handleLogout = () => {
    localStorage.removeItem('adminAuthToken');
    router.push('/admin/login');
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // 如果正在检查认证状态，显示加载中
  if (isCheckingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <p className="text-gray-600 dark:text-gray-400">加载中...</p>
        </div>
      </div>
    );
  }

  // 如果是登录页，直接返回内容
  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  // 如果未认证，也不需要显示任何内容，因为已经有重定向逻辑
  if (!isAuth) {
    return null;
  }

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      {/* 侧边栏 - 桌面 */}
      <aside className="hidden md:flex flex-col w-72 min-h-screen bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 shadow-md">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            管理后台
          </h1>
        </div>
        <nav className="flex-1 pt-6">
          <Link
            href="/admin"
            className={`flex items-center px-6 py-4 text-lg mb-2 transition-colors duration-200 ${
              pathname === '/admin'
                ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20'
                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-900/10'
            }`}
          >
            <FiHome className="mr-4 h-6 w-6" />
            <span>仪表盘</span>
          </Link>
          <Link
            href="/admin/categories"
            className={`flex items-center px-6 py-4 text-lg mb-2 transition-colors duration-200 ${
              pathname === '/admin/categories'
                ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20'
                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-900/10'
            }`}
          >
            <FiGrid className="mr-4 h-6 w-6" />
            <span>分类管理</span>
          </Link>
          <Link
            href="/admin/websites"
            className={`flex items-center px-6 py-4 text-lg mb-2 transition-colors duration-200 ${
              pathname === '/admin/websites'
                ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20'
                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-900/10'
            }`}
          >
            <FiList className="mr-4 h-6 w-6" />
            <span>网站管理</span>
          </Link>
        </nav>
        <div className="p-6 border-t border-gray-200 dark:border-gray-700">
          <button
            onClick={handleLogout}
            className="flex items-center w-full px-6 py-3 text-lg text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-900/10 rounded-md transition-colors duration-200"
          >
            <FiLogOut className="mr-4 h-6 w-6" />
            <span>注销</span>
          </button>
        </div>
      </aside>

      {/* 主内容 */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* 顶部导航 - 移动端 */}
        <header className="md:hidden bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between p-4">
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">
              管理后台
            </h1>
            <button
              onClick={toggleMobileMenu}
              className="p-2 rounded-md text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              {isMobileMenuOpen ? (
                <FiX className="h-6 w-6" />
              ) : (
                <FiMenu className="h-6 w-6" />
              )}
            </button>
          </div>
        </header>

        {/* 移动端菜单 */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
            <nav className="px-4 pt-3 pb-5">
              <Link
                href="/admin"
                className={`flex items-center px-5 py-4 text-lg rounded-md mb-2 transition-colors duration-200 ${
                  pathname === '/admin'
                    ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-900/10'
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <FiHome className="mr-4 h-6 w-6" />
                <span>仪表盘</span>
              </Link>
              <Link
                href="/admin/categories"
                className={`flex items-center px-5 py-4 text-lg rounded-md mb-2 transition-colors duration-200 ${
                  pathname === '/admin/categories'
                    ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-900/10'
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <FiGrid className="mr-4 h-6 w-6" />
                <span>分类管理</span>
              </Link>
              <Link
                href="/admin/websites"
                className={`flex items-center px-5 py-4 text-lg rounded-md mb-2 transition-colors duration-200 ${
                  pathname === '/admin/websites'
                    ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-900/10'
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <FiList className="mr-4 h-6 w-6" />
                <span>网站管理</span>
              </Link>
              <button
                onClick={() => {
                  handleLogout();
                  setIsMobileMenuOpen(false);
                }}
                className="flex items-center w-full px-5 py-4 text-lg text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-900/10 rounded-md transition-colors duration-200"
              >
                <FiLogOut className="mr-4 h-6 w-6" />
                <span>注销</span>
              </button>
            </nav>
          </div>
        )}

        {/* 内容区域 */}
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
} 