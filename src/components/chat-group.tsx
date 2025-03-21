"use client"

import * as React from "react"
import { useState } from "react"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { dictionary, type Locale } from "@/lib/i18n"

export function ChatGroup() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()
  const locale = pathname.split("/")[1] as Locale
  const t = dictionary[locale]

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg hover:bg-primary/90"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="h-6 w-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 01-.923 1.785A5.969 5.969 0 006 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337z"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute bottom-16 right-0 rounded-lg bg-background p-4 shadow-lg">
          <div className="text-center">
            <p className="mb-2 text-sm font-medium">{t.common.scanQR}</p>
            <div className="relative h-32 w-32 overflow-hidden rounded">
              <Image
                src="/qrcode.jpg"
                alt="WeChat Group QR Code"
                width={128}
                height={128}
                className="object-cover"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
} 