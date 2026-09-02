# Solution25 — Shopware 6 QA / Automation Exercise

This repository is my submission for the Shopware 6 Storefront QA practical exercise. It contains the manual test plan, a bug report, and automated tests (Playwright + TypeScript), plus a small local demo used to validate a full guest checkout flow.

Contents
- Manual test plan: [docs/Shopware6-TestPlan.md](docs/Shopware6-TestPlan.md)
- Bug report: [docs/BUG-001-Cart-Update-Performance.md](docs/BUG-001-Cart-Update-Performance.md)
- Automated tests (Playwright): `tests/` (stable CI-friendly checks) and `shopware6-qa-exercise/tests/` (exercise bundle)
- Local demo used for deterministic full checkout: `demo/`

What is included
- Manual Test Plan: full test cases and observations for Shopware 6.
- Automated Test: Playwright TypeScript tests implementing a stable add-to-cart check and a deterministic full guest checkout against the included local demo.
- Bug Report: documented performance/usability issue found during manual testing.

Quick start

```bash
npm install
npx playwright install

# Optional: start the local demo (serves `demo/` on port 3000)
npm run demo:start

# Run the automated tests (example pointing to local demo):
BASE_URL='http://localhost:3000' npm test

# Or run the exercise bundle tests:
cd shopware6-qa-exercise
npm install
npx playwright install
BASE_URL='http://localhost:3000' npm test
```

Test scope and limitations
- The assignment requested Shopware 6 guest checkout automation (Cash on Delivery). Public demo sites often apply bot-protection or have unpredictable data which makes full guest-checkout flows flaky in CI.
- To provide a reliable, end-to-end positive test, I included a deterministic local demo (`demo/`) and a test that performs the full guest checkout against it: [tests/full-guest-checkout-local.spec.ts](tests/full-guest-checkout-local.spec.ts).
- For CI and public runs, the repository includes a CI-friendly stable check that verifies add-to-cart behavior against a public demo (Demowebshop) in `tests/guest-checkout.spec.ts`. This is intended as a reliable smoke assertion for CI, not a full guest checkout on an unstable public demo.

Notes
- Do not submit a separate repository — this repo (`https://github.com/NaserDemiraj/autoTest`) is the canonical submission. The `shopware6-qa-exercise/` folder is provided as a packaged bundle that matches the requested folder layout.
- If you want me to convert the markdown test plan and bug report to real PDFs and replace the placeholders, I can do that and push them here.

Contact / Next steps
- Tell me if you want the PDFs generated, a ZIP of the repo, or a PR prepared for review.


