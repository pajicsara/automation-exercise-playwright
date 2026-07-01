import { Page, Locator, expect } from '@playwright/test';

export class BasePage {
  constructor(protected page: Page) {}

  async safeClick(locator: Locator) {
    await expect(locator).toBeVisible();
    await expect(locator).toBeEnabled();
    await locator.click();
  }

  async safeFill(locator: Locator, value: string) {
    await expect(locator).toBeVisible();
    await locator.fill(value);
  }

  async waitForText(text: string) {
    await expect(this.page.locator('body')).toContainText(text);
  }
}