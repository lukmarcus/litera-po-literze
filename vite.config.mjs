import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
const prNumber = process.env.PR_NUMBER;

export default defineConfig({
  base: prNumber ? `/litera-po-literze/pr-${prNumber}/` : "/litera-po-literze/",
  plugins: [react()],
  server: {
    open: true, // Automatically open the app in the browser
  },
});
