const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const www = path.resolve(__dirname, '../../ios/www/js');

test('Windows-naam en platformteksten; iOS blijft ongewijzigd', () => {
  const window = { ddaDesktop: {} };
  const document = {
    body: { classList: { add() {} } }, querySelectorAll: () => [], addEventListener() {}
  };
  const context = vm.createContext({ window, document, MutationObserver: class { observe() {} } });
  vm.runInContext(fs.readFileSync(path.join(www, 'platform.js'), 'utf8'), context);
  assert.equal(window.DdaPlatform.brand, 'ASK FOR HELP');
  assert.equal(window.DdaPlatform.text('Versie 0.1.0 (iOS)', false), 'Versie 0.1.0 (Windows)');
  assert.equal(window.DdaPlatform.text('Profiel installeren', false), 'Profiel downloaden');
  assert.match(window.DdaPlatform.text('On iOS you can install Apple profiles. Android apps are for Android only.', true), /cannot be installed on Windows/);
  const ios = { window: {} };
  vm.runInNewContext(fs.readFileSync(path.join(www, 'platform.js'), 'utf8'), ios);
  assert.equal(ios.window.DdaPlatform.brand, 'ASK HELP DDA');
  assert.equal(ios.window.DdaPlatform.text('Profiel installeren', false), 'Profiel installeren');
});

test('Windows-auth schrijft/leest geen tokens in localStorage', async () => {
  const window = { ddaDesktop: {}, DdaCore: { authMessage: (text) => text } };
  let storageAccesses = 0;
  const storage = () => { storageAccesses++; throw new Error('Tokenopslag niet toegestaan'); };
  const context = vm.createContext({
    window, localStorage: { getItem: storage, setItem: storage, removeItem: storage },
    fetch: async () => ({ ok: true, json: async () => ({ idToken: 'test', refreshToken: 'test-refresh', localId: 'test', expiresIn: 3600 }) })
  });
  vm.runInContext(fs.readFileSync(path.join(www, 'firebase.js'), 'utf8'), context);
  assert.equal(await window.DdaApi.restore(), null);
  await window.DdaApi.signIn('test@example.invalid', 'throwaway');
  assert.equal(window.DdaApi.session().idToken, 'test');
  window.DdaApi.signOut();
  assert.equal(window.DdaApi.session(), null);
  assert.equal(storageAccesses, 0);
});
