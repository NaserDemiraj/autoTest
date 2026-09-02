import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 60_000,
  use: {
    headless: true,
    viewport: { width: 1280, height: 720 },
    actionTimeout: 15_000,
    navigationTimeout: 30_000,
    trace: 'on-first-retry',
  },
  webServer: process.env.USE_LOCAL_DEMO === 'true' ? {
    command: 'npm run demo:start',
    port: 3000,
    reuseExistingServer: true,
  } : undefined,
  projects: [
    { name: 'chromium', use: { browserName: 'chromium' } },
  ],
});
