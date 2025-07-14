import { test, expect } from '@playwright/test';
import LoginPage from '../../page/HomePage/LoginPage';
import createInvoicePage from '../../page/InvoicesPage/createInvoicePage';
import invoiceData from '../../fixture/invoiceData/invoices.json';

test.describe('When creating a new invoice', () => {
  let navigate: LoginPage;

  test.beforeEach(async ({ page }) => {
    navigate = new LoginPage(page);
    const Code = process.env.ACCESSCODE || 'defaultCode';
    await page.goto('/');
    await navigate.accessDashboard(Code);
  });

  test('successfully creates a new invoice with valid data', async ({ page }) => {
    const newInvoice = new createInvoicePage(page);
    const status = invoiceData.statuses[0];

    await test.step('verifies the invoice is created successfully', async () => {
      const { code } = await newInvoice.createNewInvoice();
      await newInvoice.invoiceStatus(status);
      await newInvoice.clickCreateInvoiceButton();

      const celda = newInvoice.rowInvoiceNumber;
      await expect(celda).toHaveText(code);
      console.log(`Invoice code: ${code}`);
    });
  });

  test.beforeEach(async ({ page }) => {
    const newInvoice = new createInvoicePage(page);
    await newInvoice.clearFilterAccion();
  });
});
