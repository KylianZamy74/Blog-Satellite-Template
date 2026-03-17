import { defineConfig } from 'astro/config'
import cloudflare from '@astrojs/cloudflare'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  output: 'server',
  adapter: cloudflare({
    imageService: 'passthrough',
  }),
  image: {
    service: { entrypoint: 'astro/assets/services/noop' },
  },
  vite: {
    plugins: [tailwindcss()],
  },
})
