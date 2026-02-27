import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Problem from './components/Problem';
import Technology from './components/Technology';
import Progress from './components/Progress';
import Research from './components/Research';
import Contact from './components/Contact';
import NeuralBackground from './components/NeuralBackground';
import Footer from './components/Footer';
import { useLanguage } from './contexts/LanguageContext';
import SeoHead from './src/seo/SeoHead';
import { PageKey } from './src/seo/seoConfig';
import {
  MissionPage,
  TechnologyPage,
  ProgressPage,
  FoundationPage,
  ContactPage,
  TechChipPage,
  TechDecodingPage,
  TechSystemPage,
} from './pages/DeepPages';

const getPathAfterLocale = (pathname: string) => {
  const segments = pathname.split('/').filter(Boolean);
  const isLocale = segments[0] === 'en' || segments[0] === 'zh';
  return isLocale ? segments.slice(1).join('/') : segments.join('/');
};

const getPageKeyFromPath = (pathname: string): PageKey => {
  const path = getPathAfterLocale(pathname);
  if (!path) return 'home';
  if (path === 'mission') return 'mission';
  if (path === 'technology') return 'technology';
  if (path === 'progress') return 'progress';
  if (path === 'foundation') return 'foundation';
  if (path === 'contact') return 'contact';
  if (path === 'technology/high-density-neural-interface-chip') return 'tech-chip';
  if (path === 'technology/mandarin-neural-decoding-model') return 'tech-decoding';
  if (path === 'technology/implantable-bci-system-architecture') return 'tech-system';
  return 'home';
};

const App: React.FC = () => {
  const { t, language } = useLanguage();
  const pageKey = getPageKeyFromPath(window.location.pathname);

  return (
    <div className="min-h-screen text-white selection:bg-white selection:text-black font-sans relative">
      <SeoHead pageKey={pageKey} locale={language} />
      <NeuralBackground />
      <Navbar />
      <main className="relative z-10">
        {pageKey === 'home' && (
          <>
            <section className="sr-only" aria-label="SEO semantic bindings">
              <p>{t.hero.description}</p>
              <p>{t.problem.p1}</p>
            </section>
            <Hero />
            <Problem />
            <Technology />
            <Progress />
            <Research />
            <Contact />
          </>
        )}
        {pageKey === 'mission' && <MissionPage />}
        {pageKey === 'technology' && <TechnologyPage />}
        {pageKey === 'progress' && <ProgressPage />}
        {pageKey === 'foundation' && <FoundationPage />}
        {pageKey === 'contact' && <ContactPage />}
        {pageKey === 'tech-chip' && <TechChipPage />}
        {pageKey === 'tech-decoding' && <TechDecodingPage />}
        {pageKey === 'tech-system' && <TechSystemPage />}
      </main>
      <Footer />
    </div>
  );
};

export default App;
