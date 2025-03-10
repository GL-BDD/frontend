import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: [
      'frontend-rexo.onrender.com'
    ],
    port: 5173,
    host: true,
    proxy: {
      '/api': {
        target: 'https://backend-yijt.onrender.com',
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
