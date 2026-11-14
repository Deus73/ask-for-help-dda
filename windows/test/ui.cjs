const { _electron, expect } = require('playwright/test');
const assert = require('node:assert/strict');
const path = require('node:path');
const fs = require('node:fs');
const systemName = process.platform === 'linux' ? 'Linux' : 'Windows';
const out = path.resolve(__dirname, '../../build/windows-tests');
fs.mkdirSync(out, { recursive: true });

function installFirebaseMock() {
const base = 'projects/digital-dope-advisors-support/databases/(default)/documents/';
const str = (s) => ({ stringValue: s });
const doc = (id, fields) => ({ name: base + id, fields });
const documents = new Map([
  ['users/test-user', doc('users/test-user', { email: str('test@example.invalid'), shareCode: str('TESTCODE') })],
  ['profiles/test-user', doc('profiles/test-user', { firstName: str('UI-test') })],
  ['tickets/test-ticket', doc('tickets/test-ticket', { customerUid: str('test-user'), title: str('Testgesprek'), status: str('open') })],
  ['appCatalog/test-app', doc('appCatalog/test-app', { title: str('Test-APK'), kind: str('apk'), url: str('https://example.invalid/test.apk'), description: str('Alleen testgegevens') })]
]);
let failApps = false;
const value = (v) => v?.stringValue ?? v?.booleanValue ?? v?.integerValue;

window.fetch = async function (target, options = {}) {
  const url = new URL(target);
  const body = options.body ? JSON.parse(options.body) : {};
  const reply = (json, status = 200) => new Response(JSON.stringify(json), { status, headers: { 'Content-Type': 'application/json' } });
  if (url.pathname.includes('signInWithPassword')) return reply({ idToken: 'test-token', refreshToken: 'test-refresh', localId: 'test-user', email: 'test@example.invalid', expiresIn: '3600' });
  if (url.pathname.includes('sendOobCode')) return reply({});
  if (url.pathname.endsWith(':runQuery')) {
    const q = body.structuredQuery;
    const collection = q.from[0].collectionId;
    if (collection === 'appCatalog' && failApps) return reply({ error: { message: 'Test: catalogus offline' } }, 503);
    return reply([...documents].filter(([id, d]) => {
      if (!id.startsWith(collection + '/') || id.split('/').length !== 2) return false;
      const filter = q.where?.fieldFilter;
      if (!filter) return true;
      return value(d.fields[filter.field.fieldPath]) === value(filter.value);
    }).map(([, document]) => ({ document })));
  }
  if (url.pathname.endsWith(':commit')) {
    for (const write of body.writes) {
      if (write.delete) documents.delete(write.delete.split('/documents/')[1]);
      if (write.update) {
        const id = write.update.name.split('/documents/')[1];
        const fields = { ...(write.updateMask ? documents.get(id)?.fields : {}), ...write.update.fields };
        for (const t of write.updateTransforms || []) fields[t.fieldPath] = { timestampValue: new Date().toISOString() };
        documents.set(id, doc(id, fields));
      }
    }
    return reply({});
  }
  const id = decodeURIComponent(url.pathname.split('/documents/')[1] || '');
  if (documents.has(id)) return reply(documents.get(id));
  if (id.split('/').length % 2 === 1) return reply({ documents: [...documents].filter(([key]) => key.startsWith(id + '/') && key.split('/').length === id.split('/').length + 1).map(([, d]) => d) });
  return reply({ error: { message: 'Not found' } }, 404);
};
}

(async () => {
  const app = await _electron.launch({ args: ['.'], cwd: path.resolve(__dirname, '..') });
  try {
    const page = await app.firstWindow();
    await page.addInitScript(installFirebaseMock);
    const errors = [];
    page.on('pageerror', (error) => errors.push(error.message));
    await page.reload();
    await expect(page.locator('#login-view')).toBeVisible();
    await expect(page.locator('#login-view h1')).toHaveText('ASK FOR HELP');
    await page.screenshot({ path: path.join(out, 'desktop-login.png') });
    assert.equal(await page.evaluate(() => typeof require), 'undefined');
    assert.equal(await page.evaluate(() => window.ddaDesktop.platform), process.platform === 'linux' ? 'linux' : 'windows');

    await page.click('#login-btn');
    await expect(page.locator('#login-error')).not.toBeEmpty();
    await page.click('#login-forgot');
    await expect(page.locator('#modal')).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(page.locator('#modal')).toBeHidden();
    await expect(page.locator('#login-forgot')).toBeFocused();
    await page.click('#login-register');
    await expect(page.locator('#register-view')).toBeVisible();
    await page.click('#register-btn');
    await expect(page.locator('#register-error')).not.toBeEmpty();
    await page.click('#register-back');
    await page.click('#login-lang');
    await expect(page.locator('#login-btn')).toHaveText('Sign in');
    await page.click('#login-lang');

    await page.fill('#login-email', 'test@example.invalid');
    await page.fill('#login-password', 'throwaway-test-value');
    await page.click('#login-btn');
    await expect(page.locator('#main-view')).toBeVisible();
    await expect(page.locator('[data-open-ticket="test-ticket"]')).toBeVisible();
    assert.equal(await page.evaluate(() => localStorage.getItem('dda.ios.session')), null);
    await page.click('[data-open-ticket="test-ticket"]');
    await expect(page.locator('#chat-view')).toBeVisible();
    await page.fill('#message-input', 'Bericht uit de UI-test');
    await page.click('#send-btn');
    await expect(page.locator('#messages')).toContainText('Bericht uit de UI-test');
    await page.screenshot({ path: path.join(out, 'desktop-chat.png') });
    await page.click('#attach-btn');
    await expect(page.locator('#sheet')).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(page.locator('#sheet')).toBeHidden();
    await page.click('#chat-menu');
    await page.getByRole('button', { name: 'Gesprek sluiten', exact: true }).click();
    await expect(page.locator('#modal')).toBeVisible();
    await page.click('#modal-ok');
    await expect(page.locator('#message-input')).toBeDisabled();
    await page.click('#chat-back');
    await page.click('[data-tab="apps"]');
    await expect(page.locator('.app-card')).toHaveCount(1);
    await expect(page.locator('#tab-content .notice')).toContainText(`niet op ${systemName} installeren`);
    await expect(page.locator('[data-app-action="open"]')).toHaveText('Downloaden');
    await page.screenshot({ path: path.join(out, 'desktop-apps.png') });

    await app.evaluate(({ dialog }) => {
      global.testDialogs = [];
      dialog.showMessageBox = async (_win, options) => { global.testDialogs.push(options); return { response: 0 }; };
    });
    await page.click('[data-app-action="open"]');
    await expect.poll(() => app.evaluate(() => global.testDialogs.length)).toBe(1);
    assert.equal(await app.evaluate(() => global.testDialogs[0].detail), 'https://example.invalid/test.apk');
    await page.click('[data-app-action="share"]');
    await expect.poll(() => app.evaluate(({ clipboard }) => clipboard.readText())).toContain('https://example.invalid/test.apk');

    await page.click('[data-tab="notes"]');
    await expect(page.locator('#tab-content')).toContainText('Nog geen notities');
    await page.click('[data-new-note]');
    await expect(page.locator('#note-edit-view')).toBeVisible();
    await page.fill('#note-title', 'UI-testnotitie');
    await page.fill('#note-body', '<script>geen HTML uitvoeren</script>');
    await page.click('#note-save');
    await expect(page.locator('#main-view')).toBeVisible();
    await expect(page.locator('#tab-content')).toContainText('UI-testnotitie');
    await page.screenshot({ path: path.join(out, 'desktop-notes.png') });
    await page.click('[data-tab="profile"]');
    await expect(page.locator('#tab-content')).toContainText(systemName);
    await page.click('[data-profile-action="copy-code"]');
    await expect.poll(() => app.evaluate(({ clipboard }) => clipboard.readText())).toBe('TESTCODE');
    await page.click('[data-profile-action="edit"]');
    await page.fill('#profile-first', 'Gewijzigde testnaam');
    await page.click('#profile-save');
    await expect(page.locator('#main-view')).toBeVisible();
    await expect(page.locator('#tab-content')).toContainText('Gewijzigde testnaam');
    await page.click('[data-profile-action="privacy"]');
    await expect(page.locator('#modal-text')).toContainText(systemName);
    await page.keyboard.press('Escape');
    for (const theme of ['light', 'dark']) {
      await page.click(`[data-set-theme="${theme}"]`);
      await expect(page.locator('html')).toHaveAttribute('data-theme', theme);
      for (const width of [480, 1100]) {
        await app.evaluate(({ BrowserWindow }, width) => BrowserWindow.getAllWindows()[0].setSize(width, 800), width);
        const overflow = await page.evaluate(() => document.documentElement.scrollWidth > innerWidth);
        assert.equal(overflow, false, `${theme}/${width}: horizontal overflow`);
        await page.screenshot({ path: path.join(out, `profile-${theme}-${width}.png`) });
      }
    }
    await page.click('[data-set-lang="en"]');
    await expect(page.locator('.version')).toContainText(systemName);
    await page.click('[data-set-lang="nl"]');
    await page.click('[data-profile-action="logout"]');
    await page.click('#modal-ok');
    await expect(page.locator('#modal')).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(page.locator('#main-view')).toBeVisible();
    await page.reload();
    await expect(page.locator('#login-view')).toBeVisible();
    assert.equal(await page.evaluate(() => localStorage.getItem('dda.ios.session')), null);
    assert.deepEqual(errors, []);
    console.log('PASS: branding, sandbox, validatie, register/back, NL/EN, dialog/Escape/focus, login, chat/send/close, attachment menu, apps/download/share, notes/create, profile/edit/copy/privacy, themes/widths, double logout/cancel, memory-only auth; Firebase mocked.');
  } finally { await app.close(); }
})().catch((error) => { console.error(error); process.exitCode = 1; });
