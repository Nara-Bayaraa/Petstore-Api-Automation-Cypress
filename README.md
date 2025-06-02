---

# 🐾 🐶 Petstore API – Cypress Automation Project

## 🖥️ Project Description

The **Petstore API Automation Project** is a Cypress-based testing suite designed to ensure the reliability and quality of the [Swagger Petstore API](https://petstore.swagger.io/).
It demonstrates skills in **backend (API) testing** using Cypress and JavaScript, following modern best practices for structure, test data management, and reporting.

All API tests are modular and use **fixtures** for clean, reusable data. The project leverages environment variables, parallel execution, and automated reporting to mirror real-world QA workflows.

---

## ⚙️ Features

* **Cypress API Testing:**
  Automated validation of core Petstore API endpoints (CRUD for pets, inventory, users, etc.).
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

3. **Configure environment variables:**
   Create a `.env` file in the project root:

   ```env
   API_URL=https://petstore3.swagger.io/api/v3
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
jobs:
  cypress-parallel-e2e:
    runs-on: ubuntu-22.04
    steps:
      - name: Checkout
        uses: actions/checkout@v4.2.0

      - name: Set up Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20.x'

      - name: Cache npm dependencies
        uses: actions/cache@v4
        with:
          path: ~/.npm
          key: ${{ runner.os }}-npm-cache-${{ hashFiles('**/package-lock.json') }}
          restore-keys: |
            ${{ runner.os }}-npm-cache-

      - name: Install dependencies
        run: npm ci

      - name: Run Cypress E2E tests in parallel
        run: npm run cy:parallel
```

---

## 📄 License

MIT License

---

## 📝 Future Enhancements

* Expand test coverage (edge cases, user flows)
* Add negative and stress test scenarios

---

Happy testing! 🚀

