import { Page, Locator, expect } from '@playwright/test';

export default class invoicesFilterPage {
  readonly page: Page;
  readonly invoiceNameInput: Locator;
  readonly searchFilterBtn: Locator;
  readonly clearFilterBtn: Locator;
  readonly statusDropdown: Locator;
  readonly starDate: Locator;
  readonly endDate: Locator;
  readonly rowIdTable: Locator;

  constructor(page: Page) {
    this.page = page;
    this.invoiceNameInput = page.locator('#invoiceName');
    this.searchFilterBtn = page.getByRole('button', { name: 'Buscar' });
    this.clearFilterBtn = page.getByRole('button', { name: 'Limpiar Filtros' });
    this.statusDropdown = page.locator('#status');
    this.starDate = page.locator('#startDate');
    this.endDate = page.locator('#endDate');
    this.rowIdTable = page.locator('table.table-zebra tbody th');
  }

  async searchByInvoiceNumber(invoiceNumber: string) {
    await this.invoiceNameInput.fill(invoiceNumber);
    await this.searchFilterBtn.click();
  }

  async clearFilter() {
    await this.clearFilterBtn.click();
  }

  async searchByStartDate(initialDate: string) {
    await this.starDate.fill(initialDate);
    await this.searchFilterBtn.click();
  }

  async searchByEndDate(finalDate: string) {
    await this.endDate.fill(finalDate);
    await this.searchFilterBtn.click();
  }

  async expectFirstTableThNotEmpty() {
    const thCells = this.rowIdTable;
    const thText = (await thCells.first().innerText()).trim();
    expect(thText).not.toBe('');
  }
}
