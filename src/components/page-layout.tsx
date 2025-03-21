import * as React from "react"
import { ThemeToggle } from "@/components/theme-toggle"
import { LanguageSwitch } from "@/components/language-switch"
import { ChatGroup } from "@/components/chat-group"
import { type Locale } from "@/lib/i18n"

interface PageLayoutProps {
  children: React.ReactNode
  locale: Locale
}

export function PageLayout({ children, locale }: PageLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <div className="mr-4 flex">
            <a className="mr-6 flex items-center space-x-2" href={`/${locale}`}>
              <span className="font-bold">CursorFun</span>
            </a>
          </div>
          <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
            <nav className="flex items-center space-x-6">
              <LanguageSwitch />
              <ThemeToggle />
            </nav>
          </div>
        </div>
      </header>
      <main className="container py-6">
        {children}
      </main>
      <footer className="border-t">
        <div className="container py-6 text-center text-sm">
          <p>© 2024 CursorFun. WeChat: fengakon</p>
        </div>
      </footer>
      <ChatGroup />
    </div>
  )
} 