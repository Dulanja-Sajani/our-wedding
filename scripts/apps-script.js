// ============================================================
// PASTE THIS ENTIRE FILE into your Google Apps Script editor
// Extensions → Apps Script → replace any existing code → Save
//
// Then: Deploy → New deployment → Web app
//   Execute as:  Me
//   Who has access:  Anyone
// Copy the Web app URL and add it as a GitHub secret: VITE_RSVP_ENDPOINT
// ============================================================

const SHEET_NAME = 'RSVPs';

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
