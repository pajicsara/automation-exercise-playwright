import { test } from '@playwright/test';
import { ProductsPage } from '../pages/ProductsPage';
import { AuthHelper } from '../helper/AuthHelper';
import { testData } from '../../resources/testData';

test('@core CORE - search product', async ({ page }) => {
  const auth = new AuthHelper(page);
  const products = new ProductsPage(page);

  await auth.loginAsValidUser();

  await products.goto();
  await products.searchProduct(testData.products.blueTop);

  await products.expectSearchResultsVisible();
});