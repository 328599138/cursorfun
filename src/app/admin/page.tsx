"use client";

import { useDB } from "@/lib/db";
import Link from "next/link";
import { Card } from "@/components/ui/card";

export default function AdminDashboard() {
  const { categories, navItems, qrCodes } = useDB();

  // 统计数据
  const stats = [
    {
      title: "分类总数",
      value: categories.length,
      href: "/admin/categories",
      color: "bg-blue-50 dark:bg-blue-900/20",
      textColor: "text-blue-600 dark:text-blue-400",
      borderColor: "border-blue-100 dark:border-blue-800",
    },
    {
      title: "导航项总数",
      value: navItems.length,
      href: "/admin/navitems",
      color: "bg-green-50 dark:bg-green-900/20",
      textColor: "text-green-600 dark:text-green-400",
      borderColor: "border-green-100 dark:border-green-800",
    },
    {
      title: "二维码数量",
      value: qrCodes.length,
      href: "/admin/qrcode",
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
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-8">管理后台</h1>

      {/* 统计卡片 */}
      <div className="grid gap-4 md:grid-cols-3 mb-8">
        {stats.map((stat) => (
          <Link key={stat.title} href={stat.href}>
            <Card className={`p-6 border ${stat.borderColor} ${stat.color} hover:shadow-md transition-shadow`}>
              <h3 className="text-lg font-medium text-muted-foreground">{stat.title}</h3>
              <p className={`text-3xl font-bold mt-2 ${stat.textColor}`}>{stat.value}</p>
            </Card>
          </Link>
        ))}
      </div>

      {/* 最近添加的项目 */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">最近添加的导航项</h2>
        <div className="grid gap-4">
          {recentNavItems.map((item) => (
            <Card key={item.id} className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
                <Link href={`/admin/navitems?edit=${item.id}`}>
                  <button className="text-sm text-blue-500 hover:text-blue-600">编辑</button>
                </Link>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
} 