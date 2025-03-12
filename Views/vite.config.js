import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "./", // Ensures assets are correctly loaded in production
  build: {
    outDir: "dist", // Keeps the build directory consistent
  },
})
