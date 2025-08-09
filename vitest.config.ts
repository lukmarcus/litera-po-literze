import { defineConfig } from "vitest/config";
import path from "path";

export default defineConfig({
  test: {
    environment: "jsdom",
    globals: true,
    coverage: {
      provider: "v8",
      reporter: ["text", "html"],
    },
  },
  resolve: {
    alias: {
      "@types": path.resolve(__dirname, "src/types/types.ts"),
      "@translations": path.resolve(__dirname, "src/translations/index.ts"),
    },
  },
});
