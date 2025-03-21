import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@/lib/utils"
import { defaultLocale, type Locale } from "@/lib/i18n"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "CursorFun - Cursor IDE 资源导航",
  description: "最全面的 Cursor IDE 资源导航站，包含 Cursor 规则、MCP、开发教程等资源",
}

interface RootLayoutProps {
  children: React.ReactNode
  params: { locale: Locale }
}

export default function RootLayout({
  children,
  params: { locale = defaultLocale },
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