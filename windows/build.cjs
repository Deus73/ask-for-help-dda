const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const { execFileSync } = require('node:child_process');

async function build() {
  const { downloadArtifact } = await import('@electron/get');
  const version = require('./package.json').devDependencies.electron;
  // @electron/get checks the archive against Electron's official checksum manifest.
  const archive = await downloadArtifact({ version, artifactName: 'electron', platform: 'win32', arch: 'x64' });
  const root = path.resolve(__dirname, '../build/windows');
  fs.mkdirSync(root, { recursive: true });
  const staging = fs.mkdtempSync(path.join(root, 'build-'));
  const directory = path.join(staging, 'ASK-FOR-HELP-0.1.0-win-x64');
  fs.mkdirSync(directory);
  execFileSync('unzip', ['-q', archive, '-d', directory], { stdio: 'inherit' });
  fs.renameSync(path.join(directory, 'electron.exe'), path.join(directory, 'ASK-FOR-HELP.exe'));
  const app = path.join(directory, 'resources/app');
  fs.mkdirSync(app, { recursive: true });
  for (const file of ['main.cjs', 'preload.cjs', 'policy.cjs', 'portable.cjs']) fs.copyFileSync(path.join(__dirname, file), path.join(app, file));
  fs.writeFileSync(path.join(app, 'package.json'), JSON.stringify({ name: 'ask-for-help', version: '0.1.0', main: 'main.cjs' }, null, 2));
  fs.cpSync(path.join(__dirname, '../ios/www'), path.join(app, 'www'), { recursive: true });
  fs.copyFileSync(path.join(__dirname, 'README.md'), path.join(directory, 'LEESMIJ.md'));
  fs.copyFileSync(path.join(__dirname, 'TESTING.md'), path.join(directory, 'CONTROLES.md'));
  const zip = path.join(root, 'ASK-FOR-HELP-0.1.0-win-x64.zip');
  const temporaryZip = path.join(staging, 'artifact.zip');
  execFileSync('zip', ['-qr', temporaryZip, path.basename(directory)], { cwd: staging, stdio: 'inherit' });
  fs.renameSync(temporaryZip, zip);
  const sha = crypto.createHash('sha256').update(fs.readFileSync(zip)).digest('hex');
  const { build: buildElectron, Platform, Arch } = require('electron-builder');
  const portableOutput = path.join(staging, 'portable');
  await buildElectron({
    projectDir: __dirname,
    targets: Platform.WINDOWS.createTarget('portable', Arch.x64),
    config: {
      appId: 'com.digitaldope.askforhelp', productName: 'ASK FOR HELP',
      electronVersion: version, electronDist: archive,
      directories: { app, output: portableOutput },
      files: ['**/*'], asar: true, npmRebuild: false,
      win: { executableName: 'ASK-FOR-HELP', signAndEditExecutable: false },
      portable: { artifactName: 'ASK-FOR-HELP-Portable-0.1.0.exe', requestExecutionLevel: 'user', unpackDirName: false }
    }
  });
  const portable = path.join(root, 'ASK-FOR-HELP-Portable-0.1.0.exe');
  fs.copyFileSync(path.join(portableOutput, path.basename(portable)), portable);
  const portableSha = crypto.createHash('sha256').update(fs.readFileSync(portable)).digest('hex');
  fs.writeFileSync(path.join(root, 'SHA256SUMS-WINDOWS.txt'), `${sha}  ${path.basename(zip)}\n${portableSha}  ${path.basename(portable)}\n`);
  console.log(`Gebouwd: ${zip}\nPortable: ${portable}\nPortable SHA-256: ${portableSha}`);
}
build().catch((error) => { console.error(error.message); process.exitCode = 1; });
