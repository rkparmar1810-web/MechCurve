// ============================================================
// Google Apps Script — Deploy as Web App
// ============================================================
//
// SETUP STEPS:
// 1. Go to https://script.google.com and create a new project
// 2. Paste this entire code into Code.gs
// 3. Update ADMIN_EMAIL below with your email
// 4. Create a Google Sheet and paste the Sheet ID below
//    (the long string in the sheet URL between /d/ and /edit)
// 5. Click Deploy → New Deployment → Web App
//    - Execute as: Me
//    - Who has access: Anyone
// 6. Copy the deployment URL and paste it in Contact.tsx
//    (the APPS_SCRIPT_URL constant)
//
// ============================================================

const ADMIN_EMAIL = 'admin@mechcurve.com'
const SHEET_ID = 'YOUR_GOOGLE_SHEET_ID_HERE' // ← Replace this

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents)
    const { name, email, phone, service, message } = data

    // ── 1. Send email to admin (standard formatted) ──────────────
    const adminHtmlBody = `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;">
        <div style="background:#06080D;padding:24px 32px;border-radius:12px 12px 0 0;">
          <h2 style="color:#EAC117;margin:0;font-size:20px;">New Service Request</h2>
          <p style="color:#94a3b8;margin:6px 0 0;font-size:13px;">Received via mechcurve.com contact form</p>
        </div>
        <div style="background:#f8fafc;padding:24px 32px;border:1px solid #e2e8f0;">
          <table style="border-collapse:collapse;width:100%;">
            <tr><td style="padding:10px 12px;font-weight:bold;border-bottom:1px solid #e2e8f0;color:#334155;width:120px;">Name</td>
                <td style="padding:10px 12px;border-bottom:1px solid #e2e8f0;color:#1e293b;">${name}</td></tr>
            <tr><td style="padding:10px 12px;font-weight:bold;border-bottom:1px solid #e2e8f0;color:#334155;">Email</td>
                <td style="padding:10px 12px;border-bottom:1px solid #e2e8f0;color:#1e293b;">${email}</td></tr>
            <tr><td style="padding:10px 12px;font-weight:bold;border-bottom:1px solid #e2e8f0;color:#334155;">Phone</td>
                <td style="padding:10px 12px;border-bottom:1px solid #e2e8f0;color:#1e293b;">${phone || 'Not provided'}</td></tr>
            <tr><td style="padding:10px 12px;font-weight:bold;border-bottom:1px solid #e2e8f0;color:#334155;">Service</td>
                <td style="padding:10px 12px;border-bottom:1px solid #e2e8f0;color:#1e293b;">${service}</td></tr>
            <tr><td style="padding:10px 12px;font-weight:bold;vertical-align:top;color:#334155;">Message</td>
                <td style="padding:10px 12px;color:#1e293b;white-space:pre-wrap;">${message}</td></tr>
          </table>
        </div>
        <div style="background:#f1f5f9;padding:16px 32px;border-radius:0 0 12px 12px;border:1px solid #e2e8f0;border-top:none;">
          <p style="color:#64748b;font-size:12px;margin:0;">Submitted on ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}</p>
        </div>
      </div>
    `

    MailApp.sendEmail({
      to: ADMIN_EMAIL,
      subject: `[MechCurve] New Enquiry: ${service} — ${name}`,
      htmlBody: adminHtmlBody,
      replyTo: email,
      name: `${name} via MechCurve`,
    })

    // ── 2. Send auto-reply confirmation to user ──────────────
    const userHtmlBody = `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;">
        <div style="background:#06080D;padding:32px;border-radius:12px 12px 0 0;text-align:center;">
          <h1 style="color:#EAC117;margin:0;font-size:24px;">MechCurve</h1>
          <p style="color:#94a3b8;margin:8px 0 0;font-size:14px;">Mechanical Design &amp; Engineering Solutions</p>
        </div>
        <div style="background:#ffffff;padding:32px;border:1px solid #e2e8f0;">
          <h2 style="color:#1e293b;margin:0 0 16px;font-size:18px;">Hi ${name},</h2>
          <p style="color:#475569;line-height:1.7;margin:0 0 16px;">
            Thank you for reaching out to us! We have received your enquiry regarding
            <strong>${service}</strong> and our team will review it shortly.
          </p>
          <p style="color:#475569;line-height:1.7;margin:0 0 16px;">
            We typically respond within <strong>24 hours</strong> during business days
            (Mon – Sat, 9:00 AM – 7:00 PM IST).
          </p>
          <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;padding:16px;margin:20px 0;">
            <p style="color:#64748b;font-size:13px;font-weight:bold;margin:0 0 8px;text-transform:uppercase;letter-spacing:0.05em;">Your Enquiry Summary</p>
            <p style="color:#334155;margin:4px 0;"><strong>Service:</strong> ${service}</p>
            <p style="color:#334155;margin:4px 0;"><strong>Message:</strong> ${message}</p>
          </div>
          <p style="color:#475569;line-height:1.7;margin:0;">
            If you need immediate assistance, feel free to call us at
            <a href="tel:+919106297853" style="color:#EAC117;text-decoration:none;font-weight:bold;">+91 91062 97853</a>
            or WhatsApp us.
          </p>
        </div>
        <div style="background:#f1f5f9;padding:20px 32px;border-radius:0 0 12px 12px;border:1px solid #e2e8f0;border-top:none;text-align:center;">
          <p style="color:#64748b;font-size:13px;margin:0;">
            MechCurve · Surat, Ahmedabad &amp; Vadodara, Gujarat<br/>
            <a href="mailto:admin@mechcurve.com" style="color:#EAC117;text-decoration:none;">admin@mechcurve.com</a>
          </p>
        </div>
      </div>
    `

    MailApp.sendEmail({
      to: email,
      subject: `Thank you for contacting MechCurve — We'll be in touch!`,
      htmlBody: userHtmlBody,
      name: 'MechCurve',
      replyTo: ADMIN_EMAIL,
    })

    // ── 3. Append to Google Sheet ───────────
    const sheet = SpreadsheetApp.openById(SHEET_ID).getActiveSheet()

    // Add headers if sheet is empty
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(['Timestamp', 'Name', 'Email', 'Phone', 'Service', 'Message', 'Status'])
    }

    sheet.appendRow([
      new Date().toISOString(),
      name,
      email,
      phone || '',
      service,
      message,
      'New',
    ])

    // ── 4. Return success ───────────────────
    return ContentService
      .createTextOutput(JSON.stringify({ success: true }))
      .setMimeType(ContentService.MimeType.JSON)

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON)
  }
}

// Handle CORS preflight (needed for browser fetch)
function doGet() {
  return ContentService
    .createTextOutput(JSON.stringify({ status: 'ok' }))
    .setMimeType(ContentService.MimeType.JSON)
}
