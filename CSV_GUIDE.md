# Guest Management: CSV ↔ JSON

This guide explains how to work with guests using CSV and JSON formats.

## Overview

- **CSV**: Easy to edit in Excel/Google Sheets, good for manual data entry
- **JSON**: Used by the invitation system and database

## Files

- `guests.csv` - Spreadsheet format (edit in Excel/Google Sheets)
- `guests.json` - JSON format (used by invitation scripts)
- `scripts/csv-to-json.js` - Convert CSV → JSON
- `scripts/json-to-csv.js` - Convert JSON → CSV

## Workflow

### 1. Start with CSV

Edit `guests.csv` in your favorite spreadsheet tool:
- **Excel**: Open `guests.csv` directly
- **Google Sheets**: Upload the file or paste content
- **Mac Numbers**: Open the file

### 2. Convert CSV to JSON

After editing your CSV, convert it to JSON:

```bash
# Install dependencies (one-time)
npm install csv-parse

# Convert CSV to JSON
node scripts/csv-to-json.js guests.csv guests.json

# Or use defaults (reads guests.csv, writes guests.json)
node scripts/csv-to-json.js
```

### 3. Send Invitations

Use the generated JSON to send invitations:

```bash
node scripts/send-invitations.js both
```

### 4. Update from Responses

As guests RSVP, convert JSON back to CSV for review:

```bash
node scripts/json-to-csv.js guests.json guests.csv
```

Then open in Excel to see RSVP status.

---

## CSV Format

### Headers (Column Names)

| Column | Required | Type | Example |
|--------|----------|------|---------|
| `id` | ✓ | Number | 1 |
| `name` | ✓ | Text | John Doe |
| `phone` | ✓ | Text | +1234567890 |
| `gender` | ✗ | Text | Male, Female, Other |
| `inviteType` | ✗ | Text | Individual, Couple, Family |
| `invitationSent` | ✗ | Boolean | TRUE or FALSE |
| `rsvpReceived` | ✗ | Boolean | TRUE or FALSE |
| `rsvpStatus` | ✗ | Text | yes, no, maybe |

### Invite Types

| Type | Meaning | Examples |
|------|---------|----------|
| `Individual` | Inviting one person | Single friend, colleague |
| `Couple` | Inviting person with spouse/partner | Married couple, engaged pair |
| `Family` | Inviting entire family | Family with kids, extended family |

### Example CSV

```csv
id,name,phone,inviteType,notes,invitationSent,rsvpReceived,rsvpStatus
1,John Doe,+1234567890,IninvitationSent,rsvpReceived,rsvpStatus
1,John Doe,+1234567890,Individual,FALSE,FALSE,
2,Jane Smith,+1234567891,Couple,FALSE,FALSE,
3,Bob Johnson,+1234567892,Individual

### Tips for CSV

1. **inviteType** - Use one of: Individual, Couple, or Family
4. **Boolean values** - Use exactly `TRUE` or `FALSE` (uppercase)
5. **Phone format** - Always include country code: `+1`, `+91`, `+94`
3. **Boolean values** - Use exactly `TRUE` or `FALSE` (uppercase)
4. **Commas in fields** - If text contains commas, Excel will handle automatically

---

## JSON Format

The generated JSON looks like this:

```json
[
  {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+1234567890",
    "relationship": "Friend",
    "dietary_requirements": "",
    "plus_ones": 1,
    "notes": "Close friend from college",
    "rsvpReceived": false,
    "rsvpStatus": ""
  }
]
```

---

## Common Tasks

### Add New Guests

1. Open `guests.csv` in Excel/Google Sheets
2. Add new rows with guest info
3. Save the file
4. Run: `node scripts/csv-to-json.js`
5. Send invitations: `node scripts/send-invitations.js both`

### Check RSVP Status

After guests respond:

1. Update `guests.json` with RSVP details
2. Run: `node scripts/json-to-csv.js guests.json guests.csv`
3. Open `guests.csv` in Excel to see all responses

### Update Dietary Requirements

1. Open `guests.csv` in Excel
2. Edit the `dietary_requirements` column
3. Add athe RSVP form responses or notes column
### Update Guest Information

1. Open `guests.csv` in Excel
2. Edit the `inviteType` column: Individual, Couple, or Family
3. Add details in the `notes` column
4. Save and convert: `node scripts/csv-to-json.js`
- `2` = Guest + 2

---

## Troubleshooting

### "Invalid CSV"

**Problem**: Script says CSV format is invalid

**Solution**:
- Check that all required columns exist: `id`, `name`, `email`, `phone`
- Make sure there are no empty rows at the bottom
- Re-save CSV file in UTF-8 format

### "Missing required fields"

**Problem**: Some rows are skipped during conversion

**Solution**:
- Every guest must have: name, email, phone
- ID must be a number (not text)
- Check for extra spaces or hidden characters

### Changes aren't showing up

**Problem**: JSON still has old data after conversion

**Solution**:
- Make sure you saved the CSV file before running script
- Run: `node scripts/csv-to-json.js guests.csv guests.json`
- Check for error messages in console

---

## For Database Later

These files work with any database because:

1. **CSV** can be imported into database tools:
   - MySQL: `LOAD DATA INFILE`
   - PostgreSQL: `COPY` command
   - MongoDB: `mongoimport`

2. **JSON** can be directly inserted:
   - Mongoose/MongoDB: Direct insert
   - Firebase: Upload JSON file
   - Any REST API: POST the JSON

3. **Database Schema** (for reference):
   ```sql
   CREATE TABLE guests (
     id INT PRIMARY KEY,
     name VARCHAR(255) NOT NULL,
     email VARCHAR(255) NOT NULL,
     phone VARCHAR(20) NOT NULL,
     relationship VARCHAR(50),
     dietary_requirements VARCHAR(255),
     plus_ones INT DEFAULT 0,
     language_preference VARCHAR(50),
     notes TEXT,
     invitationSent BOOLEAN DEFAULT FALSE,
     rsvpReceived BOOLEAN DEFAULT FALSE,
     rsvpStatus VARCHAR(50)
   );
   ```

---

## Quick Reference

```bash
# Convert CSV to JSON
node scripts/csv-to-json.js

# Convert JSON to CSV
node scripts/json-to-csv.js

# Send invitations
node scripts/send-invitations.js both

# Check setup
npm list csv-parse
```
