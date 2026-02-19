import React from 'react';
import { Mail, MapPin } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const Contact: React.FC = () => {
  const { t } = useLanguage();
  return (
    <section id="contact" className="py-24 bg-neural-black border-t border-white/5 scroll-mt-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end">
          
          <div className="mb-12 md:mb-0">
             <h2 className="text-2xl font-bold text-white mb-6">{t.contact.title}</h2>
             <p className="text-neutral-400 font-light text-lg mb-8 max-w-md">
               {t.contact.desc}
             </p>
             
             <div className="flex flex-col space-y-4">
               <div className="flex items-center text-neutral-300 group">
                 <Mail size={18} className="mr-4 text-neutral-500 group-hover:text-white transition-colors" />
                 <a href="mailto:contact@neuralicorn.com" className="hover:text-white transition-colors">contact@neuralicorn.com</a>
               </div>
               <div className="flex items-center text-neutral-300 group">
                 <MapPin size={18} className="mr-4 text-neutral-500 group-hover:text-white transition-colors" />
                 <span>{t.contact.address}</span>
               </div>
             </div>
          </div>

          <div className="text-right hidden md:block">
            <div className="text-4xl font-bold tracking-tighter text-neutral-800 uppercase select-none">{t.companyName}</div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Contact;