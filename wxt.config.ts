import { defineConfig } from 'wxt';

export default defineConfig({
  modules: ['@wxt-dev/auto-icons'],
  manifest: {
    permissions: ['storage'],
  },
  autoIcons: {
    enabled: true,
  }
});
