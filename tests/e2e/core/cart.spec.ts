import { test } from '@playwright/test';
import { AuthHelper } from '../helper/AuthHelper';
import { ProductsPage } from '../pages/ProductsPage';
import { CartPage } from '../pages/CartPage';

test.describe('Cart', () => {

  test('@core CORE - user can add product to cart', async ({ page }) => {
    const auth = new AuthHelper(page);
    const products = new ProductsPage(page);
    const cart = new CartPage(page);

    await auth.loginAsValidUser();

    await products.goto();
    await products.addFirstProductToCart();

    await cart.goto();
    await cart.expectCartNotEmpty();
  });

  test('@feature FEATURE - user can remove product from cart', async ({ page }) => {
    const auth = new AuthHelper(page);
    const products = new ProductsPage(page);
    const cart = new CartPage(page);

    await auth.loginAsValidUser();

    await products.goto();
    await products.addFirstProductToCart();

    await cart.goto();
    await cart.expectCartNotEmpty();

    await cart.removeFirstItem();
    await cart.expectCartEmpty();
  });

});