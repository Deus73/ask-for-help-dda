const test = require("node:test");
const assert = require("node:assert/strict");
const core = require("../www/js/core.js");

const storage = new Map();
const calls = [];

global.localStorage = {
    getItem: key => storage.has(key) ? storage.get(key) : null,
    setItem: (key, value) => storage.set(key, String(value)),
    removeItem: key => storage.delete(key)
};
global.window = { DdaCore: core };

function reply(body, status) {
    const code = status || 200;
    return {
        ok: code >= 200 && code < 300,
        status: code,
        json: async () => body,
        text: async () => JSON.stringify(body)
    };
}

function queryCollection(options) {
    const query = JSON.parse(options.body).structuredQuery;
    return query.from[0].collectionId;
}

function queryField(options) {
    const query = JSON.parse(options.body).structuredQuery;
    return query.where.fieldFilter.field.fieldPath;
}

function doc(name, fields) {
    return { name: "projects/p/databases/(default)/documents/" + name, fields: fields || {} };
}

global.fetch = async (url, options) => {
    const target = String(url);
    const opts = options || {};
    calls.push({ url: target, options: opts });

    if (target.includes("accounts:signInWithPassword")) {
        return reply({
            idToken: "token-1",
            refreshToken: "refresh-1",
            localId: "u1",
            email: "klant@example.nl",
            expiresIn: "3600"
        });
    }
    if (target.includes("accounts:delete")) return reply({});
    if (target.includes(":runQuery")) {
        const collection = queryCollection(opts);
        const field = queryField(opts);
        if (collection === "tickets") {
            return reply([{
                document: doc("tickets/t1", {
                    customerUid: { stringValue: "u1" },
                    status: { stringValue: "open" },
                    updatedAt: { timestampValue: "2026-11-12T10:00:00Z" }
                })
            }]);
        }
        if (collection === "notes" && field === "ownerUid") {
            return reply([{
                document: doc("notes/n1", {
                    ownerUid: { stringValue: "u1" },
                    title: { stringValue: "Eigen notitie" },
                    updatedAt: { timestampValue: "2026-11-12T10:00:00Z" }
                })
            }]);
        }
        if (collection === "notes" && field === "sharedWith") {
            return reply([{
                document: doc("notes/n2", {
                    ownerUid: { stringValue: "u2" },
                    sharedWith: { arrayValue: { values: [{ stringValue: "u1" }] } },
                    title: { stringValue: "Gedeelde notitie" },
                    updatedAt: { timestampValue: "2026-11-12T10:00:00Z" }
                })
            }]);
        }
        if (collection === "driveFiles") {
            return reply([{
                document: doc("driveFiles/d1", {
                    ownerUid: { stringValue: "u1" },
                    name: { stringValue: "bestand.pdf" }
                })
            }]);
        }
        return reply([]);
    }
    if (target.includes(":commit")) return reply({});
    if (target.includes("/tickets/t1/messages")) {
        return reply({
            documents: [doc("tickets/t1/messages/m1", {
                fileLink: {
                    stringValue: "https://firebasestorage.googleapis.com/v0/b/digital-dope-advisors-support.firebasestorage.app/o/chat%2Ft1%2Fbestand.pdf?alt=media&token=x"
                }
            })]
        });
    }
    if (target.includes("/users/u1/trusted")) return reply({});
    if (target.endsWith("/users/u1")) {
        return reply(doc("users/u1", { shareCode: { stringValue: "ABCD2345" } }));
    }
    if (target.endsWith("/shareCodes/ABCD2345")) {
        return reply(doc("shareCodes/ABCD2345", { uid: { stringValue: "u1" } }));
    }
    if (target.includes("/o/")) return reply({});
    throw new Error("Onverwachte fetch: " + target);
};

require("../www/js/firebase.js");
const api = global.window.DdaApi;

test("account verwijderen ruimt data, bijlagen en auth op", async () => {
    const session = await api.signIn("klant@example.nl", "wachtwoord");
    assert.equal(session.localId, "u1");

    await api.deleteAccountPermanently();

    assert.equal(api.session(), null);

    const deletes = calls
        .filter(call => call.url.includes(":commit"))
        .flatMap(call => JSON.parse(call.options.body).writes)
        .filter(write => write.delete)
        .map(write => write.delete);

    assert.ok(deletes.some(name => name.endsWith("/tickets/t1")), "ticket verwijderd");
    assert.ok(deletes.some(name => name.endsWith("/notes/n1")), "eigen notitie verwijderd");
    assert.ok(deletes.some(name => name.endsWith("/driveFiles/d1")), "Drive-verwijzing verwijderd");
    assert.ok(deletes.some(name => name.endsWith("/users/u1")), "gebruikersdocument verwijderd");
    assert.ok(deletes.some(name => name.endsWith("/shareCodes/ABCD2345")), "deelcode verwijderd");
    assert.ok(deletes.some(name => name.endsWith("/profiles/u1")), "profiel verwijderd");
    assert.ok(deletes.some(name => name.endsWith("/presence/u1")), "aanwezigheid verwijderd");

    const unshare = calls
        .filter(call => call.url.includes(":commit"))
        .flatMap(call => JSON.parse(call.options.body).writes)
        .some(write => write.update
            && write.update.name.endsWith("/notes/n2")
            && write.updateTransforms
            && write.updateTransforms[0].removeAllFromArray);
    assert.equal(unshare, true, "gedeelde notitie losgekoppeld");

    const storageDelete = calls.some(call =>
        call.url.includes("/o/chat%2Ft1%2Fbestand.pdf") && call.options.method === "DELETE"
    );
    assert.equal(storageDelete, true, "Storage-bijlage verwijderd");

    assert.equal(calls.some(call => call.url.includes("accounts:delete")), true, "auth-account verwijderd");
});
