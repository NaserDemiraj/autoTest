# Guest Checkout E2E Test (Playwright)

This repository contains a single end-to-end automated test for the guest checkout flow using Playwright.

## What it does
- Opens the storefront
- Adds a product to the cart
- Proceeds through guest checkout
- Confirms the order

## Requirements
- Node.js 18+ recommended

## Setup

```bash
npm install
npx playwright install
```

## Run

Default (headless):

```bash
BASE_URL=https://demo.opencart.com/ npm test
```

Run headed for debugging:

```bash
BASE_URL=https://demo.opencart.com/ npm run test:headed
```

## Target environment
- Default tests point to `https://demo.opencart.com/`. Set `BASE_URL` to target a different storefront.

## Notes / Improvements
- Use stable data-test-id attributes on the target app for robust selectors.
- Add retry logic and test fixtures for test data setup/teardown.
- Parametrize shipping/country IDs and map by visible text instead of hard-coded IDs.
- Add CI workflow to run tests on push and PRs.

## Cloudflare / Bot Protection

- The default target (`https://demo.opencart.com/`) may present a Cloudflare bot-protection challenge that blocks automated, headless runs. If you see failures where elements cannot be found, try one of the options below:
	- Run tests headed so you can complete any interactive verification: `npm run test:headed`.
	- Point `BASE_URL` to a different test/staging instance that does not use Cloudflare protections.
	- Run tests from CI runners or environments allowed by the target site (ask site owner to whitelist the runner IP).

## Archive

- A zip of this workspace is provided at `C:\workspace\guest-checkout-e2e.zip` when created locally.

