"use client";

import React, { useState } from "react";
import { useDB } from "@/lib/db";
import { Button, Input, Table, TableBody, TableCell, TableHead, TableHeader, TableRow, Card } from "@/components/admin/ui";

export default function CategoriesPage() {
  const { categories, addCategory, updateCategory, deleteCategory } = useDB();
  const [newCategory, setNewCategory] = useState({
    name: "",
    description: "",
    icon: "",
    slug: "",
    order: 0,
  });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState({
    name: "",
    description: "",
    icon: "",
    slug: "",
    order: 0,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  // 验证表单
  const validateForm = (data: typeof newCategory) => {
    const errors: Record<string, string> = {};
    if (!data.name.trim()) errors.name = "分类名称不能为空";
    if (!data.slug.trim()) errors.slug = "分类标识不能为空";
    if (data.slug.trim() && !/^[a-z0-9-]+$/.test(data.slug)) {
      errors.slug = "分类标识只能包含小写字母、数字和连字符";
    }
    
    // 检查slug是否重复
    const existingCategory = categories.find(
      c => c.slug === data.slug && (editingId ? c.id !== editingId : true)
    );
    if (existingCategory) {
      errors.slug = "分类标识已存在";
    }

    return errors;
  };

  // 添加分类
  const handleAddCategory = (e: React.FormEvent) => {
    e.preventDefault();
    
    const validationErrors = validateForm(newCategory);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    
    addCategory({
      ...newCategory,
      order: Number(newCategory.order),
    });
    
    setNewCategory({
      name: "",
      description: "",
      icon: "",
      slug: "",
      order: 0,
    });
    setErrors({});
  };

  // 开始编辑
  const handleEdit = (id: string) => {
    const category = categories.find(c => c.id === id);
    if (!category) return;
    
    setEditingId(id);
    setEditForm({
      name: category.name,
      description: category.description || "",
      icon: category.icon || "",
      slug: category.slug,
      order: category.order || 0,
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
    
    updateCategory(editingId, {
      ...editForm,
      order: Number(editForm.order),
    });
    
    setEditingId(null);
    setEditForm({
      name: "",
      description: "",
      icon: "",
      slug: "",
      order: 0,
    });
    setErrors({});
  };

  // 取消编辑
  const handleCancelEdit = () => {
    setEditingId(null);
    setErrors({});
  };

  // 删除分类
  const handleDelete = (id: string) => {
    if (window.confirm("确定要删除此分类吗？相关的导航项将成为未分类状态。")) {
      deleteCategory(id);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">分类管理</h1>
        <p className="text-muted-foreground">
          管理网站导航的分类信息
        </p>
      </div>

      <Card title="添加新分类">
        <form onSubmit={handleAddCategory} className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Input
              label="分类名称"
              placeholder="输入分类名称"
              value={newCategory.name}
              onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
              error={errors.name}
            />
            <Input
              label="分类标识"
              placeholder="输入分类标识 (如: rules)"
              value={newCategory.slug}
              onChange={(e) => setNewCategory({ ...newCategory, slug: e.target.value })}
              error={errors.slug}
            />
            <Input
              label="图标"
              placeholder="输入图标 (如: 📚)"
              value={newCategory.icon}
              onChange={(e) => setNewCategory({ ...newCategory, icon: e.target.value })}
            />
            <Input
              label="排序"
              type="number"
              placeholder="输入排序数字 (数字越小越靠前)"
              value={newCategory.order.toString()}
              onChange={(e) => setNewCategory({ ...newCategory, order: parseInt(e.target.value) || 0 })}
            />
          </div>
          <Input
            label="描述"
            placeholder="输入分类描述"
            value={newCategory.description}
            onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
          />
          <div className="flex justify-end">
            <Button type="submit">添加分类</Button>
          </div>
        </form>
      </Card>

      <Card title="分类列表">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>名称</TableHead>
                <TableHead>标识</TableHead>
                <TableHead>图标</TableHead>
                <TableHead>描述</TableHead>
                <TableHead>排序</TableHead>
                <TableHead className="text-right">操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {categories.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-4">
                    暂无分类数据
                  </TableCell>
                </TableRow>
              ) : (
                categories.map((category) => (
                  <TableRow key={category.id}>
                    <TableCell className="font-medium">{category.id}</TableCell>
                    <TableCell>
                      {editingId === category.id ? (
                        <Input
                          value={editForm.name}
                          onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                          error={errors.name}
                        />
                      ) : (
                        category.name
                      )}
                    </TableCell>
                    <TableCell>
                      {editingId === category.id ? (
                        <Input
                          value={editForm.slug}
                          onChange={(e) => setEditForm({ ...editForm, slug: e.target.value })}
                          error={errors.slug}
                        />
                      ) : (
                        category.slug
                      )}
                    </TableCell>
                    <TableCell>
                      {editingId === category.id ? (
                        <Input
                          value={editForm.icon}
                          onChange={(e) => setEditForm({ ...editForm, icon: e.target.value })}
                        />
                      ) : (
                        category.icon
                      )}
                    </TableCell>
                    <TableCell>
                      {editingId === category.id ? (
                        <Input
                          value={editForm.description}
                          onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                        />
                      ) : (
                        category.description
                      )}
                    </TableCell>
                    <TableCell>
                      {editingId === category.id ? (
                        <Input
                          type="number"
                          value={editForm.order.toString()}
                          onChange={(e) => setEditForm({ ...editForm, order: parseInt(e.target.value) || 0 })}
                        />
                      ) : (
                        category.order
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      {editingId === category.id ? (
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
                          <Button onClick={() => handleEdit(category.id)} variant="outline">
                            编辑
                          </Button>
                          <Button
                            onClick={() => handleDelete(category.id)}
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