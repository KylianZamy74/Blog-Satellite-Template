# Blog Satellite Template - Contexte Projet

## Vue d'ensemble

Ce repo est le **template Astro SSR** du systeme Blog Satellite. Il sert de frontend public pour afficher les articles de blog geres via l'app **manage-blog-satellite** (Next.js).

### Architecture globale

```
┌──────────────────────────┐      ┌─────────────────────────────┐
│   manage-blog-satellite  │      │   Blog-Satellite-Template   │
│   (Next.js / Vercel)     │      │   (Astro SSR / Cloudflare)  │
│                          │      │                             │
│  • Dashboard admin       │ API  │  /blog         → listing    │
│  • CRUD articles         │◄────►│  /blog/[slug]  → article    │
│  • Auth NextAuth         │      │                             │
│  • Editeur TipTap        │      │  Header/Footer par client   │
└──────────┬───────────────┘      └─────────────────────────────┘
           │
           ▼
┌─────────────────────────┐     ┌─────────────────────────────┐
│   Neon (PostgreSQL)     │     │   Cloudinary (Images)       │
└─────────────────────────┘     └─────────────────────────────┘
```

**Concept multi-tenant** : Chaque client a son propre deploiement de ce template Astro, configure avec ses variables d'env (API URL, slug, branding). L'app de gestion est unique et partagee.

---

## Etat actuel : REPO VIDE - A CONSTRUIRE

Le repo ne contient que ce fichier et le `.git`. Tout est a creer.

---

## API disponible (manage-blog-satellite)

L'app Next.js expose 2 endpoints publics (sans auth) :

### Liste des articles publies
```
GET /api/[userSlug]/articles
→ { articles: Article[] }
```

### Article unique
```
GET /api/[userSlug]/articles/[articleSlug]
→ { article: Article }
```

### Shape d'un Article
```typescript
{
  id: string
  title: string
  slug: string
  content: JSON           // TipTap JSON document
  excerpt: string | null
  metaDescription: string | null
  metaTitle: string | null
  image: string | null    // cover image URL (Cloudinary)
  status: "PUBLISHED"
  authorId: string
  assignedAuthorId: string | null
  publishedAt: string | null
  createdAt: string
  updatedAt: string
}
```

---

## Contenu TipTap - Nodes a rendre

Le contenu des articles est stocke en JSON TipTap. Il faut le convertir en HTML.

### Methode choisie : Renderer custom (zero dependance)

Un renderer recursif custom (~150 lignes) qui parcourt le JSON TipTap noeud par noeud et produit du HTML.
Reproduit exactement la logique `renderHTML()` des extensions sources.

**Pourquoi pas `@tiptap/html`** : Cette lib tire ProseMirror entier (~500KB+) comme dependance,
ce qui est trop lourd pour du SSR sur Cloudflare Workers (limite 1MB free tier).
Le renderer custom fait ~3KB, zero dependance, cold start instantane.

### Nodes standard (via StarterKit)
- `paragraph` (avec textAlign)
- `heading` (h1-h6, avec textAlign)
- `bulletList`, `orderedList`, `listItem`
- `blockquote`
- `codeBlock`
- `horizontalRule`
- `hardBreak`
- `image`

### Marks standard
- `bold`, `italic`, `strike`, `code`
- `link` (target: _blank, rel: noopener noreferrer)

### 3 Nodes custom (a copier depuis manage-blog-satellite)

**1. customImage**
```typescript
// Source : manage-blog-satellite/blog-satellite/src/lib/tiptap/custom-image-extension.ts
{
  type: 'customImage',
  attrs: { src: string, alt: string, width: string, align: string }
}
// Rendu : div centree + img avec border-radius
```

**2. imageGallery**
```typescript
// Source : manage-blog-satellite/blog-satellite/src/lib/tiptap/image-gallery-extension.ts
{
  type: 'imageGallery',
  attrs: {
    images: [{ src: string, alt: string, width: string }],
    columns: number (default 3),
    gap: number (default 8)
  }
}
// Rendu : CSS grid d'images
```

**3. ctaButton**
```typescript
// Source : manage-blog-satellite/blog-satellite/src/lib/tiptap/cta-button-extensions.ts
{
  type: 'ctaButton',
  attrs: {
    href: string, text: string,
    variant: 'primary' | 'secondary',
    color: string (hex), align: string
  }
}
// Rendu : lien style en bouton (filled ou outlined)
```

**IMPORTANT** : Ces extensions ont des methodes `renderHTML()` qui definissent exactement le HTML a produire. Le renderer custom (`src/lib/renderer.ts`) reproduit cette meme logique en pur TypeScript, sans aucune dependance TipTap/ProseMirror.

---

## Plan d'implementation

### Stack cible
- **Astro 5** (SSR mode, `output: 'server'`)
- **@astrojs/cloudflare** (adapter pour deployment)
- **Tailwind CSS v4** + `@tailwindcss/typography`
- **Renderer custom** (zero dependance) pour le rendu TipTap JSON → HTML

### Structure cible

```
Blog-Satellite-Template/
  CLAUDE.md                    ← Ce fichier
  astro.config.mjs
  package.json
  tsconfig.json
  .env.example
  .env
  wrangler.toml
  public/
    favicon.svg
  src/
    env.d.ts
    lib/
      api.ts                   # Client API (fetch articles)
      renderer.ts              # Renderer custom TipTap JSON → HTML
      types.ts                 # Interfaces TypeScript
    layouts/
      BaseLayout.astro         # Shell HTML + head SEO + header/footer
    components/
      Header.astro             # Nom du blog + lien domaine principal
      Footer.astro             # Copyright + lien domaine
      ArticleCard.astro        # Card pour le listing
      ArticleContent.astro     # Wrapper set:html pour contenu rendu
    pages/
      blog/
        index.astro            # Listing articles (grille)
        [slug].astro           # Page article (detail + SEO)
    styles/
      global.css               # Tailwind + styles article-content
```

### Variables d'environnement

```bash
API_BASE_URL=http://localhost:3000    # URL de l'API manage-blog-satellite
USER_SLUG=mon-client                  # Slug du client dans l'app de gestion
SITE_NAME=Mon Blog                    # Nom affiche dans le header
SITE_URL=http://localhost:4321        # URL canonique du blog
MAIN_DOMAIN_URL=https://example.com   # Site principal du client
MAIN_DOMAIN_NAME=Example.com          # Nom affiche pour le lien retour
```

### Etapes de construction (dans l'ordre)

1. **Init Astro** : `npm create astro@latest . -- --template minimal`
2. **Deps** : `npm install @astrojs/cloudflare tailwindcss @tailwindcss/typography` (pas de deps TipTap, le renderer est custom)
3. **Config** : `astro.config.mjs` (SSR + Cloudflare), `tsconfig.json`, `.env`
4. **Types** : `src/lib/types.ts` (Article, TipTapDoc, TipTapNode, TipTapMark)
5. **API client** : `src/lib/api.ts` (getArticles, getArticleBySlug)
6. **Renderer** : `src/lib/renderer.ts` (renderer recursif custom, reproduit le renderHTML() des 3 nodes custom + nodes/marks standard)
7. **Styles** : `src/styles/global.css` (Tailwind + .article-content)
8. **Layout** : `src/layouts/BaseLayout.astro` + Header + Footer
9. **Composants** : ArticleCard, ArticleContent
10. **Pages** : `/blog/index.astro` (listing) + `/blog/[slug].astro` (detail)
11. **Cloudflare** : `wrangler.toml`

---

## Decisions techniques

| Decision | Choix | Pourquoi |
|----------|-------|----------|
| Rendu TipTap | Renderer custom (~150 lignes) | Zero dependance, ~3KB vs ~500KB pour @tiptap/html, cold start instantane sur CF Workers |
| Mode Astro | SSR (`output: 'server'`) | Articles toujours a jour, pas besoin de rebuild |
| Adapter | Cloudflare | Gratuit, rapide, env vars au runtime |
| CSS | Tailwind v4 + Typography | Coherent avec manage-blog-satellite |
| Config client | Variables d'env | Simple, un fichier par deploiement |
| SEO | Head tags Astro natifs | metaTitle, metaDescription, og:image depuis l'API |

---

## Notes importantes

- **Pas de CORS** : SSR = le serveur Astro fetch l'API, pas le navigateur
- **API en local** : manage-blog-satellite tourne sur `localhost:3000` pour le dev
- **Pas encore deploye** : L'API n'est pas encore sur Vercel
- **Unique constraint** : Les slugs d'articles sont uniques PAR auteur (`@@unique([authorId, slug])`)
- **Extensions React** : Les custom extensions TipTap utilisent `ReactNodeViewRenderer` dans l'editeur, mais la logique de `renderHTML()` est independante de React. Le renderer custom reproduit cette logique en pur TypeScript.

---

## Fichiers cles dans manage-blog-satellite

Chemins relatifs depuis `manage-blog-satellite/blog-satellite/` :

| Fichier | Contenu |
|---------|---------|
| `app/api/[userSlug]/articles/route.ts` | Endpoint liste articles |
| `app/api/[userSlug]/articles/[articleSlug]/route.ts` | Endpoint article unique |
| `prisma/schema.prisma` | Schema base de donnees |
| `src/lib/tiptap/custom-image-extension.ts` | Extension customImage (renderHTML) |
| `src/lib/tiptap/image-gallery-extension.ts` | Extension imageGallery (renderHTML) |
| `src/lib/tiptap/cta-button-extensions.ts` | Extension ctaButton (renderHTML) |
| `src/lib/extract-image.ts` | Extraction image de couverture depuis TipTap JSON |
| `src/actions/articles/action.ts` | Server actions CRUD articles |
| `PROJET-BLOG-MULTITENANT.md` | Documentation complete du projet |

---

## Ameliorations futures (hors V1)

- Sitemap (`@astrojs/sitemap`)
- Flux RSS (`@astrojs/rss`)
- JSON-LD (structured data pour Google)
- Cache edge Cloudflare (ISR)
- Dark mode
- Pagination sur le listing
- Temps de lecture estime
