# Guest Checkout E2E Test (Playwright)

This repository contains a single end-to-end automated test for a stable add-to-cart scenario using Playwright.

## What it does
- Opens the storefront
- Adds a product to the cart
- Verifies the cart contains the added product (stable positive case)

## Requirements
- Node.js 18+ recommended

## Setup

```bash
npm install
npx playwright install
```

## Run

Default (headless):

```powershell
$env:BASE_URL='https://demowebshop.tricentis.com/'; npm test
```

Run headed for debugging:

```powershell
$env:BASE_URL='https://demowebshop.tricentis.com/'; npm run test:headed
```

## Target environment
-- Default tests point to `https://demowebshop.tricentis.com/`. Set `BASE_URL` to target a different storefront.

## Notes / Improvements
- Use stable data-test-id attributes on the target app for robust selectors.
- Add retry logic and test fixtures for test data setup/teardown.
- Parametrize shipping/country IDs and map by visible text instead of hard-coded IDs.
- Add CI workflow to run tests on push and PRs.

## Cloudflare / Bot Protection

-- Public demo sites may present bot-protection or timing issues that make full checkout flows flaky. The recommended approach:
	- Use this stable add-to-cart assertion in CI.
	- For full checkout automation, use a dedicated test environment or a local instance of the app to avoid bot checks and timing variability.

## Archive

- A zip of this workspace is provided at `C:\workspace\guest-checkout-e2e.zip` when created locally.

## Continuous Integration

- A GitHub Actions workflow is included at `.github/workflows/playwright.yml` that installs dependencies and runs the Playwright tests on pushes and PRs to `main`.
-- Note: CI jobs will run against the `BASE_URL` environment variable. Set a repository secret named `BASE_URL` (for example `https://demowebshop.tricentis.com/`) or update the workflow to point to a test instance. Running against public demos may still fail on CI due to bot protection.

