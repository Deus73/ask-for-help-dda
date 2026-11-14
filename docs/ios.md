# ASK HELP DDA voor iOS

De iOS-app is de klant-app **ASK HELP DDA** voor iPhone en iPad. Het is geen
nieuwe SwiftUI-app: de bestaande webapp draait in een WKWebView-shell. Zo blijven
de schermen, teksten en Firebase-logica gelijk aan de webversie en is er geen
tweede implementatie van chat en notities nodig.

- Bundel-id: `com.digitaldope.askhelpdda`
- Versie: `0.1.0` (build 1)
- Minimum: iOS 15
- Project: `ios/project.yml` (XcodeGen)
- Webapp: `ios/www/`
- Swift-shell: `ios/App/`

De medewerker-app **DDA SUPPORT** is niet voor iOS gemaakt. Een medewerker
blijft de Android-app gebruiken.

## Wat werkt

| Onderdeel | iOS |
|---|---|
| Inloggen, registreren met uitnodigingscode, wachtwoord vergeten | Ja |
| Home met gesprekken, status en support online | Ja |
| Chatten, gesprek sluiten en verwijderen | Ja |
| Foto, video, bestand en link als bijlage | Ja, via Firebase Storage |
| Notities maken, zoeken, delen en intrekken | Ja |
| Apps-tab: Apple-profiel openen/delen | Ja |
| Apps-tab: APK downloaden | Alleen link delen; APK's installeren niet op iOS |
| Profiel, foto, deelcode, thema en taal | Ja |
| Badge, delen, kopiëren, externe links, haptiek | Ja, via de native brug |
| Account verwijderen | Ja, met wachtwoordbevestiging |
| Termux, APK-installatie, schermdeling, achtergrondservice | Nee, Android-only |

De webapp heeft Nederlands als standaard en een blijvende English-schakelaar.
Het thema staat standaard op systeem; donker en licht zijn ook te kiezen.

## Native brug

`ios/www/js/app.js` praat met `WebViewController.swift` via
`window.webkit.messageHandlers.dda.postMessage(...)`. De shell ondersteunt:

- `openExternal`: `http`, `https`, `mailto` en `tel` openen in de systeem-app.
- `share`: de iOS-deelkaart openen.
- `copy`: naar het klembord kopiëren.
- `haptic`: lichte tikfeedback.
- `setBadge`: de app-badge bijwerken; vraagt eenmalig om badge-toestemming.
- `setTheme`: statusbalk en toetsenbord op licht/donker zetten.
- `openSettings`: de iOS-instellingen van de app openen.

Interne links blijven in de WKWebView. `target="_blank"`-links en
`linkActivated`-navigatie naar een externe site gaan naar Safari.

## Bouwen en ondertekenen

Op Linux is er geen Swift-compiler of Xcode. De Swift-bestanden en het
XcodeGen-project zijn daarom niet op deze machine gecompileerd. Op een Mac:

```bash
brew install xcodegen
cd ios
xcodegen generate
open AskHelpDDA.xcodeproj
```

1. Selecteer het target **AskHelpDDA**.
2. Kies bij **Signing & Capabilities** je Apple-team.
3. Controleer de bundle-id of maak er een eigen id van.
4. Kies een iPhone of simulator en druk op Run.
5. Voor TestFlight: **Product → Archive → Distribute App**.

De app heeft geen `GoogleService-Info.plist` nodig. De Firebase-configuratie
staat in `ios/www/js/firebase.js` en gebruikt de publieke Web API-key. De
beveiliging loopt via Firebase Authentication, Firestore-regels en
Storage-regels.

## Firebase Storage

Chatbijlagen worden geüpload naar:

```text
chat/{ticketId}/{tijd}-{bestandsnaam}
```

De app bewaart in het bericht alleen de downloadlink. De Storage-regels staan in
`storage.rules`. Alleen de klant van het gesprek en supportmedewerkers mogen
lezen, uploaden en verwijderen. De limiet is 50 MB per bestand. SVG, HTML en
andere actieve bestandstypen zijn niet toegestaan.

Naast Firestore moet Storage in de Firebase-console zijn aangezet. Daarna:

```bash
firebase deploy --only firestore:rules,storage
```

**Status op 12 november 2026:** de Firestore-regels zijn gecompileerd en
gepubliceerd. Firebase Storage is op dit project nog niet ingesteld. De
Firebase Storage API geeft `defaultBucket: 404` en de Google Cloud API weigert
een bucket aan te maken omdat er geen actief billingaccount is. Zet het project
op **Blaze**, open **Storage → Get Started** en deploy daarna de Storage-regels.
Zonder die stap werkt tekstchat wel, maar bestandsupload niet.

### CORS voor WKWebView

De webapp wordt met `loadFileURL` uit de app-bundel geladen. De oorsprong van
verzoeken is daardoor `null`. Firebase Storage moet die oorsprong toestaan,
anders blokkeert de browser de upload (vaak zichtbaar als netwerkfout of HTTP
0). Gebruik `storage.cors.json`:

```bash
gsutil cors set storage.cors.json \
  gs://digital-dope-advisors-support.firebasestorage.app
```

Firestore en Identity Toolkit zijn al met `Origin: null` getest. Storage is dat
niet; zonder CORS-configuratie werkt tekstchat wel en bestandsupload niet.

## Account verwijderen

Apple vraagt bij accountcreatie om een manier om het account in de app te
verwijderen. In **Profiel → Account verwijderen** staat daarom een dubbele
bevestiging:

1. Bevestig dat je het account wilt verwijderen.
2. Vul je wachtwoord opnieuw in. Dat vervangt de sessie door een verse login,
   zodat Firebase de gevoelige `accounts:delete`-aanroep accepteert.

Daarna verwijdert de app eigen gesprekken en berichten (inclusief
Storage-bijlagen), eigen notities, de eigen deelname aan gedeelde notities,
Drive-verwijzingen, vertrouwde schermdeling-personen, profiel, avatar,
aanwezigheid, gebruikersdocument en deelcode. Tot slot wordt het
Firebase Auth-account verwijderd.

De regels in `firestore.rules` zijn hiervoor aangepast: de eigenaar mag het
eigen `users`- en `presence`-document verwijderen, de eigen deelcode
verwijderen, en zichzelf uit `sharedWith` van een gedeelde notitie halen.
Support kan nog steeds alles beheren.

## Testen

De webapp heeft 16 Node-tests:

```bash
node --test ios/test/*.test.cjs
```

Op deze machine:

```bash
~/.nvm/versions/node/v24.15.0/bin/node --test ios/test/*.test.cjs
```

De tests controleren de pure helpers, alle statische element-id's, de
scriptvolgorde, de Nederlandse i18n-sleutels, het ontbreken van de Firebase-SDK
en ontwikkelresten.

Wat nog op een Mac of echt toestel moet gebeuren:

- Xcode-build en Swift-compilatie.
- Inloggen en chatten tegen Firebase vanuit WKWebView.
- Bestand uploaden met Storage CORS en een echte Firebase Storage-bucket.
- Foto/camera-kiezer, deelkaart, klembord, badge en statusbalk.
- Toetsenbordgedrag op een notch-toestel en op iPad.
- Account verwijderen end-to-end.
- TestFlight en App Store-beoordeling.

## Bekende beperkingen

- **Geen APK-installatie.** iOS kan geen Android-APK's installeren. De Apps-tab
  toont ze wel en kan de link delen.
- **Geen Termux of schermdeling.** Die functies zijn Android-only.
- **Geen achtergrondservice of push.** De badge wordt bijgewerkt zolang de app
  draait. Echte push vereist APNs en een server.
- **Geen App Store-updates in de app.** Updates lopen via de App Store.
- **Webshell, geen native SwiftUI.** Geen native tabbar, geen native
  pull-to-refresh en geen native chatlijst.
- **Bestandsupload is afhankelijk van Storage CORS.** Zie hierboven.
- **Google Drive-bestanden worden niet uit Drive verwijderd.** De iOS-app
  gebruikt Drive niet; alleen Firestore-verwijzingen worden opgeruimd.
- **Sessie in localStorage.** De WKWebView-sandbox bewaart de Firebase-tokens;
  er is geen Keychain-integratie.
- **Privacy.** Chat en notities zijn versleuteld door Google, maar niet
  end-to-end. Firebase kan de inhoud lezen.

## Bestanden

| Pad | Doel |
|---|---|
| `ios/www/index.html` | Schermopbouw |
| `ios/www/css/app.css` | iOS-styling, veilige randen, thema's |
| `ios/www/js/core.js` | Pure helpers, ook in Node getest |
| `ios/www/js/firebase.js` | Auth, Firestore en Storage via REST |
| `ios/www/js/app.js` | UI, navigatie, chat, notities, profiel |
| `ios/App/WebViewController.swift` | WKWebView, brug, toetsenbord, links |
| `ios/App/Info.plist` | App-configuratie en toestemmingsteksten |
| `ios/App/Assets.xcassets` | App-iconen en kleuren |
| `ios/project.yml` | XcodeGen-project |
| `ios/test/` | Node-tests |
| `storage.rules` | Storage-autorisatie |
| `storage.cors.json` | CORS voor uploads vanuit WKWebView |
