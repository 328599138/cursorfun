import * as React from "react"

interface ArticleLayoutProps {
  children: React.ReactNode
}

export function ArticleLayout({ children }: ArticleLayoutProps) {
  return (
    <article className="prose prose-gray dark:prose-invert mx-auto max-w-4xl px-6 py-6">
      {children}
    </article>
  )
} 