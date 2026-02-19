import React from 'react';
import { Cpu, Brain, Network } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface TechCardProps {
  icon: React.ReactNode;
  title: string;
  text: string;
}

const TechCard: React.FC<TechCardProps> = ({ icon, title, text }) => (
  <div className="bg-neural-dark border border-white/10 p-8 hover:border-white/30 transition-colors duration-300 h-full flex flex-col group">
    <div className="mb-6 text-neutral-500 group-hover:text-white transition-colors duration-300">
      {icon}
    </div>
    <h3 className="text-xl font-semibold mb-4 text-white tracking-wide">{title}</h3>
    <p className="text-neutral-400 leading-relaxed text-sm font-light">
      {text}
    </p>
  </div>
);

const Technology: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section id="technology" className="py-24 md:py-32 bg-neural-black scroll-mt-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16">
          <h2 className="text-sm font-bold uppercase tracking-widest text-neutral-500 mb-2">{t.technology.sectionTitle}</h2>
          <h3 className="text-3xl md:text-4xl font-bold">{t.technology.mainTitle}</h3>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6">
          <TechCard
            icon={<Cpu size={40} strokeWidth={1} />}
            title={t.technology.card1.title}
            text={t.technology.card1.text}
          />
          <TechCard
            icon={<Brain size={40} strokeWidth={1} />}
            title={t.technology.card2.title}
            text={t.technology.card2.text}
          />
          <TechCard
            icon={<Network size={40} strokeWidth={1} />}
            title={t.technology.card3.title}
            text={t.technology.card3.text}
          />
        </div>
      </div>
    </section>
  );
};

export default Technology;