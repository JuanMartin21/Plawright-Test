import http from 'k6/http';
import { sleep, check } from 'k6';

const baseURL = __ENV.BASE_URL;

if (!baseURL) {
  throw new Error('BASE_URL no está definida');
}

export const options = {
  vus: 10,
  duration: '20s',
  rps: 20,
};

function randomPrefix(length = 3) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

function generateInvoiceNumber() {
  const prefix = randomPrefix();
  const randomNum = Math.floor(Math.random() * 10000);
  return `${prefix}-${randomNum}`;
}

export default function () {
  const url = `${baseURL}/V1/invoices/`;

  const payload = JSON.stringify({
    invoice_number: generateInvoiceNumber(),
    total: 7000,
    invoice_date: "11/07/2025 5:41 PM",
    status: "Vigente",
    active: true,
  });

  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const res = http.post(url, payload, params);

  check(res, {
    'status is 201': (r) => r.status === 201,
  });

  sleep(1);
}
