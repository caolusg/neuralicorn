import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';

type Language = 'zh' | 'en';

interface Translations {
  companyName: string;
  navbar: {
    home: string;
    mission: string;
    technology: string;
    progress: string;
    foundation: string;
    contact: string;
  };
  hero: {
    titlePrefix: string;
    titleSuffix: string;
    description: string;
    learnMore: string;
    clinical: string;
  };
  problem: {
    titlePrefix: string;
    titleSuffix: string;
    p1: string;
    p2: string;
  };
  technology: {
    sectionTitle: string;
    mainTitle: string;
    description: string;
    card1: { title: string; text: string };
    card2: { title: string; text: string };
    card3: { title: string; text: string };
  };
  progress: {
    title: string;
    desc: string;
    step1: { title: string; status: string };
    step2: { title: string; status: string };
    step3: { title: string; status: string };
  };
  research: {
    title: string;
    desc: string;
  };
  contact: {
    title: string;
    desc: string;
    address: string;
    primaryEmail: string;
    emails: {
      general: string;
      press: string;
      partners: string;
      career: string;
    };
    locationsTitle: string;
    locations: {
      beijing: { title: string; desc: string };
      hangzhou: { title: string; desc: string };
      xihu: { title: string; desc: string };
    };
  };
  cta: {
    readFullMission: string;
    overview: string;
    viewTimeline: string;
    learnFoundation: string;
    viewContact: string;
    backToHome: string;
  };
  footer: {
    rights: string;
    tagline: string;
    sitemapTitle: string;
    technologyTitle: string;
    stayUpdated: string;
    stayUpdatedDesc: string;
    subscribePlaceholder: string;
    subscribeCta: string;
    privacy: string;
    terms: string;
  };
  pages: {
    mission: {
      title: string;
      intro: string;
      section1Title: string;
      section1Body: string;
      section2Title: string;
      section2Body: string;
      objectivesTitle: string;
      objectives: string[];
      joinTitle: string;
      joinBody: string;
      joinCta: string;
    };
    technology: {
      title: string;
      intro: string;
      whitepaperTitle: string;
      whitepaperDesc: string;
      whitepaperCta: string;
    };
    progress: {
      title: string;
      intro: string;
      timeline: Array<{ date: string; title: string; body: string; status: 'done' | 'inProgress' | 'planned' }>;
    };
    foundation: {
      title: string;
      intro: string;
      ethicsTitle: string;
      ethicsBody: string;
      accessTitle: string;
      accessBody: string;
      governanceTitle: string;
      governanceBody: string;
    };
    contact: {
      title: string;
      intro: string;
      departmentsTitle: string;
      officesTitle: string;
      departments: {
        clinical: { title: string; email: string; desc: string };
        research: { title: string; email: string };
        media: { title: string; email: string };
      };
      offices: {
        shanghai: { title: string; desc: string };
        sf: { title: string; desc: string };
        xihu: { title: string; desc: string };
      };
    };
    technologySubpages: {
      chip: {
        title: string;
        intro: string;
        stats: {
          channelsLabel: string;
          channelsValue: string;
          powerLabel: string;
          powerValue: string;
        };
        section1Title: string;
        section1Body: string;
        section2Title: string;
        section2Body: string;
      };
      decoding: {
        title: string;
        intro: string;
        section1Title: string;
        section1Body: string;
        metricsTitle: string;
        metrics: Array<{ label: string; value: string }>;
      };
      system: {
        title: string;
        intro: string;
        section1Title: string;
        section1Body: string;
        section2Title: string;
        section2Body: string;
        safetyTitle: string;
        safetyItems: string[];
      };
    };
  };
}

const STORAGE_KEY = 'neuralicorn-language';

const translations: Record<Language, Translations> = {
  zh: {
    companyName: '西湖灵犀',
    navbar: {
      home: '首页',
      mission: '使命',
      technology: '技术',
      progress: '进展',
      foundation: '研究基础',
      contact: '联系',
    },
    hero: {
      titlePrefix: '构建中文语言',
      titleSuffix: '神经义肢',
      description: '高通量脑机接口芯片，实现中文神经信号的直接解码。',
      learnMore: '了解更多',
      clinical: '临床合作',
    },
    problem: {
      titlePrefix: '通过脑信号',
      titleSuffix: '重塑语言能力',
      p1: '失语症和中风导致的语言丧失切断了思维与表达的连接。虽然通用脑机接口已取得进展，但中文独特的声调与字符复杂性需要专门的高密度神经接口与解码模型。',
      p2: '我们致力于跨越这一鸿沟，构建中文大脑直接转文字通信的基础层。',
    },
    technology: {
      sectionTitle: '核心技术',
      mainTitle: '集成神经系统',
      description: '我们的架构连接生物神经网络与数字计算，带来前所未有的带宽与可扩展性。',
      card1: { title: '高密度神经接口芯片', text: '专为高分辨率皮层语言信号采集设计的植入式多通道神经记录架构。' },
      card2: { title: '中文神经解码模型', text: '针对声调和字符语言重构优化的深度神经解码算法。' },
      card3: { title: '植入式BCI系统架构', text: '集芯片、信号处理与语言输出于一体的实时通信恢复框架。' },
    },
    progress: {
      title: '研发进展',
      desc: '从硅基芯片到神经突触的系统化推进，确保每个阶段的安全性与有效性。',
      step1: { title: '芯片流片与验证', status: '已完成' },
      step2: { title: '临床前信号验证', status: '进行中' },
      step3: { title: '临床转化路径', status: '规划中' },
    },
    research: {
      title: '科研基石',
      desc: '由微电子、系统神经科学和人工智能领域的跨学科专家团队创立。我们的工作依托国家级科研项目，并通过顶级临床机构的严格验证。我们将科学严谨性与患者安全置于首位。',
    },
    contact: {
      title: '联系我们',
      desc: '欢迎临床、学术及产业界的合作洽谈。',
      address: '北京 · 杭州 · 西湖大学云谷校区',
      primaryEmail: 'contact@neuralicorn.com',
      emails: {
        general: 'contact@neuralicorn.com',
        press: 'press@neuralicorn.com',
        partners: 'partners@neuralicorn.com',
        career: 'career@neuralicorn.com',
      },
      locationsTitle: '全球中心',
      locations: {
        beijing: { title: '北京', desc: '临床与转化合作中心' },
        hangzhou: { title: '杭州', desc: '算法与芯片研发中心' },
        xihu: { title: '西湖大学', desc: '科研与人才培养中心' },
      },
    },
    cta: {
      readFullMission: '阅读完整使命',
      overview: '概览',
      viewTimeline: '查看时间线',
      learnFoundation: '了解研究基础',
      viewContact: '查看详细联系信息',
      backToHome: '返回首页',
    },
    footer: {
      rights: '保留所有权利。',
      tagline: '解码人类智能的未来。',
      sitemapTitle: '站点地图',
      technologyTitle: '技术',
      stayUpdated: '订阅更新',
      stayUpdatedDesc: '订阅我们的研究动态。',
      subscribePlaceholder: '邮箱地址',
      subscribeCta: 'Go',
      privacy: '隐私政策',
      terms: '服务条款',
    },
    pages: {
      mission: {
        title: '我们的使命',
        intro: '我们致力于恢复神经疾病患者的自主性，并在更长远的未来扩展人类潜能。',
        section1Title: '恢复自主',
        section1Body: '我们的首要应用是帮助瘫痪患者通过大脑信号直接控制设备。',
        section2Title: '高保真沟通',
        section2Body: '面向中文声调语言的神经解码是关键突破，带来更准确的语义重建。',
        objectivesTitle: '关键目标',
        objectives: [
          '打造安全、全植入、外观隐形的BCI设备。',
          '将电极通道数提升至更高规模。',
          '推动神经医疗的可及性。',
        ],
        joinTitle: '加入使命',
        joinBody: '我们正在寻找世界级工程师与科研伙伴。',
        joinCta: '联系合作',
      },
      technology: {
        title: '技术总览',
        intro: '我们在芯片、算法与系统集成上构建完整技术栈。',
        whitepaperTitle: '技术白皮书',
        whitepaperDesc: '深入了解信号处理与材料科学。',
        whitepaperCta: '申请访问',
      },
      progress: {
        title: '进展与里程碑',
        intro: '面向III类医疗器械，我们以严谨的验证流程推进。',
        timeline: [
          {
            date: '2023 Q4',
            title: '预临床验证',
            body: '完成灵长类安全性研究，验证长期生物相容性。',
            status: 'done',
          },
          {
            date: '2024 Q2',
            title: 'IDE 申报',
            body: '向监管机构提交临床试验申请与材料。',
            status: 'inProgress',
          },
          {
            date: '2025',
            title: '首次人体试验',
            body: '启动针对四肢瘫痪患者的安全性与解码有效性评估。',
            status: 'planned',
          },
        ],
      },
      foundation: {
        title: '研究基础',
        intro: '我们的研究基础来自系统神经科学、微电子与人工智能的交叉融合。',
        ethicsTitle: '研究框架',
        ethicsBody: '以系统性实验与可重复验证为核心，确保每项发现具有临床可转化潜力。',
        accessTitle: '临床协作',
        accessBody: '与顶级临床机构合作，确保研究结果满足真实场景需求。',
        governanceTitle: '学术网络',
        governanceBody: '通过跨学科合作网络构建稳健的研究路线图与人才体系。',
      },
      contact: {
        title: '联系',
        intro: '请通过以下邮箱联系，我们不使用表单以保护数据安全。',
        departmentsTitle: '联系与合作',
        officesTitle: '全球办公室',
        departments: {
          clinical: {
            title: '联系',
            email: 'contact@neuralicorn.com',
            desc: '综合咨询与对外联系。',
          },
          research: { title: '合作', email: 'partners@neuralicorn.com' },
          media: { title: '应聘', email: 'career@neuralicorn.com' },
        },
        offices: {
          shanghai: { title: '北京', desc: '临床与转化合作中心' },
          sf: { title: '杭州', desc: '算法与芯片研发中心' },
          xihu: { title: '西湖大学', desc: '科研与人才培养中心' },
        },
      },
      technologySubpages: {
        chip: {
          title: '高密度神经接口芯片 (N1)',
          intro: '1024 通道 ASIC 设计，面向低功耗信号采集。',
          stats: {
            channelsLabel: '通道数',
            channelsValue: '1,024',
            powerLabel: '功耗密度',
            powerValue: '8 uW/Ch',
          },
          section1Title: '信号采集挑战',
          section1Body: '记录单个神经元需要极低噪声与高采样率，N1 在芯片上完成放大、滤波与数字化。',
          section2Title: '芯片内尖峰检测',
          section2Body: '通过实时尖峰检测，仅传输有效数据包以节省带宽与功耗。',
        },
        decoding: {
          title: '中文神经解码模型',
          intro: '针对声调语言构建的解码模型，保留语义中的音高信息。',
          section1Title: '声调映射',
          section1Body: '模型将神经活动映射至音素与音高轮廓，实现高保真语音重建。',
          metricsTitle: '性能指标',
          metrics: [
            { label: '词错误率 (WER)', value: '9.2%' },
            { label: '词汇规模', value: '5,000+ 词' },
            { label: '解码延迟', value: '45ms' },
          ],
        },
        system: {
          title: '植入式 BCI 系统架构',
          intro: '无线、全植入式系统，专为长期稳定运行设计。',
          section1Title: '隐形植入',
          section1Body: '设备与颅骨齐平，置于皮肤下不可见。',
          section2Title: '感应充电',
          section2Body: '外部电池通过皮肤为植入体无线供电。',
          safetyTitle: '安全特性',
          safetyItems: [
            '持续温度监测，避免组织升温。',
            '加密无线协议保护数据传输。',
            '故障保护与安全关断机制。',
          ],
        },
      },
    },
  },
  en: {
    companyName: 'NEURALICORN',
    navbar: {
      home: 'Home',
      mission: 'Mission',
      technology: 'Technology',
      progress: 'Progress',
      foundation: 'Research',
      contact: 'Contact',
    },
    hero: {
      titlePrefix: 'Building the Chinese Language',
      titleSuffix: 'Neuroprosthesis',
      description: 'High-throughput brain-computer interface chips enabling direct decoding of Mandarin neural signals.',
      learnMore: 'Learn More',
      clinical: 'Clinical Collaboration',
    },
    problem: {
      titlePrefix: 'Restoring Language',
      titleSuffix: 'Through Brain Signals',
      p1: 'Aphasia and stroke-related language loss disconnect the mind from expression. While progress has been made in general BCI, the unique tonal and character-based complexity of Mandarin requires specialized high-density neural interfaces and decoding models.',
      p2: 'We are bridging this gap, engineering the fundamental layer for direct brain-to-text communication in Chinese.',
    },
    technology: {
      sectionTitle: 'Core Technology',
      mainTitle: 'Integrated Neural Systems',
      description: 'Our architecture bridges biological neural networks and digital computation with unprecedented bandwidth.',
      card1: { title: 'High-Density Neural Interface Chip', text: 'Implantable multi-channel neural recording architecture designed for high-resolution cortical language signal acquisition.' },
      card2: { title: 'Mandarin Neural Decoding Model', text: 'Deep neural decoding algorithms optimized for tonal and character-based language reconstruction.' },
      card3: { title: 'Implantable BCI System Architecture', text: 'Integrated chip, signal processing, and language output framework for real-time communication restoration.' },
    },
    progress: {
      title: 'Development Status',
      desc: 'Systematically advancing from silicon to synapse, ensuring safety and efficacy at every stage.',
      step1: { title: 'Chip Generation & Validation', status: 'Completed' },
      step2: { title: 'Pre-clinical Signal Verification', status: 'In Progress' },
      step3: { title: 'Clinical Translation Pathway', status: 'Planning' },
    },
    research: {
      title: 'Scientific Foundation',
      desc: 'Founded by an interdisciplinary team of experts in microelectronics, systems neuroscience, and artificial intelligence. Our work is backed by national-level research projects and rigorously validated through partnerships with top-tier clinical institutions. We prioritize scientific integrity and patient safety above all else.',
    },
    contact: {
      title: 'Contact',
      desc: 'We welcome clinical, academic, and industrial collaboration.',
      address: 'Beijing · Hangzhou · Westlake University Yungu Campus',
      primaryEmail: 'contact@neuralicorn.com',
      emails: {
        general: 'contact@neuralicorn.com',
        press: 'press@neuralicorn.com',
        partners: 'partners@neuralicorn.com',
        career: 'career@neuralicorn.com',
      },
      locationsTitle: 'Global Centers',
      locations: {
        beijing: { title: 'Beijing', desc: 'Clinical & Translation Hub' },
        hangzhou: { title: 'Hangzhou', desc: 'AI & Chip R&D Hub' },
        xihu: { title: 'Westlake University', desc: 'Research & Talent Center' },
      },
    },
    cta: {
      readFullMission: 'Read Full Mission',
      overview: 'Overview',
      viewTimeline: 'View Timeline',
      learnFoundation: 'Learn About The Research',
      viewContact: 'View Detailed Contact Info',
      backToHome: 'Back to Home',
    },
    footer: {
      rights: 'All rights reserved.',
      tagline: 'Decoding the future of human intelligence.',
      sitemapTitle: 'Sitemap',
      technologyTitle: 'Technology',
      stayUpdated: 'Stay Updated',
      stayUpdatedDesc: 'Subscribe to our research updates.',
      subscribePlaceholder: 'Email address',
      subscribeCta: 'Go',
      privacy: 'Privacy Policy',
      terms: 'Terms of Service',
    },
    pages: {
      mission: {
        title: 'Our Mission',
        intro: 'We exist to restore autonomy and expand human potential through neural interfaces.',
        section1Title: 'Restoring Autonomy',
        section1Body: 'Our first application focuses on helping patients with paralysis regain control of digital devices through direct neural intent.',
        section2Title: 'High-Fidelity Communication',
        section2Body: 'Mandarin decoding introduces tonal complexity that demands higher channel counts and advanced models.',
        objectivesTitle: 'Key Objectives',
        objectives: [
          'Build a safe, fully implantable, cosmetically invisible BCI.',
          'Scale channel count to higher electrode densities.',
          'Democratize access to neural healthcare.',
        ],
        joinTitle: 'Join the Mission',
        joinBody: 'We are looking for world-class engineers to help us close the loop.',
        joinCta: 'Contact Careers',
      },
      technology: {
        title: 'Technology Overview',
        intro: 'We engineer every layer of the interface, from electrodes to AI-driven decoding.',
        whitepaperTitle: 'Technical Whitepaper',
        whitepaperDesc: 'Deep dive into our signal processing and material science.',
        whitepaperCta: 'Request Access',
      },
      progress: {
        title: 'Progress & Milestones',
        intro: 'Developing a Class III medical device requires rigorous testing and transparency.',
        timeline: [
          {
            date: '2023 Q4',
            title: 'Pre-clinical Validation',
            body: 'Completed primate safety studies demonstrating long-term biocompatibility.',
            status: 'done',
          },
          {
            date: '2024 Q2',
            title: 'IDE Submission',
            body: 'Investigational Device Exemption submitted to regulatory bodies.',
            status: 'inProgress',
          },
          {
            date: '2025',
            title: 'First-in-Human Trial',
            body: 'Targeting PRIME-CN study initiation for quadriplegic patients.',
            status: 'planned',
          },
        ],
      },
      foundation: {
        title: 'Research Foundation',
        intro: 'Our research foundation is built on systems neuroscience, microelectronics, and AI collaboration.',
        ethicsTitle: 'Research Framework',
        ethicsBody: 'We prioritize reproducible experiments and clinically grounded validation at every stage.',
        accessTitle: 'Clinical Partnerships',
        accessBody: 'Close collaboration with clinical institutions ensures real-world relevance.',
        governanceTitle: 'Academic Network',
        governanceBody: 'A cross-disciplinary network supports a sustainable research roadmap.',
      },
      contact: {
        title: 'Contact',
        intro: 'We do not use contact forms to ensure data security. Reach us via the emails below.',
        departmentsTitle: 'Contact & Partnerships',
        officesTitle: 'Global Centers',
        departments: {
          clinical: {
            title: 'Contact',
            email: 'contact@neuralicorn.com',
            desc: 'General inquiries and external contact.',
          },
          research: { title: 'Partnerships', email: 'partners@neuralicorn.com' },
          media: { title: 'Careers', email: 'career@neuralicorn.com' },
        },
        offices: {
          shanghai: { title: 'Beijing', desc: 'Clinical & Translation Hub' },
          sf: { title: 'Hangzhou', desc: 'AI & Chip R&D Hub' },
          xihu: { title: 'Westlake University', desc: 'Research & Talent Center' },
        },
      },
      technologySubpages: {
        chip: {
          title: 'High Density Neural Interface Chip (N1)',
          intro: '1024-channel ASIC design optimized for low-power signal acquisition.',
          stats: {
            channelsLabel: 'Channels',
            channelsValue: '1,024',
            powerLabel: 'Power Density',
            powerValue: '8 uW/Ch',
          },
          section1Title: 'The Signal Acquisition Problem',
          section1Body: 'Recording single neurons requires extremely low noise floors and high sampling rates.',
          section2Title: 'On-Chip Spike Detection',
          section2Body: 'Real-time spike detection reduces bandwidth and cuts power consumption dramatically.',
        },
        decoding: {
          title: 'Mandarin Neural Decoding Model',
          intro: 'A decoder built for tonal languages, preserving pitch contours and meaning.',
          section1Title: 'Tonal Mapping',
          section1Body: 'Our transformer architecture maps neural activity to phonemes and pitch contours.',
          metricsTitle: 'Performance Metrics',
          metrics: [
            { label: 'Word Error Rate (WER)', value: '9.2%' },
            { label: 'Vocabulary Size', value: '5,000+ Words' },
            { label: 'Decoding Lag', value: '45ms' },
          ],
        },
        system: {
          title: 'Implantable BCI System Architecture',
          intro: 'A wireless, fully implantable system built for decades of operation.',
          section1Title: 'Fully Invisible',
          section1Body: 'The implant is flush with the skull and invisible under the skin.',
          section2Title: 'Inductive Charging',
          section2Body: 'A compact external battery sends power wirelessly through the skin.',
          safetyTitle: 'Safety Features',
          safetyItems: [
            'Continuous temperature monitoring to prevent tissue heating.',
            'Secure, encrypted wireless protocol for data transmission.',
            'Fail-safe shutdown modes.',
          ],
        },
      },
    },
  }
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const isLanguage = (value: string | null): value is Language => value === 'zh' || value === 'en';

const getLanguageFromPath = (pathname: string): Language | null => {
  const segment = pathname.split('/').filter(Boolean)[0] ?? '';
  return isLanguage(segment) ? segment : null;
};

const getPathAfterLanguage = (pathname: string) => {
  const segments = pathname.split('/').filter(Boolean);
  if (segments.length === 0) return '';
  const startsWithLanguage = isLanguage(segments[0]);
  return startsWithLanguage ? segments.slice(1).join('/') : segments.join('/');
};

const buildLocalizedPath = (lang: Language, pathAfterLang: string, hash: string) => {
  const normalized = pathAfterLang.replace(/^\/+/, '').replace(/\/+$/, '');
  const path = normalized ? `/${lang}/${normalized}` : `/${lang}/`;
  return `${path}${hash}`;
};

const getBrowserLanguage = (): Language => (navigator.language.toLowerCase().startsWith('zh') ? 'zh' : 'en');

const getInitialLanguage = (): Language => {
  if (typeof window === 'undefined') return 'en';

  const pathLanguage = getLanguageFromPath(window.location.pathname);
  if (pathLanguage) return pathLanguage;

  const savedLanguage = localStorage.getItem(STORAGE_KEY);
  if (isLanguage(savedLanguage)) return savedLanguage;

  const legacyLang = new URLSearchParams(window.location.search).get('lang');
  if (isLanguage(legacyLang)) return legacyLang;

  return getBrowserLanguage();
};

const normalizeLanguagePath = (lang: Language, replace = true) => {
  const url = new URL(window.location.href);
  const pathAfterLang = getPathAfterLanguage(url.pathname);
  const targetPath = buildLocalizedPath(lang, pathAfterLang, url.hash);
  if (`${url.pathname}${url.hash}` !== targetPath) {
    const method = replace ? 'replaceState' : 'pushState';
    window.history[method]({}, '', targetPath);
  }
};

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(getInitialLanguage);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem(STORAGE_KEY, lang);
    const pathAfterLang = getPathAfterLanguage(window.location.pathname);
    const nextPath = buildLocalizedPath(lang, pathAfterLang, window.location.hash);
    window.history.pushState({}, '', nextPath);
  };

  useEffect(() => {
    const pathLanguage = getLanguageFromPath(window.location.pathname);
    const selected = pathLanguage ?? getInitialLanguage();

    setLanguageState(selected);
    localStorage.setItem(STORAGE_KEY, selected);
    normalizeLanguagePath(selected, true);

    const handlePopState = () => {
      const nextLanguage = getLanguageFromPath(window.location.pathname);
      const fallback = nextLanguage ?? 'en';
      setLanguageState(fallback);
      localStorage.setItem(STORAGE_KEY, fallback);
      if (!nextLanguage) {
        normalizeLanguagePath(fallback, true);
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t: translations[language] }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
