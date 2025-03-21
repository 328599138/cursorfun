import * as React from "react"

interface ArticleLayoutProps {
  title: string
  description?: string
  children: React.ReactNode
}

export function ArticleLayout({
  title,
  description,
  children,
}: ArticleLayoutProps) {
  return (
    <article className="prose prose-gray dark:prose-invert mx-auto max-w-4xl">
      <div className="space-y-2">
        <h1 className="text-4xl font-bold tracking-tight">{title}</h1>
        {description && (
          <p className="text-lg text-muted-foreground">{description}</p>
        )}
      </div>
      <hr className="my-6" />
      <div className="[&>*:first-child]:mt-0">{children}</div>
    </article>
  )
} 