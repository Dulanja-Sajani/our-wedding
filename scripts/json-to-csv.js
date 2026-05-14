#!/usr/bin/env node

/**
 * JSON to CSV Converter
 * Converts guests.json to guests.csv for editing in Excel/Google Sheets
 * 
 * Usage:
 *   node scripts/json-to-csv.js
 *   node scripts/json-to-csv.js input.json output.csv
 */

import fs from 'fs';
import path from 'path';

const inputFile = process.argv[2] || 'guests.json';
const outputFile = process.argv[3] || 'guests.csv';

const inputPath = path.resolve(inputFile);
const outputPath = path.resolve(outputFile);

// Check if input file exists
if (!fs.existsSync(inputPath)) {
  console.error(`❌ Error: File not found: ${inputPath}`);
  process.exit(1);
}

try {
  const jsonData = JSON.parse(fs.readFileSync(inputPath, 'utf-8'));

  if (!Array.isArray(jsonData) || jsonData.length === 0) {
    console.error('❌ JSON file must contain an array of guests');
    process.exit(1);
  }

  // Define CSV headers
  const headers = [
    'id',
    'name',
    'phone',
    'gender',
    'inviteType',
    'invitationSent',
    'rsvpReceived',
    'rsvpStatus',
  ];

  // Escape CSV values
  const escapeCsvValue = (value) => {
    if (value === null || value === undefined) return '';
    const str = String(value);
    if (str.includes(',') || str.includes('"') || str.includes('\n')) {
      return `"${str.replace(/"/g, '""')}"`;
    }
    return str;
  };

  // Build CSV content
  const csvLines = [
    headers.join(','),
    ...jsonData.map(guest =>
      headers.map(header => escapeCsvValue(guest[header])).join(',')
    ),
  ];

  const csvContent = csvLines.join('\n');

  fs.writeFileSync(outputPath, csvContent);
  console.log(`✅ Conversion successful!`);
  console.log(`   Input: ${inputPath}`);
  console.log(`   Output: ${outputPath}`);
  console.log(`   Guests processed: ${jsonData.length}`);
  console.log(`\n📝 You can now edit the CSV in Excel, Google Sheets, or any spreadsheet app.`);
} catch (error) {
  console.error('❌ Error:', error.message);
  process.exit(1);
}
