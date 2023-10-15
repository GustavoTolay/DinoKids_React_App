import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import purgecss from "@fullhuman/postcss-purgecss";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    postcss: {
      plugins: [
        purgecss({
          content: [
            "./index.html",
            "./src/main.tsx",
            "./src/App.tsx",
            "./src/**/*.tsx",
          ],
        }),
      ],
    },
  },
});
