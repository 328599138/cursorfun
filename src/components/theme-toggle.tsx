"use client"

import * as React from "react"
import { useTheme } from "next-themes"
import { MoonIcon, SunIcon } from "./icons"
import { cn } from "@/lib/utils"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)
  const isDark = theme === "dark"
  
  // 在组件挂载后渲染以避免水合不匹配
  React.useEffect(() => {
    setMounted(true)
  }, [])

  // 优雅的状态切换动画
  const toggleTheme = React.useCallback(() => {
    setTheme(isDark ? "light" : "dark")
  }, [setTheme, isDark])

  return (
    <button
      onClick={toggleTheme}
      disabled={!mounted}
      aria-label={mounted ? `切换到${isDark ? '浅色' : '深色'}模式` : '切换主题'}
      className={cn(
        "relative overflow-hidden h-9 w-9 rounded-full",
        "bg-secondary/70 hover:bg-secondary/90",
        "flex items-center justify-center",
        "transition-colors duration-200",
        "focus:outline-none focus:ring-2 focus:ring-primary/30 focus:ring-offset-2",
        "focus:ring-offset-background",
        "disabled:pointer-events-none disabled:opacity-50"
      )}
    >
      <div className="relative w-5 h-5">
        {/* Sun icon - shown in dark mode to let user switch to light */}
        <div 
          className={cn(
            "absolute inset-0 transform transition-all duration-500 ease-spring",
            mounted && (isDark 
              ? "opacity-100 rotate-0 scale-100" 
              : "opacity-0 rotate-90 scale-50")
          )}
        >
          <SunIcon className="w-5 h-5" />
        </div>
        
        {/* Moon icon - shown in light mode to let user switch to dark */}
        <div 
          className={cn(
            "absolute inset-0 transform transition-all duration-500 ease-spring",
            mounted && (isDark 
              ? "opacity-0 -rotate-90 scale-50" 
              : "opacity-100 rotate-0 scale-100")
          )}
        >
          <MoonIcon className="w-5 h-5" />
        </div>
      </div>
    </button>
  )
}

// 添加自定义过渡曲线到Tailwind配置
// 在你的 globals.css 中添加:
// @layer utilities {
//   .ease-spring {
//     transition-timing-function: cubic-bezier(0.5, 0, 0, 1.25);
//   }
// } 