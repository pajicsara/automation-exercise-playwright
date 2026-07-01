# Automation Exercise Playwright Tests

This project contains API and end-to-end tests for the Automation Exercise demo e-commerce application.

The assignment was timeboxed, so I focused on core flows, maintainability, and clear test intent instead of trying to automate every available scenario.

## Tech Stack

* Playwright
* TypeScript
* Node.js
* Playwright HTML report
* GitHub Actions

## Application Under Test

UI: https://automationexercise.com
API: https://automationexercise.com/api

## Project Structure

```text
tests/
  api/
    services/
      endpoints.ts
    auth.spec.ts
    brand.spec.ts
    product.spec.ts
    search.spec.ts
    user-lifecycle.spec.ts

  e2e/
    core/
      cart.spec.ts
      login.spec.ts
      search.spec.ts
    features/
      register.spec.ts
    smoke/
      purchase-flow.spec.ts
    helper/
      AuthHelper.ts
      PurchaseHelper.ts
    pages/
      BasePage.ts
      CartPage.ts
      CheckoutPage.ts
      HomePage.ts
      LoginPage.ts
      ProductsPage.ts
      SignUpPage.ts

  resources/
    testData.ts

utils/
  random.ts
```

## Installation

Install dependencies:

```bash
npm install
```

Install Playwright browsers:

```bash
npx playwright install
```

## Running Tests

Run all tests:

```bash
npm test
```

Run API tests only:

```bash
npm run test:api
```

Run E2E tests only:

```bash
npm run test:e2e
```

Run smoke tests:

```bash
npm run test:smoke
```

Run core tests:

```bash
npm run test:core
```

Run negative tests:

```bash
npm run test:negative
```

Open the Playwright HTML report:

```bash
npm run test:report
```

## Test Coverage

### API tests

The API suite covers:

* Product list retrieval
* Product response structure
* Unsupported method validation for product list
* Brand list retrieval
* Product search
* Missing required search parameter
* Login verification with valid credentials
* Login verification with invalid credentials
* Missing required login parameter
* User lifecycle: create account, verify login, delete account

A quality concern noticed during API testing is that the API returns a JSON-like response body, but the response header is `Content-Type: text/html; charset=utf-8` instead of `application/json`.

The tests validate the documented response body, but this header inconsistency is noted because it could affect API consumers that rely on content type.

### E2E tests

The E2E suite covers:

* Valid login
* Invalid login
* Logout
* User registration
* Product search
* Add product to cart
* Remove product from cart
* Purchase flow smoke test

I intentionally did not automate all UI scenarios from the demo site. Lower-value checks such as scroll behavior, subscription UI, static pages, and full category navigation were left out to keep the suite focused and stable.

## Test Design Notes

The UI tests use Page Object Model so that selectors and page actions are separated from test intent.

Reusable helpers are used for repeated flows such as login and purchase.

Test data is centralized in `testData.ts`. New user data is generated dynamically where possible to avoid conflicts in the shared demo environment.

The suite is split into separate Playwright projects for API and E2E execution.

## Tags

Some tests are tagged to support selective execution:

* `@smoke`
* `@core`
* `@negative`
* `@api`
* `@auth`
* `@products`
* `@lifecycle`

Example:

```bash
npx playwright test --grep @smoke
```

## Assumptions and Constraints

* The application is a public demo site, so test data and environment stability are not fully controlled.
* Some flows depend on demo application behavior such as confirmation modals and page transitions.
* E2E tests wait for visible user outcomes where possible instead of relying on fixed waits.
* Cross-browser coverage was not included in the default execution to keep the suite faster and more stable for this timebox.
* The stable demo user is used only for login-based UI flows. Generated users are used for registration and API lifecycle scenarios.

## CI/CD

A GitHub Actions workflow is included to run the test suite on push and pull request events.

In a real project, I would usually separate faster API checks from slower UI checks and store Playwright reports, screenshots, and traces as CI artifacts.

## What I Would Add With More Time

* More detailed API schema validation
* More negative tests for account create and update endpoints
* Checkout validation for missing or invalid payment fields
* Cross-browser execution for the smoke suite
* More exploratory testing around cart persistence between anonymous and logged-in states
* Better test data cleanup for UI-created accounts
