# Test Strategy – Automation Exercise

## 1. Objective
Validate core functionality of the Automation Exercise e-commerce application using a balanced approach of API and UI automation.

---

## 2. Scope

### In scope:
- User registration and authentication
- Product browsing and search
- Cart and checkout flows
- Core API endpoints validation

### Out of scope:
- Performance testing
- Security testing beyond basic negative cases
- Full UI coverage of all available test cases
- Visual/UI pixel-perfect validation
- Low business value UI scenarios (scroll, subscription, etc.)

---

## 3. Test Approach

### API Testing
Focus:
- Response validation (status codes, schema)
- Positive and negative scenarios
- Business logic validation (user lifecycle, search, account management)

### UI Testing (E2E)
Focus:
- Critical user journeys only
- Real user flows (not isolated UI checks)

Covered flows:
- Register → Login → Logout
- Product search and browsing
- Add to cart → Checkout → Order placement

---

## 4. Prioritization

### High priority:
- Registration
- Login / Logout
- Add to cart
- Checkout flow

### Medium priority:
- Product search
- Product details
- Negative login scenarios

### Low priority:
- Subscription UI
- Scroll behavior
- Static or non-business pages

---

## 5. Risks
- Demo environment instability
- Shared or changing test data
- Flaky UI selectors
- API inconsistencies
- Over-automation risk (low ROI tests)

---

## 6. Automation Design
- Separation of API and UI test layers
- Page Object Model for UI
- Reusable API client abstraction
- Focus on stability over coverage

---

## 7. Execution
Tests are executed via:
- npm scripts
- CI pipeline (GitHub Actions)