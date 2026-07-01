# Test Strategy – Automation Exercise

## 1. Objective

Validate the core functionality of the Automation Exercise demo e-commerce application using a balanced API and UI automation approach.

The goal was not to automate every available scenario, but to prioritize the flows that bring the most value within the given timebox.

---

## 2. Scope

### In scope

* User registration and authentication
* Product browsing and search
* Cart functionality
* Checkout and order placement flow
* Core API endpoint validation
* Positive and negative API scenarios

### Out of scope

* Performance testing
* Security testing beyond basic negative cases
* Full UI coverage of all provided demo test cases
* Visual or pixel-perfect validation
* Low business value UI scenarios such as scroll behavior, subscription form, and static pages

---

## 3. Test Approach

### API Testing

The API tests focus on:

* Response validation
* Positive and negative scenarios
* Required parameter validation
* Unsupported HTTP method validation
* Basic business flow validation, such as user lifecycle

One API contract concern observed during testing is that API responses return a JSON-like body, but the response `Content-Type` is `text/html; charset=utf-8` instead of `application/json`.

The tests are written against the documented response body, but this inconsistency is noted as a quality concern because it could affect API consumers that rely on content type.

### UI Testing

The E2E tests focus on critical user journeys rather than isolated UI checks.

Covered flows include:

* Valid login
* Invalid login
* Logout
* User registration
* Product search
* Add product to cart
* Remove product from cart
* Checkout and order placement smoke flow

The UI tests use user-visible outcomes and page state checks instead of relying only on navigation or static waits.

---

## 4. Prioritization

### High priority

* Registration
* Login and logout
* Add to cart
* Checkout and order placement
* API user lifecycle

### Medium priority

* Product search
* Product and brand list API checks
* Negative login and missing parameter scenarios

### Low priority

* Subscription UI
* Scroll behavior
* Static informational pages
* Full category and brand navigation coverage

---

## 5. Risks and Constraints

* The application is a public demo environment, so data and environment stability are not fully controlled.
* Existing demo users can be modified or deleted, so generated test data is preferred where possible.
* UI tests may be affected by external resources, ads, modals, or slower page loads.
* API responses have inconsistent headers compared to the documented JSON behavior.
* Over-automation was avoided to keep the suite focused and maintainable.

---

## 6. Automation Design

* API and E2E tests are separated into different Playwright projects.
* UI tests use Page Object Model to keep selectors and actions outside of test files.
* Shared helpers are used for repeated setup flows such as login and purchase.
* Test data is centralized and generated where needed.
* Tests are tagged to support selective execution, for example smoke, core, negative, API, and lifecycle tests.

---

## 7. Execution

Tests can be executed using npm scripts:

* `npm test` – run all tests
* `npm run test:api` – run API tests only
* `npm run test:e2e` – run E2E tests only
* `npm run test:smoke` – run smoke tests
* `npm run test:core` – run core tests
* `npm run test:negative` – run negative tests
* `npm run test:report` – open Playwright HTML report

In CI, the same scripts can be used to run the test suite on push and pull request events.
