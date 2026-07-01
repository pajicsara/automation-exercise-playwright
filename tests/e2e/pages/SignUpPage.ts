import { Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class SignUpPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  private get nameInput() {
    return this.page.locator('[data-qa="signup-name"]');
  }

  private get emailInput() {
    return this.page.locator('[data-qa="signup-email"]');
  }

  private get signupButton() {
    return this.page.locator('[data-qa="signup-button"]');
  }

  private get titleMrRadio() {
    return this.page.locator('#id_gender1');
  }

  private get passwordInput() {
    return this.page.locator('[data-qa="password"]');
  }

  private get daysDropdown() {
    return this.page.locator('[data-qa="days"]');
  }

  private get monthsDropdown() {
    return this.page.locator('[data-qa="months"]');
  }

  private get yearsDropdown() {
    return this.page.locator('[data-qa="years"]');
  }

  private get firstNameInput() {
    return this.page.locator('[data-qa="first_name"]');
  }

  private get lastNameInput() {
    return this.page.locator('[data-qa="last_name"]');
  }

  private get companyInput() {
    return this.page.locator('[data-qa="company"]');
  }

  private get addressInput() {
    return this.page.locator('[data-qa="address"]');
  }

  private get address2Input() {
    return this.page.locator('[data-qa="address2"]');
  }

  private get countryDropdown() {
    return this.page.locator('[data-qa="country"]');
  }

  private get stateInput() {
    return this.page.locator('[data-qa="state"]');
  }

  private get cityInput() {
    return this.page.locator('[data-qa="city"]');
  }

  private get zipcodeInput() {
    return this.page.locator('[data-qa="zipcode"]');
  }

  private get mobileNumberInput() {
    return this.page.locator('[data-qa="mobile_number"]');
  }

  private get createAccountButton() {
    return this.page.locator('[data-qa="create-account"]');
  }

  private get accountCreatedMessage() {
    return this.page.getByRole('heading', { name: /account created/i });
  }

  private get continueButton() {
    return this.page.locator('[data-qa="continue-button"]');
  }

  async goto() {
    await this.page.goto('/login');
  }

  async startSignup(name: string, email: string) {
    await this.safeFill(this.nameInput, name);
    await this.safeFill(this.emailInput, email);
    await this.safeClick(this.signupButton);
  }

  async fillAccountInformation(user: any) {
    await this.safeClick(this.titleMrRadio);
    await this.safeFill(this.passwordInput, user.password);

    await this.daysDropdown.selectOption(user.birth_date);
    await this.monthsDropdown.selectOption(user.birth_month);
    await this.yearsDropdown.selectOption(user.birth_year);

    await this.safeFill(this.firstNameInput, user.firstname);
    await this.safeFill(this.lastNameInput, user.lastname);
    await this.safeFill(this.companyInput, user.company);
    await this.safeFill(this.addressInput, user.address1);
    await this.safeFill(this.address2Input, user.address2);

    await this.countryDropdown.selectOption(user.country);

    await this.safeFill(this.stateInput, user.state);
    await this.safeFill(this.cityInput, user.city);
    await this.safeFill(this.zipcodeInput, user.zipcode);
    await this.safeFill(this.mobileNumberInput, user.mobile_number);

    await this.safeClick(this.createAccountButton);
  }

  async continueAfterSignup() {
    await this.safeClick(this.continueButton);
  }

  async expectAccountCreated() {
    await expect(this.accountCreatedMessage).toBeVisible();
  }
}