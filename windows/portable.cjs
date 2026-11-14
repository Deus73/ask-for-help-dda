const path = require('node:path');
const fs = require('node:fs');

function portablePaths(directory) {
  if (!directory || !path.isAbsolute(directory)) throw new Error('Portable directory must be an absolute path');
  const data = path.join(directory, 'ASK-FOR-HELP-data');
  return { userData: data, sessionData: data, crashDumps: path.join(data, 'crashes'), logs: path.join(data, 'logs') };
}

function configurePortable(app, directory) {
  if (!directory) return;
  const paths = portablePaths(directory);
  for (const folder of new Set(Object.values(paths))) fs.mkdirSync(folder, { recursive: true });
  fs.accessSync(paths.userData, fs.constants.W_OK);
  for (const name of ['userData', 'sessionData', 'crashDumps']) app.setPath(name, paths[name]);
  app.setAppLogsPath(paths.logs);
}

module.exports = { portablePaths, configurePortable };
