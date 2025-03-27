import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type Language = 'en' | 'zh'

interface I18nStore {
  language: Language
  setLanguage: (language: Language) => void
}

// 使用 zustand 管理语言状态
export const useI18nStore = create<I18nStore>()(
  persist(
    (set) => ({
      language: 'zh', // 默认中文
      setLanguage: (language) => set({ language }),
    }),
    {
      name: 'language-storage',
    }
  )
)

// 翻译字典类型
type NestedKeyOf<T> = T extends object
  ? {
      [K in keyof T]: K extends string
        ? T[K] extends object
          ? `${K}.${NestedKeyOf<T[K]>}`
          : K
        : never;
    }[keyof T]
  : never;

// 翻译字典
export const dictionary = {
  en: {
    nav: {
      home: 'Home',
      rules: 'Rules',
      mcp: 'MCP',
      basic: 'Basic',
      open: 'Open menu',
      close: 'Close menu',
    },
    common: {
      contact: 'Contact',
      address: 'Address: Tieling, Liaoning, China',
      community: 'Community',
      copyright: 'All rights reserved.',
      explore: 'Start Exploring',
      recommended: 'Recommended',
      visitLink: 'Visit Link',
    },
    error: {
      title: 'Something went wrong',
      description: 'An error occurred while loading this page.',
      retry: 'Try Again',
    },
  },
  zh: {
    nav: {
      home: '首页',
      rules: '规则',
      mcp: 'MCP',
      basic: '基础',
      open: '打开菜单',
      close: '关闭菜单',
    },
    common: {
      contact: '联系方式',
      address: '地址: 中国辽宁铁岭',
      community: '交流群',
      copyright: '保留所有权利。',
      explore: '开始探索',
      recommended: '推荐',
      visitLink: '访问链接',
    },
    error: {
      title: '出错了',
      description: '加载页面时发生错误。',
      retry: '重试',
    },
  },
} as const

type TranslationKeys = NestedKeyOf<typeof dictionary.en>

// 获取翻译
export const t = (key: TranslationKeys, language: Language = useI18nStore.getState().language): string => {
  try {
    const keys = key.split('.')
    let result: any = dictionary[language]
    for (const k of keys) {
      result = result[k]
    }
    return result as string
  } catch (error) {
    console.error(`Translation key not found: ${key}`)
    return key
  }
}

export type Locale = 'zh' | 'en'

export const defaultLocale: Locale = 'zh'

type TranslationsType = {
  [K in Locale]: {
    chatGroup: {
      title: string
      description: string
      joinButton: string
      closeButton: string
    }
    common: {
      loading: string
      error: string
      retry: string
    }
  }
}

const translations: TranslationsType = {
  zh: {
    chatGroup: {
      title: '微信交流群',
      description: '扫描二维码加入群聊',
      joinButton: '加入群聊',
      closeButton: '关闭'
    },
    common: {
      loading: '加载中...',
      error: '出错了',
      retry: '重试'
    }
  },
  en: {
    chatGroup: {
      title: 'WeChat Group',
      description: 'Scan QR code to join the group',
      joinButton: 'Join Group',
      closeButton: 'Close'
    },
    common: {
      loading: 'Loading...',
      error: 'Error occurred',
      retry: 'Retry'
    }
  }
}

export type TranslationType = typeof translations.zh

export function getTranslations(locale: Locale): TranslationType {
  return translations[locale] || translations.zh
} 