import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

interface PageShellProps {
  title: string;
  children: React.ReactNode;
}

const PageShell: React.FC<PageShellProps> = ({ title, children }) => {
  const { language, t } = useLanguage();
  return (
    <div className="pt-32 pb-20 min-h-screen bg-neural-black text-white">
      <div className="max-w-4xl mx-auto px-6">
        <a
          href={`/${language}/#home`}
          className="text-sm text-neutral-400 hover:text-white transition-colors inline-flex items-center gap-2 mb-8"
        >
          <span className="text-lg">&larr;</span>
          {t.cta.backToHome}
        </a>
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">{title}</h1>
        <div className="w-24 h-1 bg-white/20 mb-12"></div>
        <div className="space-y-8 text-neutral-300 leading-relaxed text-lg">
          {children}
        </div>
      </div>
    </div>
  );
};

export const MissionPage: React.FC = () => {
  const { t, language } = useLanguage();
  return (
    <PageShell title={t.pages.mission.title}>
      <p className="text-xl text-white font-light">{t.pages.mission.intro}</p>
      <div>
        <h2 className="text-2xl font-bold text-white mb-4">{t.pages.mission.section1Title}</h2>
        <p>{t.pages.mission.section1Body}</p>
      </div>
      <div>
        <h2 className="text-2xl font-bold text-white mb-4">{t.pages.mission.section2Title}</h2>
        <p>{t.pages.mission.section2Body}</p>
      </div>
      <div className="bg-neural-dark border border-white/10 p-6 rounded-xl">
        <h3 className="text-xl font-bold text-white mb-4">{t.pages.mission.objectivesTitle}</h3>
        <ul className="list-disc pl-5 space-y-2 text-neutral-400 text-base">
          {t.pages.mission.objectives.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
      <div className="pt-6 border-t border-white/10">
        <h3 className="text-white font-bold mb-3">{t.pages.mission.joinTitle}</h3>
        <p className="mb-6 text-neutral-400">{t.pages.mission.joinBody}</p>
        <a
          href={`/${language}/contact`}
          className="inline-flex items-center justify-center px-6 py-3 rounded-full border border-white/20 text-white hover:bg-white hover:text-black transition-colors text-sm font-semibold"
        >
          {t.pages.mission.joinCta}
        </a>
      </div>
    </PageShell>
  );
};

export const TechnologyPage: React.FC = () => {
  const { t, language } = useLanguage();
  const techs = [
    {
      title: t.technology.card1.title,
      text: t.technology.card1.text,
      href: `/${language}/technology/high-density-neural-interface-chip`,
      stat: '1024+ Ch',
      label: 'Channel Count',
    },
    {
      title: t.technology.card2.title,
      text: t.technology.card2.text,
      href: `/${language}/technology/mandarin-neural-decoding-model`,
      stat: '<20ms',
      label: 'Latency',
    },
    {
      title: t.technology.card3.title,
      text: t.technology.card3.text,
      href: `/${language}/technology/implantable-bci-system-architecture`,
      stat: '24 hrs',
      label: 'Battery Life',
    },
  ];

  return (
    <PageShell title={t.pages.technology.title}>
      <p className="text-xl text-neutral-200">{t.pages.technology.intro}</p>
      <div className="space-y-4">
        {techs.map((tech) => (
          <a
            key={tech.href}
            href={tech.href}
            className="group block border border-white/10 rounded-2xl p-6 md:p-8 bg-neural-dark/70 hover:border-white/30 transition-all"
          >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div>
                <h2 className="text-2xl font-bold text-white group-hover:text-white mb-2">{tech.title}</h2>
                <p className="text-neutral-400 text-base">{tech.text}</p>
              </div>
              <div className="flex items-center gap-6">
                <div className="text-right hidden md:block">
                  <p className="text-2xl font-mono text-white font-bold">{tech.stat}</p>
                  <p className="text-xs text-neutral-500 uppercase tracking-widest">{tech.label}</p>
                </div>
                <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
                  &rarr;
                </div>
              </div>
            </div>
          </a>
        ))}
      </div>
      <div className="mt-12 p-6 md:p-8 bg-neural-dark border border-white/10 rounded-2xl text-center">
        <h3 className="text-white text-xl font-bold mb-3">{t.pages.technology.whitepaperTitle}</h3>
        <p className="text-neutral-500 mb-6">{t.pages.technology.whitepaperDesc}</p>
        <button className="inline-flex items-center justify-center px-6 py-3 rounded-full border border-white/20 text-white hover:bg-white hover:text-black transition-colors text-sm font-semibold">
          {t.pages.technology.whitepaperCta}
        </button>
      </div>
    </PageShell>
  );
};

export const ProgressPage: React.FC = () => {
  const { t } = useLanguage();
  return (
    <PageShell title={t.pages.progress.title}>
      <p className="text-xl text-neutral-200">{t.pages.progress.intro}</p>
      <div className="border-l border-white/10 pl-8 space-y-10">
        {t.pages.progress.timeline.map((item, index) => (
          <div key={index} className="relative">
            <div
              className={`absolute -left-[41px] top-2 h-3 w-3 rounded-full ${
                item.status === 'done' ? 'bg-white' : item.status === 'inProgress' ? 'bg-neutral-500' : 'bg-neutral-700'
              }`}
            />
            <span className="text-xs font-mono text-cyan-400">{item.date}</span>
            <h3 className="text-xl font-bold text-white mt-2">{item.title}</h3>
            <p className="text-neutral-400 mt-2">{item.body}</p>
          </div>
        ))}
      </div>
    </PageShell>
  );
};

export const FoundationPage: React.FC = () => {
  const { t } = useLanguage();
  return (
    <PageShell title={t.pages.foundation.title}>
      <p className="text-xl text-neutral-200">{t.pages.foundation.intro}</p>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-neural-dark border border-white/10 p-6 rounded-xl">
          <h3 className="text-white text-xl font-bold mb-3">{t.pages.foundation.ethicsTitle}</h3>
          <p className="text-neutral-400 text-base">{t.pages.foundation.ethicsBody}</p>
        </div>
        <div className="bg-neural-dark border border-white/10 p-6 rounded-xl">
          <h3 className="text-white text-xl font-bold mb-3">{t.pages.foundation.accessTitle}</h3>
          <p className="text-neutral-400 text-base">{t.pages.foundation.accessBody}</p>
        </div>
      </div>
      <div>
        <h3 className="text-white text-xl font-bold mb-3">{t.pages.foundation.governanceTitle}</h3>
        <p className="text-neutral-400">{t.pages.foundation.governanceBody}</p>
      </div>
    </PageShell>
  );
};

export const ContactPage: React.FC = () => {
  const { t } = useLanguage();
  return (
    <PageShell title={t.pages.contact.title}>
      <div className="grid md:grid-cols-2 gap-16">
        <div>
          <h2 className="text-2xl font-bold text-white mb-6">{t.pages.contact.departmentsTitle}</h2>
          <p className="mb-8">{t.pages.contact.intro}</p>

          <div className="space-y-6">
            <div className="border-l-2 border-white pl-6 py-2">
              <h3 className="text-lg font-bold text-white">{t.pages.contact.departments.clinical.title}</h3>
              <a
                href={`mailto:${t.pages.contact.departments.clinical.email}`}
                className="text-cyan-400 hover:text-cyan-300 block mt-1"
              >
                {t.pages.contact.departments.clinical.email}
              </a>
              <p className="text-sm text-neutral-500 mt-2">{t.pages.contact.departments.clinical.desc}</p>
            </div>

            <div className="border-l-2 border-white/30 pl-6 py-2">
              <h3 className="text-lg font-bold text-white">{t.pages.contact.departments.research.title}</h3>
              <a
                href={`mailto:${t.pages.contact.departments.research.email}`}
                className="text-cyan-400 hover:text-cyan-300 block mt-1"
              >
                {t.pages.contact.departments.research.email}
              </a>
            </div>

            <div className="border-l-2 border-white/30 pl-6 py-2">
              <h3 className="text-lg font-bold text-white">{t.pages.contact.departments.media.title}</h3>
              <a
                href={`mailto:${t.pages.contact.departments.media.email}`}
                className="text-cyan-400 hover:text-cyan-300 block mt-1"
              >
                {t.pages.contact.departments.media.email}
              </a>
            </div>
          </div>
        </div>

        <div className="bg-neural-dark/80 border border-white/10 p-8 rounded-2xl h-fit">
          <h3 className="text-xl font-bold text-white mb-6">{t.pages.contact.officesTitle}</h3>
          <div className="space-y-8">
            <div>
              <p className="text-white font-bold">{t.pages.contact.offices.shanghai.title}</p>
              <p className="text-sm text-neutral-500">{t.pages.contact.offices.shanghai.desc}</p>
            </div>
            <div>
              <p className="text-white font-bold">{t.pages.contact.offices.sf.title}</p>
              <p className="text-sm text-neutral-500">{t.pages.contact.offices.sf.desc}</p>
            </div>
            <div>
              <p className="text-white font-bold">{t.pages.contact.offices.xihu.title}</p>
              <p className="text-sm text-neutral-500">{t.pages.contact.offices.xihu.desc}</p>
            </div>
          </div>
        </div>
      </div>
    </PageShell>
  );
};

export const TechChipPage: React.FC = () => {
  const { t } = useLanguage();
  return (
    <PageShell title={t.pages.technologySubpages.chip.title}>
      <p className="text-xl text-white font-light">{t.pages.technologySubpages.chip.intro}</p>
      <div className="grid grid-cols-2 gap-4 border-y border-white/10 py-6 text-sm">
        <div>
          <span className="block text-neutral-500 uppercase">{t.pages.technologySubpages.chip.stats.channelsLabel}</span>
          <span className="text-2xl font-mono text-white font-bold">{t.pages.technologySubpages.chip.stats.channelsValue}</span>
        </div>
        <div>
          <span className="block text-neutral-500 uppercase">{t.pages.technologySubpages.chip.stats.powerLabel}</span>
          <span className="text-2xl font-mono text-white font-bold">{t.pages.technologySubpages.chip.stats.powerValue}</span>
        </div>
      </div>
      <div>
        <h2 className="text-2xl font-bold text-white mb-3">{t.pages.technologySubpages.chip.section1Title}</h2>
        <p>{t.pages.technologySubpages.chip.section1Body}</p>
      </div>
      <div>
        <h2 className="text-2xl font-bold text-white mb-3">{t.pages.technologySubpages.chip.section2Title}</h2>
        <p>{t.pages.technologySubpages.chip.section2Body}</p>
      </div>
    </PageShell>
  );
};

export const TechDecodingPage: React.FC = () => {
  const { t } = useLanguage();
  return (
    <PageShell title={t.pages.technologySubpages.decoding.title}>
      <p className="text-xl text-white font-light">{t.pages.technologySubpages.decoding.intro}</p>
      <div>
        <h2 className="text-2xl font-bold text-white mb-3">{t.pages.technologySubpages.decoding.section1Title}</h2>
        <p>{t.pages.technologySubpages.decoding.section1Body}</p>
      </div>
      <div className="bg-neural-dark border border-white/10 p-6 rounded-xl">
        <h3 className="text-white font-bold mb-4">{t.pages.technologySubpages.decoding.metricsTitle}</h3>
        <ul className="space-y-2 text-sm">
          {t.pages.technologySubpages.decoding.metrics.map((metric) => (
            <li key={metric.label} className="flex justify-between border-b border-white/5 pb-2 last:border-b-0 last:pb-0">
              <span className="text-neutral-400">{metric.label}</span>
              <span className="text-white font-semibold">{metric.value}</span>
            </li>
          ))}
        </ul>
      </div>
    </PageShell>
  );
};

export const TechSystemPage: React.FC = () => {
  const { t } = useLanguage();
  return (
    <PageShell title={t.pages.technologySubpages.system.title}>
      <p className="text-xl text-white font-light">{t.pages.technologySubpages.system.intro}</p>
      <div>
        <h2 className="text-2xl font-bold text-white mb-3">{t.pages.technologySubpages.system.section1Title}</h2>
        <p>{t.pages.technologySubpages.system.section1Body}</p>
      </div>
      <div>
        <h2 className="text-2xl font-bold text-white mb-3">{t.pages.technologySubpages.system.section2Title}</h2>
        <p>{t.pages.technologySubpages.system.section2Body}</p>
      </div>
      <div>
        <h3 className="text-white font-bold mb-3">{t.pages.technologySubpages.system.safetyTitle}</h3>
        <ul className="list-disc pl-5 text-neutral-400 space-y-2">
          {t.pages.technologySubpages.system.safetyItems.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    </PageShell>
  );
};

