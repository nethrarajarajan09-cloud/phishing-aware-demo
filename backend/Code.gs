/**
 * PhotoConnect – Phishing Awareness Demo
 * Google Apps Script backend.
 *
 * Receives a JSON POST { username, timestamp, status } from the demo
 * login page and appends a row to the active Google Sheet.
 *
 * SECURITY:
 *  - This endpoint intentionally ignores any "password" field if present.
 *  - Only fictional demo usernames should ever be submitted.
 *  - Do NOT log the raw request body (it would end up in Apps Script logs).
 */

function doPost(e) {
  try {
    var data = {};
    if (e && e.postData && e.postData.contents) {
      data = JSON.parse(e.postData.contents);
    }

    var username = String(data.username || "").trim().slice(0, 50);
    var timestamp = String(data.timestamp || new Date().toISOString()).slice(0, 40);
    var status = String(data.status || "Demo Submitted").slice(0, 40);

    // Basic allowlist – reject anything that doesn't look like a demo username.
    if (!username || !/^[a-zA-Z0-9._-]+$/.test(username)) {
      return _json({ ok: false, error: "Invalid demo username" });
    }

    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

    // Add header row the first time.
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(["Demo Username", "Submission Time", "Submission Status"]);
    }

    sheet.appendRow([username, timestamp, status]);

    return _json({ ok: true });
  } catch (err) {
    return _json({ ok: false, error: "Server error" });
  }
}

function doGet() {
  return _json({ ok: true, service: "PhotoConnect demo backend" });
}

function _json(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
