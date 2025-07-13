import { Page, Locator } from '@playwright/test';
import { faker } from '@faker-js/faker';

export default class createInvoicePage {
  readonly page: Page;
  readonly newInvoiceBtn: Locator;
  readonly invoiceNumberTxt: Locator;
  readonly InvoiceTotalTxt: Locator;
  readonly statusSelect: Locator;
  readonly createInvoiceBtn: Locator;
  readonly rowInvoiceNumber: Locator;
  readonly rowInvoiceId: Locator;
  readonly clearFilter: Locator;

  constructor(page: Page) {
    this.page = page;
    this.newInvoiceBtn = page.getByRole('button', { name: 'Nueva Factura' });
    this.invoiceNumberTxt = page.locator('#invoiceNumber');
    this.InvoiceTotalTxt = page.locator('#total');
    this.statusSelect = page.getByLabel('Estado');
    this.createInvoiceBtn = page.getByRole('button', { name: 'Crear Factura' });
    this.rowInvoiceNumber = page.locator('//tbody/tr[3]/td[1]');
    this.rowInvoiceId = page.locator('//tbody/tr[3]/th');
    this.clearFilter = page.getByRole('button', { name: 'Limpiar Filtros' });
  }

  private generateInvoiceCode(): string {
    const letters = faker.string.alpha({ length: 3, casing: 'upper' });
    const numbers = faker.number.int({ min: 0, max: 999 }).toString().padStart(3, '0');
    return `${letters}-${numbers}`;
  }

  async createNewInvoice(): Promise<{ code: string; total: number }> {
    const invoiceCode = this.generateInvoiceCode();
    const invoiceTotal = faker.number.int({ min: 5500, max: 5700 });

    await this.newInvoiceBtn.click();
    await this.invoiceNumberTxt.fill(invoiceCode);
    await this.InvoiceTotalTxt.fill(invoiceTotal.toString());

    return { code: invoiceCode, total: invoiceTotal };
  }

  async invoiceStatus(status: string) {
    await this.statusSelect.selectOption({ label: status });
  }

  async clickCreateInvoiceButton() {
    await this.createInvoiceBtn.click();
  }
  async clearFilterAccion() {
    await this.clearFilter.click();
  }
}
