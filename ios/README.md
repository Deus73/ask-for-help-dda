# ASK HELP DDA voor iOS

Dit is de klant-app **ASK HELP DDA** voor iPhone en iPad. De app is een dunne
WKWebView-shell rond de bestaande webapp in `www/`. De webapp gebruikt Firebase
Auth, Firestore en Storage via REST, zonder Firebase-SDK. Daardoor blijft de app
klein en werkt dezelfde code ook in een gewone browser.

De app is bedoeld voor klanten. De medewerker-app **DDA SUPPORT** blijft Android.

## Bouwen

Nodig: macOS met Xcode 15 of nieuwer en [XcodeGen](https://github.com/yonaskolb/XcodeGen).

```bash
brew install xcodegen
cd ios
xcodegen generate
open AskHelpDDA.xcodeproj
```

Kies in Xcode je team bij **Signing & Capabilities**, controleer de bundle-id
(`com.digitaldope.askhelpdda`) en bouw op een iPhone of simulator.

Voor TestFlight/App Store: **Product → Archive**, daarna **Distribute App**.
De app heeft geen push entitlement en geen GoogleService-Info.plist nodig.

## Firebase

Het project is `digital-dope-advisors-support`. De webapp gebruikt de publieke
Firebase Web API-key; de beveiliging zit in de regels.

Naast Firestore moet **Storage** aanstaan voor bijlagen in de chat. De regels
staan in `../storage.rules` en de configuratie in `../firebase.json`.

```bash
cd ..
firebase deploy --only firestore:rules,storage
```

Op 12 november 2026 zijn de Firestore-regels gepubliceerd, maar is Firebase
Storage nog niet ingesteld. Het project heeft geen actief billingaccount; de
Storage-API weigert daarom een default bucket. Zet het project op **Blaze** en
open **Storage → Get Started** voordat je uploads test. Zonder Storage werkt
tekstchat wel en bestandsupload niet.

Voor uploads vanuit de WKWebView (oorsprong `null`) moet Storage CORS die
oorsprong toestaan:

```bash
gsutil cors set storage.cors.json gs://digital-dope-advisors-support.firebasestorage.app
```

Zonder CORS-configuratie kunnen tekst en notities wel werken, maar bestanden
uploaden niet. Zie [docs/ios.md](../docs/ios.md) voor de volledige uitleg.

## Testen

De webapp en de pure helpers zijn met Node te testen:

```bash
node --test ios/test/*.test.cjs
```

Op deze Linux-machine staat Node niet op `PATH`; gebruik
`~/.nvm/versions/node/v24.15.0/bin/node`.

De Swift-shell is hier niet gebouwd. Een Mac met Xcode is nodig voor compileren,
ondertekenen en TestFlight. Zie [docs/ios.md](../docs/ios.md) voor de
pariteitsmatrix en bekende beperkingen.
