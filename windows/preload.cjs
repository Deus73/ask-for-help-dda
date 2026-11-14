const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('ddaDesktop', {
  platform: process.platform === 'linux' ? 'linux' : 'windows',
  brand: 'ASK FOR HELP',
  version: '0.1.0',
  postMessage: (payload) => {
    if (payload && ['openExternal', 'share', 'copy', 'setBadge', 'setTheme', 'haptic'].includes(payload.action)) {
      ipcRenderer.send('dda-action', payload);
    }
  }
});
