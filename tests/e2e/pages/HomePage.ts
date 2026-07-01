import { Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class HomePage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  // =====================
  // LOCATORS (getters)
  // =====================

  private get homeLogo() {
    return this.page.locator('a[href="/"]');
  }

  private get signupLoginButton() {
    return this.page.locator('a[href="/login"]');
  }

  private get productsButton() {
    return this.page.locator('a[href="/products"]');
  }

  private get cartButton() {
    return this.page.locator('a[href="/view_cart"]');
  }

  private get subscriptionTitle() {
    return this.page.getByRole('heading', { name: 'Subscription' });
  }

  // =====================
  // ACTIONS
  // =====================

  async goto() {
    await this.page.goto('/');
  }

  async openLoginPage() {
    await this.safeClick(this.signupLoginButton);
  }

  async openProductsPage() {
    await this.safeClick(this.productsButton);
  }

  async openCart() {
    await this.safeClick(this.cartButton);
  }

  async scrollToFooter() {
    await this.page.evaluate(() => {
      window.scrollTo(0, document.body.scrollHeight);
    });
  }

  // =====================
  // ASSERTIONS
  // =====================

  async expectHomePageVisible() {
    await expect(this.homeLogo).toBeVisible();
  }

  async expectSubscriptionVisible() {
    await expect(this.subscriptionTitle).toBeVisible();
  }
}