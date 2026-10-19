import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
// Served from the root of adrianhruiz.github.io, so base stays '/'.
// If the repo is ever renamed (e.g. "portfolio"), change it to '/portfolio/'.
export default defineConfig({
  base: '/',
  plugins: [react()],
})
