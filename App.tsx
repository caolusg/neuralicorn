import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Problem from './components/Problem';
import Technology from './components/Technology';
import Progress from './components/Progress';
import Research from './components/Research';
import Contact from './components/Contact';
import { useLanguage } from './contexts/LanguageContext';

const App: React.FC = () => {
  const { t } = useLanguage();
  return (
    <div className="min-h-screen bg-neural-black text-white selection:bg-white selection:text-black font-sans">
      <Navbar />
      <main>
        <Hero />
        <Problem />
        <Technology />
        <Progress />
        <Research />
        <Contact />
      </main>
      <footer className="py-8 border-t border-white/10 text-center text-xs text-neutral-500">
        <p>&copy; {new Date().getFullYear()} {t.companyName}. {t.footer.rights}</p>
      </footer>
    </div>
  );
};

export default App;