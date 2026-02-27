export type Locale = 'zh' | 'en';
export type PageKey =
  | 'home'
  | 'mission'
  | 'technology'
  | 'progress'
  | 'foundation'
  | 'contact'
  | 'tech-chip'
  | 'tech-decoding'
  | 'tech-system';

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
    locale: string;
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
  mission: {
    zh: {
      title: '使命 | Neuralicorn',
      description: '了解我们如何恢复神经疾病患者的自主性并扩展人类潜能。',
      keywords: '使命,BCI,神经接口,神经义肢,Neuralicorn',
    },
    en: {
      title: 'Mission | Neuralicorn',
      description: 'Learn how we restore autonomy and expand human potential through neural interfaces.',
      keywords: 'mission,BCI,neural interface,neuroprosthesis,Neuralicorn',
    },
  },
  technology: {
    zh: {
      title: '技术总览 | Neuralicorn',
      description: '探索神经接口芯片、解码模型与植入式系统架构。',
      keywords: '技术,神经接口芯片,解码模型,植入式BCI,Neuralicorn',
    },
    en: {
      title: 'Technology Overview | Neuralicorn',
      description: 'Explore neural interface chips, decoding models, and implantable system architecture.',
      keywords: 'technology,neural interface chip,decoding model,implantable BCI,Neuralicorn',
    },
  },
  progress: {
    zh: {
      title: '进展 | Neuralicorn',
      description: '了解我们在临床与监管路线上的里程碑。',
      keywords: '进展,里程碑,临床试验,BCI,Neuralicorn',
    },
    en: {
      title: 'Progress | Neuralicorn',
      description: 'Track our clinical and regulatory milestones.',
      keywords: 'progress,milestones,clinical trials,BCI,Neuralicorn',
    },
  },
  foundation: {
    zh: {
      title: '研究基础 | Neuralicorn',
      description: '了解 Neuralicorn 的研究基础与跨学科合作框架。',
      keywords: '研究基础,科研,跨学科,神经科学,Neuralicorn',
    },
    en: {
      title: 'Research Foundation | Neuralicorn',
      description: 'The research foundation and interdisciplinary framework behind Neuralicorn.',
      keywords: 'research foundation,interdisciplinary,neuroscience,Neuralicorn',
    },
  },
  contact: {
    zh: {
      title: '联系 | Neuralicorn',
      description: '与 Neuralicorn 团队取得联系。',
      keywords: '联系,合作,临床,研究,Neuralicorn',
    },
    en: {
      title: 'Contact | Neuralicorn',
      description: 'Get in touch with the Neuralicorn team.',
      keywords: 'contact,partnerships,clinical,research,Neuralicorn',
    },
  },
  'tech-chip': {
    zh: {
      title: '高密度神经接口芯片 | Neuralicorn',
      description: '1024 通道 ASIC 设计，面向低功耗神经信号采集。',
      keywords: '神经接口芯片,ASIC,低功耗,Neuralicorn',
    },
    en: {
      title: 'High Density Neural Chip | Neuralicorn',
      description: '1024-channel ASIC design optimized for low-power neural signal acquisition.',
      keywords: 'neural chip,ASIC,low power,Neuralicorn',
    },
  },
  'tech-decoding': {
    zh: {
      title: '中文神经解码模型 | Neuralicorn',
      description: '面向声调语言的神经解码模型与性能指标。',
      keywords: '神经解码,中文,声调,BCI,Neuralicorn',
    },
    en: {
      title: 'Mandarin Neural Decoding | Neuralicorn',
      description: 'Neural decoding models for tonal languages with low-latency performance.',
      keywords: 'neural decoding,mandarin,tonal language,BCI,Neuralicorn',
    },
  },
  'tech-system': {
    zh: {
      title: '植入式BCI系统架构 | Neuralicorn',
      description: '无线全植入式系统与安全特性。',
      keywords: '植入式BCI,系统架构,无线,Neuralicorn',
    },
    en: {
      title: 'Implantable BCI Architecture | Neuralicorn',
      description: 'Wireless, fully implantable system architecture with safety features.',
      keywords: 'implantable BCI,architecture,wireless,Neuralicorn',
    },
  },
};

const isLocale = (locale: string): locale is Locale => locale === 'zh' || locale === 'en';

export const getSeo = (locale: Locale, pageKey: PageKey): SeoPayload => {
  const selectedLocale: Locale = isLocale(locale) ? locale : 'en';
  const content = localeContent[pageKey][selectedLocale];
  const localePath = selectedLocale === 'zh' ? '/zh/' : '/en/';
  const pagePaths: Record<PageKey, string> = {
    home: '',
    mission: 'mission/',
    technology: 'technology/',
    progress: 'progress/',
    foundation: 'foundation/',
    contact: 'contact/',
    'tech-chip': 'technology/high-density-neural-interface-chip/',
    'tech-decoding': 'technology/mandarin-neural-decoding-model/',
    'tech-system': 'technology/implantable-bci-system-architecture/',
  };

  const pagePath = pagePaths[pageKey];
  const canonical = `${SITE_URL}${localePath}${pagePath}`;
  const alternates = {
    zh: `${SITE_URL}/zh/${pagePath}`,
    en: `${SITE_URL}/en/${pagePath}`,
    xDefault: `${SITE_URL}/en/${pagePath}`,
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
      locale: selectedLocale === 'zh' ? 'zh_CN' : 'en_US',
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
