import React from 'react';
import { Mail } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const Contact: React.FC = () => {
  const { t, language: lang } = useLanguage();
  const sectionLabel = lang === 'zh' ? '05 / 联系' : '05 / CONTACT';

  return (
    <section id="contact" className="py-8 md:py-10 border-t border-white/5 scroll-mt-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-[minmax(0,1fr)_minmax(0,520px)] gap-12 items-start">
          <div className="max-w-2xl">
            <span className="text-xs uppercase tracking-[0.25em] text-neutral-400 font-mono">{sectionLabel}</span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mt-3 mb-4">{t.contact.title}</h2>
            <p className="text-neutral-400 font-light text-base md:text-lg mb-6 max-w-md">
              {t.contact.desc}
            </p>

            <div className="flex flex-col space-y-3 text-neutral-300">
              <div className="flex items-center gap-3">
                <Mail size={18} className="text-neutral-500" />
                <span className="text-neutral-500 text-sm">
                  {lang === 'zh' ? '联系：' : 'General Inquiries:'}
                </span>
                <a href={`mailto:${t.contact.emails.general}`} className="hover:text-white transition-colors">
                  {t.contact.emails.general}
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail size={18} className="text-neutral-500" />
                <span className="text-neutral-500 text-sm">
                  {lang === 'zh' ? '合作：' : 'Partnerships:'}
                </span>
                <a href={`mailto:${t.contact.emails.partners}`} className="hover:text-white transition-colors">
                  {t.contact.emails.partners}
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail size={18} className="text-neutral-500" />
                <span className="text-neutral-500 text-sm">
                  {lang === 'zh' ? '应聘：' : 'Careers:'}
                </span>
                <a href={`mailto:${t.contact.emails.career}`} className="hover:text-white transition-colors">
                  {t.contact.emails.career}
                </a>
              </div>
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-3xl p-4 max-w-[520px] w-full ml-auto shadow-[0_12px_40px_rgba(0,0,0,0.5)] mt-10 md:mt-12">
            <h3 className="text-white font-semibold mb-3 text-sm">{t.contact.locationsTitle}</h3>
            <div className="grid grid-cols-1 gap-3 text-base">
              <div>
                <h4 className="text-sm font-semibold text-white">{t.contact.locations.beijing.title}</h4>
                <p className="text-xs text-neutral-400">{t.contact.locations.beijing.desc}</p>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-white">{t.contact.locations.hangzhou.title}</h4>
                <p className="text-xs text-neutral-400">{t.contact.locations.hangzhou.desc}</p>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-white">{t.contact.locations.xihu.title}</h4>
                <p className="text-xs text-neutral-400">{t.contact.locations.xihu.desc}</p>
              </div>
            </div>
            <div className="mt-3">
              <a
                href={`/${lang}/contact`}
                className="inline-flex w-full items-center justify-center px-4 py-2 rounded-full border border-white/25 text-white/90 bg-white/5 hover:border-white/50 hover:text-white hover:bg-white/10 transition-all text-xs font-semibold tracking-wide shadow-[0_0_0_1px_rgba(255,255,255,0.1)]"
              >
                {t.cta.viewContact}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
