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

const App: React.FC = () => {
  const { t } = useLanguage();
  return (
    <div className="min-h-screen text-white selection:bg-white selection:text-black font-sans relative">
      <NeuralBackground />
      <Navbar />
      <main className="relative z-10">
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