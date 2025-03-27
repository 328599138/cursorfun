import React from 'react'
import { cn } from '@/lib/utils'

interface SectionHeaderProps {
  title: string
  description?: string
  pill?: string
  variant?: 'default' | 'large'
  className?: string
}

export function SectionHeader({
  title,
  description,
  pill,
  variant = 'default',
  className,
}: SectionHeaderProps) {
  return (
    <div className={cn('mb-10', className)}>
      <div className="flex flex-col gap-1.5">
        <div className="flex items-center gap-3">
          {pill && (
            <span className="inline-flex items-center rounded-full bg-cursor-gradient px-3 py-0.5 text-xs font-medium text-white">
              {pill}
            </span>
          )}
          <h2 
            className={cn(
              "mb-0 flex-1 font-medium tracking-tight text-2xl",
              variant === 'large' && "text-3xl md:text-4xl font-semibold"
            )}
          >
            {title}
          </h2>
        </div>
        {description && (
          <p className="text-muted-foreground text-base max-w-3xl">
            {description}
          </p>
        )}
      </div>
      <div 
        className="mt-5 h-px w-full bg-gradient-to-r from-transparent via-primary/20 to-transparent" 
        aria-hidden="true"
      />
    </div>
  )
}

export function SectionSubHeader({
  title,
  description,
  className,
}: {
  title: string
  description?: string
  className?: string
}) {
  return (
    <div className={cn('mb-8', className)}>
      <h3 className="font-medium text-lg tracking-tight">{title}</h3>
      {description && (
        <p className="text-sm text-muted-foreground mt-1.5">
          {description}
        </p>
      )}
    </div>
  )
} 