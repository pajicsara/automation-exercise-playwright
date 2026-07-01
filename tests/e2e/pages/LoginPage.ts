import { Page, expect, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  get emailInput(): Locator {
    return this.page.locator('[data-qa="login-email"]');
  }

  get passwordInput(): Locator {
    return this.page.locator('[data-qa="login-password"]');
  }

  get loginButton(): Locator {
    return this.page.locator('[data-qa="login-button"]');
  }

  get loggedInText(): Locator {
    return this.page.locator('text=Logged in as');
  }

  get errorMessage() {
    return this.page.getByText('Your email or password is incorrect!');
  }

  get logoutButton(): Locator {
    return this.page.locator('a[href="/logout"]');
  }

  get loginHeading() {
    return this.page.getByText('Login to your account');
  }

  async goto() {
    await this.page.goto('/login');
    await expect(this.emailInput).toBeVisible();
  }

  async login(email: string, password: string) {
    await this.safeFill(this.emailInput, email);
    await this.safeFill(this.passwordInput, password);
    await this.safeClick(this.loginButton);
  }

  async expectLoggedIn() {
    await expect(this.loggedInText).toBeVisible();
  }

  async expectLoginError() {
    await expect(this.errorMessage).toBeVisible();
  }

  async logout() {
    await this.safeClick(this.logoutButton);
  }

  async expectLoginPageVisible() {
    await expect(this.loginHeading).toBeVisible();
  }
}