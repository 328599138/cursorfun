"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FiEdit2, FiTrash2, FiExternalLink } from 'react-icons/fi';

interface Website {
  _id: string;
  name: string;
  url: string;
  description: string;
  category: string;
}

export default function WebsiteListPage() {
  const router = useRouter();
  const [websites, setWebsites] = useState<Website[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchWebsites();
  }, []);

  const fetchWebsites = async () => {
    try {
      const response = await fetch('/api/websites');
      if (!response.ok) throw new Error('获取网站列表失败');
      const data = await response.json();
      setWebsites(data);
    } catch (err) {
      setError('获取网站列表失败');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (websiteId: string) => {
    router.push(`/admin/websites?edit=${websiteId}`);
  };

  const handleDelete = async (websiteId: string) => {
    if (!confirm('确定要删除这个网站吗？')) return;

    try {
      const response = await fetch(`/api/websites/${websiteId}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('删除网站失败');
      
      fetchWebsites();
    } catch (err) {
      setError('删除网站失败');
    }
  };

  if (loading) return <div>加载中...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">网站列表</h1>
        <button
          onClick={() => router.push('/admin/websites')}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          添加网站
        </button>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                网站名称
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                分类
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                描述
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                操作
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {websites.map((website) => (
              <tr key={website._id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="text-sm font-medium text-gray-900">
                      {website.name}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{website.category}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-500 line-clamp-2">
                    {website.description}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex justify-end space-x-2">
                    <a
                      href={website.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-gray-500"
                    >
                      <FiExternalLink className="w-5 h-5" />
                    </a>
                    <button
                      onClick={() => handleEdit(website._id)}
                      className="text-blue-600 hover:text-blue-700"
                    >
                      <FiEdit2 className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(website._id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <FiTrash2 className="w-5 h-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
} 
