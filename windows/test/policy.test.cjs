const { test } = require('node:test');
const assert = require('node:assert/strict');
const { pathToFileURL } = require('node:url');
const { externalUrl, trustedFrame } = require('../policy.cjs');

test('alleen https, mail en telefoon naar externe programma’s', () => {
  assert.equal(externalUrl('https://example.org/app.apk'), 'https://example.org/app.apk');
  assert.equal(externalUrl('mailto:support@example.org'), 'mailto:support@example.org');
  for (const value of ['javascript:alert(1)', 'file:///etc/passwd', 'http://example.org', 'ms-settings:', 'https://user:password@example.org', null, {}]) {
    assert.equal(externalUrl(value), null);
  }
});

test('IPC alleen vanuit het lokale hoofdvenster', () => {
  const file = '/project/www/index.html';
  const mainFrame = { url: pathToFileURL(file).href };
  assert.equal(trustedFrame({ senderFrame: mainFrame, sender: { mainFrame } }, file), true);
  assert.equal(trustedFrame({ senderFrame: { url: mainFrame.url }, sender: { mainFrame } }, file), false);
  mainFrame.url = 'https://example.org';
  assert.equal(trustedFrame({ senderFrame: mainFrame, sender: { mainFrame } }, file), false);
});
