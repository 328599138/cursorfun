import * as React from "react"
import { cn } from "@/lib/utils"

interface NavCardProps {
  title: string
  description: string
  icon?: React.ReactNode
  href: string
  className?: string
  isNew?: boolean
  category?: string
}

export function NavCard({
  title,
  description,
  icon,
  href,
  className,
  isNew = false,
  category,
}: NavCardProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "group relative rounded-xl border border-neutral-200/30 dark:border-neutral-800/50",
        "bg-white/90 dark:bg-neutral-800/90 backdrop-blur-sm",
        "p-6 overflow-hidden h-full flex flex-col",
        "shadow-apple hover:shadow-dynamic",
        "transition-all duration-300 ease-apple",
        "hover:-translate-y-1",
        className
      )}
    >
      {/* 卡片内容 */}
      <div className="flex flex-col h-full relative z-10">
        {/* 顶部区域：图标和标题 */}
        <div className="flex items-start gap-4 mb-3">
          {/* 图标 */}
          <div className="flex-shrink-0">
            {icon ? (
              <div className="h-12 w-12 rounded-xl flex items-center justify-center bg-primary/10 text-primary dark:bg-primary/15">
                {icon}
              </div>
            ) : (
              <div className="h-12 w-12 rounded-xl flex items-center justify-center bg-primary/10 text-primary dark:bg-primary/15">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="h-6 w-6">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                </svg>
              </div>
            )}
          </div>
          
          {/* 标题区域 */}
          <div className="min-w-0 flex-1">
            {category && (
              <p className="text-xs font-medium text-primary mb-1">
                {category}
              </p>
            )}
            <h3 className="font-medium text-base tracking-tight text-foreground group-hover:text-primary transition-colors duration-200">
              {title}
              {isNew && (
                <span className="ml-2 inline-flex items-center rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                  新
                </span>
              )}
            </h3>
          </div>
        </div>
        
        {/* 描述区域 - 不再限制行数，允许更长内容 */}
        <div className="mt-1 flex-1">
          <p className="text-sm text-muted-foreground">
            {description}
          </p>
        </div>
        
        {/* 底部区域：链接指示器 */}
        <div className="mt-4 pt-3 border-t border-neutral-100 dark:border-neutral-800/50 flex justify-end">
          <div className="text-xs text-primary/70 group-hover:text-primary flex items-center transition-colors duration-200">
            <span>访问链接</span>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5 ml-1">
              <path fillRule="evenodd" d="M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
      </div>
      
      {/* 背景色渐变效果 - 悬停时显示 */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
    </a>
  )
} 