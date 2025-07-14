import { test, expect } from '@playwright/test';
import LoginPage from '../../page/HomePage/LoginPage';
import createInvoicePage from '../../page/InvoicesPage/createInvoicePage';

test.describe('When editing an invoice', () => {
  let navigate: LoginPage;

  test.beforeEach(async ({ page }) => {
    navigate = new LoginPage(page);
    const Code = process.env.ACCESSCODE || 'defaultCode';
    await page.goto('/');
    await navigate.accessDashboard(Code);
  });

  test('successfully edits an invoice', async ({ page }) => {
    const editInvoice = new createInvoicePage(page);
    let total: number;

    await test.step('clicks the edit invoice button', async () => {
      const result = await editInvoice.editInvoice();
      total = result.total;
    });
    await test.step('validates that the total has been updated', async () => {
      const celda = editInvoice.rowInvoiceTotal;
      const text = await celda.textContent();

      const cleanText = text?.replace(/[$,]/g, '').split('.')[0].trim();

      const displayedTotal = Number(cleanText);
      expect(displayedTotal).toBe(total);

      console.log(`Invoice code: ${total}`);
      console.log(`Invoice code: ${displayedTotal}`);
    });
  });
});
