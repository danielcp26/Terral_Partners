import { defineConfig } from "@playwright/test";
const previewPort = Number(process.env.PLAYWRIGHT_PORT || 3000);
export default defineConfig({
  testDir: "./tests",
  fullyParallel: false,
  workers: 1,
  timeout: 30000,
  use: {
    baseURL: `http://127.0.0.1:${previewPort}`,
    browserName: "chromium",
    screenshot: "only-on-failure",
  },
  reporter: "list",
  webServer: [
    {
      command: `npm run start -- --port ${previewPort}`,
      url: `http://127.0.0.1:${previewPort}/es`,
      reuseExistingServer: !process.env.CI,
      timeout: 30000,
    },
    {
      command: "npm run start -- --port 3001",
      url: "http://127.0.0.1:3001/en",
      reuseExistingServer: false,
      timeout: 30000,
      env: {
        INQUIRY_WEBHOOK_URL: "https://receiver.example.test/inquiries",
        INQUIRY_WEBHOOK_TOKEN: "test-fixture-only",
        LEGAL_APPROVED: "true",
      },
    },
  ],
});
