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
  };
  footer: {
    rights: string;
  };
}

const translations: Record<Language, Translations> = {
  zh: {
    companyName: '西湖灵犀',
    navbar: {
      home: '首页',
      mission: '使命',
      technology: '技术',
      progress: '进展',
      foundation: '基础',
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
      address: '中国 北京 · 杭州',
    },
    footer: {
      rights: '保留所有权利。',
    }
  },
  en: {
    companyName: 'NEURALICORN',
    navbar: {
      home: 'Home',
      mission: 'Mission',
      technology: 'Technology',
      progress: 'Progress',
      foundation: 'Foundation',
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
      address: 'Beijing & Hangzhou, China',
    },
    footer: {
      rights: 'All rights reserved.',
    }
  }
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const getInitialLanguage = (): Language => {
  if (typeof window === 'undefined') {
    return 'zh';
  }

  const langParam = new URLSearchParams(window.location.search).get('lang');
  return langParam === 'en' || langParam === 'zh' ? langParam : 'zh';
};

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(getInitialLanguage);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    const url = new URL(window.location.href);
    url.searchParams.set('lang', lang);
    window.history.replaceState({}, '', `${url.pathname}?${url.searchParams.toString()}${url.hash}`);
  };

  useEffect(() => {
    const langParam = new URLSearchParams(window.location.search).get('lang');
    if (langParam === 'en' || langParam === 'zh') {
      setLanguageState(langParam);
    } else {
      const url = new URL(window.location.href);
      url.searchParams.set('lang', 'zh');
      window.history.replaceState({}, '', `${url.pathname}?${url.searchParams.toString()}${url.hash}`);
    }
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