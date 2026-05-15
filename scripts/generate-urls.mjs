// Run: node scripts/generate-urls.mjs
// Prints a personalized invitation URL for every guest in guests.csv

import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const BASE_URL = 'https://pankajabalasooriya.github.io/sinhala-wedding-rsvp';

function generateToken(id) {
  return Buffer.from(`w:${id}`).toString('base64').replace(/=/g, '');
}

const csv = readFileSync(resolve(__dirname, '../guests.csv'), 'utf8');
const rows = csv.trim().split('\n').slice(1); // skip header

console.log('\nInvitation URLs\n' + '='.repeat(80));

for (const row of rows) {
  const [id, name, phone] = row.split(',');
  const token = generateToken(id.trim());
  const url = `${BASE_URL}/?guest=${token}`;
  console.log(`\n[${id.trim()}] ${name.trim()}`);
  console.log(`    Phone : ${phone.trim()}`);
  console.log(`    URL   : ${url}`);
}

console.log('\n' + '='.repeat(80));
