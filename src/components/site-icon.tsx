"use client"

import * as React from "react"
import Image from "next/image"

interface SiteIconProps {
  url: string
  alt: string
  size?: number
  className?: string
  fallbackIcon?: string
}

export function SiteIcon({ url, alt, size = 40, className, fallbackIcon }: SiteIconProps) {
  const [error, setError] = React.useState(false)
  const domain = React.useMemo(() => {
    try {
      const urlObj = new URL(url)
      return urlObj.hostname
    } catch (e) {
      return ""
    }
  }, [url])

  // 获取favicon的几种可能地址
  const faviconUrl = React.useMemo(() => {
    if (!domain) return ""
    // 首先尝试Google的favicon服务
    return `https://www.google.com/s2/favicons?domain=${domain}&sz=${size}`
  }, [domain, size])

  // 如果出错或者没有域名，使用fallback图标
  const iconSrc = error || !domain ? (fallbackIcon || `/icons/default.png`) : faviconUrl

  return (
    <div className={`flex-shrink-0 ${className}`} style={{ width: size, height: size }}>
      <img 
        src={iconSrc}
        alt={alt}
        width={size}
        height={size}
        className="w-full h-full rounded object-contain"
        onError={() => setError(true)}
      />
    </div>
  )
} 