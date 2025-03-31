export type Locale = 'en' | 'zh';

interface Translations {
  common: {
    scanQR: string;
  };
}

const translations: Record<Locale, Translations> = {
  en: {
    common: {
      scanQR: 'Scan QR code to join the community',
    },
  },
  zh: {
    common: {
      scanQR: '扫描二维码加入社区',
    },
  },
};

export function getTranslations(locale: Locale): Translations {
  return translations[locale] || translations.en;
} 