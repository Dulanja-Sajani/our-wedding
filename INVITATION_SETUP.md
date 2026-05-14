# Complete Guide: Sending Personalized Wedding Invitations

This guide walks you through sending personalized email and WhatsApp invitations to your wedding guests with unique RSVP links.

## Table of Contents
1. [Setup Overview](#setup-overview)
2. [Step 1: Add Your Guests](#step-1-add-your-guests)
3. [Step 2: Install Dependencies](#step-2-install-dependencies)
4. [Step 3: Set Up Email (Gmail)](#step-3-set-up-email-gmail)
5. [Step 4: Set Up WhatsApp (Twilio)](#step-4-set-up-whatsapp-twilio)
6. [Step 5: Create Environment File](#step-5-create-environment-file)
7. [Step 6: Send Invitations](#step-6-send-invitations)
8. [How It Works](#how-it-works)
9. [Troubleshooting](#troubleshooting)

---

## Setup Overview

Your wedding website uses a personalized invitation system where:
- Each guest receives a **unique link** in their invitation
- When they click the link, their name is **auto-filled** in the RSVP form
- Their response is **verified** using their unique token
- Invitations are sent via both **Email and WhatsApp**

---

## Step 1: Add Your Guests

### Edit the Guest List File

Open `guests.csv` in your project root and add all your guests with their information:

```json
[
  {
    "id": 1,
    "name": "John Doe",
    "phone": "+1234567890",
    "inviteType": "Individual",
    "invitationSent": false
  },
  {
    "id": 2,
    "name": "Jane Smith",
    "phone": "+1234567891",
    "inviteType": "Couple",
    "invitationSent": false
  },
  {
    "id": 3,
    "name": "Bob Johnson",
    "phone": "+1234567892",
    "inviteType": "Family",
    "invitationSent": false
  }
]
```

### Important Notes:
- **Phone numbers** must include country code (e.g., `+1` for USA, `+91` for India, `+94` for Sri Lanka)
- **inviteType** specifies who is invited: Individual, Couple, or Family
- **Invite Types**:
  - **Individual**: Single person invitation
  - **Couple**: Married couple or couple with partner
  - **Family**: Entire family (parents + kids)

---

## Step 2: Install Dependencies

Open terminal in your project directory and install required packages:

```bash
npm install nodemailer twilio dotenv
```

This installs:
- **nodemailer** - Send emails via Gmail
- **twilio** - Send WhatsApp messages
- **dotenv** - Manage environment variables securely

### Verify Installation:
```bash
npm list nodemailer twilio dotenv
```

---

## Step 3: Set Up Email (Gmail)

### Why Gmail?
Gmail is free and easy to set up. You'll use your Gmail account to send invitations automatically.

### Steps:

#### 3a. Enable 2-Step Verification
1. Go to [Google Account](https://myaccount.google.com)
2. Click **Security** (left sidebar)
3. Find **2-Step Verification**
4. Click **Get Started**
5. Follow the prompts to verify your phone

#### 3b. Create App Password
1. Go to [Google App Passwords](https://myaccount.google.com/apppasswords)
2. Select:
   - **App**: Mail
   - **Device**: Windows PC / Mac / Linux
3. Click **Generate**
4. Google will show a 16-character password
5. **Copy this password** - you'll need it next

**Example app password:** `abcd efgh ijkl mnop`

#### 3c. Test Your Gmail Setup
Open a terminal and test:
```bash
# This verifies your Gmail will work
node -e "
const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'your-email@gmail.com',
    pass: 'your-app-password'
  }
});
transporter.verify((error, success) => {
  if (error) console.log('Error:', error);
  else console.log('Email setup works!');
});
"
```

---

## Step 4: Set Up WhatsApp (Twilio)

### Why Twilio?
Twilio is a messaging service that lets you send WhatsApp messages programmatically.

### Steps:

#### 4a. Create Twilio Account
1. Go to [Twilio.com](https://www.twilio.com/try-twilio)
2. Sign up with your email
3. Verify your email address
4. Complete the sign-up form

#### 4b. Get Your Credentials
1. Go to [Twilio Console](https://console.twilio.com)
2. You'll see your **Account SID** and **Auth Token**
3. Copy both (keep them secret!)

**Example:**
```
Account SID: ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
Auth Token: 3xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

#### 4c. Get a Twilio Phone Number
1. In Twilio Console, click **Phone Numbers** (left menu)
2. Click **Get your first Twilio phone number**
3. Accept the suggested number or search for one
4. Your number will look like: `+1 (234) 567-8900`

#### 4d. Enable WhatsApp on Twilio
1. In Twilio Console, go to **Messaging** → **Try it Out** → **Send a WhatsApp Message**
2. Click **Join WhatsApp Beta**
3. Complete the setup

#### 4e. Test Your WhatsApp Setup
Send a test message:
```bash
node -e "
const twilio = require('twilio');
const client = twilio('YOUR_ACCOUNT_SID', 'YOUR_AUTH_TOKEN');
client.messages.create({
  from: 'whatsapp:+1234567890',
  to: 'whatsapp:+YOUR_PHONE_NUMBER',
  body: 'Test message from Twilio!'
}).then(msg => console.log('Message sent:', msg.sid))
  .catch(err => console.log('Error:', err));
"
```

---

## Step 5: Create Environment File

### Create `.env` File

In your project root directory, create a file named `.env`:

```bash
touch .env
```

### Add Your Credentials

Open `.env` and add:

```
# Gmail Configuration
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password-here

# Twilio Configuration
TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
TWILIO_AUTH_TOKEN=3xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
TWILIO_PHONE_NUMBER=+1234567890

# Your Website URL
WEBSITE_URL=http://localhost:5173
```

### For Production
When you deploy your website, change:
```
WEBSITE_URL=https://yourweddingsite.com
```

### Security Note
- **NEVER** commit `.env` to Git
- Add `.env` to `.gitignore`:
  ```
  # In .gitignore
  .env
  .env.local
  ```

---

## Step 6: Send Invitations

### Option A: Send Both Email & WhatsApp

```bash
node scripts/send-invitations.js both
```

You'll see:
```
📧 Sending both invitations to 3 guests...

✓ Email sent to John Doe (john@example.com)
✓ WhatsApp sent to John Doe (+1234567890)
✓ Email sent to Jane Smith (jane@example.com)
✓ WhatsApp sent to Jane Smith (+1234567891)
✓ Email sent to Bob Johnson (bob@example.com)
✓ WhatsApp sent to Bob Johnson (+1234567892)

✨ Invitation Summary:
  Emails sent: 3
  WhatsApp sent: 3
  Failed: 0
```

### Option B: Send Only Email

```bash
node scripts/send-invitations.js email
```

### Option C: Send Only WhatsApp

```bash
node scripts/send-invitations.js whatsapp
```

### What Guests Receive

**Email Example:**
```
Subject: You're Invited to Our Wedding! 💍

Dear John,

We're delighted to invite you to our wedding celebration!

Please RSVP by clicking the link below:
[RSVP Now]

Or copy this link: 
https://yourweddingsite.com?guest=eyJnZXN0SWQiOjE...

We can't wait to celebrate with you!
```

**WhatsApp Example:**
```
Hi John! 👋

You're invited to our wedding! 💍

Please RSVP by clicking here: 
https://yourweddingsite.com?guest=eyJnZXN0SWQiOjE...

We can't wait to celebrate with you!
```

---

## How It Works

### Behind the Scenes

#### 1. Token Generation
For each guest, a unique token is created:
```
Token = Base64(guestId:email:timestamp)
```

#### 2. Personalized URL
Each guest's RSVP link is unique:
```
https://yourweddingsite.com?guest=eyJnZXN0SWQiOjEsImVtYWlsIjoiam9obkBleGFtcGxlLmNvbSJ9
```

#### 3. Auto-Fill
When they click the link:
- Token is decoded
- Guest name is extracted from email
- Form pre-fills with their name
- Their response is tagged with their token

#### 4. Verification
Your server can verify:
- This RSVP belongs to a specific guest
- No one can fake another person's RSVP
- Guest data is properly authenticated

### File Structure
```
your-project/
├── guests.json                    # Guest list
├── .env                           # Credentials (keep secret!)
├── scripts/
│   └── send-invitations.js       # Script to send invitations
├── src/
│   ├── utils/
│   │   ├── tokenGenerator.ts     # Creates unique tokens
│   │   └── invitations.ts        # Email/WhatsApp functions
│   └── components/
│       └── RSVPForm.tsx          # Auto-fills from token
```

---

## Troubleshooting

### Email Issues

**"Invalid login"**
- Check your app password is correct (16 characters)
- Verify 2-Step Verification is enabled
- Make sure you used the app password, not your Gmail password

**"SMTP Error"**
- Gmail might be blocking less secure apps
- Check your Google Account security settings
- Try creating a new app password

**Emails not received**
- Check guest's spam/junk folder
- Verify email address in guests.json
- Test with your own email first

### WhatsApp Issues

**"Invalid phone number"**
- Phone must have country code (e.g., +1, +91, +94)
- Remove spaces/dashes: `+1 (234) 567-8900` → `+12345678900`
- Verify it's a valid mobile number

**"Service not available"**
- Ensure WhatsApp is enabled on your Twilio account
- Check Twilio Console → Messaging → WhatsApp
- Verify Twilio phone number

**"Message not sent"**
- Guest phone might not have WhatsApp
- Guest might be in a country where Twilio is blocked
- Try email instead

### Script Issues

**"Cannot find module 'nodemailer'"**
- Run: `npm install nodemailer twilio dotenv`
- Check: `npm list nodemailer`

**".env file not found"**
- Create `.env` in project root (not in src/)
- Verify file is named exactly `.env`
- On Mac/Linux, hidden files start with `.`

**"Rate limit exceeded"**
- Gmail and Twilio limit messages
- Space out invitations over time
- Wait a few hours before retrying

### General Tips

**Before sending to everyone:**
1. Test with your own email/phone
2. Run: `node scripts/send-invitations.js email` for just yourself
3. Verify token works and form auto-fills
4. Check both email and WhatsApp messages

**Keep a log:**
- Save output when you send invitations
- Note which guests received messages
- Update guests.json `invitationSent` field

**For large guest lists:**
- Send in batches of 50-100 guests
- Wait 30 minutes between batches
- Avoid sending at peak hours (midnight-6am)

---

## Quick Reference

| Task | Command |
|------|---------|
| Install packages | `npm install nodemailer twilio dotenv` |
| Send all invitations | `node scripts/send-invitations.js both` |
| Send email only | `node scripts/send-invitations.js email` |
| Send WhatsApp only | `node scripts/send-invitations.js whatsapp` |
| Check Gmail setup | See Step 3c test command |
| Check Twilio setup | See Step 4e test command |

---

## Support

If you encounter issues:
1. Check the [Troubleshooting](#troubleshooting) section
2. Verify your `.env` file has correct credentials
3. Test with a single guest first
4. Check console output for error messages

For provider support:
- **Gmail**: [Gmail Help](https://support.google.com/mail)
- **Twilio**: [Twilio Docs](https://www.twilio.com/docs)
- **Nodemailer**: [Nodemailer Docs](https://nodemailer.com)

