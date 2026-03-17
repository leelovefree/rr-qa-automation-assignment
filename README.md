# RR QA Automation Assignment

## Project
This project is an automation test solution for:

- `https://tmdb-discover.surge.sh/`

The goal is to automate the main discovery flows, document the test approach, and report defects found during execution.

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

## Reports
This suite provides:
- console report during execution
- HTML report from Playwright
- screenshot, video, and trace for failed tests

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
