import argparse
import hashlib
import json
import os
from pathlib import Path
import re
import subprocess
import tempfile

ROOT = Path(__file__).resolve().parent.parent
REPO = 'Deus73/ask-for-help-dda'
SOURCE = 'Deus73/digital-dope-support-downloads'

def gh(*args, capture=True):
    return subprocess.check_output(['gh', *args], text=True) if capture else subprocess.check_call(['gh', *args])

def render(versions):
    text = (ROOT / 'README.template.md').read_text()
    for key, entry in versions.items():
        text = text.replace('{{' + key + '}}', entry['version'])
    if re.search(r'\{\{\w+\}\}', text):
        raise RuntimeError('Onopgeloste versie in README')
    (ROOT / 'README.md').write_text(text)

def sha(file):
    h = hashlib.sha256()
    with file.open('rb') as stream:
        for block in iter(lambda: stream.read(1024 * 1024), b''):
            h.update(block)
    return h.hexdigest()

def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--render-only', action='store_true')
    parser.add_argument('--desktop-dir', type=Path)
    args = parser.parse_args()
    versions = json.loads((ROOT / 'versions.json').read_text())
    if args.render_only:
        render(versions)
        return
    try:
        gh('release', 'view', 'downloads', '--repo', REPO)
    except subprocess.CalledProcessError:
        gh('release', 'create', 'downloads', '--repo', REPO, '--title', 'ASK FOR HELP (DDA) · actuele downloads', '--notes', 'Downloads per OS. Zie README voor installatie en beperkingen.', '--latest', capture=False)
    upstream = json.loads(gh('api', f'repos/{SOURCE}/releases?per_page=100'))
    existing = json.loads(gh('release', 'view', 'downloads', '--repo', REPO, '--json', 'assets'))['assets']
    digests = {item['name']: item.get('digest', '') for item in existing}
    with tempfile.TemporaryDirectory(prefix='ask-downloads-') as temp:
        directory = Path(temp)
        uploads = []
        for key, prefix, asset_prefix, extension in [('android', 'v', 'ASK-HELP-DDA-', '.apk'), ('tizen', 'tizen-v', 'ASK-HELP-DDA-TV-', '.wgt')]:
            releases = []
            for release in upstream:
                tag = release['tag_name']
                if release['draft'] or release['prerelease'] or not re.fullmatch(re.escape(prefix) + r'\d+\.\d+\.\d+', tag):
                    continue
                assets = [a for a in release['assets'] if a['name'].startswith(asset_prefix) and a['name'].endswith(extension)]
                if len(assets) == 1:
                    releases.append((tuple(map(int, tag[len(prefix):].split('.'))), release, assets[0]))
            if not releases:
                raise RuntimeError(f'Geen stabiele release voor {key}')
            _, release, asset = max(releases, key=lambda item: item[0])
            gh('release', 'download', release['tag_name'], '--repo', SOURCE, '--pattern', asset['name'], '--dir', str(directory), capture=False)
            original = directory / asset['name']
            digest = sha(original)
            if asset.get('digest') and asset['digest'] != 'sha256:' + digest:
                raise RuntimeError(f'SHA-256 verschilt voor {key}')
            alias = directory / versions[key]['asset']
            original.rename(alias)
            if digests.get(alias.name) != 'sha256:' + digest:
                uploads.append(alias)
            versions[key].update(version=release['tag_name'][len(prefix):], sourceTag=release['tag_name'], sha256=digest)
        if args.desktop_dir:
            version = json.loads((ROOT / 'windows/package.json').read_text())['version']
            for key, filename in [('windows', f'ASK-FOR-HELP-Portable-{version}.exe'), ('linux', f'ASK-FOR-HELP-{version}-amd64.deb')]:
                source = args.desktop_dir / filename
                if not source.is_file():
                    raise RuntimeError(f'Ontbrekend desktopbestand: {source}')
                import shutil
                target = directory / versions[key]['asset']
                shutil.copy2(source, target)
                digest = sha(target)
                if digests.get(target.name) != 'sha256:' + digest:
                    uploads.append(target)
                versions[key].update(version=version, sha256=digest)
        for file in uploads:
            gh('release', 'upload', 'downloads', str(file), '--repo', REPO, '--clobber', capture=False)
        for entry in versions.values():
            if not entry.get('sha256'):
                raise RuntimeError('Nog niet alle OS-downloads gepubliceerd; voer de eerste keer --desktop-dir uit')
        manifest = directory / 'SHA256SUMS.txt'
        manifest.write_text(''.join(f"{entry['sha256']}  {entry['asset']}\n" for entry in versions.values()))
        gh('release', 'upload', 'downloads', str(manifest), '--repo', REPO, '--clobber', capture=False)
        gh('release', 'edit', 'downloads', '--repo', REPO, '--latest', capture=False)
    (ROOT / 'versions.json').write_text(json.dumps(versions, indent=2) + '\n')
    render(versions)

if __name__ == '__main__':
    main()
