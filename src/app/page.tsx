import * as React from "react"
import { ThemeToggle } from "@/components/theme-toggle"
import { NavCard } from "@/components/nav-card"
import { ChatGroup } from "@/components/chat-group"

const navItems = [
  {
    title: "Cursor Rules",
    description: "学习和掌握 Cursor IDE 的使用规则和最佳实践",
    href: "/rules",
  },
  {
    title: "Cursor MCP",
    description: "探索 Cursor 的 MCP 功能和高级特性",
    href: "/mcp",
  },
  {
    title: "Web 站搭建",
    description: "从域名注册到部署上线的完整建站指南",
    href: "/web",
  },
  {
    title: "App 开发",
    description: "使用 Cursor 进行移动应用开发的教程和资源",
    href: "/app",
  },
  {
    title: "API 开发",
    description: "API 设计、开发和测试的最佳实践",
    href: "/api",
  },
  {
    title: "小程序开发",
    description: "微信小程序开发教程和实践指南",
    href: "/miniprogram",
  },
]

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <div className="mr-4 flex">
            <a className="mr-6 flex items-center space-x-2" href="/">
              <span className="font-bold">CursorFun</span>
            </a>
          </div>
          <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
            <nav className="flex items-center space-x-6">
              <ThemeToggle />
            </nav>
          </div>
        </div>
      </header>
      <main className="container py-6">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {navItems.map((item) => (
            <NavCard key={item.href} {...item} />
          ))}
        </div>
      </main>
      <footer className="border-t">
        <div className="container py-6 text-center text-sm">
          <p>© 2024 CursorFun. 联系我们: WeChat - fengakon</p>
        </div>
      </footer>
      <ChatGroup />
    </div>
  )
} 