const { test, before, after } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { initializeTestEnvironment, assertSucceeds, assertFails } = require('@firebase/rules-unit-testing');
const { doc, getDoc, setDoc, updateDoc, deleteDoc, writeBatch, serverTimestamp, collection, query, where, getDocs } = require('firebase/firestore');
const { ref, uploadBytes, getBytes, deleteObject } = require('firebase/storage');
let env;
const uid = 'customer';
const fsdb = (who) => env.authenticatedContext(who).firestore();

before(async () => {
  assert.equal(process.env.GCLOUD_PROJECT, 'demo-ask-for-help', 'Only the isolated demo project may be tested');
  env = await initializeTestEnvironment({
    projectId: 'demo-ask-for-help',
    firestore: { host: '127.0.0.1', port: 8185, rules: fs.readFileSync(path.join(__dirname, '../firestore.rules'), 'utf8') },
    storage: { host: '127.0.0.1', port: 9298, rules: fs.readFileSync(path.join(__dirname, '../storage.rules'), 'utf8') }
  });
  await env.withSecurityRulesDisabled(async (ctx) => {
    await setDoc(doc(ctx.firestore(), 'presence/staff'), { support: true });
    await setDoc(doc(ctx.firestore(), 'users/customer'), { email: 'customer@example.invalid', shareCode: 'OLD-CODE' });
    await setDoc(doc(ctx.firestore(), 'shareCodes/OLD-CODE'), { uid });
    await setDoc(doc(ctx.firestore(), 'tickets/test-ticket'), { customerUid: uid, status: 'open' });
    await setDoc(doc(ctx.firestore(), 'notes/shared'), { ownerUid: 'owner', sharedWith: [uid], title: 'Testnotitie' });
  });
});
after(async () => { if (env) await env.cleanup(); });

test('klant leest eigen tickets, niet die van een ander; support leest alles', async () => {
  await assertSucceeds(getDoc(doc(fsdb(uid), 'tickets/test-ticket')));
  await assertFails(getDoc(doc(fsdb('stranger'), 'tickets/test-ticket')));
  await assertSucceeds(getDoc(doc(fsdb('staff'), 'tickets/test-ticket')));
  const tickets = await assertSucceeds(getDocs(query(collection(fsdb(uid), 'tickets'), where('customerUid', '==', uid))));
  assert.equal(tickets.size, 1);
});

test('klant kan zichzelf geen supportrechten geven', async () => {
  await assertFails(setDoc(doc(fsdb(uid), 'presence/customer'), { support: true }));
  await assertSucceeds(setDoc(doc(fsdb(uid), 'presence/customer'), { lastSeen: serverTimestamp() }));
  await assertFails(updateDoc(doc(fsdb(uid), 'presence/customer'), { support: true }));
  await assertFails(updateDoc(doc(fsdb(uid), 'presence/staff'), { support: true }));
});

test('beide partijen sturen berichten met juiste afzender en status', async () => {
  for (const [who, support] of [[uid, false], ['staff', true]]) {
    const db = fsdb(who);
    const batch = writeBatch(db);
    batch.set(doc(db, `tickets/test-ticket/messages/${who}`), { senderUid: who, fromSupport: support, kind: 'TEXT', text: 'Testbericht', createdAt: serverTimestamp() });
    batch.update(doc(db, 'tickets/test-ticket'), { status: support ? 'waiting_customer' : 'waiting_support', lastMessage: 'Testbericht', updatedAt: serverTimestamp() });
    await assertSucceeds(batch.commit());
  }
  await assertFails(setDoc(doc(fsdb(uid), 'tickets/test-ticket/messages/forged'), { senderUid: uid, fromSupport: true }));
  await assertFails(setDoc(doc(fsdb('stranger'), 'tickets/test-ticket/messages/stranger'), { senderUid: 'stranger', fromSupport: false }));
});

test('support maakt en vervangt deelcodes atomair', async () => {
  const db = fsdb('staff');
  const batch = writeBatch(db);
  batch.set(doc(db, 'shareCodes/NEW-CODE'), { uid, createdBy: 'staff', createdAt: serverTimestamp() });
  batch.update(doc(db, 'users/customer'), { shareCode: 'NEW-CODE' });
  batch.delete(doc(db, 'shareCodes/OLD-CODE'));
  await assertSucceeds(batch.commit());
  await assertFails(updateDoc(doc(fsdb('stranger'), 'users/customer'), { shareCode: 'BAD' }));
});

test('uitnodiging wordt door support gemaakt en slechts eenmaal gebruikt', async () => {
  await assertSucceeds(setDoc(doc(fsdb('staff'), 'invites/TEST-INVITE'), { used: false, createdBy: 'staff', createdAt: serverTimestamp() }));
  await assertSucceeds(updateDoc(doc(fsdb('new-user'), 'invites/TEST-INVITE'), { used: true, usedBy: 'new-user' }));
  await assertFails(updateDoc(doc(fsdb('another-user'), 'invites/TEST-INVITE'), { used: true, usedBy: 'another-user' }));
});

test('gedeelde notitie kan worden verlaten maar niet herschreven', async () => {
  await assertSucceeds(getDoc(doc(fsdb(uid), 'notes/shared')));
  await assertFails(updateDoc(doc(fsdb(uid), 'notes/shared'), { title: 'Wijziging door ontvanger' }));
  await assertSucceeds(updateDoc(doc(fsdb(uid), 'notes/shared'), { sharedWith: [] }));
  await assertFails(getDoc(doc(fsdb(uid), 'notes/shared')));
});

test('alleen support beheert de appcatalogus; updateconfig blijft alleen-lezen', async () => {
  const entry = { title: 'Test-APK', description: 'Test', kind: 'apk', url: 'https://example.invalid/test.apk', updatedBy: 'staff', updatedAt: serverTimestamp() };
  await assertSucceeds(setDoc(doc(fsdb('staff'), 'appCatalog/test'), entry));
  await assertSucceeds(getDoc(doc(fsdb(uid), 'appCatalog/test')));
  await assertFails(setDoc(doc(fsdb(uid), 'appCatalog/forged'), { ...entry, updatedBy: uid }));
  await assertFails(setDoc(doc(fsdb('staff'), 'appConfig/updates'), { customerVersionCode: 999 }));
});

test('Termux-opdracht vereist allowlist en afzonderlijke klanttoestemming', async () => {
  const data = { customerUid: uid, requestedByUid: 'staff', commandId: 'storage', status: 'requested', createdAt: serverTimestamp() };
  await assertSucceeds(setDoc(doc(fsdb('staff'), 'termuxRequests/test'), data));
  await assertFails(setDoc(doc(fsdb('staff'), 'termuxRequests/unsafe'), { ...data, commandId: 'shell' }));
  await assertFails(updateDoc(doc(fsdb('staff'), 'termuxRequests/test'), { status: 'approved' }));
  await assertSucceeds(updateDoc(doc(fsdb(uid), 'termuxRequests/test'), { status: 'approved' }));
});

test('Storage: deelnemer uploadt/leest/verwijdert, buitenstaander niet', async () => {
  const customer = env.authenticatedContext(uid).storage('gs://demo-ask-for-help.firebasestorage.app');
  const stranger = env.authenticatedContext('stranger').storage('gs://demo-ask-for-help.firebasestorage.app');
  const file = 'chat/test-ticket/test.txt';
  await assertSucceeds(uploadBytes(ref(customer, file), new TextEncoder().encode('Testbestand'), { contentType: 'text/plain' }));
  await assertSucceeds(getBytes(ref(customer, file)));
  await assertFails(getBytes(ref(stranger, file)));
  await assertFails(uploadBytes(ref(stranger, 'chat/test-ticket/stranger.txt'), new Uint8Array([1]), { contentType: 'text/plain' }));
  await assertFails(uploadBytes(ref(customer, 'chat/test-ticket/test.html'), new Uint8Array([1]), { contentType: 'text/html' }));
  await assertSucceeds(deleteObject(ref(customer, file)));
});

test('klant verwijdert eigen berichten, gesprek en profiel, niet van een ander', async () => {
  await assertFails(deleteDoc(doc(fsdb('stranger'), 'tickets/test-ticket')));
  await assertSucceeds(deleteDoc(doc(fsdb(uid), 'tickets/test-ticket/messages/customer')));
  await assertSucceeds(deleteDoc(doc(fsdb(uid), 'tickets/test-ticket/messages/staff')));
  await assertSucceeds(deleteDoc(doc(fsdb(uid), 'tickets/test-ticket')));
  await assertSucceeds(deleteDoc(doc(fsdb(uid), 'users/customer')));
});
