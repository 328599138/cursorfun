"use client";

import { useState, useEffect } from 'react';
import { Category, CategoryFormData } from '@/types';
import AdminLayout from '@/components/admin/AdminLayout';
import CategoryForm from '@/components/admin/CategoryForm';
import { FiEdit2, FiTrash2, FiArrowUp, FiArrowDown, FiPlus } from 'react-icons/fi';

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentCategory, setCurrentCategory] = useState<Category | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  
  const fetchCategories = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/categories');
      if (!response.ok) {
        throw new Error('获取分类列表失败');
      }
      const data = await response.json();
      setCategories(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : '获取分类列表失败');
    } finally {
      setIsLoading(false);
    }
  };
  
  useEffect(() => {
    fetchCategories();
  }, []);
  
  const handleAddCategory = async (formData: CategoryFormData) => {
    try {
      setIsSubmitting(true);
      const response = await fetch('/api/categories', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || '添加分类失败');
      }
      
      // 重新获取分类列表
      await fetchCategories();
      
      // 重置表单
      setSelectedCategory(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : '添加分类失败');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleUpdateCategory = async (formData: CategoryFormData) => {
    if (!selectedCategory?._id) return;
    
    try {
      setIsSubmitting(true);
      const response = await fetch(`/api/categories/${selectedCategory._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || '更新分类失败');
      }
      
      // 重新获取分类列表
      await fetchCategories();
      
      // 重置表单
      setSelectedCategory(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : '更新分类失败');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleDeleteCategory = async (id: string) => {
    try {
      setIsDeleting(true);
      const response = await fetch(`/api/categories/${id}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        // 尝试解析错误响应
        let errorMessage = '删除分类失败';
        try {
          const errorData = await response.json();
          errorMessage = errorData.error || errorMessage;
        } catch (e) {
          console.error('解析错误响应失败:', e);
        }
        console.error(`删除分类请求失败: ${response.status} ${response.statusText}`);
        throw new Error(errorMessage);
      }
      
      // 重新获取分类列表
      await fetchCategories();
      
      // 关闭弹窗
      setCategoryToDelete(null);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : '删除分类失败';
      console.error('删除分类错误:', errorMessage);
      setError(errorMessage);
    } finally {
      setIsDeleting(false);
    }
  };
  
  const handleReorderCategory = async (category: Category, direction: 'up' | 'down') => {
    const currentIndex = categories.findIndex((c) => c._id === category._id);
    const targetIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;
    
    // 检查边界条件
    if (targetIndex < 0 || targetIndex >= categories.length) {
      return;
    }
    
    const targetCategory = categories[targetIndex];
    
    try {
      // 交换两个分类的order值
      const updateCurrentCategory = fetch(`/api/categories/${category._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ order: targetCategory.order }),
      });
      
      const updateTargetCategory = fetch(`/api/categories/${targetCategory._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ order: category.order }),
      });
      
      await Promise.all([updateCurrentCategory, updateTargetCategory]);
      
      // 重新获取分类列表
      await fetchCategories();
    } catch (err) {
      setError(err instanceof Error ? err.message : '排序分类失败');
    }
  };
  
  const sortedCategories = [...categories].sort((a, b) => a.order - b.order);
  
  const handleFormSubmit = async (formData: Partial<Category>) => {
    try {
      setIsLoading(true);
      
      const isEditing = !!currentCategory;
      const endpoint = isEditing 
        ? `/api/categories/${currentCategory?._id}` 
        : '/api/categories';
      
      const response = await fetch(endpoint, {
        method: isEditing ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || '操作失败');
      }

      // 刷新分类列表
      await fetchCategories();
      
      // 关闭模态框并重置当前编辑的分类
      setIsModalOpen(false);
      setCurrentCategory(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : '操作失败');
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditCategory = (category: Category) => {
    setCurrentCategory(category);
    setIsModalOpen(true);
  };

  const confirmDelete = (id: string) => {
    setCategoryToDelete(id);
  };

  const cancelDelete = () => {
    setCategoryToDelete(null);
  };

  const filteredCategories = categories.filter(category => 
    category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    category.description.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return (
    <AdminLayout>
      <div className="p-6">
        <div className="mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            分类管理
          </h1>
          <button
            onClick={() => {
              setCurrentCategory(null);
              setIsModalOpen(true);
            }}
            className="flex items-center px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md transition-colors"
          >
            <FiPlus className="mr-2 h-4 w-4" />
            添加分类
          </button>
        </div>
        
        {/* 错误提示 */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md text-red-600 dark:text-red-400">
            {error}
          </div>
        )}
        
        {/* 搜索框 */}
        <div className="mb-6">
          <input
            type="search"
            placeholder="搜索分类..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full max-w-md px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        
        {/* 分类列表 */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
          <h2 className="p-4 text-xl font-semibold text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700">
            分类列表
          </h2>
          
          {isLoading ? (
            <div className="p-8 text-center text-gray-500 dark:text-gray-400">
              加载中...
            </div>
          ) : filteredCategories.length === 0 ? (
            <div className="p-8 text-center text-gray-500 dark:text-gray-400">
              没有找到分类
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full table-auto">
                <thead className="bg-gray-50 dark:bg-gray-900/50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      名称
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      描述
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      图标
                    </th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      操作
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {filteredCategories.map((category) => (
                    <tr key={category._id} className="hover:bg-gray-50 dark:hover:bg-gray-900/50">
                      <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                        {category.name}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">
                        {category.description}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">
                        <div className="flex items-center space-x-2">
                          <div className="h-8 w-8 flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-md overflow-hidden">
                            {category.icon ? (
                              <img 
                                src={category.icon} 
                                alt={category.name} 
                                className="h-6 w-6 object-contain"
                              />
                            ) : (
                              <span className="text-gray-400">无</span>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-medium">
                        {categoryToDelete === category._id ? (
                          <div className="flex items-center justify-end space-x-2">
                            <span className="text-gray-500 dark:text-gray-400 text-xs">确认删除?</span>
                            <button
                              onClick={() => handleDeleteCategory(category._id)}
                              className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300"
                              disabled={isDeleting}
                            >
                              {isDeleting ? '删除中...' : '是'}
                            </button>
                            <button
                              onClick={cancelDelete}
                              className="text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-300"
                              disabled={isDeleting}
                            >
                              否
                            </button>
                          </div>
                        ) : (
                          <div className="flex items-center justify-end space-x-3">
                            <button
                              onClick={() => handleEditCategory(category)}
                              className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300"
                            >
                              <FiEdit2 className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => confirmDelete(category._id)}
                              className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300"
                            >
                              <FiTrash2 className="h-4 w-4" />
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
      
      {/* 添加/编辑分类模态框 */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            {/* 背景遮罩 */}
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 dark:bg-gray-900 dark:bg-opacity-75 transition-opacity" aria-hidden="true" onClick={() => setIsModalOpen(false)}></div>

            {/* 居中 */}
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

            {/* 模态框内容 */}
            <div className="inline-block align-bottom bg-white dark:bg-gray-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white dark:bg-gray-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                    <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white" id="modal-title">
                      {currentCategory ? '编辑分类' : '添加分类'}
                    </h3>
                    <div className="mt-4">
                      <CategoryForm 
                        initialData={currentCategory || undefined}
                        onSubmit={handleFormSubmit}
                        onCancel={() => setIsModalOpen(false)}
                        isSubmitting={isLoading}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
} 