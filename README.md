# PhotoConnect – Ethical Hacking Training Demo (Phishing Awareness)

An **authorized educational** web app for a college Ethical Hacking assessment.
It demonstrates how a phishing login page works, **without** collecting real
credentials.

- Frontend: a fake "PhotoConnect" login page (not Instagram, no real branding).
- Backend: a Google Apps Script Web App that writes rows to a Google Sheet.
- On submit, the user sees a simulated "404 – Page Not Found" page that
  explains the exercise.

> ⚠️ Passwords are **never** read, sent, stored, or logged. Only a fictional
> demo username, a timestamp, and a status flag are recorded.

---

## 1. Create the Google Sheet

1. Go to <https://sheets.google.com> and create a new spreadsheet.
2. Name it e.g. `PhotoConnect Demo Submissions`.
3. Leave Sheet1 empty — the backend auto-creates the header row:

   | Demo Username | Submission Time | Submission Status |
   | ------------- | --------------- | ----------------- |

## 2. Deploy the Apps Script backend

1. In the sheet: **Extensions → Apps Script**.
2. Delete the sample code and paste the contents of
   [`backend/Code.gs`](./backend/Code.gs).
3. Click **Save** (disk icon).
4. Click **Deploy → New deployment**.
   - Type: **Web app**
   - Description: `PhotoConnect demo backend`
   - Execute as: **Me**
   - Who has access: **Anyone**
5. Click **Deploy**, authorize when prompted, and copy the **Web app URL**
   (looks like `https://script.google.com/macros/s/XXXX/exec`).

## 3. Connect the frontend

Open `src/routes/index.tsx` and paste the URL into:

```ts
const APPS_SCRIPT_URL = "https://script.google.com/macros/s/XXXX/exec";
```

Save the file. The dev preview reloads automatically.

> The URL is a public endpoint that only accepts a demo username + timestamp,
> so it is safe to keep in the frontend for this classroom exercise. There are
> no secret API keys in the frontend.

## 4. Test the full flow

1. Open the preview — you should see the PhotoConnect login page with the
   yellow banner "Educational Demo Only – Do Not Enter Real Credentials".
2. Try submitting an empty form → you should see a validation error.
3. Submit fictional credentials, e.g.:
   - Username: `student_demo01`
   - Password: `demo1234` (anything — it is never sent)
4. The simulated **404** page should appear with the awareness message.
5. Open the Google Sheet — a new row should appear:

   ```
   student_demo01 | 2026-10-15T12:29:00.000Z | Demo Submitted
   ```

## 5. What is intentionally NOT done (safety)

- No real Instagram logo, assets, or domain.
- No password field value is ever read, transmitted, logged, or stored.
- No credential-harvesting link is published.
- Input is validated (length + allowed characters) on both frontend and
  backend.
- Backend errors return a generic message and are not written to the sheet.

## 6. How to explain it in the assessment

Walk the audience through:

1. The fake login page and how convincingly it mimics a real brand with just
   a logo and layout.
2. The clear ethical banner and the educational notice.
3. The submission flow — show the row appearing live in Google Sheets.
4. The simulated 404 with the awareness message.
5. The source code: show that the `password` state variable is cleared and
   never included in the `payload` sent to the backend.
