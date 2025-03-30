"use client"

import * as React from "react"
import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { type Locale, getTranslations } from "@/lib/i18n"
import { useDB } from "@/lib/db"
import { QRCodeIcon } from "./icons"
import { cn } from "@/lib/utils"

export function ChatGroup() {
  const { qrCodes } = useDB()
  const [qrCode, setQrCode] = useState({ id: "1", name: "微信群", imageUrl: "/qrcode.jpg" })
  const [isOpen, setIsOpen] = useState(false)
  const [isImageLoaded, setIsImageLoaded] = useState(false)
  const [showSaveTip, setShowSaveTip] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const pathname = usePathname()
  const locale = pathname?.split("/")[1] as Locale || 'en'
  const t = getTranslations(locale)
  const popoverRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const isTouchDevice = useRef(false)

  // 检测是否为触摸设备
  useEffect(() => {
    if (typeof window !== 'undefined') {
      isTouchDevice.current = 'ontouchstart' in window || navigator.maxTouchPoints > 0
    }
  }, [])
  
  // 客户端挂载完成后再进行初始化
  useEffect(() => {
    setIsMounted(true)
    if (qrCodes?.[0]) {
      setQrCode(qrCodes[0])
      // 预加载图片
      const img = new window.Image()
      img.src = qrCodes[0].imageUrl
      img.onload = () => setIsImageLoaded(true)
    }
  }, [qrCodes])

  // 点击外部关闭弹窗
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popoverRef.current && 
        !popoverRef.current.contains(event.target as Node) &&
        buttonRef.current && 
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }
    
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  // 处理鼠标悬停
  const handleMouseEnter = () => {
    if (isTouchDevice.current) return
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    setIsOpen(true)
  }

  const handleMouseLeave = () => {
    if (isTouchDevice.current) return
    timeoutRef.current = setTimeout(() => setIsOpen(false), 300)
  }

  // 处理长按保存
  const handleLongPress = () => {
    setShowSaveTip(true)
    setTimeout(() => setShowSaveTip(false), 2000)
  }

  if (!isMounted) return null

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <button
        ref={buttonRef}
        onClick={() => isTouchDevice.current && setIsOpen(!isOpen)}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={cn(
          "flex h-14 w-14 items-center justify-center",
          "rounded-full bg-primary shadow-dynamic",
          "text-white transition-all duration-300",
          "hover:scale-105 active:scale-95",
          "focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2",
          isOpen && "bg-primary/90"
        )}
        aria-label={locale === 'en' ? 'Open WeChat group QR code' : '打开微信群二维码'}
      >
        <QRCodeIcon className="h-6 w-6" />
      </button>

      <div
        ref={popoverRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={cn(
          "absolute bottom-20 right-0",
          "w-80 rounded-2xl bg-background/95 border border-border/50",
          "shadow-dynamic backdrop-blur-sm",
          "p-5 transform transition-all duration-300 origin-bottom-right",
          isOpen 
            ? "opacity-100 scale-100 translate-y-0" 
            : "opacity-0 scale-95 translate-y-4 pointer-events-none"
        )}
      >
        <div className="flex flex-col items-center">
          <h3 className="text-base font-medium mb-2">{qrCode.name}</h3>
          <p className="mb-4 text-sm text-muted-foreground text-center">
            {t.common.scanQR || '扫描下方二维码加入交流群'}
          </p>
          
          <div
            className="relative overflow-hidden rounded-xl border border-border/50 p-2 bg-white"
            onTouchStart={() => {
              const timer = setTimeout(() => handleLongPress(), 500)
              return () => clearTimeout(timer)
            }}
          >
            {!isImageLoaded && (
              <div className="absolute inset-0 flex items-center justify-center bg-white z-10">
                <div className="w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
              </div>
            )}
            
            <Image
              src={qrCode.imageUrl}
              alt={qrCode.name}
              width={240}
              height={240}
              className={cn(
                "w-full h-auto transition-opacity duration-300", 
                isImageLoaded ? "opacity-100" : "opacity-0"
              )}
              onLoad={() => setIsImageLoaded(true)}
              priority
            />
            
            {/* 保存提示 */}
            <div className={cn(
              "absolute inset-x-0 bottom-0 bg-black/70 text-white text-xs p-2 text-center transition-all duration-300",
              showSaveTip ? "opacity-100 translate-y-0" : "opacity-0 translate-y-full"
            )}>
              长按图片可保存二维码到相册
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 