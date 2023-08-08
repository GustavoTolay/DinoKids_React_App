import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import purgeCSS from "@fullhuman/postcss-purgecss"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    postcss: {
      plugins: [
        purgeCSS({
          content: ["./index.html", "./src/main.tsx", "./src/App.tsx", "./src/**/*.tsx"]
        })
      ]
    }
  }
})
