import { faker } from '@faker-js/faker';


export function getRandomDateISO(from = '2024-01-01', to = '2025-12-31'): string {
  const randomDate = faker.date.between({
    from: new Date(from),
    to: new Date(to),
  });

  return formatDateToISO(randomDate);
}

export function formatDateToISO(date: Date): string {
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const dd = String(date.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
}