import { defineConfig } from "vite";
import path from "path";

const isPreview = process.env.PREVIEW === "true";
const prNumber = process.env.PR_NUMBER;

export default defineConfig({
  base:
    isPreview && prNumber
      ? `/litera-po-literze/pr-${prNumber}/`
      : "/litera-po-literze/",
  build: {
    outDir: "dist",
    rollupOptions: {
      output: {
        entryFileNames: `assets/[name]-[hash].js`,
        chunkFileNames: `assets/[name]-[hash].js`,
        assetFileNames: `assets/[name]-[hash][extname]`,
      },
    },
  },
  resolve: {
    alias: {
      "@types": path.resolve(__dirname, "src/types/types.ts"),
      "@translations": path.resolve(__dirname, "src/translations/index.ts"),
    },
  },
});
