'use client'

import { useEffect } from 'react'
import Router from 'next/router'
import NProgress from 'nprogress'

export function PageProgress() {
  useEffect(() => {
    // 配置进度条
    NProgress.configure({ 
      showSpinner: false,
      minimum: 0.3,
      easing: 'ease',
      speed: 800,
      trickleSpeed: 200
    })

    // 路由开始变化时显示进度条
    const handleStart = () => {
      NProgress.start()
    }

    // 路由变化完成时结束进度条
    const handleComplete = () => {
      NProgress.done()
    }

    // 路由变化出错时也结束进度条
    const handleError = () => {
      NProgress.done()
    }

    // 监听路由事件
    Router.events.on('routeChangeStart', handleStart)
    Router.events.on('routeChangeComplete', handleComplete)
    Router.events.on('routeChangeError', handleError)

    return () => {
      // 清理事件监听
      Router.events.off('routeChangeStart', handleStart)
      Router.events.off('routeChangeComplete', handleComplete) 
      Router.events.off('routeChangeError', handleError)
    }
  }, [])

  return null
} 