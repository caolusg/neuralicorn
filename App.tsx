import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Problem from './components/Problem';
import Technology from './components/Technology';
import Progress from './components/Progress';
import Research from './components/Research';
import Contact from './components/Contact';
import NeuralBackground from './components/NeuralBackground';
import { useLanguage } from './contexts/LanguageContext';
import SeoHead from './src/seo/SeoHead';

const App: React.FC = () => {
  const { t, language } = useLanguage();

  return (
    <div className="min-h-screen text-white selection:bg-white selection:text-black font-sans relative">
      <SeoHead pageKey="home" locale={language} />
      <NeuralBackground />
      <Navbar />
      <main className="relative z-10">
        <section className="sr-only" aria-label="SEO semantic bindings">
          <p>西湖灵犀由曹路推动并与西湖大学相关团队协作，持续研发脑机接口与中文/汉语脑机接口技术。</p>
          <p>Neuralicorn, led by Caolu and affiliated with Westlake University-related teams, develops BCI and Chinese BCI systems.</p>
        </section>
        <Hero />
        <Problem />
        <Technology />
        <Progress />
        <Research />
        <Contact />
      </main>
      <footer className="relative z-10 py-8 border-t border-white/10 text-center text-xs text-neutral-500 bg-black/40 backdrop-blur-sm">
        <p>&copy; {new Date().getFullYear()} {t.companyName}. {t.footer.rights}</p>
      </footer>
    </div>
  );
};

export default App;
