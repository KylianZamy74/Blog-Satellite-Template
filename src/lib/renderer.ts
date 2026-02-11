import type { TipTapDoc, TipTapNode, TipTapMark } from './types'

// ============================================================
// Renderer custom TipTap JSON → HTML
// ============================================================
// Zero dependance. ~3KB. Reproduit exactement le renderHTML()
// des extensions TipTap de manage-blog-satellite.
//
// COMMENT ÇA MARCHE (récursion) :
// 1. On reçoit un noeud (ex: { type: "paragraph", content: [...] })
// 2. On génère la balise ouvrante selon le type (<p>)
// 3. On appelle renderChildren() qui boucle sur les enfants
//    et appelle renderNode() sur chacun → RÉCURSION
// 4. On ferme la balise (</p>)
// C'est comme des poupées russes : chaque noeud contient
// potentiellement d'autres noeuds, à l'infini.
// ============================================================

// --- Utilitaires ---

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function styleAttr(styles: Record<string, string | undefined>): string {
  const parts = Object.entries(styles)
    .filter(([, v]) => v !== undefined)
    .map(([k, v]) => `${k}: ${v}`)
  return parts.length ? ` style="${escapeHtml(parts.join('; '))}"` : ''
}

// --- Marks (formatting inline : bold, italic, link...) ---

function openMark(mark: TipTapMark): string {
  switch (mark.type) {
    case 'bold':
    case 'strong':
      return '<strong>'
    case 'italic':
    case 'em':
      return '<em>'
    case 'strike':
      return '<s>'
    case 'code':
      return '<code>'
    case 'link': {
      const href = escapeHtml(String(mark.attrs?.href || ''))
      const target = mark.attrs?.target || '_blank'
      return `<a href="${href}" target="${target}" rel="noopener noreferrer">`
    }
    default:
      return ''
  }
}

function closeMark(mark: TipTapMark): string {
  switch (mark.type) {
    case 'bold':
    case 'strong':
      return '</strong>'
    case 'italic':
    case 'em':
      return '</em>'
    case 'strike':
      return '</s>'
    case 'code':
      return '</code>'
    case 'link':
      return '</a>'
    default:
      return ''
  }
}

// --- Rendu récursif des noeuds ---

function renderChildren(nodes?: TipTapNode[]): string {
  if (!nodes || nodes.length === 0) return ''
  // On appelle renderNode() sur chaque enfant et on concatène
  return nodes.map(renderNode).join('')
}

function renderNode(node: TipTapNode): string {
  // Cas de base de la récursion : un noeud "text" (feuille, pas d'enfants)
  if (node.type === 'text') {
    let html = escapeHtml(node.text || '')
    // On enveloppe le texte avec ses marks (bold, italic...)
    if (node.marks) {
      for (const mark of node.marks) html = openMark(mark) + html + closeMark(mark)
    }
    return html
  }

  const attrs = node.attrs || {}

  switch (node.type) {
    // --- Nodes standard (StarterKit) ---

    case 'paragraph': {
      const style = attrs.textAlign ? styleAttr({ 'text-align': String(attrs.textAlign) }) : ''
      return `<p${style}>${renderChildren(node.content)}</p>`
    }

    case 'heading': {
      // On décale d'un niveau (h1→h2, h2→h3...) car le H1 de la page
      // est déjà le titre de l'article. Un seul H1 par page = bon SEO.
      const raw = Number(attrs.level) || 2
      const level = Math.min(raw + 1, 6)
      const tag = `h${level}`
      const style = attrs.textAlign ? styleAttr({ 'text-align': String(attrs.textAlign) }) : ''
      return `<${tag}${style}>${renderChildren(node.content)}</${tag}>`
    }

    case 'bulletList':
      return `<ul>${renderChildren(node.content)}</ul>`

    case 'orderedList': {
      const start = attrs.start && Number(attrs.start) !== 1 ? ` start="${attrs.start}"` : ''
      return `<ol${start}>${renderChildren(node.content)}</ol>`
    }

    case 'listItem':
      return `<li>${renderChildren(node.content)}</li>`

    case 'blockquote':
      return `<blockquote>${renderChildren(node.content)}</blockquote>`

    case 'codeBlock': {
      const lang = attrs.language ? ` class="language-${escapeHtml(String(attrs.language))}"` : ''
      return `<pre><code${lang}>${renderChildren(node.content)}</code></pre>`
    }

    case 'horizontalRule':
      return '<hr>'

    case 'hardBreak':
      return '<br>'

    case 'image': {
      const src = escapeHtml(String(attrs.src || ''))
      const alt = escapeHtml(String(attrs.alt || ''))
      return `<img src="${src}" alt="${alt}">`
    }

    // --- Nodes custom (reproduisent le renderHTML() des extensions) ---

    // Source : custom-image-extension.ts → renderHTML()
    case 'customImage': {
      const src = escapeHtml(String(attrs.src || ''))
      const alt = escapeHtml(String(attrs.alt || ''))
      const width = String(attrs.width || '100%')
      const align = String(attrs.align || 'center')
      return (
        `<div style="text-align: ${align}; margin: 16px 0">` +
        `<img src="${src}" alt="${alt}" style="display: inline-block; width: ${width}; max-width: 100%; height: auto; border-radius: 8px" draggable="false">` +
        `</div>`
      )
    }

    // Source : image-gallery-extension.ts → renderHTML()
    case 'imageGallery': {
      const images = (attrs.images || []) as Array<{ src: string; alt?: string; width?: string }>
      const columns = Number(attrs.columns) || 3
      const gap = Number(attrs.gap) || 8
      const gridStyle = [
        'display: grid',
        `grid-template-columns: repeat(${columns}, 1fr)`,
        `gap: ${gap}px`,
        'margin: 16px 0',
        'align-items: start',
      ].join('; ')
      const imgs = images
        .map((img) => {
          const src = escapeHtml(img.src || '')
          const alt = escapeHtml(img.alt || '')
          const w = img.width || '100%'
          return `<img src="${src}" alt="${alt}" style="width: ${w}; height: auto; border-radius: 8px">`
        })
        .join('')
      return `<div style="${gridStyle}" data-gallery="true">${imgs}</div>`
    }

    // Source : cta-button-extensions.ts → renderHTML()
    case 'ctaButton': {
      const href = escapeHtml(String(attrs.href || '#'))
      const text = escapeHtml(String(attrs.text || 'Cliquez ici'))
      const variant = String(attrs.variant || 'primary')
      const color = String(attrs.color || '#2563eb')
      const align = String(attrs.align || 'left')

      const baseStyles = [
        'display: inline-block',
        'padding: 12px 24px',
        'border-radius: 8px',
        'font-weight: 600',
        'font-size: 16px',
        'text-decoration: none',
        'text-align: center',
        'cursor: pointer',
        'transition: opacity 0.2s',
      ].join('; ')

      const variantStyles =
        variant === 'primary'
          ? `background-color: ${color}; color: white; border: 2px solid ${color}`
          : `background-color: transparent; color: ${color}; border: 2px solid ${color}`

      return (
        `<div style="text-align: ${align}; margin: 16px 0">` +
        `<a href="${href}" style="${baseStyles}; ${variantStyles}" data-cta="${variant}" target="_blank" rel="noopener noreferrer">${text}</a>` +
        `</div>`
      )
    }

    // Noeud inconnu : on rend juste les enfants (graceful degradation)
    default:
      return renderChildren(node.content)
  }
}

// --- Point d'entrée public ---

export function renderTipTapToHtml(doc: TipTapDoc): string {
  if (!doc || !doc.content) return ''
  return renderChildren(doc.content)
}
