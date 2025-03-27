'use client'

import { useEffect } from 'react'
import { Button } from '@/components/admin/ui'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // 在控制台记录错误
    console.error('Global Error:', error)
  }, [error])

  return (
    <html>
      <body>
        <div className="flex min-h-screen flex-col items-center justify-center p-6 text-center">
          <h2 className="mb-4 text-2xl font-bold tracking-tight">系统错误</h2>
          <p className="mb-4 max-w-md text-muted-foreground">
            抱歉，系统发生了错误。请尝试刷新页面或返回首页。
          </p>
          <p className="mb-6 text-sm text-destructive">
            错误信息: {error.message || "未知错误"}
          </p>
          <div className="flex gap-4">
            <button
              onClick={() => reset()}
              className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            >
              重试
            </button>
            <button
              onClick={() => window.location.href = '/admin'}
              className="inline-flex h-9 items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
            >
              返回首页
            </button>
          </div>
        </div>
      </body>
    </html>
  )
} 