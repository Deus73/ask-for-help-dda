# ASK HELP DDA TV (Tizen)

Tv-versie van de klantapp voor Samsung-tv's uit **2020** (Tizen 5.5 en 6.0).
De app gebruikt hetzelfde Firebase-account en dezelfde gesprekken als ASK HELP DDA
op Android. Bediening gaat met de pijltjes en OK-knop; de terugknop gaat één scherm
terug.

Release: <https://github.com/Deus73/digital-dope-support-downloads/releases/tag/tizen-v0.1.0>
(ongetekend widget + bronzip + checksums).

## Wat het doet

- inloggen met e-mail en wachtwoord;
- eigen gesprekken met status zien;
- een nieuw gesprek starten;
- tekstberichten sturen en antwoorden van support ontvangen (polling elke 3 seconden);
- online-status van support zien;
- gesprek sluiten of verwijderen, met bevestiging;
- uitloggen met bevestiging.

## Wat het niet doet

- geen foto's of bestanden uploaden: een tv heeft geen camera en de Tizen-browser
  heeft geen bruikbare bestandskiezer;
- geen schermdeling starten (dat blijft de rol van telefoon/tablet);
- geen Android-apps uit de catalogus installeren;
- geen pushmeldingen. De app moet open blijven voor nieuwe berichten.

## Opbouw

De app staat in `tizen/` en is een gewoon Tizen-webwidget:

| Bestand | Functie |
|---|---|
| `config.xml` | Tizen-widget, profiel `tv-samsung`, internetprivilege |
| `index.html` | schermen: laden, inloggen, gesprekken, chat |
| `css/app.css` | tv-layout, grote tekst, duidelijke focusring |
| `js/core.js` | pure helpers (testbaar in Node) |
| `js/firebase.js` | Firebase Auth + Firestore via REST |
| `js/app.js` | schermen, D-pad-navigatie, polling, bevestigingen |

Er is bewust **geen Firebase SDK** gebruikt. De REST-API werkt op de oudere
Chromium-browser van Tizen 5.5/6.0 en houdt het widget klein. Firestore-streams
zijn vervangen door polling; de app sorteert gesprekken zelf, zodat er geen
samengestelde Firestore-index nodig is.

## Bouwen

```sh
./tools/build-tizen.sh
```

Resultaat:

- `build/tizen/ASK-HELP-DDA-TV-0.1.0.wgt`
- `build/tizen/ASK-HELP-DDA-TV-0.1.0-source.zip`

Het `.wgt` is een zip met `config.xml` in de root. Zonder Tizen-profiel is het
bestand **niet ondertekend**.

## Ondertekenen en installeren

Een Samsung-tv accepteert alleen een ondertekend widget met een
Samsung-distributiecertificaat. Het bouwscript kan dat niet doen zonder jouw
Samsung-account.

1. Installeer **Tizen Studio** met *Samsung Certificate Extension* en
   *TV Extensions*.
2. Maak in Certificate Manager een **Samsung**-certificaat (auteur + distributeur)
   voor de tv.
3. Onderteken met het profiel:

   ```sh
   TIZEN_PROFILE=jouw-profiel ./tools/build-tizen.sh
   ```

   Of handmatig:

   ```sh
   tizen package -t wgt -s jouw-profiel -o build/tizen tizen/
   ```

4. Zet de tv in **Developer mode**: Apps → cijfertoetsen `12345` → Developer mode
   aan, IP-adres van de tv invullen, tv herstarten.
5. Verbind en installeer:

   ```sh
   sdb connect <tv-ip>:26101
   sdb install build/tizen/ASK-HELP-DDA-TV-0.1.0.wgt
   ```

Zonder Samsung-certificaat kun je het widget niet op een retail-tv installeren.
Een Tizen-testcertificaat werkt soms in de emulator, maar is geen garantie voor
een Samsung-toestel.

## Getest

- 10 Node-tests voor statuslabels, Firestore-conversie, document-id's,
  online-berekening, sortering, tijdweergave en scrollgedrag:
  `node --test tizen/test/core.test.cjs`.
- In een Chromium-browser tegen de echte Firebase-omgeving:
  inloggen, gesprek starten, bericht sturen, antwoord van support ontvangen,
  gesprek sluiten, gesprek verwijderen (inclusief alle berichten) en uitloggen.
- D-pad-navigatie: pijltjes tussen e-mail, wachtwoord en Inloggen; in het
  bevestigingsvenster van Annuleren naar de bevestigknop en terug.
- Foutieve login geeft "E-mailadres of wachtwoord klopt niet."

Niet getest: installatie op een fysieke Samsung-tv, Samsung-certificaat, en
gedrag van de Tizen-emulator. Dat moet op het toestel zelf gebeuren.

## Beveiliging

- De Firebase API-key in `js/firebase.js` is een publieke client-key; dat is
  normaal. De Firestore-regels bepalen wat een ingelogde klant mag.
- De tv-app leest alleen eigen gesprekken en berichten, maakt alleen eigen
  berichten en wijzigt alleen toegestane velden.
- Er staat geen service-account, wachtwoord of geheim in de app.
- De app blokkeert medewerkersaccounts: die horen DDA SUPPORT op Android te
  gebruiken.

## Problemen oplossen

| Probleem | Oorzaak/oplossing |
|---|---|
| "Gesprekken laden mislukt" | Controleer internet op de tv; log opnieuw in als de sessie verlopen is. |
| Support-status blijft "onbekend" | De tv kan `presence` niet lezen; controleer netwerk en Firestore-regels. |
| Geen nieuwe berichten | De app moet open staan; hij ververst elke 3 seconden tijdens een gesprek. |
| Widget installeert niet | Het `.wgt` is niet met een Samsung-certificaat ondertekend, of Developer mode staat uit. |
| Inloggen werkt niet | Gebruik hetzelfde account als de Android-app; medewerkersaccounts worden geweigerd. |
