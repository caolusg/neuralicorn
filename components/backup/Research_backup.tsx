import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const Research: React.FC = () => {
  const { t, language: lang } = useLanguage();

  return (
    <section id="foundation" className="py-16 md:py-24 bg-black/40 backdrop-blur-md scroll-mt-24 border-y border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <span className="text-xs uppercase tracking-[0.25em] text-neutral-400 font-mono">04 / {lang === 'zh' ? '研究基础' : 'FOUNDATION'}</span>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight mt-4 mb-8 text-white">{t.research.title}</h2>
        <div className="w-16 h-1 bg-white mb-10 opacity-20"></div>
        <p className="text-lg md:text-xl text-neutral-300 font-light leading-relaxed max-w-4xl">
          {t.research.desc}
        </p>
        <div className="mt-10">
          <a
            href={`/${lang}/foundation`}
            className="inline-flex items-center justify-center px-7 py-3 rounded-full border border-white/20 text-white/90 bg-white/5 hover:border-white/50 hover:text-white hover:bg-white/10 transition-all text-sm font-semibold tracking-wide shadow-[0_0_0_1px_rgba(255,255,255,0.08)]"
          >
            {t.cta.learnFoundation}
          </a>
        </div>
      </div>
    </section>
  );
};

export default Research;
