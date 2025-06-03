const { defineConfig } = require("cypress");
require('dotenv').config();

module.exports = defineConfig({
  e2e: {
   baseUrl: "https://petstore.swagger.io/v2",
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
