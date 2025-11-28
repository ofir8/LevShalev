import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost/a-code-free/projects/LevShalev',
        changeOrigin: true,
        secure: false,
      },
      '/send_mail.php': {
        target: 'http://localhost/a-code-free/projects/LevShalev',
        changeOrigin: true,
        secure: false,
      }
    }
  },
  preview: {
    proxy: {
      '/api': {
        target: 'http://localhost/a-code-free/projects/LevShalev',
        changeOrigin: true,
        secure: false,
      },
      '/send_mail.php': {
        target: 'http://localhost/a-code-free/projects/LevShalev',
        changeOrigin: true,
        secure: false,
      }
    }
  }
})