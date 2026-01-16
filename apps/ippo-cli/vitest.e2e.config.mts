import { defineConfig } from 'vitest/config';

export default defineConfig(() => ({
  root: __dirname,
  cacheDir: '../../node_modules/.vite/apps/ippo-cli',
  test: {
    name: '@mandos-dev/ippo-cli',
    watch: false,
    globals: true,
    environment: 'jsdom',
    include: ['tests/e2e/**/*.spec.ts'],
    reporters: ['default'],
    coverage: {
      reportsDirectory: './test-output/vitest/coverage',
      provider: 'v8' as const,
    },
  },
}));
