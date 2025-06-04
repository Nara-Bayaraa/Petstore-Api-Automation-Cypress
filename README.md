---

# 🐾 🐶 Petstore API – Cypress Automation Project

---

## 🖥️ Project Description

The **Petstore API Automation Project** is a Cypress-based testing suite designed to ensure the reliability and quality of the [Swagger Petstore API](https://petstore.swagger.io/).
It demonstrates skills in **backend (API) testing** using Cypress and JavaScript, following modern best practices for structure, test data management, and reporting.

All API tests are modular and use **fixtures** for clean, reusable data. The project leverages environment variables, parallel execution, and automated reporting to mirror real-world QA workflows.

---

## ⚙️ Features

* **Cypress API Testing:**
  Automated validation of core Petstore API endpoints (CRUD for pets, store, users, etc.).
* **Reusable Fixtures:**
  Centralized test data management in JSON files.
* **Environment Variable Support:**
  Easily switch target API environments (dev, staging, prod) via `.env`.
* **Parallel Test Execution:**
  Run tests in parallel for fast feedback using `cypress-parallel`.
* **Automated Reporting:**
  Rich HTML and JSON test reports with Mochawesome.
* **CI/CD Ready:**
  Example GitHub Actions workflow for automated test runs.


---

## 🕒 Automated CI Schedule

```
 schedule:
    - cron: '0 11 * * *'   #run every day at  5:00 AM Chicago time (CST)
```

- **Nightly runs:**  
  This project’s test suite is **automatically triggered every day at 5:00 AM Chicago time (CST)** via a scheduled GitHub Actions workflow.

- **Configuration:**  
  The schedule is managed using this [cron expression](https://crontab.guru/#0_11_*_*_*):

- **Purpose:**  
Ensures API health and test coverage are validated every day without manual intervention.  
All test results and reports are generated and can be accessed in the GitHub Actions workflow logs and artifacts.

---


## 🛠️ Tech Stack

* **Cypress** (API testing)
* **JavaScript** (CommonJS)
* **Node.js**
* **Mochawesome** (reporting)
* **Dotenv** (environment variables)
* **GitHub Actions** (CI/CD)

---

## 🔧 Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/Nara-Bayaraa/Petstore-Api-Automation-Cypress.git
   cd Petstore-Api
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

---

## 🚀 How to Run

* **Open Cypress Test Runner (GUI):**

  ```bash
  npm run cy:open
  ```
* **Run all tests in headless mode (terminal):**

  ```bash
  npm run cy:run
  ```
* **Run all tests in parallel (fastest):**

  ```bash
  npm run cy:parallel
  ```

---

## 📂 Project Structure

```
Petstore-Api/
├── cypress/
│   ├── e2e/                             # All API test specs organized by feature
│   │   ├── pets/                        # Pet API test specs (CRUD, etc.)
│   │   ├── store/                       # Store API test specs (orders, inventory)
│   │   ├── users/                       # User API test specs (register, login, etc.)
│   ├── fixtures/                        # Test data files (JSON payloads)
│   └── support/                         # Cypress custom commands and helpers
│       ├── commands.js                  # Custom Cypress commands
│       └── e2e.js                       # Common Cypress utilities/config
├── node_modules/                        # Project dependencies (auto-generated)
├── .env                                 # Environment variables (e.g., base API URL)
├── .gitignore                           # Git ignored files
├── cypress.config.js                    # Cypress configuration (uses env vars)
├── package.json                         # NPM scripts and dependencies
├── package-lock.json                    # NPM lock file
└── README.md                            # Project documentation

```
---

## ✅ Key NPM Scripts

```json
"scripts": {
  "cy:open": "cypress open",
  "cy:run": "cypress run --browser chrome",
  "cy:parallel": "cypress-parallel -s cy:run -t 5 -d 'cypress/e2e/**/*.cy.js'",
  "clean:reports": "rm -rf cypress/reports",
  "pretest": "npm run clean:reports",
  "merge:reports": "mochawesome-merge cypress/reports/mochawesome/*.json > cypress/reports/mochawesome.json",
  "generate:report": "marge cypress/reports/mochawesome/*.json -f report -o cypress/reports/html",
  "test:report": "npm run cy:run || true && npm run merge:reports && npm run generate:report"
}
```

---

## 📊 Reporting

* **Merge test reports:**

  ```bash
  npm run merge:reports
  ```
* **Generate HTML report:**

  ```bash
  npm run generate:report
  ```
* **Serve HTML report locally:**

  ```bash
  npx serve cypress/reports/html
  ```

---

## 🤖 Continuous Integration

**GitHub Actions** example for CI (parallel run):

```yaml
name: Parallel API Test Build

on:
  schedule:
    - cron: '0 11 * * *'   #run every day at  5:00 AM Chicago time (CST)
  workflow_dispatch:
  pull_request:
    types: [opened, reopened, edited, synchronize]
  push:
    branches: [main]

jobs:
  Pets-Test:
    runs-on: ubuntu-22.04
    steps:
      - name: Checkout code
        uses: actions/checkout@v4.2.0
      - name: Cypress run
        uses: cypress-io/github-action@v6.6.1
      - name: Install dependencies
        run: npm ci
      - name: Clean reports folder
        run: rm -rf reports
      - name: Recreate reports folder
        run: mkdir -p reports/mochawesome
      - name: Run Pet Tests
        run: npx cypress run --spec "cypress/e2e/pets/**/*.cy.js"
      - name: Upload Pets Report
        uses: actions/upload-artifact@v4
        with:
          name: pets-report
          path: reports/

  Store-Test:
    runs-on: ubuntu-22.04
    steps:
      - name: Checkout code
        uses: actions/checkout@v4.2.0
      - name: Cypress run
        uses: cypress-io/github-action@v6.6.1
      - name: Install dependencies
        run: npm ci
      - name: Clean reports folder
        run: rm -rf reports
      - name: Recreate reports folder
        run: mkdir -p reports/mochawesome
      - name: Run Store Tests
        run: npx cypress run --spec "cypress/e2e/store/**/*.cy.js"
      - name: Upload Store Report
        uses: actions/upload-artifact@v4
        with:
          name: store-report
          path: reports/

  Users-Test:
    runs-on: ubuntu-22.04
    steps:
      - name: Checkout code
        uses: actions/checkout@v4.2.0
      - name: Cypress run
        uses: cypress-io/github-action@v6.6.1
      - name: Install dependencies
        run: npm ci
      
      - name: Run Users Tests
        run: npx cypress run --spec "cypress/e2e/users/**/*.cy.js"
      - name: Upload Users Report
        uses: actions/upload-artifact@v4
        with:
          name: users-report
          path: reports/

```

---

## 📄 License

MIT License

---

## 📝 Future Enhancements

* Implement API response schema validation
* Add negative and stress test scenarios

---

Happy testing! 🚀

