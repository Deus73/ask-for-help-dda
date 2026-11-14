const { app, BrowserWindow, Menu, dialog, shell, clipboard, nativeTheme } = require('electron');
const path = require('node:path');
const fs = require('node:fs');
const { ipcMain } = require('electron');
const { externalUrl, trustedFrame } = require('./policy.cjs');
const { configurePortable } = require('./portable.cjs');

app.setName('ASK FOR HELP');
app.setAppUserModelId('com.digitaldope.askforhelp');
let portableReady = true;
try {
  configurePortable(app, process.env.PORTABLE_EXECUTABLE_DIR);
} catch {
  portableReady = false;
  dialog.showErrorBox('ASK FOR HELP Portable', 'De map naast het programma is niet beschrijfbaar. Verplaats het EXE-bestand naar een eigen map of USB-stick. / Move the EXE to a writable folder or USB drive.');
}
const www = fs.existsSync(path.join(__dirname, 'www'))
  ? path.join(__dirname, 'www') : path.join(__dirname, '../ios/www');
const entry = path.join(www, 'index.html');
let win;
let externalPrompt = false;

async function openExternal(raw) {
  const url = externalUrl(raw);
  if (!url || externalPrompt || !win || win.isDestroyed()) return;
  externalPrompt = true;
  try {
    const result = await dialog.showMessageBox(win, {
      type: 'question', title: 'Externe link / External link',
      message: 'Openen buiten ASK FOR HELP? / Open outside ASK FOR HELP?',
      detail: url, buttons: ['Annuleren / Cancel', 'Openen / Open'],
      defaultId: 0, cancelId: 0, noLink: true
    });
    if (result.response === 1) await shell.openExternal(url);
  } catch {
    if (win && !win.isDestroyed()) dialog.showErrorBox('ASK FOR HELP', 'De link kon niet worden geopend. / Could not open the link.');
  } finally { externalPrompt = false; }
}

function createWindow() {
  win = new BrowserWindow({
    title: 'ASK FOR HELP', width: 1100, height: 800, minWidth: 480, minHeight: 480,
    backgroundColor: '#0b0f17', icon: path.join(www, 'icon.png'),
    webPreferences: {
      preload: path.join(__dirname, 'preload.cjs'),
      contextIsolation: true, nodeIntegration: false, sandbox: true,
      webSecurity: true, partition: 'ask-for-help-memory'
    }
  });
  const session = win.webContents.session;
  // This partition is deliberately memory-only: no auth tokens are persisted to disk.
  session.setPermissionRequestHandler((_contents, _permission, callback) => callback(false));
  session.setPermissionCheckHandler(() => false);
  session.on('will-download', (event) => event.preventDefault());
  session.webRequest.onHeadersReceived((details, callback) => {
    const headers = { ...details.responseHeaders };
    if (details.resourceType === 'mainFrame') {
      headers['Content-Security-Policy'] = [
        "default-src 'none'; script-src 'self'; style-src 'self' 'unsafe-inline'; " +
        "img-src 'self' data: https:; connect-src https://identitytoolkit.googleapis.com " +
        "https://securetoken.googleapis.com https://firestore.googleapis.com https://firebasestorage.googleapis.com; " +
        "media-src https: blob:; font-src 'self'; base-uri 'none'; form-action 'none'; frame-src 'none'"
      ];
    }
    callback({ responseHeaders: headers });
  });
  win.webContents.setWindowOpenHandler(({ url }) => { void openExternal(url); return { action: 'deny' }; });
  win.webContents.on('will-navigate', (event, url) => { event.preventDefault(); void openExternal(url); });
  win.webContents.on('will-attach-webview', (event) => event.preventDefault());
  win.webContents.on('page-title-updated', (event) => event.preventDefault());
  win.webContents.on('did-fail-load', (_event, code) => {
    if (code !== -3) dialog.showErrorBox('ASK FOR HELP', 'De app kon niet laden. Installeer het pakket opnieuw of pak het volledige ZIP-bestand opnieuw uit.');
  });
  void win.loadFile(entry);
}

ipcMain.on('dda-action', (event, payload) => {
  if (!trustedFrame(event, entry) || !payload || typeof payload.action !== 'string') return;
  switch (payload.action) {
    case 'openExternal': void openExternal(payload.url); break;
    case 'copy':
      if (typeof payload.text === 'string' && payload.text.length <= 100000) clipboard.writeText(payload.text);
      break;
    case 'share': {
      const text = typeof payload.text === 'string' ? payload.text.slice(0, 10000) : '';
      const url = externalUrl(payload.url);
      clipboard.writeText([text, url].filter(Boolean).join('\n'));
      void dialog.showMessageBox(win, { message: 'Link gekopieerd / Link copied', detail: 'Plak de link in je e-mail of chat. / Paste the link into your email or chat.' });
      break;
    }
    case 'setBadge': {
      const count = Number.isFinite(payload.count) ? Math.max(0, Math.min(99, Math.floor(payload.count))) : 0;
      win.setTitle(count ? `(${count}) ASK FOR HELP` : 'ASK FOR HELP');
      break;
    }
    case 'setTheme': nativeTheme.themeSource = payload.theme === 'light' ? 'light' : 'dark'; break;
  }
});

if (!portableReady || !app.requestSingleInstanceLock()) app.quit();
else {
  app.on('second-instance', () => { if (win) { if (win.isMinimized()) win.restore(); win.focus(); } });
  app.whenReady().then(() => {
    Menu.setApplicationMenu(Menu.buildFromTemplate([
      { label: 'App', submenu: [{ label: 'Afsluiten / Quit', role: 'quit' }] },
      { label: 'Bewerken / Edit', submenu: [{ role: 'undo' }, { role: 'redo' }, { type: 'separator' }, { role: 'cut' }, { role: 'copy' }, { role: 'paste' }, { role: 'selectAll' }] },
      { label: 'Weergave / View', submenu: [{ role: 'resetZoom' }, { role: 'zoomIn' }, { role: 'zoomOut' }, { role: 'togglefullscreen' }] }
    ]));
    createWindow();
  });
  app.on('window-all-closed', () => app.quit());
}
