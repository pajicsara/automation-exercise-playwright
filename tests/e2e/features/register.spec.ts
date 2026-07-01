import { test, expect } from '@playwright/test';
import { SignUpPage } from '../pages/SignUpPage';
import { testData } from '../../resources/testData';

test('@feature user can register', async ({ page }) => {
  const signUp = new SignUpPage(page);

  const user = testData.generateUser();

  await signUp.goto();
  await signUp.startSignup(user.name, user.email);
  await signUp.fillAccountInformation(user);

  await signUp.expectAccountCreated();
  await signUp.continueAfterSignup();

  await expect(page.locator('text=Logged in as')).toBeVisible();
});