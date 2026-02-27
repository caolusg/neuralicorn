import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const Problem: React.FC = () => {
  const { t, language: lang } = useLanguage();
  return (
    <section id="mission" className="py-16 md:py-24 relative border-t border-white/5 scroll-mt-24">
      {/* Changed max-w-4xl to max-w-7xl to align with the navbar and page grid */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-12 gap-10 items-start">
          <div className="md:col-span-6">
            <span className="text-xs uppercase tracking-[0.25em] text-neutral-400 font-mono">
              {lang === 'zh' ? '01 / 使命' : '01 / MISSION'}
            </span>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">
              {t.problem.titlePrefix} <br />
              <span className="text-neutral-500">{t.problem.titleSuffix}</span>
            </h2>
          </div>
          <div className="md:col-span-6 md:pl-6">
            <p className="text-lg text-neutral-300 font-light leading-relaxed mb-6">
              {t.problem.p1}
            </p>
            <p className="text-lg text-neutral-300 font-light leading-relaxed">
              {t.problem.p2}
            </p>
            <div className="mt-8">
              <a
                href={`/${lang}/mission`}
                className="inline-flex items-center justify-center px-7 py-3 rounded-full border border-white/20 text-white/90 bg-white/5 hover:border-white/50 hover:text-white hover:bg-white/10 transition-all text-sm font-semibold tracking-wide shadow-[0_0_0_1px_rgba(255,255,255,0.08)]"
              >
                {t.cta.readFullMission}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Problem;
