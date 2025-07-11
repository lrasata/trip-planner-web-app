import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: process.env.CYPRESS_BASE_URL || "http://localhost:5173",
    supportFile: "cypress/support/e2e.ts",
    setupNodeEvents(on, config) {
      // You can add plugins or event listeners here
    },
  },
});
