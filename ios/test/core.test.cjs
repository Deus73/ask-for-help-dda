const test = require("node:test");
const assert = require("node:assert/strict");
const core = require("../www/js/core.js");

test("status labels and classes fall back to open", () => {
    assert.equal(core.statusLabel("waiting_customer"), "Wacht op jouw antwoord");
    assert.equal(core.statusLabel("closed"), "Gesloten");
    assert.equal(core.statusLabel("onbekend"), "Open");
    assert.equal(core.statusClass("waiting_support"), "status-waiting_support");
    assert.equal(core.statusClass("onbekend"), "status-open");
});

test("escapeHtml handles markup characters", () => {
    assert.equal(core.escapeHtml('<b>"x" & \'y\'</b>'), "&lt;b&gt;&quot;x&quot; &amp; &#39;y&#39;&lt;/b&gt;");
    assert.equal(core.escapeHtml(null), "");
});

test("time formatting is stable", () => {
    const now = new Date(2026, 10, 12, 14, 30, 0).getTime();
    const today = new Date(2026, 10, 12, 9, 5, 0).getTime();
    const older = new Date(2026, 10, 9, 9, 5, 0).getTime();
    assert.equal(core.formatTime(today, now), "09:05");
    assert.equal(core.formatTime(older, now), "09-11 09:05");
    assert.equal(core.formatDate(older), "09-11-2026");
    assert.equal(core.formatRelative(now - 30 * 1000, now), "nu");
    assert.equal(core.formatRelative(now - 5 * 60 * 1000, now), "5 min");
    assert.equal(core.formatRelative(now - 2 * 60 * 60 * 1000, now), "2 uur");
    assert.equal(core.formatRelative(now - 3 * 24 * 60 * 60 * 1000, now), "3 dagen");
});

test("byte formatting uses Dutch decimal comma", () => {
    assert.equal(core.formatBytes(0), "Onbekend");
    assert.equal(core.formatBytes(512), "512 B");
    assert.equal(core.formatBytes(1536), "1,5 KB");
    assert.equal(core.formatBytes(22 * 1024 * 1024), "22 MB");
});

test("Firestore values convert to plain objects", () => {
    const doc = {
        name: "projects/p/databases/(default)/documents/tickets/abc",
        fields: {
            title: { stringValue: "Hulp" },
            open: { booleanValue: true },
            count: { integerValue: "4" },
            score: { doubleValue: 1.5 },
            when: { timestampValue: "2026-11-12T10:00:00Z" },
            empty: { nullValue: null },
            tags: { arrayValue: { values: [{ stringValue: "a" }, { stringValue: "b" }] } },
            nested: { mapValue: { fields: { x: { integerValue: "1" } } } }
        }
    };
    const value = core.docToObject(doc);
    assert.equal(value.id, "abc");
    assert.equal(value.title, "Hulp");
    assert.equal(value.open, true);
    assert.equal(value.count, 4);
    assert.equal(value.score, 1.5);
    assert.equal(value.when, Date.parse("2026-11-12T10:00:00Z"));
    assert.equal(value.empty, null);
    assert.deepEqual(value.tags, ["a", "b"]);
    assert.deepEqual(value.nested, { x: 1 });
});

test("generated ids and share codes have the expected shape", () => {
    const id = core.newDocId();
    const code = core.generateShareCode();
    assert.match(id, /^[A-Za-z0-9]{20}$/);
    assert.match(code, /^[A-HJ-NP-Z2-9]{8}$/);
    assert.equal(core.normalizeShareCode(" abcd2345 "), "ABCD2345");
});

test("support presence uses a three minute window", () => {
    const now = 1_700_000_000_000;
    assert.equal(core.isSupportOnline([now - 30_000], now), true);
    assert.equal(core.isSupportOnline([now - 4 * 60_000], now), false);
    assert.equal(core.isSupportOnline([now + 30_000], now), true);
    assert.equal(core.isSupportOnline([], now), false);
});

test("auth errors are translated", () => {
    assert.equal(core.authMessage("EMAIL_NOT_FOUND"), "E-mailadres of wachtwoord klopt niet.");
    assert.equal(core.authMessage("INVALID_LOGIN_CREDENTIALS"), "E-mailadres of wachtwoord klopt niet.");
    assert.equal(core.authMessage("EMAIL_EXISTS"), "Er bestaat al een account met dit e-mailadres.");
    assert.equal(core.authMessage("WEAK_PASSWORD"), "Kies een sterker wachtwoord van minimaal 8 tekens.");
    assert.equal(core.authMessage("SOMETHING_ELSE"), "Inloggen is niet gelukt. Controleer je gegevens en probeer opnieuw.");
});

test("chat scroll and ticket helpers", () => {
    assert.equal(core.shouldStickToBottom(900, 1000, 100), true);
    assert.equal(core.shouldStickToBottom(500, 1000, 100), false);
    const tickets = [
        { id: "closed", status: "closed", updatedAt: 900 },
        { id: "open-old", status: "open", updatedAt: 100 },
        { id: "open-new", status: "waiting_customer", updatedAt: 200 }
    ];
    assert.equal(core.openTicketId(tickets), "open-new");
    assert.deepEqual(core.sortTickets(tickets).map(t => t.id), ["closed", "open-new", "open-old"]);
    assert.equal(core.statusAfterMessage(true), "waiting_customer");
    assert.equal(core.statusAfterMessage(false), "waiting_support");
    assert.equal(core.canSend("closed"), false);
    assert.equal(core.canSend("open"), true);
});

test("links, images, email and filenames are validated", () => {
    assert.equal(core.safeLink("https://example.com/a"), "https://example.com/a");
    assert.equal(core.safeLink("http://example.com/a"), "http://example.com/a");
    assert.equal(core.safeLink("javascript:alert(1)"), "");
    assert.equal(core.safeLink(""), "");
    assert.equal(core.isImageMime("image/jpeg"), true);
    assert.equal(core.isImageMime("video/mp4"), false);
    assert.equal(core.isValidEmail("a@b.nl"), true);
    assert.equal(core.isValidEmail("a@b"), false);
    assert.equal(core.fileNameFromPath("/a/b/c.pdf"), "c.pdf");
    assert.equal(core.fileNameFromPath(""), "bestand");
});
