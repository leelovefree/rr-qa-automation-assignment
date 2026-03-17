import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  timeout: 60_000,
  fullyParallel: true,
  expect: {
    timeout: 10_000,
  },
  reporter: [
    ["list"],
    ["html", { open: "on-failure", outputFolder: "playwright-report" }],
  ],
  use: {
    baseURL: "https://tmdb-discover.surge.sh",
    headless: true,
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
    video: "retain-on-failure",
  },
});
