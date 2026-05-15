# Invitation System — Complete Guide

Every guest gets a personalised URL. When they open it, the site shows their name
and pre-fills the RSVP form. Responses go directly into your Google Sheet — no
third-party limits, no cost.

---

## How It All Fits Together

```
Google Sheets (guest list)
        ↓  build-time sync
    src/data/guests.ts
        ↓  Vite build
    Wedding website
        ↓  guest clicks unique URL & submits RSVP
    Google Apps Script (web app)
        ↓  appendRow()
    Google Sheets (RSVPs tab)
```

---

## Part 1 — Guest List

### Sheet format

Your Google Sheet must have these columns (order doesn't matter):

| Column | Values | Notes |
|--------|--------|-------|
| `id` | Integer | Never reuse or renumber — URLs are derived from this |
| `name` | Sinhala text | Displayed on the site as-is |
| `phone` | `+94XXXXXXXXX` | Include country code |
| `gender` | `Male` / `Female` | Determines honorific shown on site |
| `inviteType` | `Individual` / `Couple` / `Family` | Controls greeting and whether family line is shown |
| `count` | Integer | Max guests allowed — caps the RSVP form counter |
| `invitationSent` | `TRUE` / `FALSE` | Mark after sharing the URL |
| `rsvpReceived` | `TRUE` / `FALSE` | Mark after they respond |
| `rsvpStatus` | `yes` / `no` / (blank) | Fill from the RSVPs tab |

### What each invite type shows on the site

| inviteType | Greeting shown | Family line |
|------------|---------------|-------------|
| Individual (male) | `[name] මහතාට` | — |
| Individual (female) | `[name] මහත්මියට` | — |
| Couple | `[surname] මහතා සහ මහත්මිය` | — |
| Family (male) | `[name] මහතා` | ඇතුළු පවුලේ සැමට |
| Family (female) | `[name] මහත්මිය` | ඇතුළු පවුලේ සැමට |

For **Couple** rows, put only the shared surname in the `name` column
(e.g. `ද සිල්වා`) — the honorific is added automatically.

### Syncing the sheet to the site

At build time, GitHub Actions fetches your published sheet CSV and regenerates
`src/data/guests.ts`. To set this up:

1. In your Google Sheet: **File → Share → Publish to web**
2. Change format to **Comma-separated values (.csv)**, select your sheet tab, click **Publish**
3. Copy the URL
4. In your GitHub repo: **Settings → Secrets and variables → Actions → New repository secret**
   - Name: `SHEETS_CSV_URL`
   - Value: the URL you copied

Every push to `main` will now pull the latest guest list before building.

To sync and preview locally:
```bash
SHEETS_CSV_URL=<your-url> node scripts/sync-guests.mjs
```

---

## Part 2 — Personalised Invitation URLs

### How tokens work

Each URL contains `?guest=<token>`. The token is a stable Base64 encoding of
`w:<id>`, so it never changes as long as the guest's `id` stays the same.

| Guest ID | Token |
|----------|-------|
| 1 | `dzox` |
| 2 | `dzoy` |
| 10 | `dzoxMA` |

**Never renumber or reuse IDs.** If you remove a guest, leave a gap — don't
shift IDs down. Old links that have already been shared will keep working forever.

### Generating all URLs

Sync the latest guest list first, then print every URL:

```bash
SHEETS_CSV_URL=<your-url> node scripts/sync-guests.mjs
node scripts/generate-urls.mjs
```

Output:
```
[1] පැතුම් පෙරේරා
    Phone : +94711234567
    URL   : https://pankajabalasooriya.github.io/sinhala-wedding-rsvp/?guest=dzox

[2] කුසුම් ද සිල්වා
    Phone : +94772234568
    URL   : https://pankajabalasooriya.github.io/sinhala-wedding-rsvp/?guest=dzoy
```

Save to a file instead:
```bash
node scripts/generate-urls.mjs > invitation-urls.txt
```

### Sending via WhatsApp

Copy each URL and paste it into WhatsApp. Example message:

```
ගෞරවනීය පැතුම් මහතා,

දුලංජ සහ සජනි යන අපගේ විවාහ මංගල්‍යයට ඔබ සාදරයෙන් ආරාධනා කෙරේ.

📅 2026 ජූලි 30 | ප.ව. 4.30
📍 Waters Edge Hotel, Battaramulla

ඔබගේ ප්‍රතිචාරය මෙහිදී ලබා දෙන්න:
https://pankajabalasooriya.github.io/sinhala-wedding-rsvp/?guest=dzox
```

After sending, mark `invitationSent = TRUE` in your sheet.

---

## Part 3 — RSVP Responses (Google Apps Script)

Responses are submitted directly to a Google Apps Script web app, which writes
each RSVP as a new row into an **RSVPs** tab in your Google Sheet. No monthly
limits, completely free.

### One-time setup

**Step 1 — Add the script to your sheet**

1. Open your Google Sheet
2. **Extensions → Apps Script**
3. Delete any existing code
4. Paste the entire contents of `scripts/apps-script.js`
5. Save (Ctrl+S)

**Step 2 — Deploy as a Web App**

1. Click **Deploy → New deployment**
2. Click the gear icon → select **Web app**
3. Set *Execute as*: **Me**
4. Set *Who has access*: **Anyone**
5. Click **Deploy**
6. Copy the **Web app URL**

**Step 3 — Add the URL as a GitHub secret**

1. Go to your repo → **Settings → Secrets and variables → Actions**
2. **New repository secret**
   - Name: `VITE_RSVP_ENDPOINT`
   - Value: the Web app URL from Step 2
3. Click **Add secret**

The URL is baked into the site at build time via `import.meta.env.VITE_RSVP_ENDPOINT`.

### What each RSVP row contains

| Column | Example |
|--------|---------|
| Timestamp | `30/05/2026, 14:32:10` (Sri Lanka time) |
| Guest Name | `පැතුම් පෙරේරා` |
| Attending | `Yes - Happily` / `No - With Regret` |
| Guest Count | `2` |
| Message | `ස්තූතියි!` |
| Token | `dzox` |

---

## Part 4 — GitHub Secrets Summary

All three secrets must be set in **Settings → Secrets and variables → Actions**:

| Secret | Used for |
|--------|----------|
| `SHEETS_CSV_URL` | Pulling guest list from Google Sheets at build time |
| `VITE_RSVP_ENDPOINT` | Google Apps Script URL that receives RSVP submissions |

---

## Part 5 — Adding a New Guest

1. Add a row to your Google Sheet with the next unused `id`
2. Push any change to `main` — the build will sync the sheet automatically
3. Run `node scripts/generate-urls.mjs` locally to get their URL
4. Send it via WhatsApp

---

## Troubleshooting

**RSVPs not appearing in the sheet**
- Open the Apps Script editor → **Executions** tab — check for errors
- Make sure the web app is deployed with *Who has access: Anyone*
- If you edit the script, you must create a **new deployment** (not update the existing one) for changes to take effect — and update the `VITE_RSVP_ENDPOINT` secret with the new URL

**Guest name not showing on site**
- Check that the `?guest=` token in the URL matches what `generate-urls.mjs` produces
- Verify the guest's `id` in the sheet hasn't changed since the URL was shared
- Confirm `SHEETS_CSV_URL` secret is set and the sheet is published

**Build failing on sync step**
- Verify `SHEETS_CSV_URL` is set in GitHub secrets
- Open the published sheet URL in a browser — you should see raw CSV text
- Check that column headers exactly match: `id, name, phone, gender, inviteType, count`

---

## File Reference

| File | Purpose |
|------|---------|
| `guests.csv` | Local copy of the guest list |
| `src/data/guests.ts` | Auto-generated at build time — do not edit manually |
| `src/utils/tokenGenerator.ts` | Token generation and decoding |
| `src/components/Hero.tsx` | Reads token, shows personalised guest name |
| `src/components/RSVPForm.tsx` | Prefills guest count, posts to Apps Script |
| `scripts/sync-guests.mjs` | Fetches Google Sheet CSV → writes `src/data/guests.ts` |
| `scripts/generate-urls.mjs` | Prints all invitation URLs |
| `scripts/apps-script.js` | Paste into Google Apps Script editor |
| `.github/workflows/deploy.yml` | CI: syncs sheet, builds, deploys to GitHub Pages |
