# Shopware6 QA Exercise

This folder contains the automation and test artifacts for the Shopware6 QA exercise.

How to run:

```bash
cd shopware6-qa-exercise
npm install
npx playwright install
# Start local demo (optional): npm run demo:start
# Run tests:
BASE_URL='http://localhost:3000' npm test
```

Files included:
- `tests/guest-checkout.spec.ts` — Playwright test (CI-friendly add-to-cart verification)
- `playwright.config.ts` — Playwright config
- `package.json` / `package-lock.json`
- `Manual-Test-Plan.md` and `Bug-Report.md` — documentation
- `Manual-Test-Plan.pdf` and `Bug-Report.pdf` — placeholders
