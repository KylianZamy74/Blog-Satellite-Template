import type { Article } from './types'

// Données structurées d'un article (schema.org BlogPosting), lues par Google et les moteurs IA
export function articleJsonLd(article: Article, { url, lang }: { url: string; lang: string }) {
  const publisher = {
    '@type': 'Organization',
    name: import.meta.env.SITE_NAME || 'Mon Blog',
    url: import.meta.env.SITE_URL || undefined,
  }
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: article.title,
    description: (article.metaDescription || article.excerpt || '').trim() || undefined,
    image: article.image || undefined,
    datePublished: article.publishedAt || article.createdAt,
    dateModified: article.updatedAt,
    inLanguage: lang,
    url,
    mainEntityOfPage: url,
    author: publisher,
    publisher,
  }
}
