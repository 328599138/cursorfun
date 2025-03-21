import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "../globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@/lib/utils"
import { type Locale, dictionary } from "@/lib/i18n"

const inter = Inter({ subsets: ["latin"] })

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: Locale }
}): Promise<Metadata> {
  const t = dictionary[locale]

  return {
    title: {
      template: "%s | CursorFun",
      default: "CursorFun - Cursor IDE 资源导航",
    },
    description: "最全面的 Cursor IDE 资源导航站，包含 Cursor 规则、MCP、开发教程等资源",
    keywords: [
      "Cursor",
      "IDE",
      "开发工具",
      "编程",
      "AI",
      "人工智能",
      "代码生成",
      "编程助手",
    ],
    authors: [{ name: "fengakon" }],
    openGraph: {
      title: "CursorFun - Cursor IDE 资源导航",
      description: "最全面的 Cursor IDE 资源导航站",
      url: "https://cursorfun.com",
      siteName: "CursorFun",
      locale: locale,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "CursorFun - Cursor IDE 资源导航",
      description: "最全面的 Cursor IDE 资源导航站",
    },
    viewport: {
      width: "device-width",
      initialScale: 1,
      maximumScale: 1,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    verification: {
      google: "your-google-site-verification",
      baidu: "your-baidu-site-verification",
    },
  }
}

interface RootLayoutProps {
  children: React.ReactNode
  params: { locale: Locale }
}

export default function RootLayout({
  children,
  params: { locale },
}: RootLayoutProps) {
  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={cn(
        "min-h-screen bg-background font-sans antialiased",
        inter.className
      )}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
} 