# ASK FOR HELP voor Windows 0.1.0

Klant-app voor dezelfde Firebase-omgeving als ASK HELP DDA op Android en iOS.
Dit is niet de medewerkers-app DDA SUPPORT en niet de Shizuku-manager.

## Openen

Windows 10/11, 64-bit (x64). Open **`ASK-FOR-HELP-Portable-0.1.0.exe`**.
Dit is één draagbaar bestand: geen installatie, geen administratorrechten en
geen apart te installeren browser. Je kunt het ook vanaf een USB-stick openen.

De launcher pakt de app automatisch uit in een tijdelijke Windows-map. Naast
het EXE-bestand wordt `ASK-FOR-HELP-data` gemaakt voor cache en appgegevens.
Gebruik daarom een beschrijfbare map of USB-stick. Bij een niet-beschrijfbare
map verschijnt een foutmelding; de app valt niet stil terug op AppData.
Aanmeldtokens blijven alleen in het geheugen. De launcher blijft actief zolang
de app open is en ruimt de tijdelijke uitpakmap na normaal afsluiten op.

De ZIP-versie blijft beschikbaar als alternatief: pak dan **de hele ZIP** uit,
open `ASK-FOR-HELP.exe` en laat alle bestanden naast het programma staan.

Dit pakket is niet met een Windows-codecertificaat ondertekend. Windows kan een
SmartScreen-waarschuwing tonen. Controleer de bron en SHA-256 voordat je het opent.

## Functies

- Inloggen met je klantaccount, wachtwoordherstel en registratie met uitnodiging.
- Chat, gesprekken sluiten/verwijderen en links delen.
- Eigen/gedeelde notities, profiel, deelcode en accountverwijdering.
- Apps-catalogus: links downloaden via je browser of kopiëren om te delen.
- Nederlands/Engels en licht/donker/systeemthema.
- Toetsenbordbediening, focusbegrenzing in dialogen en vensterzoom via het menu.

APK-bestanden werken op Android, Apple-profielen op Apple-apparaten. Ze worden
niet door de Windows-app geïnstalleerd. Externe links vragen eerst bevestiging.
Termux, Android-schermdeling en autostart zijn niet in deze Windows-versie gebouwd.

De sessie blijft alleen in het geheugen zolang het venster open is. Wachtwoorden
en aanmeldtokens worden niet opgeslagen. Na afsluiten moet je opnieuw inloggen.
Taal/thema zijn in deze eerste versie ook alleen voor de huidige sessie bewaard.
De app blijft niet in de achtergrond draaien na het sluiten van het venster.

**Chatbijlagen:** Firebase Storage moet nog worden ingesteld op het project
`digital-dope-advisors-support` (Blaze/billing vereist). Tekstchat gebruikt
Firestore. Uploads werken pas na Storage-configuratie, regels en CORS-controle.

## Ontwikkelen en bouwen op Linux

Node 24+, `unzip` en `zip` vereist:

```sh
npm ci
node node_modules/electron/install.js
npm test
npm start
npm run build
```

De Windows-build haalt de vastgezette Electron-runtime uit de officiële release,
controleert de runtime-checksum via `@electron/get` en voegt de klant-webapp uit
`../ios/www` ongewijzigd toe. Resultaat: `../build/windows/`.
Er wordt geen nieuwe runtimecode vanuit internet geladen tijdens het gebruik.
`electron-builder` maakt daarnaast een NSIS-portablelauncher (geen installer).
Beide uitvoerbestanden staan met SHA-256 in `../build/windows/`.

## Nog te controleren op Windows

Het pakket wordt op Linux samengesteld. Een Windows-installatie is nodig voor
SmartScreen, bestandsdialogen, browser openen, vensterbediening en een volledige
chat-/accounttest tegen Firebase. Een Linux/Electron-test is geen Windows-test.
