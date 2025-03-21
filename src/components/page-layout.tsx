import * as React from "react"
import { ThemeToggle } from "./theme-toggle"
import { LanguageSwitch } from "./language-switch"
import { ChatGroup } from "./chat-group"

interface PageLayoutProps {
  children: React.ReactNode
}

export function PageLayout({ children }: PageLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <div className="mr-4 flex">
            <a className="mr-6 flex items-center space-x-2" href="/">
              <span className="font-bold sm:inline-block">
                CursorFun
              </span>
            </a>
          </div>
          <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
            <div className="w-full flex-1 md:w-auto md:flex-none">
            </div>
            <nav className="flex items-center space-x-2">
              <LanguageSwitch />
              <ThemeToggle />
            </nav>
          </div>
        </div>
      </header>
      <main className="min-h-screen w-full max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {children}
      </main>
      <ChatGroup />
    </div>
  )
} 