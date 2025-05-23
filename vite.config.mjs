import { defineConfig } from "vite";

const isPreview = process.env.PREVIEW === "true";
const prNumber = process.env.PR_NUMBER;

export default defineConfig({
  base: isPreview
    ? `/litera-po-literze/pr-${prNumber}/`
    : "/litera-po-literze/",
  build: {
    outDir: "dist",
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
