/* Pure helpers voor de iOS-webapp. Geen DOM, zodat ze ook in Node te testen zijn. */
(function (root, factory) {
    var api = factory();
    if (typeof module === "object" && module.exports) module.exports = api;
    if (root) root.DdaCore = api;
})(typeof self !== "undefined" ? self : this, function () {
    "use strict";

    var STATUS = {
        open: "Open",
        waiting_support: "Wacht op support",
        waiting_customer: "Wacht op jouw antwoord",
        closed: "Gesloten"
    };

    function statusKey(key) {
        return STATUS[key] ? key : "open";
    }

    function statusLabel(key) {
        return STATUS[statusKey(key)];
    }

    function statusClass(key) {
        return "status-" + statusKey(key);
    }

    function escapeHtml(value) {
        return String(value == null ? "" : value).replace(/[&<>"']/g, function (c) {
            return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
        });
    }

    function pad(n) {
        return n < 10 ? "0" + n : String(n);
    }

    function isSameDay(a, b) {
        return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
    }

    function formatTime(ms, nowMs) {
        if (!ms) return "";
        var d = new Date(ms);
        if (isNaN(d.getTime())) return "";
        var now = new Date(nowMs || Date.now());
        var time = pad(d.getHours()) + ":" + pad(d.getMinutes());
        if (isSameDay(d, now)) return time;
        return pad(d.getDate()) + "-" + pad(d.getMonth() + 1) + " " + time;
    }

    function formatDate(ms) {
        if (!ms) return "";
        var d = new Date(ms);
        if (isNaN(d.getTime())) return "";
        return pad(d.getDate()) + "-" + pad(d.getMonth() + 1) + "-" + d.getFullYear();
    }

    function formatRelative(ms, nowMs) {
        if (!ms) return "";
        var now = nowMs || Date.now();
        var diff = Math.max(0, now - ms);
        if (diff < 60 * 1000) return "nu";
        if (diff < 60 * 60 * 1000) return Math.floor(diff / (60 * 1000)) + " min";
        if (diff < 24 * 60 * 60 * 1000) return Math.floor(diff / (60 * 60 * 1000)) + " uur";
        if (diff < 7 * 24 * 60 * 60 * 1000) return Math.floor(diff / (24 * 60 * 60 * 1000)) + " dagen";
        return formatDate(ms);
    }

    function formatBytes(bytes) {
        var value = Number(bytes);
        if (!isFinite(value) || value <= 0) return "Onbekend";
        var units = ["B", "KB", "MB", "GB"];
        var index = 0;
        while (value >= 1024 && index < units.length - 1) {
            value /= 1024;
            index++;
        }
        var rounded = index === 0 ? Math.round(value) : Math.round(value * 10) / 10;
        return String(rounded).replace(".", ",") + " " + units[index];
    }

    function fsValue(value) {
        if (!value || typeof value !== "object") return null;
        if ("nullValue" in value) return null;
        if ("stringValue" in value) return value.stringValue;
        if ("booleanValue" in value) return Boolean(value.booleanValue);
        if ("integerValue" in value) return Number(value.integerValue);
        if ("doubleValue" in value) return Number(value.doubleValue);
        if ("timestampValue" in value) return Date.parse(value.timestampValue);
        if ("referenceValue" in value) return value.referenceValue;
        if ("mapValue" in value) return docToObject(value.mapValue);
        if ("arrayValue" in value) {
            return (value.arrayValue.values || []).map(fsValue);
        }
        return null;
    }

    function docToObject(doc) {
        var fields = (doc && doc.fields) || {};
        var out = {};
        Object.keys(fields).forEach(function (key) {
            out[key] = fsValue(fields[key]);
        });
        if (doc && doc.name) out.id = String(doc.name).split("/").pop();
        return out;
    }

    function newDocId() {
        var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        var out = "";
        var cryptoObj = typeof crypto !== "undefined" ? crypto : null;
        if (cryptoObj && cryptoObj.getRandomValues) {
            var bytes = new Uint8Array(20);
            cryptoObj.getRandomValues(bytes);
            for (var i = 0; i < bytes.length; i++) out += chars[bytes[i] % chars.length];
            return out;
        }
        for (var j = 0; j < 20; j++) out += chars[Math.floor(Math.random() * chars.length)];
        return out;
    }

    function generateShareCode() {
        var chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
        var out = "";
        var cryptoObj = typeof crypto !== "undefined" ? crypto : null;
        if (cryptoObj && cryptoObj.getRandomValues) {
            var bytes = new Uint8Array(8);
            cryptoObj.getRandomValues(bytes);
            for (var i = 0; i < bytes.length; i++) out += chars[bytes[i] % chars.length];
            return out;
        }
        for (var j = 0; j < 8; j++) out += chars[Math.floor(Math.random() * chars.length)];
        return out;
    }

    function normalizeShareCode(value) {
        return String(value == null ? "" : value).trim().toUpperCase();
    }

    function preview(text) {
        return String(text == null ? "" : text).trim().slice(0, 120);
    }

    function isSupportOnline(timestamps, nowMs) {
        var now = nowMs || Date.now();
        var windowMs = 3 * 60 * 1000;
        var tolerance = 60 * 1000;
        for (var i = 0; i < timestamps.length; i++) {
            var value = timestamps[i];
            if (value != null && now - value >= -tolerance && now - value <= windowMs) return true;
        }
        return false;
    }

    function authMessage(code) {
        var key = String(code || "").toUpperCase();
        if (key.indexOf("EMAIL_NOT_FOUND") >= 0 || key.indexOf("INVALID_PASSWORD") >= 0 ||
            key.indexOf("INVALID_LOGIN_CREDENTIALS") >= 0 || key.indexOf("INVALID_EMAIL") >= 0) {
            return "E-mailadres of wachtwoord klopt niet.";
        }
        if (key.indexOf("EMAIL_EXISTS") >= 0) return "Er bestaat al een account met dit e-mailadres.";
        if (key.indexOf("WEAK_PASSWORD") >= 0) return "Kies een sterker wachtwoord van minimaal 8 tekens.";
        if (key.indexOf("TOO_MANY_ATTEMPTS") >= 0) return "Te veel inlogpogingen. Probeer het later opnieuw.";
        if (key.indexOf("USER_DISABLED") >= 0) return "Dit account is uitgeschakeld.";
        if (key.indexOf("NETWORK") >= 0) return "Geen verbinding. Controleer je internet.";
        return "Inloggen is niet gelukt. Controleer je gegevens en probeer opnieuw.";
    }

    function shouldStickToBottom(scrollTop, scrollHeight, clientHeight) {
        return scrollHeight - (scrollTop + clientHeight) < 100;
    }

    function sortTickets(tickets) {
        return tickets.slice().sort(function (a, b) {
            return (b.updatedAt || 0) - (a.updatedAt || 0);
        });
    }

    function sortNotes(notes) {
        return notes.slice().sort(function (a, b) {
            return (b.updatedAt || 0) - (a.updatedAt || 0);
        });
    }

    function openTicketId(tickets) {
        var open = tickets.filter(function (ticket) { return ticket.status !== "closed"; });
        open.sort(function (a, b) { return (b.updatedAt || 0) - (a.updatedAt || 0); });
        return open.length ? open[0].id : null;
    }

    function safeLink(link) {
        return /^https?:\/\//i.test(String(link || "")) ? String(link) : "";
    }

    function isImageMime(mime) {
        return /^image\//i.test(String(mime || ""));
    }

    function statusAfterMessage(fromSupport) {
        return fromSupport ? "waiting_customer" : "waiting_support";
    }

    function canSend(status) {
        return status !== "closed";
    }

    function isValidEmail(value) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value || "").trim());
    }

    function fileNameFromPath(path) {
        return String(path || "").split("/").pop() || "bestand";
    }

    return {
        STATUS: STATUS,
        statusKey: statusKey,
        statusLabel: statusLabel,
        statusClass: statusClass,
        escapeHtml: escapeHtml,
        formatTime: formatTime,
        formatDate: formatDate,
        formatRelative: formatRelative,
        formatBytes: formatBytes,
        fsValue: fsValue,
        docToObject: docToObject,
        newDocId: newDocId,
        generateShareCode: generateShareCode,
        normalizeShareCode: normalizeShareCode,
        preview: preview,
        isSupportOnline: isSupportOnline,
        authMessage: authMessage,
        shouldStickToBottom: shouldStickToBottom,
        sortTickets: sortTickets,
        sortNotes: sortNotes,
        openTicketId: openTicketId,
        safeLink: safeLink,
        isImageMime: isImageMime,
        statusAfterMessage: statusAfterMessage,
        canSend: canSend,
        isValidEmail: isValidEmail,
        fileNameFromPath: fileNameFromPath
    };
});
