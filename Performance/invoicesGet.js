import http from 'k6/http';
import { sleep, check } from 'k6';

const baseURL = __ENV.BASE_URL;

if (!baseURL) {
  throw new Error('BASE_URL no está definida');
}

export const options = {
  vus: 20,
  duration: '30s',
  rps: 20
};

export default function () {
  const res = http.get(baseURL);

  check(res, {
    'status is 200': r => r.status === 200
  });

  sleep(1);
}
