# Wedding Invitation System - Complete Setup & Workflow

## 🎉 Overview

This system allows you to:
- ✅ Manage guest list in CSV (Excel/Google Sheets)
- ✅ Convert CSV to JSON automatically
- ✅ Send personalized email invitations with unique RSVP links
- ✅ Send WhatsApp messages to guests
- ✅ Track who's been invited and who's responded
- ✅ Use data for database later

---

## 📋 Files Overview

### Core Files
- **`guests.csv`** - Your guest list (edit in Excel/Sheets)
- **`guests.json`** - Generated JSON (used by scripts)
- **`.env`** - Your credentials (NEVER share this!)

### Scripts
- **`scripts/csv-to-json.js`** - Convert CSV → JSON
- **`scripts/json-to-csv.js`** - Convert JSON → CSV
- **`scripts/send-invitations.js`** - Send emails & WhatsApp
- **`scripts/setup.sh`** - Setup for Mac/Linux
- **`scripts/setup.bat`** - Setup for Windows

### Documentation
- **`INVITATION_SETUP.md`** - Detailed email & WhatsApp setup
- **`CSV_GUIDE.md`** - CSV format & editing guide
- **`GUEST_MANAGEMENT.md`** - This file

---

## 🚀 Quick Start (5 Minutes)

### 1. Run Setup Script

**On Mac/Linux:**
```bash
chmod +x scripts/setup.sh
./scripts/setup.sh
```

**On Windows:**
```bash
scripts/setup.bat
```

Or manually:
```bash
npm install nodemailer twilio dotenv csv-parse
```

### 2. Edit Guest List

Open `guests.csv` in Excel:
```
id,name,email,phone,relationship,dietary_requirements,plus_ones,language_preference,notes,invitationSent,rsvpReceived,rsvpStatus
1,John Doe,john@example.com,+1234567890,Friend,,1,English,Close friend,FALSE,FALSE,
2,Jane Smith,jane@example.com,+1234567891,Family,Vegetarian,2,English,Sister,FALSE,FALSE,
```

### 3. Convert to JSON

```bash
npm run csv-to-json
```

### 4. Set Up Credentials

Create `.env` file:
```
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
TWILIO_ACCOUNT_SID=ACxxxxxx
TWILIO_AUTH_TOKEN=xxxxx
TWILIO_PHONE_NUMBER=+1234567890
WEBSITE_URL=https://yourwedding.com
```

[Full setup guide in INVITATION_SETUP.md](INVITATION_SETUP.md)

### 5. Send Invitations

```bash
npm run send-invitations
```

---

## 📊 Complete Workflow

```
Step 1: Create/Edit CSV
   guests.csv
   - id, name, phone, inviteType, notes
   - inviteType: Individual, Couple, or Family
      ↓
Step 2: Convert to JSON
   npm run csv-to-json
      ↓
Step 3: Review guests.json
      ↓
Step 4: Set up .env credentials (if sending via email/WhatsApp)
      ↓
Step 5: Send Invitations (optional)
   npm run send-invitations
      ↓
Step 6: Guests receive invites and RSVP
      ↓
Step 7: Track RSVPs in guests.json
      ↓
Step 8: Export back to CSV
   npm run json-to-csv
      ↓
Step 9: Use CSV/JSON for database
```

---

## 📝 CSV Format

### Required Columns
| Column | Type | Example |
|--------|------|---------|
| **id** | Number | 1 |
| **name** | Text | John Doe |
| **phone** | Text | +1234567890 |

### Optional Columns
| Column | Type | Example |
|--------|------|---------|
| gender | Text | Male, Female, Other |
| inviteType | Text | Individual, Couple, Family |
| invitationSent | Boolean | TRUE/FALSE |
| rsvpReceived | Boolean | TRUE/FALSE |
| rsvpStatus | Text | yes, no, maybe |

### Invite Types
- **Individual**: Single person invitation
- **Couple**: Married couple or couple with partner  
- **Family**: Entire family (parents + kids)

### Phone Number Format
Always include country code:
```
USA:       +1 (555) 123-4567
India:     +91 98765 43210
Sri Lanka: +94 76 123 4567
UK:        +44 20 7946 0958
```

---

## 🎁 What Guests Receive

### Email Invitation
```
Subject: You're Invited to Our Wedding! 💍

Dear John,

We're delighted to invite you to our wedding celebration!

Please RSVP by clicking the link below:
[RSVP Now]

Or copy this link: 
https://yourwedding.com?guest=eyJnZXN0SWQiOjE...

We can't wait to celebrate with you!
```

### WhatsApp Message
```
Hi John! 👋

You're invited to our wedding! 💍

Please RSVP by clicking here: 
https://yourwedding.com?guest=eyJnZXN0SWQiOjE...

We can't wait to celebrate with you!
```

### Personalized RSVP Link
Each guest gets a unique link:
```
https://yourwedding.com?guest=eyJnZXN0SWQiOjEsImVtYWlsIjoiam9obkBleGFtcGxlLmNvbSJ9
```

When they click:
- ✓ Their name auto-fills in the form
- ✓ Their response is verified with token
- ✓ Their data is secure

---

## 🔄 Data Flow Diagram

```
CSV (Excel)
    ↓
    ├─→ csv-to-json.js
    ↓
JSON (Database)
    ↓
    ├─→ send-invitations.js
    ↓
Email + WhatsApp (Sent to guests)
    ↓
    ├─→ Guest clicks unique link
    ↓
    ├─→ RSVP Form (auto-filled with their name)
    ↓
    ├─→ Guest submits response
    ↓
    ├─→ Update guests.json
    ↓
    ├─→ json-to-csv.js
    ↓
CSV (View all RSVPs in Excel)
```

---

## 💻 NPM Scripts

```bash
# CSV/JSON Conversion
npm run csv-to-json      # Convert CSV to JSON
npm run json-to-csv      # Convert JSON to CSV

# Send Invitations
npm run send-invitations # Send email + WhatsApp
npm run send-email       # Send email only
npm run send-whatsapp    # Send WhatsApp only

# Development
npm run dev              # Start dev server
npm run build            # Build for production
npm run lint             # Check code quality
npm run preview          # Preview production build
```

---

## 🔐 Security Notes

### .env File
- **NEVER** share your `.env` file
- **NEVER** commit `.env` to Git
- Keep it in `.gitignore`
- Contains sensitive credentials:
  - Gmail app password
  - Twilio account credentials

### Data Privacy
- Guest data is only sent to Gmail/Twilio
- Each guest has a unique token
- Tokens are generated and not stored
- Never share guest list publicly

### Credentials Lifetime
- Gmail app passwords: Revoke anytime in Account settings
- Twilio tokens: Rotate regularly in Console
- Update `.env` if credentials change

---

## 🐛 Troubleshooting

### CSV Won't Convert
**Problem**: "Invalid CSV format"
- Check all required columns exist (id, name, email, phone)
- Ensure no empty rows at bottom
- Verify phone numbers start with +
- Check for hidden characters or extra spaces

### Emails Not Sending
**Problem**: "Invalid login"
- Verify Gmail app password (16 chars)
- Check 2-Step Verification is enabled
- Confirm `.env` has correct credentials
- Check spam folder

### WhatsApp Not Sending
**Problem**: "Invalid phone number"
- Phone must include country code: +1, +91, +94
- Remove spaces/dashes: `+1 (555) 123-4567` → `+15551234567`
- Verify Twilio WhatsApp is enabled
- Check guest phone has WhatsApp

### Script Errors
**Problem**: "Cannot find module 'csv-parse'"
- Run: `npm install csv-parse`
- Verify: `npm list csv-parse`

---

## 📚 Documentation Files

- **[INVITATION_SETUP.md](INVITATION_SETUP.md)** - Email & WhatsApp setup guide
- **[CSV_GUIDE.md](CSV_GUIDE.md)** - CSV format and editing
- **[README.md](../README.md)** - Project overview

---

## 🎯 Next Steps

1. ✅ Run setup script
2. ✅ Edit `guests.csv` with your guests
3. ✅ Convert to JSON: `npm run csv-to-json`
4. ✅ Set up `.env` credentials
5. ✅ Test with yourself first
6. ✅ Send invitations: `npm run send-invitations`
7. ✅ Track RSVPs
8. ✅ Export results for database

---

## 💬 Need Help?

See the detailed guides:
- 📧 **Email setup**: [INVITATION_SETUP.md](INVITATION_SETUP.md#step-3-set-up-email-gmail)
- 💬 **WhatsApp setup**: [INVITATION_SETUP.md](INVITATION_SETUP.md#step-4-set-up-whatsapp-twilio)
- 📋 **CSV format**: [CSV_GUIDE.md](CSV_GUIDE.md)
- 🔧 **Troubleshooting**: [INVITATION_SETUP.md](INVITATION_SETUP.md#troubleshooting)

---

## 📞 Quick Reference

```bash
# Setup
npm install
./scripts/setup.sh              # Mac/Linux
scripts/setup.bat               # Windows

# CSV/JSON
npm run csv-to-json             # CSV → JSON
npm run json-to-csv             # JSON → CSV

# Send Invitations
npm run send-invitations        # Email + WhatsApp
npm run send-email              # Email only
npm run send-whatsapp           # WhatsApp only

# Website
npm run dev                      # Start development
npm run build                    # Build for production
```

Happy inviting! 🎉
