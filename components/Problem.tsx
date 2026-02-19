import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const Problem: React.FC = () => {
  const { t } = useLanguage();
  return (
    <section id="mission" className="py-16 md:py-24 bg-neural-black relative border-t border-white/5 scroll-mt-24">
      {/* Changed max-w-4xl to max-w-7xl to align with the navbar and page grid */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-12 gap-12 items-start">
          <div className="md:col-span-5">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-8">
              {t.problem.titlePrefix} <br />
              <span className="text-neutral-500">{t.problem.titleSuffix}</span>
            </h2>
          </div>
          <div className="md:col-span-7 md:pl-10">
            <p className="text-lg text-neutral-300 font-light leading-relaxed mb-6">
              {t.problem.p1}
            </p>
            <p className="text-lg text-neutral-300 font-light leading-relaxed">
              {t.problem.p2}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Problem;