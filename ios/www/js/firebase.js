/* Firebase Auth, Firestore en Storage via REST. Geen SDK, zodat de app klein blijft. */
(function (root) {
    "use strict";

    var core = root.DdaCore;
    var API_KEY = "AIzaSyDSe-PreSqtTQnTPjF2Hna1jSXyHW65BVI";
    var PROJECT = "digital-dope-advisors-support";
    var BUCKET = "digital-dope-advisors-support.firebasestorage.app";
    var AUTH_BASE = "https://identitytoolkit.googleapis.com/v1/accounts:";
    var TOKEN_URL = "https://securetoken.googleapis.com/v1/token?key=" + API_KEY;
    var FS_BASE = "https://firestore.googleapis.com/v1/projects/" + PROJECT + "/databases/(default)/documents";
    var STORAGE_BASE = "https://firebasestorage.googleapis.com/v0/b/" + BUCKET + "/o";
    var STORAGE_KEY = "dda.ios.session";
    var session = null;

    function saveSession() {
        if (root.ddaDesktop) return;
        try {
            if (session) localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
            else localStorage.removeItem(STORAGE_KEY);
        } catch (e) { /* opslag kan uitstaan; dan geldt de sessie alleen voor deze keer */ }
    }

    function loadSession() {
        if (root.ddaDesktop) return null;
        try {
            var raw = localStorage.getItem(STORAGE_KEY);
            return raw ? JSON.parse(raw) : null;
        } catch (e) {
            return null;
        }
    }

    function normalizeAuth(data) {
        return {
            idToken: data.idToken || data.id_token,
            refreshToken: data.refreshToken || data.refresh_token,
            localId: data.localId || data.user_id,
            email: data.email || "",
            expiresAt: Date.now() + (Number(data.expiresIn || data.expires_in || 3600) * 1000)
        };
    }

    function httpError(res, body) {
        var message = "Verzoek mislukt.";
        var code = "";
        if (body && body.error) {
            message = body.error.message || message;
            code = body.error.status || "";
        }
        var error = new Error(message);
        error.status = res.status;
        error.code = code;
        return error;
    }

    function authError(body) {
        var code = body && body.error && body.error.message ? body.error.message : "";
        var error = new Error(core.authMessage(code));
        error.code = code;
        return error;
    }

    function networkError() {
        return new Error("Geen verbinding. Controleer je internet.");
    }

    async function signIn(email, password) {
        var res;
        try {
            res = await fetch(AUTH_BASE + "signInWithPassword?key=" + API_KEY, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: email, password: password, returnSecureToken: true })
            });
        } catch (e) {
            throw networkError();
        }
        var data = await res.json();
        if (!res.ok) throw authError(data);
        session = normalizeAuth(data);
        saveSession();
        return session;
    }

    async function signUp(email, password) {
        var res;
        try {
            res = await fetch(AUTH_BASE + "signUp?key=" + API_KEY, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: email, password: password, returnSecureToken: true })
            });
        } catch (e) {
            throw networkError();
        }
        var data = await res.json();
        if (!res.ok) throw authError(data);
        session = normalizeAuth(data);
        saveSession();
        return session;
    }

    async function deleteAccount() {
        if (!session) return;
        try {
            await fetch(AUTH_BASE + "delete?key=" + API_KEY, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ idToken: session.idToken })
            });
        } catch (e) { /* account verwijderen is een opruimpoging */ }
        signOut();
    }

    async function reauthenticate(password) {
        if (!session || !session.email) throw new Error("Niet ingelogd.");
        return signIn(session.email, password);
    }

    async function deleteAuthAccount() {
        if (!session) throw new Error("Niet ingelogd.");
        var res;
        try {
            res = await fetch(AUTH_BASE + "delete?key=" + API_KEY, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ idToken: session.idToken })
            });
        } catch (e) {
            throw networkError();
        }
        if (!res.ok) {
            var body = null;
            try { body = await res.json(); } catch (e) { /* leeg antwoord */ }
            var code = body && body.error && body.error.message ? body.error.message : "";
            if (code.indexOf("CREDENTIAL_TOO_OLD_LOGIN_AGAIN") >= 0) {
                throw new Error("Log opnieuw in om je account te verwijderen.");
            }
            throw authError(body);
        }
        signOut();
    }

    async function sendPasswordReset(email) {
        var res;
        try {
            res = await fetch(AUTH_BASE + "sendOobCode?key=" + API_KEY, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ requestType: "PASSWORD_RESET", email: email })
            });
        } catch (e) {
            throw networkError();
        }
        var data = await res.json();
        if (!res.ok) throw authError(data);
        return true;
    }

    function signOut() {
        session = null;
        saveSession();
    }

    async function refresh() {
        if (!session || !session.refreshToken) throw new Error("Sessie verlopen. Log opnieuw in.");
        var oldEmail = session.email || "";
        var body = "grant_type=refresh_token&refresh_token=" + encodeURIComponent(session.refreshToken);
        var res;
        try {
            res = await fetch(TOKEN_URL, {
                method: "POST",
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                body: body
            });
        } catch (e) {
            throw networkError();
        }
        var data = await res.json();
        if (!res.ok) {
            signOut();
            throw new Error("Sessie verlopen. Log opnieuw in.");
        }
        session = normalizeAuth(data);
        session.email = session.email || oldEmail;
        saveSession();
        return session.idToken;
    }

    async function token(force) {
        if (!session) throw new Error("Niet ingelogd.");
        if (!force && session.expiresAt - Date.now() > 60000) return session.idToken;
        return refresh();
    }

    async function restore() {
        session = loadSession();
        if (!session) return null;
        try {
            await token(false);
            return session;
        } catch (e) {
            session = null;
            saveSession();
            return null;
        }
    }

    async function fsFetch(path, options, retried) {
        var idToken = await token(false);
        var opts = options || {};
        opts.headers = Object.assign({}, opts.headers || {}, {
            "Authorization": "Bearer " + idToken,
            "Content-Type": "application/json"
        });
        var res;
        try {
            res = await fetch(FS_BASE + path, opts);
        } catch (e) {
            throw networkError();
        }
        if (res.status === 401 && !retried) {
            await token(true);
            return fsFetch(path, options, true);
        }
        if (!res.ok) {
            var body = null;
            try { body = await res.json(); } catch (e) { /* leeg antwoord */ }
            throw httpError(res, body);
        }
        if (res.status === 204) return null;
        return res.json();
    }

    function docName(path) {
        return "projects/" + PROJECT + "/databases/(default)/documents/" + path;
    }

    async function getDoc(collection, id) {
        try {
            return await fsFetch("/" + collection + "/" + encodeURIComponent(id));
        } catch (e) {
            if (e.status === 404) return null;
            throw e;
        }
    }

    async function runQuery(query) {
        return fsFetch(":runQuery", { method: "POST", body: JSON.stringify({ structuredQuery: query }) });
    }

    async function commit(writes) {
        return fsFetch(":commit", { method: "POST", body: JSON.stringify({ writes: writes }) });
    }

    function queryDocs(result) {
        return (result || []).filter(function (entry) { return entry && entry.document; })
            .map(function (entry) { return entry.document; });
    }

    function serverTime(fieldPath) {
        return { fieldPath: fieldPath, setToServerValue: "REQUEST_TIME" };
    }

    function str(value) { return { stringValue: String(value == null ? "" : value) }; }
    function bool(value) { return { booleanValue: Boolean(value) }; }
    function num(value) { return { integerValue: String(value) }; }
    function nil() { return { nullValue: null }; }
    function fields(object) {
        var out = {};
        Object.keys(object).forEach(function (key) {
            var value = object[key];
            if (value === null || typeof value === "undefined") out[key] = nil();
            else if (typeof value === "boolean") out[key] = bool(value);
            else if (typeof value === "number") out[key] = num(value);
            else if (Array.isArray(value)) out[key] = { arrayValue: { values: value.map(str) } };
            else out[key] = str(value);
        });
        return out;
    }

    async function register(email, password, inviteCode) {
        await signUp(email, password);
        var code = core.normalizeShareCode(inviteCode);
        var shareCode = core.generateShareCode();
        try {
            await commit([
                {
                    update: {
                        name: docName("invites/" + code),
                        fields: fields({ used: true, usedBy: session.localId })
                    },
                    updateMask: { fieldPaths: ["used", "usedBy"] },
                    updateTransforms: [serverTime("usedAt")],
                    currentDocument: { exists: true }
                },
                {
                    update: {
                        name: docName("users/" + session.localId),
                        fields: fields({ email: session.email, shareCode: shareCode })
                    },
                    updateTransforms: [serverTime("createdAt")]
                },
                {
                    update: {
                        name: docName("shareCodes/" + shareCode),
                        fields: fields({ uid: session.localId })
                    }
                }
            ]);
            return session;
        } catch (e) {
            await deleteAccount();
            var error = new Error("Ongeldige of al gebruikte uitnodigingscode.");
            error.code = "INVALID_INVITE";
            throw error;
        }
    }

    async function listTickets() {
        var result = await runQuery({
            from: [{ collectionId: "tickets" }],
            where: {
                fieldFilter: {
                    field: { fieldPath: "customerUid" },
                    op: "EQUAL",
                    value: str(session.localId)
                }
            }
        });
        return core.sortTickets(queryDocs(result).map(core.docToObject));
    }

    async function listMessages(ticketId) {
        var all = [];
        var pageToken = null;
        for (var page = 0; page < 10; page++) {
            var path = "/tickets/" + encodeURIComponent(ticketId) + "/messages?pageSize=300&orderBy=createdAt";
            if (pageToken) path += "&pageToken=" + encodeURIComponent(pageToken);
            var result = await fsFetch(path);
            all = all.concat((result.documents || []).map(core.docToObject));
            pageToken = result.nextPageToken || null;
            if (!pageToken) break;
        }
        all.sort(function (a, b) { return (a.createdAt || 0) - (b.createdAt || 0); });
        return all;
    }

    async function ownUser() {
        var doc = await getDoc("users", session.localId);
        return doc ? core.docToObject(doc) : {};
    }

    async function ownProfile() {
        var doc = await getDoc("profiles", session.localId);
        return doc ? core.docToObject(doc) : {};
    }

    async function saveProfile(details) {
        var existing = await getDoc("profiles", session.localId);
        var data = {
            firstName: details.firstName || "",
            lastName: details.lastName || "",
            birthDate: details.birthDate || "",
            address: details.address || "",
            whatsapp: details.whatsapp || "",
            contactEmail: details.contactEmail || ""
        };
        var write = {
            update: {
                name: docName("profiles/" + session.localId),
                fields: fields(data)
            }
        };
        if (existing) write.updateMask = { fieldPaths: Object.keys(data) };
        await commit([write]);
    }

    async function loadAvatar() {
        var doc = await getDoc("avatars", session.localId);
        return doc && doc.fields && doc.fields.image ? doc.fields.image.stringValue : null;
    }

    async function saveAvatar(base64) {
        var existing = await getDoc("avatars", session.localId);
        var write = {
            update: {
                name: docName("avatars/" + session.localId),
                fields: fields({ image: base64 })
            }
        };
        if (existing) write.updateMask = { fieldPaths: ["image"] };
        await commit([write]);
    }

    async function removeAvatar() {
        await commit([{ delete: docName("avatars/" + session.localId) }]);
    }

    async function isSupportAccount() {
        var doc = await getDoc("presence", session.localId);
        return Boolean(doc && doc.fields && doc.fields.support && doc.fields.support.booleanValue === true);
    }

    async function createTicket(shareCode) {
        var id = core.newDocId();
        var data = {
            customerUid: session.localId,
            customerEmail: session.email || "",
            title: "Support-gesprek",
            status: "open"
        };
        var write = {
            update: {
                name: docName("tickets/" + id),
                fields: fields(data)
            },
            updateTransforms: [serverTime("createdAt"), serverTime("updatedAt")]
        };
        if (shareCode) {
            write.update.fields.customerShareCode = str(shareCode);
        } else {
            write.update.fields.customerShareCode = nil();
        }
        await commit([write]);
        return id;
    }

    async function sendText(ticketId, text) {
        var messageId = core.newDocId();
        var messageRef = docName("tickets/" + ticketId + "/messages/" + messageId);
        var ticketRef = docName("tickets/" + ticketId);
        var clean = String(text || "").trim().slice(0, 2000);
        if (!clean) throw new Error("Bericht is leeg.");
        await commit([
            {
                update: {
                    name: messageRef,
                    fields: fields({
                        senderUid: session.localId,
                        fromSupport: false,
                        kind: "TEXT",
                        text: clean
                    })
                },
                updateTransforms: [serverTime("createdAt")]
            },
            {
                update: {
                    name: ticketRef,
                    fields: fields({
                        status: core.statusAfterMessage(false),
                        lastMessage: core.preview(clean)
                    })
                },
                updateMask: { fieldPaths: ["status", "lastMessage"] },
                updateTransforms: [serverTime("updatedAt")]
            }
        ]);
    }

    async function sendFile(ticketId, fileName, mime, link) {
        var messageId = core.newDocId();
        var messageRef = docName("tickets/" + ticketId + "/messages/" + messageId);
        var ticketRef = docName("tickets/" + ticketId);
        var name = String(fileName || "bestand").slice(0, 200);
        var cleanLink = String(link || "").slice(0, 2048);
        if (!core.safeLink(cleanLink)) throw new Error("De bestandslink moet met https:// beginnen.");
        await commit([
            {
                update: {
                    name: messageRef,
                    fields: fields({
                        senderUid: session.localId,
                        fromSupport: false,
                        kind: "FILE",
                        fileName: name,
                        fileMime: mime || "application/octet-stream",
                        fileLink: cleanLink
                    })
                },
                updateTransforms: [serverTime("createdAt")]
            },
            {
                update: {
                    name: ticketRef,
                    fields: fields({
                        status: core.statusAfterMessage(false),
                        lastMessage: "Bestand: " + name
                    })
                },
                updateMask: { fieldPaths: ["status", "lastMessage"] },
                updateTransforms: [serverTime("updatedAt")]
            }
        ]);
    }

    function safeStorageName(name) {
        return String(name || "bestand").replace(/[^a-zA-Z0-9._-]+/g, "_").slice(-160) || "bestand";
    }

    async function uploadChatFile(ticketId, file, onProgress, retried) {
        var idToken = await token(false);
        var path = "chat/" + ticketId + "/" + Date.now() + "-" + safeStorageName(file.name);
        return new Promise(function (resolve, reject) {
            var xhr = new XMLHttpRequest();
            xhr.open("POST", STORAGE_BASE + "?name=" + encodeURIComponent(path));
            xhr.setRequestHeader("Authorization", "Bearer " + idToken);
            xhr.setRequestHeader("Content-Type", file.type || "application/octet-stream");
            xhr.upload.onprogress = function (event) {
                if (event.lengthComputable && onProgress) onProgress(Math.round(event.loaded / event.total * 100));
            };
            xhr.onerror = function () { reject(networkError()); };
            xhr.onload = function () {
                if (xhr.status >= 200 && xhr.status < 300) {
                    try {
                        var data = JSON.parse(xhr.responseText || "{}");
                        var tokenParam = data.downloadTokens ? "&token=" + encodeURIComponent(String(data.downloadTokens).split(",")[0]) : "";
                        var objectName = data.name || path;
                        resolve({
                            name: file.name,
                            mime: file.type || "application/octet-stream",
                            size: file.size,
                            link: STORAGE_BASE + "/" + encodeURIComponent(objectName) + "?alt=media" + tokenParam
                        });
                    } catch (e) {
                        reject(new Error("Upload-antwoord kon niet worden gelezen."));
                    }
                    return;
                }
                if (xhr.status === 401 && !retried) {
                    refresh().then(function () {
                        return uploadChatFile(ticketId, file, onProgress, true);
                    }).then(resolve).catch(reject);
                    return;
                }
                if (xhr.status === 403) {
                    reject(new Error("Bestand uploaden is niet toegestaan. Controleer de Firebase Storage-regels."));
                    return;
                }
                if (xhr.status === 404) {
                    reject(new Error("Firebase Storage is nog niet ingeschakeld voor dit project."));
                    return;
                }
                reject(new Error("Bestand uploaden mislukt (HTTP " + xhr.status + ")."));
            };
            xhr.send(file);
        });
    }

    async function setStatus(ticketId, status) {
        await commit([{
            update: {
                name: docName("tickets/" + ticketId),
                fields: fields({ status: status })
            },
            updateMask: { fieldPaths: ["status"] },
            updateTransforms: [serverTime("updatedAt")]
        }]);
    }

    function storageObjectName(link) {
        var value = String(link || "");
        if (value.indexOf(STORAGE_BASE + "/") !== 0) return null;
        var match = value.match(/\/o\/([^?]+)/);
        if (!match) return null;
        try { return decodeURIComponent(match[1]); } catch (e) { return null; }
    }

    async function deleteStorageObject(objectName, retried) {
        if (!objectName) return;
        var idToken = await token(false);
        var res;
        try {
            res = await fetch(STORAGE_BASE + "/" + encodeURIComponent(objectName), {
                method: "DELETE",
                headers: { "Authorization": "Bearer " + idToken }
            });
        } catch (e) {
            return;
        }
        if (res.status === 401 && !retried) {
            await refresh();
            return deleteStorageObject(objectName, true);
        }
    }

    async function deleteTicket(ticketId) {
        var names = [];
        var links = [];
        var pageToken = null;
        for (var page = 0; page < 10; page++) {
            var path = "/tickets/" + encodeURIComponent(ticketId) + "/messages?pageSize=300";
            if (pageToken) path += "&pageToken=" + encodeURIComponent(pageToken);
            var result = await fsFetch(path);
            var docs = result.documents || [];
            names = names.concat(docs.map(function (doc) { return doc.name; }));
            docs.forEach(function (doc) {
                var link = doc.fields && doc.fields.fileLink && doc.fields.fileLink.stringValue;
                if (link) links.push(link);
            });
            pageToken = result.nextPageToken || null;
            if (!pageToken) break;
        }
        for (var i = 0; i < links.length; i++) {
            try { await deleteStorageObject(storageObjectName(links[i])); } catch (e) { /* bijlage opruimen is best effort */ }
        }
        for (var j = 0; j < names.length; j += 400) {
            await commit(names.slice(j, j + 400).map(function (name) { return { delete: name }; }));
        }
        await commit([{ delete: docName("tickets/" + ticketId) }]);
    }

    async function deleteTrustedViewers(uid) {
        var names = [];
        var pageToken = null;
        for (var page = 0; page < 10; page++) {
            var path = "/users/" + encodeURIComponent(uid) + "/trusted?pageSize=300";
            if (pageToken) path += "&pageToken=" + encodeURIComponent(pageToken);
            var result = await fsFetch(path);
            names = names.concat((result.documents || []).map(function (doc) { return doc.name; }));
            pageToken = result.nextPageToken || null;
            if (!pageToken) break;
        }
        if (names.length) {
            await commit(names.map(function (name) { return { delete: name }; }));
        }
    }

    async function listDriveFiles() {
        var result = await runQuery({
            from: [{ collectionId: "driveFiles" }],
            where: {
                fieldFilter: {
                    field: { fieldPath: "ownerUid" },
                    op: "EQUAL",
                    value: str(session.localId)
                }
            }
        });
        return queryDocs(result).map(core.docToObject);
    }

    async function deleteOwnData() {
        if (!session) throw new Error("Niet ingelogd.");
        var uid = session.localId;
        var tickets = await listTickets();
        for (var i = 0; i < tickets.length; i++) {
            await deleteTicket(tickets[i].id);
        }
        var ownNotes = await listOwnNotes();
        for (var j = 0; j < ownNotes.length; j++) {
            await deleteNote(ownNotes[j].id);
        }
        var sharedNotes = await listSharedNotes();
        for (var k = 0; k < sharedNotes.length; k++) {
            try { await unshareNote(sharedNotes[k].id, uid); } catch (e) { /* notitie-eigenaar ruimt de rest op */ }
        }
        var files = await listDriveFiles();
        if (files.length) {
            await commit(files.map(function (file) { return { delete: docName("driveFiles/" + file.id) }; }));
        }
        await deleteTrustedViewers(uid);
        var user = await ownUser();
        var writes = [
            { delete: docName("profiles/" + uid) },
            { delete: docName("avatars/" + uid) },
            { delete: docName("presence/" + uid) },
            { delete: docName("users/" + uid) }
        ];
        if (user.shareCode) {
            var codeDoc = await getDoc("shareCodes", user.shareCode);
            if (codeDoc) writes.push({ delete: docName("shareCodes/" + user.shareCode) });
        }
        await commit(writes);
    }

    async function deleteAccountPermanently() {
        await deleteOwnData();
        await deleteAuthAccount();
    }

    async function supportOnline() {
        var result = await runQuery({
            from: [{ collectionId: "presence" }],
            where: {
                fieldFilter: {
                    field: { fieldPath: "support" },
                    op: "EQUAL",
                    value: bool(true)
                }
            }
        });
        var seen = queryDocs(result).map(function (doc) {
            return core.docToObject(doc).lastSeen;
        });
        return core.isSupportOnline(seen, Date.now());
    }

    async function heartbeat() {
        var ref = docName("presence/" + session.localId);
        var existing = await getDoc("presence", session.localId);
        var write;
        if (existing) {
            write = {
                update: { name: ref, fields: {} },
                updateMask: { fieldPaths: ["lastSeen"] },
                updateTransforms: [serverTime("lastSeen")]
            };
        } else {
            write = {
                update: { name: ref, fields: {} },
                updateTransforms: [serverTime("lastSeen")]
            };
        }
        await commit([write]);
    }

    async function listOwnNotes() {
        var result = await runQuery({
            from: [{ collectionId: "notes" }],
            where: {
                fieldFilter: {
                    field: { fieldPath: "ownerUid" },
                    op: "EQUAL",
                    value: str(session.localId)
                }
            }
        });
        return core.sortNotes(queryDocs(result).map(core.docToObject));
    }

    async function listSharedNotes() {
        var result = await runQuery({
            from: [{ collectionId: "notes" }],
            where: {
                fieldFilter: {
                    field: { fieldPath: "sharedWith" },
                    op: "ARRAY_CONTAINS",
                    value: str(session.localId)
                }
            }
        });
        return core.sortNotes(queryDocs(result).map(core.docToObject));
    }

    async function getNote(id) {
        var doc = await getDoc("notes", id);
        return doc ? core.docToObject(doc) : null;
    }

    async function createNote(title, body, ticketId) {
        var id = core.newDocId();
        var data = {
            ownerUid: session.localId,
            title: String(title || "").slice(0, 200),
            body: String(body || "").slice(0, 20000)
        };
        var write = {
            update: {
                name: docName("notes/" + id),
                fields: fields(data)
            },
            updateTransforms: [serverTime("createdAt"), serverTime("updatedAt")]
        };
        write.update.fields.sharedWith = { arrayValue: { values: [] } };
        write.update.fields.ticketId = ticketId ? str(ticketId) : nil();
        await commit([write]);
        return id;
    }

    async function saveNote(id, title, body, ticketId) {
        var data = {
            title: String(title || "").slice(0, 200),
            body: String(body || "").slice(0, 20000),
            ticketId: ticketId || null
        };
        await commit([{
            update: {
                name: docName("notes/" + id),
                fields: fields(data)
            },
            updateMask: { fieldPaths: ["title", "body", "ticketId"] },
            updateTransforms: [serverTime("updatedAt")]
        }]);
    }

    async function deleteNote(id) {
        await commit([{ delete: docName("notes/" + id) }]);
    }

    async function shareNote(id, shareCode) {
        var code = core.normalizeShareCode(shareCode);
        var target = await getDoc("shareCodes", code);
        var targetUid = target && target.fields && target.fields.uid ? target.fields.uid.stringValue : null;
        if (!targetUid) throw new Error("Deze deelcode bestaat niet.");
        if (targetUid === session.localId) throw new Error("Je kunt een notitie niet met jezelf delen.");
        await commit([{
            update: { name: docName("notes/" + id), fields: {} },
            updateMask: { fieldPaths: ["sharedWith"] },
            updateTransforms: [{
                fieldPath: "sharedWith",
                appendMissingElements: { values: [str(targetUid)] }
            }]
        }]);
        return targetUid;
    }

    async function unshareNote(id, targetUid) {
        await commit([{
            update: { name: docName("notes/" + id), fields: {} },
            updateMask: { fieldPaths: ["sharedWith"] },
            updateTransforms: [{
                fieldPath: "sharedWith",
                removeAllFromArray: { values: [str(targetUid)] }
            }]
        }]);
    }

    async function listCatalog() {
        var all = [];
        var pageToken = null;
        for (var page = 0; page < 5; page++) {
            var path = "/appCatalog?pageSize=100";
            if (pageToken) path += "&pageToken=" + encodeURIComponent(pageToken);
            var result = await fsFetch(path);
            all = all.concat((result.documents || []).map(core.docToObject));
            pageToken = result.nextPageToken || null;
            if (!pageToken) break;
        }
        return all.sort(function (a, b) {
            return String(a.title || "").localeCompare(String(b.title || ""), "nl");
        });
    }

    root.DdaApi = {
        signIn: signIn,
        signUp: signUp,
        register: register,
        sendPasswordReset: sendPasswordReset,
        deleteAccount: deleteAccount,
        reauthenticate: reauthenticate,
        deleteAccountPermanently: deleteAccountPermanently,
        signOut: signOut,
        restore: restore,
        listTickets: listTickets,
        listMessages: listMessages,
        ownUser: ownUser,
        ownProfile: ownProfile,
        saveProfile: saveProfile,
        loadAvatar: loadAvatar,
        saveAvatar: saveAvatar,
        removeAvatar: removeAvatar,
        isSupportAccount: isSupportAccount,
        createTicket: createTicket,
        sendText: sendText,
        sendFile: sendFile,
        uploadChatFile: uploadChatFile,
        setStatus: setStatus,
        deleteTicket: deleteTicket,
        supportOnline: supportOnline,
        heartbeat: heartbeat,
        listOwnNotes: listOwnNotes,
        listSharedNotes: listSharedNotes,
        getNote: getNote,
        createNote: createNote,
        saveNote: saveNote,
        deleteNote: deleteNote,
        shareNote: shareNote,
        unshareNote: unshareNote,
        listCatalog: listCatalog,
        session: function () { return session; }
    };
})(window);
