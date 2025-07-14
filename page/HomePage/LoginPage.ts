import { Page, Locator, expect } from '@playwright/test';

export default class LoginPage {
  readonly page: Page;
  readonly accessCode: Locator;
  readonly submitButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.accessCode = page.locator('input, #access-code');
    this.submitButton = page.getByRole('button', { name: 'Validar Código' });
  }

  async accessDashboard(code: string) {
    await expect(this.accessCode).toBeVisible();
    await this.accessCode.click();
    await this.accessCode.fill(code);
    await this.submitButton.click();
  }
}
