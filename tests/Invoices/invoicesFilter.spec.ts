import { test, Page, expect } from '@playwright/test';
import LoginPage from '../../page/HomePage/LoginPage';
import invoicesFilterPage from '../../page/InvoicesPage/invoicesFilterPage';
import invoiceData from '../../fixture/invoiceData/invoices.json';
import createInvoicePage from '../../page/InvoicesPage/createInvoicePage';

test.describe('Invoice filtering by date, number and status', () => {
  let navigate: LoginPage;
  let invoice: invoicesFilterPage;

  test.beforeEach(async ({ page }) => {
    navigate = new LoginPage(page);
    const Code = process.env.ACCESSCODE || 'defaultCode';
    await page.goto('/');
    await navigate.accessDashboard(Code);
  });

  test('displays results when filtering by a valid invoice number', async ({ page }) => {
    invoice = new invoicesFilterPage(page);
    const invoiceNumber = invoiceData.invoicesNumber;

    await test.step('confirms that the invoice appears in the filtered list', async () => {
      await invoice.searchByInvoiceNumber(invoiceNumber);

      await invoice.expectFirstTableThNotEmpty();

      await invoice.clearFilter();
    });
  });

  test('displays invoices issued after selected start date', async ({ page }) => {
    invoice = new invoicesFilterPage(page);
    const InitialDate = invoiceData.startDate;

    await test.step('applies start date filter with random valid input', async () => {
      await invoice.searchByStartDate(InitialDate);

      await invoice.expectFirstTableThNotEmpty();

      await invoice.clearFilter();
    });
  });

  test('displays invoices issued before selected end date', async ({ page }) => {
    invoice = new invoicesFilterPage(page);
    const endDate = invoiceData.endDate;

    await test.step('applies end date filter using a random valid date', async () => {
      await invoice.searchByEndDate(endDate);

      await invoice.expectFirstTableThNotEmpty();

      await invoice.clearFilter();
    });
  });
  test('displays invoices filtered by selected status', async ({ page }) => {
    const invoice = new createInvoicePage(page);
    const statuses = invoiceData.statuses;

    for (const status of statuses) {
      await test.step(`ilters invoice list based on invoice status ${status}`, async () => {
        await invoice.invoiceStatus(status);

        const header = invoice.rowInvoiceId.first();
        const text = await header.innerText();
        expect(text.trim()).not.toBe('');

        await invoice.clearFilterAccion();
      });
    }
  });
});
