import * as React from "react"
import { cn } from "@/lib/utils"

interface NavCardProps {
  title: string
  description: string
  icon?: React.ReactNode
  href: string
  className?: string
}

export function NavCard({
  title,
  description,
  icon,
  href,
  className,
}: NavCardProps) {
  return (
    <a
      href={href}
      className={cn(
        "group relative rounded-lg border p-6 hover:border-foreground/50",
        className
      )}
    >
      <div className="flex items-center gap-4">
        {icon && <div className="h-8 w-8">{icon}</div>}
        <div>
          <h3 className="font-semibold leading-none tracking-tight">
            {title}
          </h3>
          <p className="mt-2 text-sm text-muted-foreground">
            {description}
          </p>
        </div>
      </div>
    </a>
  )
} 