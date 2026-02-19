import { useEffect } from 'react';
import { getSeo, Locale, PageKey } from './seoConfig';

interface SeoHeadProps {
  pageKey: PageKey;
  locale: Locale;
}

const upsertMeta = (selector: string, attrs: Record<string, string>) => {
  let element = document.head.querySelector<HTMLMetaElement>(selector);
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute('data-seo-managed', 'true');
    document.head.appendChild(element);
  }

  Object.entries(attrs).forEach(([key, value]) => {
    element?.setAttribute(key, value);
  });
};

const upsertLink = (selector: string, attrs: Record<string, string>) => {
  let element = document.head.querySelector<HTMLLinkElement>(selector);
  if (!element) {
    element = document.createElement('link');
    element.setAttribute('data-seo-managed', 'true');
    document.head.appendChild(element);
  }

  Object.entries(attrs).forEach(([key, value]) => {
    element?.setAttribute(key, value);
  });
};

const upsertJsonLd = (id: string, payload: Record<string, unknown>) => {
  let script = document.head.querySelector<HTMLScriptElement>(`script[data-seo-jsonld="${id}"]`);
  if (!script) {
    script = document.createElement('script');
    script.type = 'application/ld+json';
    script.setAttribute('data-seo-managed', 'true');
    script.setAttribute('data-seo-jsonld', id);
    document.head.appendChild(script);
  }
  script.textContent = JSON.stringify(payload);
};

const SeoHead = ({ pageKey, locale }: SeoHeadProps) => {
  useEffect(() => {
    const seo = getSeo(locale, pageKey);

    document.title = seo.title;
    document.documentElement.lang = locale === 'zh' ? 'zh-CN' : 'en';

    upsertMeta('meta[name="description"]', { name: 'description', content: seo.description });
    upsertMeta('meta[name="keywords"]', { name: 'keywords', content: seo.keywords });
    upsertMeta('meta[http-equiv="content-language"]', {
      'http-equiv': 'content-language',
      content: 'zh,en',
    });

    upsertLink('link[rel="canonical"]', { rel: 'canonical', href: seo.canonical });
    upsertLink('link[rel="alternate"][hreflang="zh"]', {
      rel: 'alternate',
      hreflang: 'zh',
      href: seo.alternates.zh,
    });
    upsertLink('link[rel="alternate"][hreflang="en"]', {
      rel: 'alternate',
      hreflang: 'en',
      href: seo.alternates.en,
    });
    upsertLink('link[rel="alternate"][hreflang="x-default"]', {
      rel: 'alternate',
      hreflang: 'x-default',
      href: seo.alternates.xDefault,
    });

    upsertMeta('meta[property="og:title"]', { property: 'og:title', content: seo.openGraph.title });
    upsertMeta('meta[property="og:description"]', {
      property: 'og:description',
      content: seo.openGraph.description,
    });
    upsertMeta('meta[property="og:url"]', { property: 'og:url', content: seo.openGraph.url });
    upsertMeta('meta[property="og:type"]', { property: 'og:type', content: seo.openGraph.type });
    upsertMeta('meta[property="og:site_name"]', {
      property: 'og:site_name',
      content: seo.openGraph.siteName,
    });
    upsertMeta('meta[property="og:image"]', {
      property: 'og:image',
      content: seo.openGraph.image,
    });

    upsertMeta('meta[name="twitter:card"]', { name: 'twitter:card', content: seo.twitter.card });
    upsertMeta('meta[name="twitter:title"]', {
      name: 'twitter:title',
      content: seo.twitter.title,
    });
    upsertMeta('meta[name="twitter:description"]', {
      name: 'twitter:description',
      content: seo.twitter.description,
    });
    upsertMeta('meta[name="twitter:image"]', {
      name: 'twitter:image',
      content: seo.twitter.image,
    });

    seo.jsonLd.forEach((entry, index) => {
      const id = index === 0 ? 'organization' : index === 1 ? 'website' : `schema-${index}`;
      upsertJsonLd(id, entry);
    });
  }, [locale, pageKey]);

  return null;
};

export default SeoHead;
