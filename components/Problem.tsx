import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const Problem: React.FC = () => {
  const { t } = useLanguage();
  return (
    <section id="mission" className="py-24 md:py-32 bg-neural-black relative border-t border-white/5 scroll-mt-24">
      <div className="max-w-4xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-8">
              {t.problem.titlePrefix} <br />
              <span className="text-neutral-500">{t.problem.titleSuffix}</span>
            </h2>
          </div>
          <div>
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