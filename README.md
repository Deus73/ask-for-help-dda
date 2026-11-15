# ASK FOR HELP (DDA)

Downloadpagina en bronbestanden voor ASK FOR HELP / DDA SUPPORT.

- **Downloadpagina:** open `index.html` lokaal of via GitHub Pages na publicatie.
- **Actuele downloadbestanden:** [Deus73/digital-dope-support-downloads releases](https://github.com/Deus73/digital-dope-support-downloads/releases)
- **Versieoverzicht (machineleesbaar):** [`versions.json`](versions.json)

## Actuele versies

| Platform | App | Versie | Status |
| --- | --- | --- | --- |
| Android | ASK FOR HELP (klant) | 0.21.0 (build 26) | Gepubliceerd 15 november 2026 |
| Android | DDA SUPPORT (medewerker) | 0.15.0 (build 18) | Gepubliceerd 15 november 2026 |
| Windows | ASK FOR HELP (portable EXE) | 0.1.2 | Gepubliceerd 15 november 2026, proefversie |
| Linux | ASK FOR HELP (DEB, amd64) | 0.1.2 | Gepubliceerd 15 november 2026, proefversie |
| Samsung TV (Tizen) | ASK FOR HELP TV (WGT) | 0.1.2 | Gepubliceerd 15 november 2026, niet ondertekend |
| Apple | Webapp / profiel | — | Geen openbare IPA/TestFlight; toegang via persoonlijk certificaat |

Nieuw (ASK FOR HELP 0.21.0): verbeterde Shizuku-sectie met pakket/versie/installatiebron en controle-instructies (alleen officiële RikkaApps-bronnen, geen automatische installatie/update/beta/de-installatie). DDA SUPPORT 0.15.0 ongewijzigd. Eerdere verbeteringen: delen van app-bestanden direct naar “App of profiel toevoegen”, directe upload, snelle chatberichten, chat-achtergrond, Home-contactknop, kleinere builds.

## Inhoud van deze repository

- `index.html`: downloadpagina met huidige versies bovenaan, uitleg en schermafbeeldingen.
- `versions.json`: actuele versie- en downloadlinks.
- `docs/screenshots/`: echte schermafbeeldingen (emulator/desktop-testomgeving waar aangegeven).
- `ios/`, `backend-tests/`, `docs/`, `tools/`, `.github/workflows/`: bronbestanden en hulpmiddelen voor de webapp/onderhoud.

## Opmerkingen

- Windows-build is nog niet volledig getest op een fysieke Windows-pc en niet met een eigen codecertificaat ondertekend.
- Samsung TV (Tizen) WGT is niet ondertekend; installatie op een retail-TV vereist een passend Samsung-certificaat.
- Installeer alleen waar het platform dit ondersteunt; anders download of deel het bestand.
- Controleer checksums op de releasepagina’s bij downloads.
