import * as React from "react"

interface ArticleLayoutProps {
  children: React.ReactNode
  title?: string
  description?: string
}

export function ArticleLayout({ children, title, description }: ArticleLayoutProps) {
  return (
    <article className="prose prose-gray dark:prose-invert mx-auto max-w-4xl px-6 py-6">
      {title && <h1>{title}</h1>}
      {description && <p className="text-muted-foreground mb-6">{description}</p>}
      {children}
    </article>
  )
} 