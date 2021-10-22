import { devices } from '@playwright/test';

export default {
  testDir: 'tests',
  projects: [
    {
      name: 'Safari',
      use: { ...devices['Desktop Safari'], headless: !!process.env.CI },
    },
  ],
  webServer: {
    command: 'npm run serve',
    port: 8080,
    timeout: 10 * 1000,
    reuseExistingServer: !process.env.CI,
  },
};
