// --- TipTap JSON structure ---
// C'est un arbre : chaque noeud peut contenir d'autres noeuds (récursif)

export interface TipTapMark {
  type: string           // "bold", "italic", "link", etc.
  attrs?: Record<string, unknown>  // ex: { href: "..." } pour un link
}

export interface TipTapNode {
  type: string           // "paragraph", "heading", "customImage", etc.
  attrs?: Record<string, unknown>  // attributs du noeud (src, alt, level...)
  content?: TipTapNode[] // enfants (récursif !)
  marks?: TipTapMark[]   // formatting appliqué (bold, italic...)
  text?: string          // texte brut (seulement pour les noeuds "text")
}

export interface TipTapDoc {
  type: 'doc'
  content: TipTapNode[]
}

// --- Article venant de l'API ---

export interface Article {
  id: string
  title: string
  slug: string
  content: TipTapDoc     // le JSON TipTap
  excerpt: string | null
  metaDescription: string | null
  metaTitle: string | null
  image: string | null   // cover image URL (Cloudinary)
  status: 'PUBLISHED'
  authorId: string
  assignedAuthorId: string | null
  publishedAt: string | null
  createdAt: string
  updatedAt: string
}
