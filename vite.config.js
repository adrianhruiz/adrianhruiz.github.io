import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
// Served by GitHub Pages as a user site (adrianhruiz.github.io), so the base is the root.
export default defineConfig({
  base: '/',
  plugins: [react()],
})
