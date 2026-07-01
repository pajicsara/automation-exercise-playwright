import { Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class CheckoutPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  private get placeOrderButton() {
    return this.page.getByRole('link', { name: /place order/i });
  }

  private get nameOnCardInput() {
    return this.page.locator('[data-qa="name-on-card"]');
  }

  private get cardNumberInput() {
    return this.page.locator('[data-qa="card-number"]');
  }

  private get cvcInput() {
    return this.page.locator('[data-qa="cvc"]');
  }

  private get expiryMonthInput() {
    return this.page.locator('[data-qa="expiry-month"]');
  }

  private get expiryYearInput() {
    return this.page.locator('[data-qa="expiry-year"]');
  }

  private get payButton() {
    return this.page.locator('[data-qa="pay-button"]');
  }

  async placeOrder() {
    await this.safeClick(this.placeOrderButton);

    await expect(this.page).toHaveURL(/.*\/payment/);
    await expect(this.nameOnCardInput).toBeVisible();
  }

  async fillPaymentDetails(data: {
    name: string;
    card: string;
    cvc: string;
    month: string;
    year: string;
  }) {
    await this.safeFill(this.nameOnCardInput, data.name);
    await this.safeFill(this.cardNumberInput, data.card);
    await this.safeFill(this.cvcInput, data.cvc);
    await this.safeFill(this.expiryMonthInput, data.month);
    await this.safeFill(this.expiryYearInput, data.year);
  }

  async confirmPayment() {
    await this.safeClick(this.payButton);
  }

  async expectOrderSuccess() {
    await expect(
      this.page.getByRole('heading', { name: /order placed/i })
    ).toBeVisible();

    await expect(
      this.page.getByText('Congratulations! Your order has been confirmed!')
    ).toBeVisible();
  }
}