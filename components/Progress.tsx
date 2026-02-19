import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const Progress: React.FC = () => {
  const { t } = useLanguage();
  
  const steps = [
    { title: t.progress.step1.title, status: t.progress.step1.status },
    { title: t.progress.step2.title, status: t.progress.step2.status },
    { title: t.progress.step3.title, status: t.progress.step3.status }
  ];

  return (
    <section id="progress" className="py-16 md:py-24 bg-neural-black border-t border-white/5 scroll-mt-24">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-12 gap-12">
        <div className="md:col-span-4">
          <h2 className="text-3xl font-bold tracking-tight text-white mb-4">{t.progress.title}</h2>
          <p className="text-neutral-500 text-sm max-w-xs">
            {t.progress.desc}
          </p>
        </div>
        
        <div className="md:col-span-8 flex flex-col space-y-8 md:space-y-0 md:flex-row md:justify-between md:items-start pt-2">
          {steps.map((step, index) => (
            <div key={index} className="flex-1 pr-4 group">
               <div className="w-12 h-[1px] bg-white/30 mb-6 group-hover:bg-white transition-colors duration-500"></div>
               <h3 className="text-lg font-medium text-white mb-2">{step.title}</h3>
               <span className="text-xs uppercase tracking-widest text-neutral-500 font-semibold">{step.status}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Progress;