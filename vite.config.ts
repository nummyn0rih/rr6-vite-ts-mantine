import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      injectRegister: 'inline',
      strategies: 'injectManifest',
      srcDir: '/',
      filename: 'sw.js',
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg}'],
      },
      manifest: {
        "name": "Rick and Morty Wiki",
        "short_name": "Rick&Morty",
        "description": "Rick and Morty Wiki",
        "theme_color": "#66cdaa",
        "background_color": "#fafafa",
        "display": "standalone",
        "start_url": "/",
        "orientation": "portrait-primary",
        "icons": [
          {
            "src": "assets/icons/icon-72x72.png",
            "sizes": "72x72",
            "type": "image/png",
            "purpose": "any"
          },
          {
            "src": "assets/icons/icon-96x96.png",
            "sizes": "96x96",
            "type": "image/png",
            "purpose": "any"
          },
          {
            "src": "assets/icons/icon-128x128.png",
            "sizes": "128x128",
            "type": "image/png",
            "purpose": "any"
          },
          {
            "src": "assets/icons/icon-144x144.png",
            "sizes": "144x144",
            "type": "image/png",
            "purpose": "any"
          },
          {
            "src": "assets/icons/icon-152x152.png",
            "sizes": "152x152",
            "type": "image/png",
            "purpose": "any"
          },
          {
            "src": "assets/icons/icon-192x192.png",
            "sizes": "192x192",
            "type": "image/png",
            "purpose": "any"
          },
          {
            "src": "assets/icons/icon-192x192-mask.png",
            "sizes": "192x192",
            "type": "image/png",
            "purpose": "maskable"
          },
          {
            "src": "assets/icons/icon-284x284.png",
            "sizes": "284x284",
            "type": "image/png",
            "purpose": "any"
          },
          {
            "src": "assets/icons/icon-512x512.png",
            "sizes": "512x512",
            "type": "image/png",
            "purpose": "any"
          }
        ]
      }
    }),
  ],
  server: {
    host: true,
  }
})
