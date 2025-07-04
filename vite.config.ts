
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    // Vercel and other platforms set NODE_ENV to 'production' for builds.
    // We need to define `process.env` for our code to work in development and production.
    'process.env': process.env
  }
})
