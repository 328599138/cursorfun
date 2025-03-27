"use client";

import { useState } from "react";
import { useDB } from "@/lib/db";
import {
  Button,
  Card,
  Input,
  Textarea,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  EmptyState,
  ConfirmDialog,
} from "@/components/admin/ui";
import Link from "next/link";

// 定义Category接口，确保与db.ts中定义一致
interface Category {
  id: string;
  name: string;
  description?: string;
  slug: string;
  icon?: string;
  order?: number;
}

export default function CategoriesPage() {
  const { categories, addCategory, updateCategory, deleteCategory } = useDB();
  const [isAddingCategory, setIsAddingCategory] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [categoryToDelete, setCategoryToDelete] = useState<string | null>(null);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [isBatchDeleting, setIsBatchDeleting] = useState(false);
  const [newCategory, setNewCategory] = useState<Omit<Category, "id">>({
    name: "",
    description: "",
    slug: "",
    order: 0,
  });

  // 排序分类
  const sortedCategories = [...categories].sort((a, b) => (a.order || 0) - (b.order || 0));

  // 处理添加分类
  const handleAddCategory = () => {
    if (!newCategory.name) return;
    
    // 自动生成slug
    const slug = newCategory.slug || newCategory.name
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^\w\-]+/g, "");
      
    addCategory({
      ...newCategory,
      slug
    });
    
    setNewCategory({
      name: "",
      description: "",
      slug: "",
      order: categories.length,
    });
    setIsAddingCategory(false);
  };

  // 处理更新分类
  const handleUpdateCategory = () => {
    if (!editingCategory || !editingCategory.name) return;
    
    updateCategory(editingCategory.id, editingCategory);
    setEditingCategory(null);
  };

  // 处理删除分类
  const handleDeleteCategory = () => {
    if (!categoryToDelete) return;
    
    deleteCategory(categoryToDelete);
    setCategoryToDelete(null);
  };

  // 处理批量删除
  const handleBatchDelete = () => {
    selectedCategories.forEach(id => {
      deleteCategory(id);
    });
    setSelectedCategories([]);
    setIsBatchDeleting(false);
  };

  // 处理批量移动顺序
  const handleMoveUp = () => {
    if (selectedCategories.length !== 1) return;
    
    const categoryId = selectedCategories[0];
    const categoryIndex = sortedCategories.findIndex(c => c.id === categoryId);
    
    if (categoryIndex <= 0) return;
    
    const category = sortedCategories[categoryIndex];
    const prevCategory = sortedCategories[categoryIndex - 1];
    
    updateCategory(category.id, { order: prevCategory.order });
    updateCategory(prevCategory.id, { order: category.order });
  };

  const handleMoveDown = () => {
    if (selectedCategories.length !== 1) return;
    
    const categoryId = selectedCategories[0];
    const categoryIndex = sortedCategories.findIndex(c => c.id === categoryId);
    
    if (categoryIndex === -1 || categoryIndex >= sortedCategories.length - 1) return;
    
    const category = sortedCategories[categoryIndex];
    const nextCategory = sortedCategories[categoryIndex + 1];
    
    updateCategory(category.id, { order: nextCategory.order });
    updateCategory(nextCategory.id, { order: category.order });
  };

  // 处理选择
  const handleSelectCategory = (id: string) => {
    setSelectedCategories(prev => {
      if (prev.includes(id)) {
        return prev.filter(categoryId => categoryId !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  // 全选/取消全选
  const handleSelectAll = () => {
    if (selectedCategories.length === sortedCategories.length) {
      setSelectedCategories([]);
    } else {
      setSelectedCategories(sortedCategories.map(c => c.id));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">分类管理</h1>
          <p className="text-muted-foreground">
            管理导航站点的分类，用于组织和展示不同类型的导航项
          </p>
        </div>
        <Button onClick={() => setIsAddingCategory(true)}>添加分类</Button>
      </div>

      {/* 批量操作工具栏 */}
      {sortedCategories.length > 0 && (
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleSelectAll}
          >
            {selectedCategories.length === sortedCategories.length ? "取消全选" : "全选"}
          </Button>
          
          {selectedCategories.length > 0 && (
            <>
              <Button
                variant="outline"
                size="sm"
                onClick={handleMoveUp}
                disabled={selectedCategories.length !== 1}
              >
                上移
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleMoveDown}
                disabled={selectedCategories.length !== 1}
              >
                下移
              </Button>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => setIsBatchDeleting(true)}
              >
                批量删除 ({selectedCategories.length})
              </Button>
            </>
          )}
        </div>
      )}

      {/* 分类列表 */}
      <Card>
        {sortedCategories.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">选择</TableHead>
                <TableHead>序号</TableHead>
                <TableHead>名称</TableHead>
                <TableHead>描述</TableHead>
                <TableHead className="text-right">操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedCategories.map((category, index) => (
                <TableRow key={category.id}>
                  <TableCell>
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes(category.id)}
                      onChange={() => handleSelectCategory(category.id)}
                      className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                    />
                  </TableCell>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell className="font-medium">{category.name}</TableCell>
                  <TableCell className="max-w-sm truncate">
                    {category.description}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-2">
                      <Button
                        variant="outline"
                        onClick={() => setEditingCategory(category)}
                      >
                        编辑
                      </Button>
                      <Button
                        variant="destructive"
                        onClick={() => setCategoryToDelete(category.id)}
                      >
                        删除
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <EmptyState
            title="暂无分类"
            description="点击添加按钮创建您的第一个分类"
            action={
              <Button onClick={() => setIsAddingCategory(true)}>
                添加分类
              </Button>
            }
          />
        )}
      </Card>

      {/* 添加分类表单 */}
      {isAddingCategory && (
        <Card title="添加分类">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleAddCategory();
            }}
            className="space-y-4"
          >
            <Input
              label="分类名称"
              value={newCategory.name}
              onChange={(e) =>
                setNewCategory({ ...newCategory, name: e.target.value })
              }
              placeholder="输入分类名称"
              required
            />
            <Textarea
              label="分类描述"
              value={newCategory.description}
              onChange={(e) =>
                setNewCategory({ ...newCategory, description: e.target.value })
              }
              placeholder="输入分类描述"
            />
            <Input
              label="分类图标（可选）"
              value={newCategory.icon || ""}
              onChange={(e) =>
                setNewCategory({ ...newCategory, icon: e.target.value })
              }
              placeholder="输入图标 emoji 或字符"
            />
            <Input
              label="分类别名"
              value={newCategory.slug}
              onChange={(e) =>
                setNewCategory({ ...newCategory, slug: e.target.value })
              }
              placeholder="输入分类别名（URL友好），留空自动生成"
            />
            <Input
              type="number"
              label="排序"
              value={newCategory.order}
              onChange={(e) =>
                setNewCategory({
                  ...newCategory,
                  order: parseInt(e.target.value) || 0,
                })
              }
              placeholder="输入排序序号"
            />
            <div className="flex justify-end space-x-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsAddingCategory(false)}
              >
                取消
              </Button>
              <Button type="submit">保存</Button>
            </div>
          </form>
        </Card>
      )}

      {/* 编辑分类表单 */}
      {editingCategory && (
        <Card title="编辑分类">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleUpdateCategory();
            }}
            className="space-y-4"
          >
            <Input
              label="分类名称"
              value={editingCategory.name}
              onChange={(e) =>
                setEditingCategory({
                  ...editingCategory,
                  name: e.target.value,
                })
              }
              placeholder="输入分类名称"
              required
            />
            <Textarea
              label="分类描述"
              value={editingCategory.description || ""}
              onChange={(e) =>
                setEditingCategory({
                  ...editingCategory,
                  description: e.target.value,
                })
              }
              placeholder="输入分类描述"
            />
            <Input
              label="分类图标（可选）"
              value={editingCategory.icon || ""}
              onChange={(e) =>
                setEditingCategory({
                  ...editingCategory,
                  icon: e.target.value,
                })
              }
              placeholder="输入图标 emoji 或字符"
            />
            <Input
              label="分类别名"
              value={editingCategory.slug}
              onChange={(e) =>
                setEditingCategory({
                  ...editingCategory,
                  slug: e.target.value,
                })
              }
              placeholder="输入分类别名（URL友好）"
            />
            <Input
              type="number"
              label="排序"
              value={editingCategory.order || 0}
              onChange={(e) =>
                setEditingCategory({
                  ...editingCategory,
                  order: parseInt(e.target.value) || 0,
                })
              }
              placeholder="输入排序序号"
            />
            <div className="flex justify-end space-x-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setEditingCategory(null)}
              >
                取消
              </Button>
              <Button type="submit">保存</Button>
            </div>
          </form>
        </Card>
      )}

      {/* 删除确认对话框 */}
      <ConfirmDialog
        isOpen={categoryToDelete !== null}
        onClose={() => setCategoryToDelete(null)}
        onConfirm={handleDeleteCategory}
        title="删除分类"
        description="确定要删除此分类吗？此操作无法撤销，但不会删除该分类下的导航项。"
      />

      {/* 批量删除确认对话框 */}
      <ConfirmDialog
        isOpen={isBatchDeleting}
        onClose={() => setIsBatchDeleting(false)}
        onConfirm={handleBatchDelete}
        title="批量删除分类"
        description={`确定要删除这 ${selectedCategories.length} 个分类吗？此操作无法撤销，但不会删除这些分类下的导航项。`}
      />
    </div>
  );
} 