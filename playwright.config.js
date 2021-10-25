import { devices } from '@playwright/test';

let isCI = !!process.env.CI;

export default {
  testDir: 'tests',
  use: {
    ...devices['Desktop Safari'],
    headless: isCI,
    trace: 'retain-on-failure',
  },
  reporter: isCI ? [['github'], ['dot']] : 'list',
  webServer: {
    command: 'npm run serve',
    port: 5000,
    reuseExistingServer: !isCI,
  },
};
