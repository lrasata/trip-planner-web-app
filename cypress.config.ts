import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:5174",
    setupNodeEvents(on, config) {
      // You can add plugins or event listeners here
    },
  },
});
