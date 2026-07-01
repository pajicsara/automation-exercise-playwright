import { Page } from '@playwright/test';
import { AuthHelper } from './AuthHelper';
import { ProductsPage } from '../pages/ProductsPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { testData } from '../../resources/testData';

export class PurchaseHelper {
  constructor(private page: Page) {}

  async completePurchaseFlow() {
    const auth = new AuthHelper(this.page);
    const products = new ProductsPage(this.page);
    const cart = new CartPage(this.page);
    const checkout = new CheckoutPage(this.page);

    await auth.loginAsValidUser();

    await products.goto();
    await products.addFirstProductToCart();

    await cart.goto();
    await cart.expectCartNotEmpty();

    await cart.proceedToCheckout();

    await checkout.placeOrder();
    await checkout.fillPaymentDetails(testData.payment.valid);
    await checkout.confirmPayment();
    await checkout.expectOrderSuccess();
  }
}