# Exploratory Testing Report – Automation Exercise

## 1. Charter

The goal of this exploratory session was to review the most important e-commerce user flows from an end-user perspective and identify risks or quality concerns that may not be fully covered by automation.

Main areas explored:

* Registration and login
* Product search and product listing
* Cart behavior
* Checkout and payment flow
* API behavior compared to documentation
* General usability and stability of the demo application

---

## 2. Observations

### General

The application supports the main e-commerce flows: user registration, login, product browsing, cart management, and order placement.

The flows are mostly functional, but some areas feel fragile from a testing and user experience perspective. The application is also a public demo environment, so shared data and environment stability are important risks.

### API Observations

The API responses contain JSON-like response bodies, but the `Content-Type` header is returned as:

```text
text/html; charset=utf-8
```

This is inconsistent with the API documentation, which describes JSON responses.

This does not block the test suite because the body can still be parsed and validated, but it is a contract concern for API consumers.

### UI Observations

Some UI flows depend on modals and page transitions. For example, after adding a product to the cart, the application confirms the action through a modal.

Because of this, the automated tests wait for visible user outcomes, such as the cart modal, checkout page content, and payment form fields, instead of relying only on URL changes or fixed waits.

---

## 3. Findings

### Finding 1: API returns JSON body with HTML content type

**Area:** API
**Severity:** Medium
**Priority:** Medium

**Description:**
API endpoints return response bodies that are structured as JSON, but the response header is `Content-Type: text/html; charset=utf-8` instead of `application/json`.

**Expected result:**
API responses that return JSON should use an appropriate JSON content type, for example:

```text
application/json
```

**Actual result:**
The response body contains JSON-like data, but the content type is HTML.

**Risk / Impact:**
This can cause issues for API clients, tools, or frameworks that rely on the response content type to automatically parse the response. It also creates a mismatch between the documented API behavior and the actual implementation.

---

### Finding 2: Public demo environment can make test data unreliable

**Area:** Test data / Environment
**Severity:** Medium
**Priority:** Medium

**Description:**
The application is a shared public demo environment. Existing users and data can be changed or deleted by other users or test runs.

**Expected result:**
Automated tests should run against stable and controlled test data.

**Actual result:**
Some tests may depend on a stable demo user, while generated users are needed for registration and account lifecycle flows.

**Risk / Impact:**
Tests that depend on shared data can become flaky or fail for reasons unrelated to application changes. This is especially important for login, account deletion, and lifecycle scenarios.

**Mitigation:**
Use generated test data where possible and avoid deleting shared stable users. For a real project, a dedicated test environment and seeded test data would be preferred.

---

### Finding 3: Checkout flow depends on page readiness and external resources

**Area:** UI / Checkout
**Severity:** Low to Medium
**Priority:** Medium

**Description:**
During automation, page transitions around checkout and payment required waiting for specific visible elements instead of relying only on full page load events.

**Expected result:**
Checkout pages should become reliably usable after navigation.

**Actual result:**
The page may navigate successfully, but full load events can be delayed by external resources.

**Risk / Impact:**
Automated tests that wait only for full page load or use fixed waits may become flaky. Users on slower networks may also experience slower or inconsistent checkout page readiness.

**Mitigation:**
The automated tests wait for meaningful user-visible elements, such as `Address Details` on checkout and payment form fields on the payment page.

---

## 4. What I Would Explore Further

With more time, I would continue exploratory testing in these areas:

* Cart persistence before and after login
* Checkout validation for missing or invalid payment fields
* Registration validation for required fields and duplicate emails
* Product search edge cases, such as empty search, partial matches, and no results
* Account update and delete flows through both UI and API
* Category and brand navigation consistency
* Basic accessibility checks for forms and navigation
* Cross-browser behavior for the smoke purchase flow

---

## 5. Summary

The main user journeys are functional and suitable for automation coverage, especially login, registration, product search, cart, and checkout.

The biggest quality concern found during this session is the API contract inconsistency where JSON-like responses are returned with an HTML content type.

The main testing risk is the shared public demo environment, which can affect data reliability and test stability.
