import { test } from '@playwright/test';
import { PurchaseHelper } from '../helper/PurchaseHelper';

test('@smoke SMOKE - user can complete purchase', async ({ page }) => {
  const purchase = new PurchaseHelper(page);

  await purchase.completePurchaseFlow();
});