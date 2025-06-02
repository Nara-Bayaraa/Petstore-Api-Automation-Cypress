const { defineConfig } = require("cypress");
require('dotenv').config();

module.exports = defineConfig({
  e2e: {
   baseUrl: process.env.API_URL,
    setupNodeEvents(on, config) {},
   },

  reporter: "mochawesome",
  reporterOptions: {
    charts: true,
    reportDir: "reports/mochawesome",
    overwrite: false,
    html: false,
    json: true,
  },
});
