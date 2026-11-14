const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const root = path.join(__dirname, "..", "www");
const html = fs.readFileSync(path.join(root, "index.html"), "utf8");
const app = fs.readFileSync(path.join(root, "js", "app.js"), "utf8");
const firebase = fs.readFileSync(path.join(root, "js", "firebase.js"), "utf8");

const dynamicIds = new Set([
    "support-status-card",
    "support-status-dot",
    "support-status-title",
    "support-status-text",
    "home-ticket-list",
    "home-ticket-count",
    "notes-list",
    "note-search"
]);

test("every static element id used by app.js exists in index.html", () => {
    const htmlIds = new Set(Array.from(html.matchAll(/\bid="([^"]+)"/g), match => match[1]));
    const used = new Set(Array.from(app.matchAll(/\$\("([^"]+)"\)/g), match => match[1]));
    const missing = [...used].filter(id => !htmlIds.has(id) && !dynamicIds.has(id));
    assert.deepEqual(missing, []);
});

test("the page loads the three local scripts in order", () => {
    const core = html.indexOf("js/core.js");
    const api = html.indexOf("js/firebase.js");
    const ui = html.indexOf("js/app.js");
    assert.ok(core >= 0 && api > core && ui > api);
});

test("all Dutch data-i18n keys have an English translation", () => {
    const keys = new Set(Array.from(html.matchAll(/data-i18n="([^"]+)"/g), match => match[1]));
    const translations = new Set(Array.from(app.matchAll(/^\s{8}"([^"]+)":/gm), match => match[1]));
    const missing = [...keys].filter(key => !translations.has(key));
    assert.deepEqual(missing, []);
});

test("the Firebase client has no Firebase SDK dependency", () => {
    assert.equal(/firebase\.initializeApp|firebase\/app|firebase\/firestore/.test(firebase), false);
    assert.match(firebase, /identitytoolkit\.googleapis\.com/);
    assert.match(firebase, /firestore\.googleapis\.com/);
});

test("the web app has no obvious development leftovers", () => {
    assert.equal(/localhost:\d+/.test(app + firebase + html), false);
    assert.equal(/console\.log\(/.test(app + firebase), false);
    assert.equal(/TODO|FIXME/.test(app + firebase), false);
});
