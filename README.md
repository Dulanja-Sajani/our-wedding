# Dulanja & Sajani — Wedding RSVP Site

Live site: **https://dulanja-sajani.github.io/our-wedding/**

A personalised Sinhala wedding invitation site. Each guest gets a unique URL that shows their name and pre-fills the RSVP form. Responses are written directly to a Google Sheet.

---

## How It Works

```
Google Sheet (guest list)
        ↓  pulled at every build
src/data/guests.ts  (auto-generated)
        ↓  Vite build
Wedding website on GitHub Pages
        ↓  guest opens their unique URL and submits RSVP
Google Apps Script web app
        ↓  appendRow()
Google Sheet (RSVPs tab)
```

---

## First-Time Setup

### Step 1 — Set up the Google Sheet

1. Create a new Google Sheet (or copy an existing one)
2. Add a sheet tab for the guest list with these exact column headers in row 1:

   | id | name | phone | gender | inviteType | count |
   |----|------|-------|--------|------------|-------|
   | 1 | දුලංජ පෙරේරා | +94711234567 | male | Individual | 1 |
   | 2 | සජනි ද සිල්වා | +94772234568 | female | Couple | 2 |

   Column rules:
   - `id` — integer, never reuse or renumber (URLs are based on this)
   - `name` — displayed as-is on the site
   - `phone` — include country code: `+94XXXXXXXXX`
   - `gender` — `male` or `female` (lowercase)
   - `inviteType` — `Individual`, `Couple`, or `Family`
   - `count` — max number of seats for this invitation

3. Publish the sheet as CSV:
   - **File → Share → Publish to web**
   - Change format from "Web page" to **Comma-separated values (.csv)**
   - Make sure the correct sheet tab is selected
   - Click **Publish**
   - Copy the URL (looks like `https://docs.google.com/spreadsheets/d/.../pub?gid=0&output=csv`)

---

### Step 2 — Set up the RSVP endpoint (Google Apps Script)

1. Open your Google Sheet
2. **Extensions → Apps Script**
3. Delete any existing code, paste the entire contents of `scripts/apps-script.js`, and save (Ctrl+S)
4. Click **Deploy → New deployment**
5. Click the gear icon and select **Web app**
6. Set:
   - *Execute as*: **Me**
   - *Who has access*: **Anyone**
7. Click **Deploy**, then copy the **Web app URL**

---

### Step 3 — Add GitHub Secrets

Go to your repo: **Settings → Secrets and variables → Actions → New repository secret**

Add these two secrets:

| Secret name | Value |
|-------------|-------|
| `SHEETS_CSV_URL` | The CSV URL from Step 1 |
| `VITE_RSVP_ENDPOINT` | The Web app URL from Step 2 |

---

### Step 4 — Push to deploy

Any push to `main` will:
1. Pull the latest guest list from Google Sheets
2. Build the site
3. Deploy to GitHub Pages automatically

```bash
git add .
git commit -m "update guests"
git push
```

The site will be live at **https://dulanja-sajani.github.io/our-wedding/** within ~1 minute.

---

## Managing Guests

### Adding a new guest

1. Add a new row in the Google Sheet with the next unused `id`
2. Push any change to `main` — the build will sync automatically
3. Run the URL generator locally to get their link (see below)

### Never renumber IDs

Once a URL has been shared, the `id` must never change. If you remove a guest, leave a gap — don't shift IDs down. Old links keep working as long as the `id` exists.

---

## Generating Invitation URLs

Run locally to print every guest's personalised link:

```bash
SHEETS_CSV_URL=<your-csv-url> node scripts/sync-guests.mjs
node scripts/generate-urls.mjs
```

Output:
```
[1] දුලංජ පෙරේරා
    Phone : +94711234567
    URL   : https://dulanja-sajani.github.io/our-wedding/?guest=dzox

[2] සජනි ද සිල්වා
    Phone : +94772234568
    URL   : https://dulanja-sajani.github.io/our-wedding/?guest=dzoy
```

Save to a file:
```bash
node scripts/generate-urls.mjs > invitation-urls.txt
```

Then copy each URL into WhatsApp manually.

---

## Invite Types

| inviteType | What the site shows |
|------------|---------------------|
| Individual (male) | `[name] මහතාට` |
| Individual (female) | `[name] මහත්මියට` |
| Couple | `[surname] මහතා සහ මහත්මිය` |
| Family (male) | `[name] මහතා ඇතුළු පවුලේ සැමට` |
| Family (female) | `[name] මහත්මිය ඇතුළු පවුලේ සැමට` |

For Couple rows, put the shared surname in `name` (e.g. `ද සිල්වා`).

---

## RSVP Responses

Each submission writes a row to the **RSVPs** tab in your Google Sheet:

| Timestamp | Guest Name | Attending | Guest Count | Message | Token |
|-----------|-----------|-----------|-------------|---------|-------|
| 30/05/2026, 14:32 | දුලංජ පෙරේරා | Yes - Happily | 2 | ස්තූතියි! | dzox |

---

## Local Development

```bash
npm install
npm run dev          # http://localhost:5173/our-wedding/
```

To test with a specific guest, open:
```
http://localhost:5173/our-wedding/?guest=dzox
```

To sync the guest list locally:
```bash
SHEETS_CSV_URL=<your-url> node scripts/sync-guests.mjs
```

---

## Troubleshooting

**RSVPs not appearing in the sheet**
- Open Apps Script editor → **Executions** tab — check for errors
- Confirm the web app is deployed with *Who has access: Anyone*
- If you edited the script, create a **new deployment** and update the `VITE_RSVP_ENDPOINT` secret

**Guest name not showing on site**
- Check the `?guest=` token matches what `generate-urls.mjs` produces
- Confirm the guest's `id` hasn't changed since the URL was shared
- Verify `SHEETS_CSV_URL` is set in GitHub secrets

**Build failing on sync step**
- Check `SHEETS_CSV_URL` is set in GitHub secrets
- Open the published CSV URL in a browser — you should see raw CSV text
- Confirm column headers are exactly: `id, name, phone, gender, inviteType, count`

**Site shows wrong URL path (404 on refresh)**
- `vite.config.ts` base must match the repo name: `base: '/our-wedding/'`

---

## File Reference

| File | Purpose |
|------|---------|
| `src/data/guests.ts` | Auto-generated at build time — do not edit manually |
| `src/utils/tokenGenerator.ts` | Encodes/decodes guest IDs into URL tokens |
| `src/components/Hero.tsx` | Shows personalised guest name |
| `src/components/RSVPForm.tsx` | Pre-fills guest count, submits to Apps Script |
| `scripts/sync-guests.mjs` | Fetches Google Sheet CSV → writes `src/data/guests.ts` |
| `scripts/generate-urls.mjs` | Prints all invitation URLs |
| `scripts/apps-script.js` | Paste into Google Apps Script editor |
| `.github/workflows/deploy.yml` | CI: syncs sheet → builds → deploys to GitHub Pages |
