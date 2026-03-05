import type { APIRoute } from 'astro'
import { getArticles } from '../lib/api'
import type { Article } from '../lib/types'

const SUPPORTED_LOCALES = ['EN', 'NL', 'DE', 'ES', 'IT', 'PT']

function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

function toLastmod(article: Article): string {
  const date = article.publishedAt ?? article.updatedAt
  return new Date(date).toISOString().split('T')[0]
}

export const GET: APIRoute = async () => {
  const siteUrl = (import.meta.env.SITE_URL ?? '').replace(/\/$/, '')

  let mainArticles: Article[] = []
  let localeResults: Article[][] = []

  try {
    const [main, ...locales] = await Promise.all([
      getArticles(),
      ...SUPPORTED_LOCALES.map((locale) => getArticles(locale).catch(() => [] as Article[])),
    ])
    mainArticles = main
    localeResults = locales
  } catch {
    // API indisponible : on retourne un sitemap minimal
  }

  const entries: string[] = []

  // Page d'accueil
  entries.push(`
  <url>
    <loc>${escapeXml(siteUrl)}/</loc>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>`)

  // Articles originaux (FR)
  for (const article of mainArticles) {
    entries.push(`
  <url>
    <loc>${escapeXml(`${siteUrl}/${article.slug}`)}</loc>
    <lastmod>${toLastmod(article)}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`)
  }

  // Articles traduits : URL = /{translatedSlug}/{locale}
  localeResults.forEach((articles, index) => {
    const locale = SUPPORTED_LOCALES[index].toLowerCase()
    for (const article of articles) {
      if (!article.locale) continue
      entries.push(`
  <url>
    <loc>${escapeXml(`${siteUrl}/${article.slug}/${locale}`)}</loc>
    <lastmod>${toLastmod(article)}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`)
    }
  })

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries.join('')}
</urlset>`

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  })
}
