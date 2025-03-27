"use client";

import React, { useState } from 'react'
import Link from 'next/link'
import { ThemeToggle } from './theme-toggle'
import { Button } from './ui/button'
import { Menu, X } from 'lucide-react'
import { ChatGroup } from './chat-group'
import { cn } from '@/lib/utils'

interface PageLayoutProps {
  children: React.ReactNode
  className?: string
}

// Mobile menu component
const MobileMenu = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 top-14 z-50 grid h-[calc(100vh-3.5rem)] grid-flow-row auto-rows-max overflow-auto p-6 pb-32 shadow-md animate-in slide-in-from-bottom-80 md:hidden">
      <div className="relative z-20 grid gap-6 rounded-md bg-popover p-4 text-popover-foreground shadow-md">
        <Link href="/" className="flex items-center space-x-2" onClick={onClose}>
          <span className="font-bold">CursorFun</span>
        </Link>
        <Button
          className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100"
          onClick={onClose}
          aria-label="Close"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

// Footer component
const Footer = () => (
  <footer className="border-t">
    <div className="container py-8 md:py-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
      <div>
        <h4 className="font-medium mb-4">Contact</h4>
        <p>WeChat: fengakon</p>
        <p>Location: Tieling, Liaoning, China</p>
      </div>
      <div>
        <h4 className="font-medium mb-4">Community</h4>
        <ChatGroup />
      </div>
    </div>
    <div className="container py-4 border-t">
      <p className="text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} CursorFun. All rights reserved.
      </p>
    </div>
  </footer>
);

export function PageLayout({ children, className }: PageLayoutProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className={cn("min-h-screen flex flex-col", className)}>
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <div className="mr-4 hidden md:flex">
            <Link href="/" className="flex items-center space-x-2">
              <span className="font-bold">CursorFun</span>
            </Link>
          </div>
          <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
            <div className="w-full flex-1 md:w-auto md:flex-none">
              <button
                className="inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background hover:bg-accent hover:text-accent-foreground h-10 py-2 px-4 md:hidden"
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Open menu"
              >
                <Menu className="h-6 w-6" />
              </button>
            </div>
            <div className="flex items-center">
              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      <MobileMenu isOpen={isOpen} onClose={() => setIsOpen(false)} />

      {/* Main content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  )
} 