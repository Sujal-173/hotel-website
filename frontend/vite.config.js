import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const replitDomain = process.env.REPLIT_DEV_DOMAIN

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 5000,
    strictPort: true,
    allowedHosts: true,
    ...(replitDomain && {
      hmr: {
        host: replitDomain,
        clientPort: 443,
        protocol: 'wss',
      }
    }),
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      }
    }
  }
})
