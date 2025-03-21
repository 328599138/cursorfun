"use client"

import * as React from "react"
import { usePathname, useRouter } from "next/navigation"
import { locales, type Locale } from "@/lib/i18n"

export function LanguageSwitch() {
  const router = useRouter()
  const pathname = usePathname()
  const currentLocale = pathname.split("/")[1] as Locale

  const handleLanguageChange = (locale: Locale) => {
    const newPathname = pathname.replace(`/${currentLocale}`, `/${locale}`)
    router.push(newPathname)
  }

  return (
    <div className="flex items-center space-x-2">
      {locales.map((locale) => (
        <button
          key={locale}
          onClick={() => handleLanguageChange(locale)}
          className={`rounded-md px-2 py-1 text-sm ${
            currentLocale === locale
              ? "bg-primary text-primary-foreground"
              : "hover:bg-accent hover:text-accent-foreground"
          }`}
        >
          {locale.toUpperCase()}
        </button>
      ))}
    </div>
  )
} 