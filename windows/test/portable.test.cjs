const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { portablePaths, configurePortable } = require('../portable.cjs');

test('portable data blijft naast de exe, ook met spaties en Unicode', () => {
  const directory = path.join(os.tmpdir(), 'USB test é');
  const paths = portablePaths(directory);
  for (const value of Object.values(paths)) {
    assert.ok(value.startsWith(path.join(directory, 'ASK-FOR-HELP-data')));
  }
  assert.equal(paths.userData, paths.sessionData);
  assert.throws(() => portablePaths('../relative'), /absolute/);
});

test('Electron cache, sessiedata, crashrapporten en logs worden omgeleid', () => {
  const directory = fs.mkdtempSync(path.join(os.tmpdir(), 'ask-portable-'));
  try {
    const applied = {};
    const app = { setPath: (key, value) => { applied[key] = value; }, setAppLogsPath: (value) => { applied.logs = value; } };
    configurePortable(app, directory);
    assert.deepEqual(applied, portablePaths(directory));
    for (const folder of Object.values(applied)) assert.ok(fs.statSync(folder).isDirectory());
    const normal = {};
    configurePortable({ setPath: (k, v) => { normal[k] = v; } }, undefined);
    assert.deepEqual(normal, {});
  } finally {
    fs.rmSync(directory, { recursive: true, force: true });
  }
});
