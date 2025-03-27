"use client";

import { useState, useEffect } from "react";
import { useDB, type NavItem } from "@/lib/db";
import { useSearchParams } from "next/navigation";
import {
  Button,
  Card,
  Input,
  Textarea,
  Select,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  EmptyState,
  ConfirmDialog,
} from "@/components/admin/ui";

export default function NavItemsPage() {
  const { navItems, categories, addNavItem, updateNavItem, deleteNavItem } = useDB();
  const searchParams = useSearchParams();
  const editId = searchParams.get("edit");

  const [isAddingItem, setIsAddingItem] = useState(false);
  const [editingItem, setEditingItem] = useState<NavItem | null>(null);
  const [itemToDelete, setItemToDelete] = useState<string | null>(null);
  const [newItem, setNewItem] = useState<Omit<NavItem, "id">>({
    title: "",
    description: "",
    url: "",
    categoryId: categories[0]?.id || "",
    order: 0,
  });
  const [filter, setFilter] = useState<string>("all");

  // 根据URL参数设置编辑状态
  useEffect(() => {
    if (editId) {
      const item = navItems.find((item) => item.id === editId);
      if (item) {
        setEditingItem(item);
      }
    }
  }, [editId, navItems]);

  // 处理添加导航项
  const handleAddItem = () => {
    if (!newItem.title || !newItem.url || !newItem.categoryId) return;
    
    addNavItem(newItem);
    setNewItem({
      title: "",
      description: "",
      url: "",
      categoryId: categories[0]?.id || "",
      order: navItems.filter(item => item.categoryId === newItem.categoryId).length,
    });
    setIsAddingItem(false);
  };

  // 处理更新导航项
  const handleUpdateItem = () => {
    if (!editingItem || !editingItem.title || !editingItem.url || !editingItem.categoryId) return;
    
    updateNavItem(editingItem.id, editingItem);
    setEditingItem(null);
  };

  // 处理删除导航项
  const handleDeleteItem = () => {
    if (!itemToDelete) return;
    
    deleteNavItem(itemToDelete);
    setItemToDelete(null);
  };

  // 筛选和排序导航项
  const filteredItems = [...navItems]
    .filter(
      (item) =>
        filter === "all" || item.categoryId === filter
    )
    .sort((a, b) => {
      if (a.categoryId !== b.categoryId) {
        const categoryA = categories.find(c => c.id === a.categoryId);
        const categoryB = categories.find(c => c.id === b.categoryId);
        return (categoryA?.order || 0) - (categoryB?.order || 0);
      }
      return a.order - b.order;
    });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">导航项管理</h1>
          <p className="text-muted-foreground">
            管理导航站点中的所有导航项，可以添加、编辑和删除导航项
          </p>
        </div>
        <Button onClick={() => setIsAddingItem(true)}>添加导航项</Button>
      </div>

      {/* 筛选工具栏 */}
      <div className="flex space-x-4">
        <Select
          className="max-w-xs"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          options={[
            { value: "all", label: "全部分类" },
            ...categories.map((category) => ({
              value: category.id,
              label: category.name,
            })),
          ]}
        />
      </div>

      {/* 导航项列表 */}
      {filteredItems.length > 0 ? (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>序号</TableHead>
              <TableHead>标题</TableHead>
              <TableHead>链接</TableHead>
              <TableHead>所属分类</TableHead>
              <TableHead className="text-right">操作</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredItems.map((item, index) => {
              const category = categories.find(
                (c) => c.id === item.categoryId
              );
              
              return (
                <TableRow key={item.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell className="font-medium">
                    <div>
                      <p>{item.title}</p>
                      <p className="text-xs text-muted-foreground">
                        {item.description}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell className="max-w-xs truncate">
                    {item.url}
                  </TableCell>
                  <TableCell>{category?.name || "未分类"}</TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setEditingItem(item)}
                    >
                      编辑
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-red-500 hover:text-red-600"
                      onClick={() => setItemToDelete(item.id)}
                    >
                      删除
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      ) : (
        <EmptyState
          title="暂无导航项"
          description="点击添加按钮创建您的第一个导航项"
        />
      )}

      {/* 添加导航项对话框 */}
      {isAddingItem && (
        <Card title="添加导航项">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleAddItem();
            }}
            className="space-y-4"
          >
            <Input
              label="标题"
              value={newItem.title}
              onChange={(e) =>
                setNewItem({ ...newItem, title: e.target.value })
              }
              placeholder="输入导航项标题"
              required
            />
            <Textarea
              label="描述"
              value={newItem.description}
              onChange={(e) =>
                setNewItem({ ...newItem, description: e.target.value })
              }
              placeholder="输入导航项描述"
            />
            <Input
              label="链接"
              value={newItem.url}
              onChange={(e) =>
                setNewItem({ ...newItem, url: e.target.value })
              }
              placeholder="输入导航项链接地址"
              required
            />
            <Select
              label="所属分类"
              value={newItem.categoryId}
              onChange={(e) =>
                setNewItem({ ...newItem, categoryId: e.target.value })
              }
              options={categories.map((category) => ({
                value: category.id,
                label: category.name,
              }))}
              required
            />
            <Input
              type="number"
              label="排序"
              value={newItem.order}
              onChange={(e) =>
                setNewItem({
                  ...newItem,
                  order: parseInt(e.target.value) || 0,
                })
              }
              placeholder="输入排序序号"
            />
            <div className="flex justify-end space-x-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsAddingItem(false)}
              >
                取消
              </Button>
              <Button type="submit">保存</Button>
            </div>
          </form>
        </Card>
      )}

      {/* 编辑导航项对话框 */}
      {editingItem && (
        <Card title="编辑导航项">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleUpdateItem();
            }}
            className="space-y-4"
          >
            <Input
              label="标题"
              value={editingItem.title}
              onChange={(e) =>
                setEditingItem({ ...editingItem, title: e.target.value })
              }
              placeholder="输入导航项标题"
              required
            />
            <Textarea
              label="描述"
              value={editingItem.description}
              onChange={(e) =>
                setEditingItem({ ...editingItem, description: e.target.value })
              }
              placeholder="输入导航项描述"
            />
            <Input
              label="链接"
              value={editingItem.url}
              onChange={(e) =>
                setEditingItem({ ...editingItem, url: e.target.value })
              }
              placeholder="输入导航项链接地址"
              required
            />
            <Select
              label="所属分类"
              value={editingItem.categoryId}
              onChange={(e) =>
                setEditingItem({ ...editingItem, categoryId: e.target.value })
              }
              options={categories.map((category) => ({
                value: category.id,
                label: category.name,
              }))}
              required
            />
            <Input
              type="number"
              label="排序"
              value={editingItem.order}
              onChange={(e) =>
                setEditingItem({
                  ...editingItem,
                  order: parseInt(e.target.value) || 0,
                })
              }
              placeholder="输入排序序号"
            />
            <div className="flex justify-end space-x-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setEditingItem(null)}
              >
                取消
              </Button>
              <Button type="submit">保存更改</Button>
            </div>
          </form>
        </Card>
      )}

      {/* 删除确认对话框 */}
      {itemToDelete && (
        <ConfirmDialog
          isOpen={!!itemToDelete}
          onClose={() => setItemToDelete(null)}
          title="删除导航项"
          description="确定要删除这个导航项吗？此操作无法撤销。"
          onConfirm={handleDeleteItem}
        />
      )}
    </div>
  );
} 