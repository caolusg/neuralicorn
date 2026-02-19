export type Locale = 'zh' | 'en';
export type PageKey = 'home';

interface SeoLocaleContent {
  title: string;
  description: string;
  keywords: string;
}

export interface SeoPayload {
  title: string;
  description: string;
  keywords: string;
  canonical: string;
  alternates: {
    zh: string;
    en: string;
    xDefault: string;
  };
  openGraph: {
    title: string;
    description: string;
    url: string;
    siteName: string;
    type: 'website';
    image: string;
  };
  twitter: {
    card: 'summary_large_image';
    title: string;
    description: string;
    image: string;
  };
  jsonLd: Array<Record<string, unknown>>;
}

const SITE_URL = 'https://neuralicorn.com';
const OG_IMAGE_PATH = '/og.svg';

const localeContent: Record<PageKey, Record<Locale, SeoLocaleContent>> = {
  home: {
    zh: {
      title: '西湖灵犀 Neuralicorn｜西湖大学相关团队的中文脑机接口（BCI）',
      description:
        '西湖灵犀（Neuralicorn）与西湖大学相关团队在脑机接口（BCI）芯片与中文/汉语脑机接口方向开展研发，聚焦语言神经假肢与汉语神经解码系统。',
      keywords:
        '西湖灵犀,Neuralicorn,西湖大学,脑机接口,BCI,中文脑机接口,汉语脑机接口,语言神经假肢,汉语神经解码,曹路',
    },
    en: {
      title: 'Neuralicorn | Westlake University-affiliated Chinese Brain-Computer Interface (BCI)',
      description:
        'Neuralicorn is affiliated with Westlake University and focuses on brain-computer interface (BCI) chips and Chinese/Mandarin neural decoding for language neuroprosthesis systems.',
      keywords:
        'Neuralicorn,Westlake University,brain-computer interface,BCI,Chinese BCI,Mandarin neural decoding,language neuroprosthesis,Caolu',
    },
  },
};

const isLocale = (locale: string): locale is Locale => locale === 'zh' || locale === 'en';

export const getSeo = (locale: Locale, pageKey: PageKey): SeoPayload => {
  const selectedLocale: Locale = isLocale(locale) ? locale : 'zh';
  const content = localeContent[pageKey][selectedLocale];

  const canonical = `${SITE_URL}/?lang=${selectedLocale}`;
  const alternates = {
    zh: `${SITE_URL}/?lang=zh`,
    en: `${SITE_URL}/?lang=en`,
    xDefault: `${SITE_URL}/?lang=zh`,
  };

  const organizationJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Neuralicorn',
    alternateName: ['西湖灵犀'],
    url: SITE_URL,
    description:
      'Neuralicorn develops brain-computer interface (BCI) chips and Chinese/Mandarin neural decoding systems for language neuroprosthesis.',
    keywords: [
      '西湖大学',
      'Westlake University',
      '脑机接口',
      'Brain-Computer Interface',
      'BCI',
      '中文脑机接口',
      '汉语脑机接口',
      'Chinese BCI',
      '语言神经假肢',
      'Language Neuroprosthesis',
      '曹路',
      'Caolu',
    ],
    knowsAbout: [
      'Brain-Computer Interface',
      'BCI',
      'Chinese Brain-Computer Interface',
      'Mandarin neural decoding',
      'language neuroprosthesis',
      'neural interface chips',
    ],
    founder: {
      '@type': 'Person',
      name: 'Caolu',
      alternateName: '曹路',
    },
    affiliation: {
      '@type': 'Organization',
      name: 'Westlake University',
      alternateName: '西湖大学',
    },
  };

  const websiteJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Neuralicorn',
    alternateName: '西湖灵犀',
    url: SITE_URL,
    inLanguage: ['en', 'zh'],
    about: [
      { '@type': 'Thing', name: 'Brain-Computer Interface', alternateName: '脑机接口' },
      { '@type': 'Thing', name: 'Chinese Brain-Computer Interface', alternateName: '中文脑机接口' },
      { '@type': 'Thing', name: 'Westlake University', alternateName: '西湖大学' },
      { '@type': 'Person', name: 'Caolu', alternateName: '曹路' },
    ],
  };

  const ogImage = `${SITE_URL}${OG_IMAGE_PATH}`;

  return {
    title: content.title,
    description: content.description,
    keywords: content.keywords,
    canonical,
    alternates,
    openGraph: {
      title: content.title,
      description: content.description,
      url: canonical,
      siteName: 'Neuralicorn',
      type: 'website',
      image: ogImage,
    },
    twitter: {
      card: 'summary_large_image',
      title: content.title,
      description: content.description,
      image: ogImage,
    },
    jsonLd: [organizationJsonLd, websiteJsonLd],
  };
};
