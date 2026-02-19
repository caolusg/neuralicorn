import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const Research: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section id="foundation" className="py-24 md:py-32 bg-neural-gray scroll-mt-24">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-8 text-white">{t.research.title}</h2>
        <div className="w-16 h-1 bg-white mx-auto mb-10 opacity-20"></div>
        <p className="text-lg md:text-xl text-neutral-300 font-light leading-relaxed">
          {t.research.desc}
        </p>
      </div>
    </section>
  );
};

export default Research;