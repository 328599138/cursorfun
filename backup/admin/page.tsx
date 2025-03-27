"use client";

import { useDB } from "@/lib/db";
import Link from "next/link";
import { Card } from "@/components/admin/ui";

export default function AdminDashboard() {
  const { categories, navItems, qrCodes } = useDB();

  // 统计数据
  const stats = [
    {
      title: "分类总数",
      value: categories.length,
      href: "/zh/admin/categories",
      color: "bg-blue-50 dark:bg-blue-900/20",
      textColor: "text-blue-600 dark:text-blue-400",
      borderColor: "border-blue-100 dark:border-blue-800",
    },
    {
      title: "导航站点总数",
      value: navItems.length,
      href: "/zh/admin/navitems",
      color: "bg-green-50 dark:bg-green-900/20",
      textColor: "text-green-600 dark:text-green-400",
      borderColor: "border-green-100 dark:border-green-800",
    },
    {
      title: "二维码数量",
      value: qrCodes.length,
      href: "/zh/admin/qrcode",
      color: "bg-purple-50 dark:bg-purple-900/20",
      textColor: "text-purple-600 dark:text-purple-400",
      borderColor: "border-purple-100 dark:border-purple-800",
    },
  ];

  // 最近添加的导航项
  const recentNavItems = [...navItems]
    .sort((a, b) => parseInt(b.id) - parseInt(a.id))
    .slice(0, 5);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">管理后台</h1>
        <p className="text-muted-foreground">
          管理您的导航站点内容和分类
        </p>
      </div>

      {/* 统计卡片 */}
      <div className="grid gap-4 md:grid-cols-3">
        {stats.map((stat) => (
          <Link href={stat.href} key={stat.title}>
            <div
              className={`cursor-pointer rounded-lg border p-4 transition-all hover:shadow-md ${stat.borderColor} ${stat.color}`}
            >
              <div className="flex flex-col space-y-2">
                <p className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </p>
                <p className={`text-2xl font-bold ${stat.textColor}`}>
                  {stat.value}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* 最近添加的导航项 */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card title="最近添加的导航项">
          <div className="space-y-4">
            {recentNavItems.length > 0 ? (
              <ul className="space-y-2">
                {recentNavItems.map((item) => (
                  <li key={item.id} className="flex items-center justify-between rounded-md border p-2">
                    <div>
                      <p className="font-medium">{item.title}</p>
                      <p className="text-sm text-muted-foreground">
                        {item.description}
                      </p>
                    </div>
                    <Link
                      href={`/zh/admin/navitems?edit=${item.id}`}
                      className="text-sm text-blue-600 hover:underline dark:text-blue-400"
                    >
                      编辑
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-center text-muted-foreground">暂无导航项</p>
            )}
          </div>
        </Card>

        <Card title="快速操作">
          <div className="grid gap-2">
            <Link
              href="/zh/admin/categories/new"
              className="rounded-md bg-blue-50 p-4 hover:bg-blue-100 dark:bg-blue-900/20 dark:hover:bg-blue-900/30"
            >
              <h3 className="font-medium text-blue-600 dark:text-blue-400">添加新分类</h3>
              <p className="text-sm text-muted-foreground">
                创建新的导航分类以组织您的链接
              </p>
            </Link>
            <Link
              href="/zh/admin/navitems/new"
              className="rounded-md bg-green-50 p-4 hover:bg-green-100 dark:bg-green-900/20 dark:hover:bg-green-900/30"
            >
              <h3 className="font-medium text-green-600 dark:text-green-400">添加新导航项</h3>
              <p className="text-sm text-muted-foreground">
                添加新的链接到您的导航站点
              </p>
            </Link>
            <Link
              href="/zh/admin/qrcode"
              className="rounded-md bg-purple-50 p-4 hover:bg-purple-100 dark:bg-purple-900/20 dark:hover:bg-purple-900/30"
            >
              <h3 className="font-medium text-purple-600 dark:text-purple-400">更新群二维码</h3>
              <p className="text-sm text-muted-foreground">
                更新您的微信群二维码
              </p>
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
} 