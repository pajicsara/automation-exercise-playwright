import { Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class ProductsPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  private get productsList() {
    return this.page.locator('.features_items .product-image-wrapper');
  }

  private get firstProductCard() {
    return this.productsList.first();
  }

  private get addToCartButton() {
    return this.firstProductCard.locator('a.add-to-cart').first();
  }

  private get addedToCartModal() {
    return this.page.locator('#cartModal');
  }

  private get continueShoppingButton() {
    return this.addedToCartModal.getByText('Continue Shopping');
  }

  private get viewCartButton() {
    return this.addedToCartModal.getByRole('link', { name: /view cart/i });
  }

  private get searchInput() {
    return this.page.locator('#search_product');
  }

  private get searchButton() {
    return this.page.locator('#submit_search');
  }

  private get searchResults() {
    return this.page.locator('.features_items .product-image-wrapper');
  }

  async goto() {
    await this.page.goto('/products');
  }

  async addFirstProductToCart() {
    await this.safeClick(this.addToCartButton);
    //need to wait for confiramtion modal, in order to cintinue with cart-related actions
    await expect(this.addedToCartModal).toBeVisible();
  }

  async continueShopping() {
    await this.safeClick(this.continueShoppingButton);
  }

  async viewCartFromModal() {
    await this.safeClick(this.viewCartButton);
  }

  async searchProduct(productName: string) {
    await this.safeFill(this.searchInput, productName);
    await this.safeClick(this.searchButton);
  }

  async expectSearchResultsVisible() {
    await expect(this.searchResults.first()).toBeVisible();
  }
}