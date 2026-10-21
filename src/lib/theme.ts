// Identité visuelle par client, lue depuis les variables d'env.
// Chaque valeur est validée : une valeur invalide retombe sur le défaut,
// pour qu'aucune variable mal saisie ne puisse injecter du CSS/HTML.

const HEX = /^#[0-9a-fA-F]{3,8}$/
const FONT = /^[A-Za-z0-9 ]{1,40}$/

const DEFAULTS = {
  primary: '#2563eb',
  background: '#f9fafb',
  text: '#111827',
}

function color(value: string | undefined, fallback: string): string {
  return value && HEX.test(value) ? value : fallback
}

function font(value: string | undefined): string | null {
  return value && FONT.test(value) ? value : null
}

function logo(value: string | undefined): string | null {
  if (!value) return null
  try {
    const url = new URL(value)
    return url.protocol === 'https:' ? url.href : null
  } catch {
    return null
  }
}

export function getTheme() {
  const env = import.meta.env
  const headingFont = font(env.THEME_FONT_HEADING)
  const bodyFont = font(env.THEME_FONT_BODY)
  const fonts = [...new Set([headingFont, bodyFont].filter(Boolean))] as string[]

  const vars = {
    '--theme-primary': color(env.THEME_PRIMARY, DEFAULTS.primary),
    '--theme-background': color(env.THEME_BACKGROUND, DEFAULTS.background),
    '--theme-text': color(env.THEME_TEXT, DEFAULTS.text),
    '--theme-font-heading': headingFont ? `'${headingFont}', serif` : 'inherit',
    '--theme-font-body': bodyFont ? `'${bodyFont}', sans-serif` : 'ui-sans-serif, system-ui, sans-serif',
  }

  return {
    css: `:root{${Object.entries(vars).map(([k, v]) => `${k}:${v}`).join(';')}}`,
    fontsUrl: fonts.length
      ? `https://fonts.googleapis.com/css2?${fonts.map((f) => `family=${encodeURIComponent(f)}:wght@400;600;700`).join('&')}&display=swap`
      : null,
    logoUrl: logo(env.LOGO_URL),
  }
}
