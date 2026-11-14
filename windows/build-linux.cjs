const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const { build, Platform, Arch } = require('electron-builder');

async function buildLinux() {
  const { downloadArtifact } = await import('@electron/get');
  const version = require('./package.json').devDependencies.electron;
  const runtime = await downloadArtifact({ version, artifactName: 'electron', platform: 'linux', arch: 'x64' });
  const root = path.resolve(__dirname, '../build/linux');
  fs.mkdirSync(root, { recursive: true });
  const staging = fs.mkdtempSync(path.join(root, 'build-'));
  const app = path.join(staging, 'app');
  fs.mkdirSync(app);
  for (const file of ['main.cjs', 'preload.cjs', 'policy.cjs', 'portable.cjs']) fs.copyFileSync(path.join(__dirname, file), path.join(app, file));
  fs.writeFileSync(path.join(app, 'package.json'), JSON.stringify({
    name: 'ask-for-help', version: '0.1.0', main: 'main.cjs',
    description: 'Klant-app voor chat en hulp van Digital Dope Advisors',
    author: 'Digital Dope Advisors', homepage: 'https://github.com/Deus73/digital-dope-support-downloads'
  }, null, 2));
  fs.cpSync(path.resolve(__dirname, '../ios/www'), path.join(app, 'www'), { recursive: true });
  const output = path.join(staging, 'output');
  await build({
    projectDir: __dirname, targets: Platform.LINUX.createTarget('deb', Arch.x64),
    config: {
      appId: 'com.digitaldope.askforhelp', productName: 'ASK FOR HELP',
      electronVersion: version, electronDist: runtime,
      directories: { app, output }, files: ['**/*'], asar: true, npmRebuild: false,
      linux: { executableName: 'ask-for-help', category: 'Network', icon: path.resolve(__dirname, '../ios/www/icon.png') },
      deb: { artifactName: 'ASK-FOR-HELP-0.1.0-amd64.deb', packageName: 'ask-for-help', maintainer: 'Digital Dope Advisors' }
    }
  });
  const artifact = path.join(root, 'ASK-FOR-HELP-0.1.0-amd64.deb');
  fs.copyFileSync(path.join(output, path.basename(artifact)), artifact);
  const sha = crypto.createHash('sha256').update(fs.readFileSync(artifact)).digest('hex');
  fs.writeFileSync(path.join(root, 'SHA256SUMS-LINUX.txt'), `${sha}  ${path.basename(artifact)}\n`);
  console.log(`Gebouwd: ${artifact}\nSHA-256: ${sha}`);
}
buildLinux().catch((error) => { console.error(error); process.exitCode = 1; });
