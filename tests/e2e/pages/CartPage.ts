import { Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class CartPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  private get cartRows() {
    return this.page.locator('#cart_info_table tbody tr');
  }

  private get productNames() {
    return this.page.locator('#cart_info_table .cart_description h4 a');
  }

  private get proceedToCheckoutButton() {
    return this.page.locator('a.check_out');
  }

  private get removeButtons() {
    return this.page.locator('#cart_info_table .cart_quantity_delete');
  }

  private get emptyCartMessage() {
    return this.page.getByText(/Cart is empty/i);
  }

  async goto() {
    await this.page.goto('/view_cart');
  }

  async proceedToCheckout() {
    await this.safeClick(this.proceedToCheckoutButton);

    //wait for page content, instead of full load, cause demo site is unstable
    await expect(this.page).toHaveURL(/.*\/checkout/);
    await expect(this.page.getByText('Address Details')).toBeVisible();
  }

  async removeFirstItem() {
    await this.safeClick(this.removeButtons.first());
  }

  async expectCartNotEmpty() {
    await expect(this.cartRows.first()).toBeVisible();
  }

  async expectProductInCart(productName: string) {
    await expect(this.productNames).toContainText(productName);
  }

  async expectCartEmpty() {
    await expect(this.emptyCartMessage).toBeVisible();
  }
}