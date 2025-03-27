import type { Metadata, Viewport } from "next"
import { cn } from "@/lib/utils"
import { ThemeProvider } from "@/components/theme-provider"
import { DBProvider } from "@/lib/db"
import "./globals.css"
import ErrorBoundary from '@/components/error-boundary'
import { PageProgress } from '@/components/nprogress'
import "nprogress/nprogress.css"

// Use system font stack, similar to Apple's font scheme
const fontSans = {
  className: 'font-sans'
}

// Metadata
export const metadata: Metadata = {
  title: "CursorFun - Cursor IDE Resources",
  description: "The most comprehensive Cursor IDE resource navigation site, including Cursor rules, MCP, development tutorials, AI prompts and other resources",
  keywords: "Cursor, IDE, Navigation, Resources, AI, Development, Tutorial, Cursor MCP, Cursor Rules",
  authors: [{ name: "CursorFun", url: "https://cursorfun.com" }],
  creator: "fengakon",
  publisher: "CursorFun",
  robots: "index, follow",
  metadataBase: new URL("https://cursorfun.com"),
  icons: {
    icon: "/icons/favicon.ico",
    apple: "/icons/apple-touch-icon.png",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://cursorfun.com",
    title: "CursorFun - Cursor IDE Resources",
    description: "The most comprehensive Cursor IDE resource navigation site, including tutorials, MCP, and more",
    siteName: "CursorFun",
    images: [
      {
        url: "/icons/og-image.png",
        width: 1200,
        height: 630,
        alt: "CursorFun - Cursor IDE Resources",
      },
    ],
  }
}

// Viewport metadata
export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({
  children,
}: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth">
      <head suppressHydrationWarning>
        <link rel="apple-touch-icon" sizes="180x180" href="/icons/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/icons/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/icons/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="CursorFun" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
      </head>
      <body suppressHydrationWarning className={cn(
        "min-h-screen bg-background antialiased",
        "text-foreground font-medium",
        fontSans.className
      )}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ErrorBoundary>
            <DBProvider>
              <PageProgress />
              {children}
            </DBProvider>
          </ErrorBoundary>
          
          {/* Add progress indicator for page transitions */}
          <div id="nprogress-container" />
        </ThemeProvider>
      </body>
    </html>
  )
} 