"use client";

import React, { useState } from "react";
import { useDB } from "@/lib/db";
import { Button, Input, Textarea, Select, Table, TableBody, TableCell, TableHead, TableHeader, TableRow, Card } from "@/components/admin/ui";

export default function NavItemsPage() {
  const { navItems, categories, addNavItem, updateNavItem, deleteNavItem } = useDB();
  const [newNavItem, setNewNavItem] = useState({
    title: "",
    description: "",
    url: "",
    icon: "",
    categoryId: "",
    isHot: false,
    isNew: false,
    order: 0,
  });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState({
    title: "",
    description: "",
    url: "",
    icon: "",
    categoryId: "",
    isHot: false,
    isNew: false,
    order: 0,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  // 验证表单
  const validateForm = (data: typeof newNavItem) => {
    const errors: Record<string, string> = {};
    if (!data.title.trim()) errors.title = "导航项标题不能为空";
    if (!data.url.trim()) errors.url = "URL不能为空";
    if (!data.categoryId) errors.categoryId = "请选择分类";
    
    try {
      new URL(data.url);
    } catch (e) {
      errors.url = "请输入有效的URL";
    }

    return errors;
  };

  // 添加导航项
  const handleAddNavItem = (e: React.FormEvent) => {
    e.preventDefault();
    
    const validationErrors = validateForm(newNavItem);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    
    addNavItem({
      ...newNavItem,
      order: Number(newNavItem.order),
    });
    
    setNewNavItem({
      title: "",
      description: "",
      url: "",
      icon: "",
      categoryId: "",
      isHot: false,
      isNew: false,
      order: 0,
    });
    setErrors({});
  };

  // 开始编辑
  const handleEdit = (id: string) => {
    const navItem = navItems.find(item => item.id === id);
    if (!navItem) return;
    
    setEditingId(id);
    setEditForm({
      title: navItem.title,
      description: navItem.description || "",
      url: navItem.url,
      icon: navItem.icon || "",
      categoryId: navItem.categoryId,
      isHot: navItem.isHot || false,
      isNew: navItem.isNew || false,
      order: navItem.order || 0,
    });
  };

  // 保存编辑
  const handleSaveEdit = () => {
    if (!editingId) return;
    
    const validationErrors = validateForm(editForm);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    
    updateNavItem(editingId, {
      ...editForm,
      order: Number(editForm.order),
    });
    
    setEditingId(null);
    setEditForm({
      title: "",
      description: "",
      url: "",
      icon: "",
      categoryId: "",
      isHot: false,
      isNew: false,
      order: 0,
    });
    setErrors({});
  };

  // 取消编辑
  const handleCancelEdit = () => {
    setEditingId(null);
    setErrors({});
  };

  // 删除导航项
  const handleDelete = (id: string) => {
    if (window.confirm("确定要删除此导航项吗？")) {
      deleteNavItem(id);
    }
  };

  // 获取分类名称
  const getCategoryName = (id: string) => {
    const category = categories.find(c => c.id === id);
    return category ? category.name : "未分类";
  };

  // 分类选项
  const categoryOptions = categories.map(category => ({
    value: category.id,
    label: category.name,
  }));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">导航项管理</h1>
        <p className="text-muted-foreground">
          管理网站的导航链接
        </p>
      </div>

      <Card title="添加新导航项">
        <form onSubmit={handleAddNavItem} className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Input
              label="标题"
              placeholder="输入导航项标题"
              value={newNavItem.title}
              onChange={(e) => setNewNavItem({ ...newNavItem, title: e.target.value })}
              error={errors.title}
            />
            <Input
              label="URL"
              placeholder="输入URL (如: https://example.com)"
              value={newNavItem.url}
              onChange={(e) => setNewNavItem({ ...newNavItem, url: e.target.value })}
              error={errors.url}
            />
            <Input
              label="图标"
              placeholder="输入图标 (如: 🔗)"
              value={newNavItem.icon}
              onChange={(e) => setNewNavItem({ ...newNavItem, icon: e.target.value })}
            />
            <Select
              label="分类"
              options={categoryOptions}
              value={newNavItem.categoryId}
              onChange={(e) => setNewNavItem({ ...newNavItem, categoryId: e.target.value })}
              error={errors.categoryId}
            />
            <div className="flex items-center space-x-4">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={newNavItem.isHot}
                  onChange={(e) => setNewNavItem({ ...newNavItem, isHot: e.target.checked })}
                  className="rounded border-gray-300"
                />
                <span>热门</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={newNavItem.isNew}
                  onChange={(e) => setNewNavItem({ ...newNavItem, isNew: e.target.checked })}
                  className="rounded border-gray-300"
                />
                <span>新增</span>
              </label>
            </div>
            <Input
              label="排序"
              type="number"
              placeholder="输入排序数字 (数字越小越靠前)"
              value={newNavItem.order.toString()}
              onChange={(e) => setNewNavItem({ ...newNavItem, order: parseInt(e.target.value) || 0 })}
            />
          </div>
          <Textarea
            label="描述"
            placeholder="输入导航项描述"
            value={newNavItem.description}
            onChange={(e) => setNewNavItem({ ...newNavItem, description: e.target.value })}
          />
          <div className="flex justify-end">
            <Button type="submit">添加导航项</Button>
          </div>
        </form>
      </Card>

      <Card title="导航项列表">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>标题</TableHead>
                <TableHead>URL</TableHead>
                <TableHead>分类</TableHead>
                <TableHead>特性</TableHead>
                <TableHead>排序</TableHead>
                <TableHead className="text-right">操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {navItems.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-4">
                    暂无导航项数据
                  </TableCell>
                </TableRow>
              ) : (
                navItems.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.id}</TableCell>
                    <TableCell>
                      {editingId === item.id ? (
                        <Input
                          value={editForm.title}
                          onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                          error={errors.title}
                        />
                      ) : (
                        <div className="flex items-center space-x-2">
                          {item.icon && <span>{item.icon}</span>}
                          <span>{item.title}</span>
                        </div>
                      )}
                    </TableCell>
                    <TableCell>
                      {editingId === item.id ? (
                        <Input
                          value={editForm.url}
                          onChange={(e) => setEditForm({ ...editForm, url: e.target.value })}
                          error={errors.url}
                        />
                      ) : (
                        <a
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline dark:text-blue-400"
                        >
                          {item.url}
                        </a>
                      )}
                    </TableCell>
                    <TableCell>
                      {editingId === item.id ? (
                        <Select
                          options={categoryOptions}
                          value={editForm.categoryId}
                          onChange={(e) => setEditForm({ ...editForm, categoryId: e.target.value })}
                          error={errors.categoryId}
                        />
                      ) : (
                        getCategoryName(item.categoryId)
                      )}
                    </TableCell>
                    <TableCell>
                      {editingId === item.id ? (
                        <div className="flex items-center space-x-4">
                          <label className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              checked={editForm.isHot}
                              onChange={(e) => setEditForm({ ...editForm, isHot: e.target.checked })}
                              className="rounded border-gray-300"
                            />
                            <span>热门</span>
                          </label>
                          <label className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              checked={editForm.isNew}
                              onChange={(e) => setEditForm({ ...editForm, isNew: e.target.checked })}
                              className="rounded border-gray-300"
                            />
                            <span>新增</span>
                          </label>
                        </div>
                      ) : (
                        <div className="flex space-x-2">
                          {item.isHot && <span className="rounded-full bg-red-100 px-2 py-1 text-xs font-medium text-red-800 dark:bg-red-900/30 dark:text-red-300">热门</span>}
                          {item.isNew && <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800 dark:bg-green-900/30 dark:text-green-300">新增</span>}
                        </div>
                      )}
                    </TableCell>
                    <TableCell>
                      {editingId === item.id ? (
                        <Input
                          type="number"
                          value={editForm.order.toString()}
                          onChange={(e) => setEditForm({ ...editForm, order: parseInt(e.target.value) || 0 })}
                        />
                      ) : (
                        item.order
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      {editingId === item.id ? (
                        <div className="flex justify-end space-x-2">
                          <Button onClick={handleSaveEdit} variant="outline">
                            保存
                          </Button>
                          <Button onClick={handleCancelEdit} variant="outline">
                            取消
                          </Button>
                        </div>
                      ) : (
                        <div className="flex justify-end space-x-2">
                          <Button onClick={() => handleEdit(item.id)} variant="outline">
                            编辑
                          </Button>
                          <Button
                            onClick={() => handleDelete(item.id)}
                            variant="destructive"
                          >
                            删除
                          </Button>
                        </div>
                      )}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  );
} 