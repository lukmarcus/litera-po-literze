
import { defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
  test: {
    environment: 'jsdom',
    globals: true,
  },
  resolve: {
    alias: {
      '@types': path.resolve(__dirname, 'src/types/types.ts'),
      '@translations': path.resolve(__dirname, 'src/translations/index.ts'),
    },
  },
});
