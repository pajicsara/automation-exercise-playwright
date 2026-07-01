import { test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { testData } from '../../resources/testData';

test.describe('Login', () => {
  test('@core valid login', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login(
      testData.stableUser.email,
      testData.stableUser.password
    );

    await loginPage.expectLoggedIn();
  });

  test('@core @negative invalid login', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login(
      testData.invalidUser.email,
      testData.invalidUser.password
    );

    await loginPage.expectLoginError();
  });

  test('@core CORE - user can logout', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login(
      testData.stableUser.email,
      testData.stableUser.password
    );

    await loginPage.expectLoggedIn();

    await loginPage.logout();
    await loginPage.expectLoginPageVisible();
  });
});