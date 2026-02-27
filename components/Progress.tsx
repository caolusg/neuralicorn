import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const Progress: React.FC = () => {
  const { t, language: lang } = useLanguage();
  
  const steps = [
    { title: t.progress.step1.title, status: t.progress.step1.status },
    { title: t.progress.step2.title, status: t.progress.step2.status },
    { title: t.progress.step3.title, status: t.progress.step3.status }
  ];

  return (
    <section id="progress" className="py-16 md:py-24 border-t border-white/5 scroll-mt-24">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-12 gap-10">
        <div className="md:col-span-4">
          <div className="flex flex-col h-full">
            <span className="text-xs uppercase tracking-[0.25em] text-neutral-400 font-mono">
              {lang === 'zh' ? '03 / 进展' : '03 / PROGRESS'}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mt-3 mb-6">
              {t.progress.title}
            </h2>
            <p className="text-neutral-400 text-sm max-w-xs leading-relaxed mb-8">
              {t.progress.desc}
            </p>
            <div className="mt-auto">
              <a
                href={`/${lang}/progress`}
                className="inline-flex items-center justify-center px-6 py-2.5 rounded-full border border-white/20 text-white/90 bg-white/5 hover:border-white/50 hover:text-white hover:bg-white/10 transition-all text-xs font-semibold uppercase tracking-widest shadow-[0_0_0_1px_rgba(255,255,255,0.08)]"
              >
                {t.cta.viewTimeline} &rarr;
              </a>
            </div>
          </div>
        </div>

        <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-12 md:gap-8 pt-3">
          {steps.map((step, index) => (
            <div key={index} className="group">
               <div className="w-12 h-[1px] bg-white/20 mb-8 group-hover:w-20 group-hover:bg-white transition-all duration-500"></div>
               <h3 className="text-lg font-semibold text-white mb-3 leading-tight">{step.title}</h3>
               <span className="text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold">{step.status}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Progress;
