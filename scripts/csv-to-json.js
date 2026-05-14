#!/usr/bin/env node

/**
 * CSV to JSON Converter
 * Converts guests.csv to guests.json
 * 
 * Usage:
 *   node scripts/csv-to-json.js
 *   node scripts/csv-to-json.js input.csv output.json
 */

import fs from 'fs';
import path from 'path';
import { createReadStream } from 'fs';
import { parse } from 'csv-parse';

const inputFile = process.argv[2] || 'guests.csv';
const outputFile = process.argv[3] || 'guests.json';

const inputPath = path.resolve(inputFile);
const outputPath = path.resolve(outputFile);

// Check if input file exists
if (!fs.existsSync(inputPath)) {
  console.error(`❌ Error: File not found: ${inputPath}`);
  console.error(`\nUsage: node scripts/csv-to-json.js [input.csv] [output.json]`);
  console.error(`\nExample: node scripts/csv-to-json.js guests.csv guests.json`);
  process.exit(1);
}

const guests = [];
let lineCount = 0;

createReadStream(inputPath)
  .pipe(parse({
    columns: true,
    skip_empty_lines: true,
    trim: true,
  }))
  .on('data', (row) => {
    lineCount++;
    try {
      // Convert string boolean values to actual booleans
      const guest = {
        id: parseInt(row.id, 10),
        name: row.name?.trim() || '',
        phone: row.phone?.trim() || '',
        gender: row.gender?.trim() || '',
        inviteType: row.inviteType?.trim() || 'Individual',
        invitationSent: row.invitationSent?.toLowerCase() === 'true' || false,
        rsvpReceived: row.rsvpReceived?.toLowerCase() === 'true' || false,
        rsvpStatus: row.rsvpStatus?.trim() || '',
      };

      // Validation
      if (!guest.name || !guest.phone) {
        console.warn(`⚠️  Skipping row ${lineCount}: Missing required fields (name or phone)`);
        return;
      }

      guests.push(guest);
    } catch (error) {
      console.error(`❌ Error parsing row ${lineCount}:`, error.message);
    }
  })
  .on('error', (error) => {
    console.error('❌ Error reading CSV file:', error.message);
    process.exit(1);
  })
  .on('end', () => {
    if (guests.length === 0) {
      console.error('❌ No valid guests found in CSV file');
      process.exit(1);
    }

    try {
      fs.writeFileSync(outputPath, JSON.stringify(guests, null, 2));
      console.log(`✅ Conversion successful!`);
      console.log(`   Input: ${inputPath}`);
      console.log(`   Output: ${outputPath}`);
      console.log(`   Guests processed: ${guests.length}`);
    } catch (error) {
      console.error('❌ Error writing JSON file:', error.message);
      process.exit(1);
    }
  });
