import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/',
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['media/logo.jpg'],
      manifest: {
        name: 'Jivitesh | AI Engineer',
        short_name: 'Jivitesh',
        description: 'Portfolio of AI Engineer & Data Scientist Jivitesh',
        theme_color: '#020617',
        background_color: '#020617',
        display: 'standalone',
        icons: [
          {
            src: 'media/logo.jpg',
            sizes: '192x192',
            type: 'image/jpeg'
          },
          {
            src: 'media/logo.jpg',
            sizes: '512x512',
            type: 'image/jpeg'
          }
        ]
      }
    })
  ],
})
