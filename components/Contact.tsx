import React from 'react';
import { MapPin, ArrowRight } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const Contact: React.FC = () => {
  const { t, language: lang } = useLanguage();
  const sectionLabel = lang === 'zh' ? '05 / 联系' : '05 / CONTACT';

  return (
    <section id="contact" className="py-16 md:py-20 border-t border-white/5 scroll-mt-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-12 gap-12">
          {/* Left Side: Header & Intro */}
          <div className="lg:col-span-4">
            <span className="text-xs uppercase tracking-[0.25em] text-neutral-500 font-mono block mb-4">
              {sectionLabel}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 tracking-tight">
              {t.contact.title}
            </h2>
            <p className="text-neutral-400 font-light text-sm leading-relaxed max-w-sm mb-8">
              {t.contact.desc}
            </p>
            <a
              href={`/${lang}/contact`}
              className="group inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white hover:text-neutral-300 transition-colors"
            >
              {t.cta.viewContact}
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </a>
          </div>

          {/* Right Side: Info Grid */}
          <div className="lg:col-span-8 grid md:grid-cols-2 gap-12">
            {/* Emails Column */}
            <div className="space-y-8">
              <h3 className="text-xs uppercase tracking-widest text-neutral-500 font-bold border-b border-white/10 pb-2">
                {lang === 'zh' ? '电子邮箱' : 'EMAIL INQUIRIES'}
              </h3>
              <div className="space-y-6">
                {[
                  { label: lang === 'zh' ? '常规咨询' : 'General', email: t.contact.emails.general },
                  { label: lang === 'zh' ? '商务合作' : 'Partnerships', email: t.contact.emails.partners },
                  { label: lang === 'zh' ? '加入我们' : 'Careers', email: t.contact.emails.career },
                ].map((item, i) => (
                  <div key={i} className="group">
                    <span className="block text-[10px] uppercase tracking-wider text-neutral-600 mb-1 font-mono">
                      {item.label}
                    </span>
                    <a 
                      href={`mailto:${item.email}`} 
                      className="text-neutral-300 hover:text-white transition-colors text-sm font-medium"
                    >
                      {item.email}
                    </a>
                  </div>
                ))}
              </div>
            </div>

            {/* Locations Column */}
            <div className="space-y-8">
              <h3 className="text-xs uppercase tracking-widest text-neutral-500 font-bold border-b border-white/10 pb-2">
                {lang === 'zh' ? '办公地点' : 'LOCATIONS'}
              </h3>
              <div className="space-y-6">
                {[
                  { title: t.contact.locations.beijing.title, desc: t.contact.locations.beijing.desc },
                  { title: t.contact.locations.hangzhou.title, desc: t.contact.locations.hangzhou.desc },
                  { title: t.contact.locations.xihu.title, desc: t.contact.locations.xihu.desc },
                ].map((loc, i) => (
                  <div key={i} className="flex gap-3">
                    <MapPin size={14} className="text-neutral-600 mt-1 shrink-0" />
                    <div>
                      <h4 className="text-sm font-semibold text-neutral-200 mb-0.5">{loc.title}</h4>
                      <p className="text-xs text-neutral-500 leading-relaxed">{loc.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
