import type { APIRoute } from 'astro'

export const GET: APIRoute = () => {
  const siteUrl = (import.meta.env.SITE_URL ?? '').replace(/\/$/, '')

  const content = `User-agent: *
Allow: /

Sitemap: ${siteUrl}/sitemap.xml`

  return new Response(content, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=86400',
    },
  })
}
