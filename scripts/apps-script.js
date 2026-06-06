// ============================================================
// PASTE THIS ENTIRE FILE into your Google Apps Script editor
// Extensions → Apps Script → replace any existing code → Save
//
// Then: Deploy → New deployment → Web app
//   Execute as:  Me
//   Who has access:  Anyone
// Copy the Web app URL and add it as a GitHub secret: VITE_RSVP_ENDPOINT
//
// To fill invitation URLs in the guest sheet:
//   Run fillInvitationUrls() once from the editor (▶ Run button)
//   It will add/update the "Invitation URL" column for every guest row.
//   After that, onEdit() keeps it updated automatically when you add a row.
// ============================================================

const SHEET_NAME  = 'RSVPs';
const GUEST_SHEET = 'Guests';   // change this if your guest tab has a different name
const BASE_URL    = 'https://dulanja-sajani.github.io/our-wedding';

// Generates the same token the website uses: base64("w:<id>") without padding
function makeToken(id) {
  return Utilities.base64Encode('w:' + id).replace(/=+$/, '');
}

// Fills the "Invitation URL" column for every row that has an id.
// Safe to run multiple times — it only writes, never deletes.
function fillInvitationUrls() {
  const ss    = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(GUEST_SHEET);
  if (!sheet) {
    SpreadsheetApp.getUi().alert('Sheet "' + GUEST_SHEET + '" not found. Update GUEST_SHEET in the script.');
    return;
  }

  const data    = sheet.getDataRange().getValues();
  const headers = data[0].map(h => String(h).trim().toLowerCase());

  const idCol  = headers.indexOf('id');
  let   urlCol = headers.indexOf('invitation url');

  // Add the header column if it doesn't exist yet
  if (urlCol === -1) {
    urlCol = headers.length;
    sheet.getRange(1, urlCol + 1).setValue('Invitation URL');
  }

  for (let i = 1; i < data.length; i++) {
    const id = data[i][idCol];
    if (!id) continue;
    const url = BASE_URL + '/?guest=' + makeToken(id);
    sheet.getRange(i + 1, urlCol + 1).setValue(url);
  }
}

// Automatically fills the URL whenever a row is edited in the guest sheet.
// Install once: Run → fillInvitationUrls() sets up the column,
// then this trigger keeps new rows up to date.
function onEdit(e) {
  if (!e || !e.range) return;
  const sheet = e.range.getSheet();
  if (sheet.getName() !== GUEST_SHEET) return;

  const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0]
                       .map(h => String(h).trim().toLowerCase());
  const idCol  = headers.indexOf('id') + 1;
  const urlCol = headers.indexOf('invitation url') + 1;
  if (!idCol || !urlCol) return;

  const row = e.range.getRow();
  if (row === 1) return; // header row

  const id = sheet.getRange(row, idCol).getValue();
  if (!id) return;

  sheet.getRange(row, urlCol).setValue(BASE_URL + '/?guest=' + makeToken(id));
}

// Adds a custom menu so you can re-run fillInvitationUrls() without opening the editor
function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu('Wedding')
    .addItem('Fill Invitation URLs', 'fillInvitationUrls')
    .addToUi();
}

function doPost(e) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = ss.getSheetByName(SHEET_NAME);

    // Create the RSVPs tab with headers if it doesn't exist yet
    if (!sheet) {
      sheet = ss.insertSheet(SHEET_NAME);
      sheet.appendRow([
        'Timestamp', 'Guest Name', 'Attending', 'Guest Count', 'Message', 'Token',
      ]);
      sheet.setFrozenRows(1);
    }

    const data = JSON.parse(e.postData.contents);

    sheet.appendRow([
      new Date().toLocaleString('en-GB', { timeZone: 'Asia/Colombo' }),
      data['Guest Name']      || '',
      data['Attending']       || '',
      data['Guest Count']     || '',
      data['Message to Couple'] || '',
      data['Guest Token']     || '',
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ result: 'success' }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ result: 'error', error: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
