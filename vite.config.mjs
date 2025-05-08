import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
const isPreview = process.env.PREVIEW === "true";
const prNumber = process.env.PR_NUMBER;

export default defineConfig({
  base: isPreview
    ? `/litera-po-literze/pr-${prNumber}/`
    : "/litera-po-literze/",
  plugins: [react()],
  server: {
    open: true, // Automatically open the app in the browser
  },
});
