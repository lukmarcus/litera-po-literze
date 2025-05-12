import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const isPreview = process.env.PREVIEW === "true";
const prNumber = process.env.PR_NUMBER;

export default defineConfig({
  base: isPreview ? `/litera-po-literze/pr-${prNumber}/` : "/",
  build: {
    outDir: isPreview ? `dist/pr-${prNumber}` : "dist",
    rollupOptions: {
      output: {
        entryFileNames: isPreview
          ? `assets/[name]-[hash].js`
          : "assets/[name]-[hash].js",
        chunkFileNames: isPreview
          ? `assets/[name]-[hash].js`
          : "assets/[name]-[hash].js",
        assetFileNames: isPreview
          ? `assets/[name]-[hash][extname]`
          : "assets/[name]-[hash][extname]",
      },
    },
  },
});
