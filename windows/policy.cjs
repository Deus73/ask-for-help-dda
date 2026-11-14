const { pathToFileURL } = require('node:url');

function externalUrl(raw) {
  if (typeof raw !== 'string' || raw.length > 4096) return null;
  try {
    const url = new URL(raw);
    if (!['https:', 'mailto:', 'tel:'].includes(url.protocol)) return null;
    if (url.username || url.password) return null;
    return url.href;
  } catch { return null; }
}

function trustedFrame(event, entry) {
  return !!event.senderFrame && event.senderFrame === event.sender.mainFrame &&
    event.senderFrame.url === pathToFileURL(entry).href;
}

module.exports = { externalUrl, trustedFrame };
