import type { Article } from './types'

function getEnv() {
  const baseUrl = import.meta.env.API_BASE_URL
  const userSlug = import.meta.env.USER_SLUG
  if (!baseUrl || !userSlug) {
    throw new Error('API_BASE_URL et USER_SLUG doivent être définis dans .env')
  }
  return { baseUrl, userSlug }
}

export async function getArticles(): Promise<Article[]> {
  const { baseUrl, userSlug } = getEnv()
  const res = await fetch(`${baseUrl}/api/${userSlug}/articles`)
  if (!res.ok) {
    throw new Error(`Erreur API ${res.status}: impossible de récupérer les articles`)
  }
  const data = await res.json()
  return data.articles
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  const { baseUrl, userSlug } = getEnv()
  const res = await fetch(`${baseUrl}/api/${userSlug}/articles/${slug}`)
  if (res.status === 404) return null
  if (!res.ok) {
    throw new Error(`Erreur API ${res.status}: impossible de récupérer l'article`)
  }
  const data = await res.json()
  return data.article
}
