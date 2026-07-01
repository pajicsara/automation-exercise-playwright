import { Page } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { testData } from '../../resources/testData';

export class AuthHelper {
  private loginPage: LoginPage;

  constructor(private page: Page) {
    this.loginPage = new LoginPage(page);
  }

  async loginAsValidUser() {
    await this.loginPage.goto();

    await this.loginPage.login(
      testData.stableUser.email,
      testData.stableUser.password
    );

    await this.loginPage.expectLoggedIn();
  }

  async loginAsInvalidUser() {
    await this.loginPage.goto();

    await this.loginPage.login(
      testData.invalidUser.email,
      testData.invalidUser.password
    );

    await this.loginPage.expectLoginError();
  }
}