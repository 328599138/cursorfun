export const locales = ['en', 'zh'] as const
export type Locale = typeof locales[number]

export const defaultLocale: Locale = 'zh'

export const dictionary = {
  en: {
    'nav.home': 'Home',
    'nav.rules': 'Rules',
    'theme.light': 'Light',
    'theme.dark': 'Dark',
    'theme.system': 'System',
  },
  zh: {
    'nav.home': '首页',
    'nav.rules': '规则',
    'theme.light': '浅色',
    'theme.dark': '深色',
    'theme.system': '系统',
  },
} as const

export type Dictionary = typeof dictionary 