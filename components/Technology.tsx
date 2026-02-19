import React, { useRef, useEffect } from 'react';
import { Cpu, Brain, Network, Zap } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface TechCardProps {
  icon: React.ReactNode;
  title: string;
  text: string;
}

const TechCard: React.FC<TechCardProps> = ({ icon, title, text }) => (
  <div className="group relative h-full bg-neural-dark border border-white/10 overflow-hidden hover:border-white/20 transition-colors duration-500 rounded-lg">
    {/* Glow Effect is handled by parent grid for unified mouse tracking, or we can use local tracking. 
        Here we rely on the group-hover and native CSS glow added in global styles. */}
    <div className="relative z-10 p-8 flex flex-col h-full">
      <div className="mb-6 inline-flex p-3 rounded-lg bg-white/5 text-white/80 group-hover:text-white group-hover:bg-white/10 transition-all duration-300 w-fit">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-4 text-white tracking-tight font-mono">{title}</h3>
      <p className="text-neutral-400 leading-relaxed text-sm font-light">
        {text}
      </p>
    </div>
    
    {/* Decorative corner */}
    <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
  </div>
);

const Technology: React.FC = () => {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e: MouseEvent) => {
      const cards = container.getElementsByClassName('group');
      for (const card of cards) {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        (card as HTMLElement).style.setProperty('--mouse-x', `${x}px`);
        (card as HTMLElement).style.setProperty('--mouse-y', `${y}px`);
      }
    };

    container.addEventListener('mousemove', handleMouseMove);
    return () => container.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section id="technology" className="py-24 md:py-32 bg-neural-black scroll-mt-24 relative overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
      
      <div className="relative max-w-7xl mx-auto px-6">
        <div className="mb-20 max-w-2xl">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
            <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-neutral-500">{t.technology.sectionTitle}</h2>
          </div>
          <h3 className="text-4xl md:text-5xl font-bold tracking-tighter text-white mb-6">
            {t.technology.mainTitle}
          </h3>
          <p className="text-neutral-400 font-light">
             Our proprietary architecture bridges the gap between biological neural networks and digital computation with unprecedented bandwidth.
          </p>
        </div>
        
        <div ref={containerRef} className="grid md:grid-cols-3 gap-6 group/grid">
          {/* We wrap cards to apply the radial gradient via style injection in JS */}
          <div className="group rounded-lg tech-card-glow transition-all duration-300">
            <TechCard
              icon={<Cpu size={32} strokeWidth={1.5} />}
              title={t.technology.card1.title}
              text={t.technology.card1.text}
            />
          </div>
          <div className="group rounded-lg tech-card-glow transition-all duration-300">
            <TechCard
              icon={<Brain size={32} strokeWidth={1.5} />}
              title={t.technology.card2.title}
              text={t.technology.card2.text}
            />
          </div>
          <div className="group rounded-lg tech-card-glow transition-all duration-300">
            <TechCard
              icon={<Network size={32} strokeWidth={1.5} />}
              title={t.technology.card3.title}
              text={t.technology.card3.text}
            />
          </div>
        </div>

        {/* Stats strip */}
        <div className="mt-20 border-t border-white/10 pt-10 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { label: 'Channels', value: '1024+' },
            { label: 'Latency', value: '<20ms' },
            { label: 'Data Rate', value: '200Mbps' },
            { label: 'Biocompatibility', value: 'Class III' },
          ].map((stat, i) => (
            <div key={i}>
              <div className="text-2xl md:text-3xl font-mono font-bold text-white mb-1">{stat.value}</div>
              <div className="text-xs text-neutral-500 uppercase tracking-wider">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Technology;