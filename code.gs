const CONTACT_TOKEN = '4c11a8210a0a7aa917e3a1a9f365fc3cac567d8ed08d237b21bd20477ff9c19a';
const SPREADSHEET_ID = '1UudEEUy0v2sQ-CVQtM9XW_-eYOBIA9wUMGFu7e0PU2g';
const SHEET_NAME = 'Contacto';
const OWNER_EMAIL = 'info.nuestraesperanza@gmail.com';
const SHEET_HEADERS = ['Fecha servidor', 'Nombre', 'Email', 'Teléfono', 'Asunto', 'Mensaje', 'Fuente', 'Timestamp cliente'];

function doPost(e) {
  try {
    const body = parseRequestBody(e);

    if (!body.token || body.token !== CONTACT_TOKEN) {
      return jsonResponse({ ok: false, error: 'unauthorized' });
    }

    const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    const sheet = ss.getSheetByName(SHEET_NAME);
    if (!sheet) return jsonResponse({ ok: false, error: 'sheet_not_found' });
    ensureHeaders(sheet);

    const senderName = body.name || body.nombre || 'Alguien';
    const senderEmail = body.email || '';
    const senderPhone = body.phoneFull || body.telefono || '';
    const senderSubject = body.subject || body.asunto || 'Sin asunto';
    const senderMessage = body.message || body.mensaje || '(sin mensaje)';
    const senderSource = body.source || '';
    const senderTimestamp = body.timestamp || '';

    sheet.appendRow([
      new Date(),
      escapeForSheet(senderName),
      escapeForSheet(senderEmail),
      escapeForSheet(senderPhone),
      escapeForSheet(senderSubject),
      escapeForSheet(senderMessage),
      escapeForSheet(senderSource),
      escapeForSheet(senderTimestamp),
    ]);

    const subjectLine = `${senderName} ha enviado un mensaje a través del formulario de contacto`;

    const plainBody =
      `NUEVO MENSAJE\n` +
      `====================\n\n` +
      `${senderMessage}\n\n` +
      `--------------------\n` +
      `Nombre: ${senderName}\n` +
      `Email: ${senderEmail}\n` +
      `Teléfono: ${senderPhone}\n` +
      `Asunto: ${senderSubject}\n` +
      `Fuente: ${senderSource}\n` +
      `Fecha: ${senderTimestamp}\n`;

    MailApp.sendEmail({
      to: OWNER_EMAIL,
      subject: subjectLine,
      body: plainBody,
      replyTo: senderEmail || undefined,
      name: 'Formulario Contacto',
    });

    return jsonResponse({ ok: true });
  } catch (err) {
    return jsonResponse({ ok: false, error: String(err) });
  }
}

function parseRequestBody(e) {
  if (!e || !e.postData || !e.postData.contents) {
    return {};
  }
  try {
    return JSON.parse(e.postData.contents);
  } catch (error) {
    return {};
  }
}

function ensureHeaders(sheet) {
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(SHEET_HEADERS);
  }
}

function escapeForSheet(value) {
  const text = String(value || '');
  // Prevent Sheets from interpreting user input as formulas.
  if (/^[=+\-@]/.test(text)) {
    return "'" + text;
  }
  return text;
}

function jsonResponse(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
