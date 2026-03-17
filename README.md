# RR QA Automation Assignment

## Project
This project is an automation test solution for:

- `https://tmdb-discover.surge.sh/`

The goal is to automate the main discovery flows, document the test approach, and report defects found during execution.

## Framework
- Playwright
- TypeScript
- allure-playwright

## Test scope
Core coverage:
- default page load
- category navigation
- search by title
- type filter
- year filter
- rating filter
- genre filter
- multiple filters
- pagination

## Project structure
- `tests/discover.spec.ts`: core functional tests
- `tests/discover-known-issues.spec.ts`: known issue / defect reproduction tests
- `src/pages/discover.page.ts`: page object for the Discover page
- `docs/implementation-plan.md`: implementation steps
- `docs/test-strategy.md`: test approach
- `docs/test-cases.md`: test case list
- `docs/defects.md`: defects found
- `playwright-report/`: Playwright HTML report output
- `allure-results/`: Allure report data
- `test-results/`: screenshots, videos, and traces for failed tests

## How to run
Install dependencies:

```bash
npm install
```

Run all tests:

```bash
npx playwright test --workers=1
```

Run core functional tests only:

```bash
npx playwright test tests/discover.spec.ts --workers=1
```

Run known issues suite only:

```bash
npx playwright test tests/discover-known-issues.spec.ts --workers=1
```

Run tests with browser visible:

```bash
npx playwright test --headed --workers=1
```

Open HTML report:

```bash
npx playwright show-report
```

Open Allure report:

```bash
allure serve allure-results
```

## Reports
This suite provides:
- console report during execution
- HTML report from Playwright
- Allure report
- screenshot, video, and trace for failed tests

Dependencies are managed through `package.json`, test execution is handled by Playwright commands, and reporting is provided through Playwright HTML report and Allure.

## Logging
This suite uses Playwright `test.step()` to make execution flow easier to read in the HTML report.

The main purpose is to show clear test steps such as:
- open page
- apply filter
- verify results

For failed tests, Playwright also provides useful debugging artifacts:
- screenshot
- video
- trace

## Browser API assertions
Some tests also use browser API assertions in addition to UI checks.

Examples:
- `search by title`: wait for the search response and verify the response contains data
- `filter by type`: verify the application calls a TV-related endpoint when switching to `TV Shows`

This helps confirm that the UI behavior matches the underlying API behavior.

## Test design techniques
The suite mainly uses:
- positive testing for the main user flows
- defect-based testing for known issues
- risk-based prioritization to focus on the most valuable scenarios first

## Coding patterns
The implementation mainly uses:
- Page Object Model
- reusable page actions
- separation between core tests and known issue tests

## Allure reporting
This project also supports Allure reporting through `allure-playwright`.

To use Allure locally:
1. Run the tests to generate `allure-results`
2. Open the report with `allure serve allure-results`

If Allure is not installed on your machine yet, install it first before opening the report.
