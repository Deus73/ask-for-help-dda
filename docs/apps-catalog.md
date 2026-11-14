# Apps-catalogus

Beide Android-apps hebben onderaan **Apps**. De catalogus wordt live gedeeld via
Firestore `appCatalog`. Alleen supportmedewerkers mogen toevoegen, bewerken en
verwijderen. Ingelogde klanten mogen lezen.

## Eigen apps automatisch actueel houden

De vermeldingen `ask-help-dda` en `dda-support` worden beheerd door
`tools/sync-app-releases.cjs`. Het script kiest de hoogste stabiele versie per app
uit GitHub-releases van `Deus73/digital-dope-support-downloads`. Bij wijzigingen
controleert het APK-grootte, beschikbare SHA-256, pakketnaam en versiegegevens.
Daarna werkt het de twee catalogusvermeldingen en `appConfig/updates` atomair bij.
Overige apps en configuratievelden blijven behouden. Bèta's en drafts tellen niet mee.

Op deze computer draait `dda-apps-sync.timer` ieder uur als gebruikersservice.
De computer moet aanstaan en de gebruikersservice actief zijn. Gemiste controles
worden bij de volgende activatie ingehaald. De bestaande GitHub- en Firebase-CLI-
aanmeldingen moeten geldig blijven; er staan geen tokens in het script of de timer.
De eerste synchronisatie en een tweede, ongewijzigde controle zijn op 11 november
2026 geslaagd met ASK HELP DDA 0.11.0 en DDA SUPPORT 0.6.0.

Na een release direct uitvoeren vanuit de projectmap:

```sh
node tools/sync-app-releases.cjs
```

Status en fouten bekijken:

```sh
systemctl --user list-timers dda-apps-sync.timer
journalctl --user -u dda-apps-sync.service -n 30
```

Handmatige wijzigingen of verwijdering van deze twee vaste vermeldingen worden
bij de volgende synchronisatie hersteld vanuit de releases. Andere catalogusitems
blijven volledig handmatig beheerd. Er is voor het bijwerken van deze lijst geen
nieuwe APK-installatie nodig.

## Toevoegen vanuit support

1. Open **Apps → App of profiel toevoegen**.
2. Vul de naam en eventueel een beschrijving of installatie-instructies in.
3. Plak een HTTPS-downloadlink en kies APK of Apple .mobileconfig, of gebruik
   **Bestand kiezen**. De bestandskiezer accepteert `.apk` en `.mobileconfig`,
   maximaal 512 MB, met een bekende bestandsgrootte.
4. Bij een lokaal bestand: kies **Uploaden en downloadlink maken** en geef Google
   Drive toegang. Het bestand komt in de Drive van het gekozen Google-account en
   wordt beschikbaar voor iedereen met de link. Grote APK's worden gestreamd.
5. Kies **Publiceren in Apps**. De vermelding verschijnt in beide apps.

Een upload en het publiceren zijn aparte stappen. Bij een mislukte publicatie
blijft de downloadlink in het formulier staan om opnieuw te proberen. Als het
delen van een upload mislukt, probeert dezelfde geopende editor het delen opnieuw
met het al geüploade Drive-bestand.

## Downloaden en installeren

Vanaf klant 0.13.0 / support 0.8.0 is iedere app één focusbare rij. Klik of druk
op OK om het detailvenster te openen. Daarin staan **Installeren** of
**Bijwerken**, **Link delen**, **Openen in browser** en voor support **Bewerken**
en **Verwijderen uit Apps**. De rij zelf bevat geen geneste knoppen meer, zodat
D-pad en muis niet per ongeluk een andere actie kiezen.

De app haalt de APK binnen, controleert of Android het pakket kan lezen en of
bekende pakketnaam/versie overeenkomen. Daarna opent Android de installatievraag.
Een eerste installatie vraagt eventueel toestemming voor onbekende bronnen; bij
terugkeer wordt de reeds opgehaalde APK gebruikt. Tijdens de download toont het
venster de voortgang en een annuleerknop.

**Updates controleren** vernieuwt de catalogus vanaf de server en vergelijkt
versiecodes met de zichtbare geïnstalleerde apps. **Alles bijwerken** biedt deze
updates achter elkaar aan; Android vraagt per APK om bevestiging. Bij annuleren
stopt de reeks. De eigen app staat als laatste omdat Android die kan herstarten.
Apps zonder pakket-/versiegegevens worden als niet gecontroleerd vermeld. De
nieuwste versie per pakket is zichtbaar; er worden geen oude records verwijderd.

Lokale APK's leveren automatisch hun icoon, pakket, versie en grootte. Bij een
losse link kan support **Icoon, grootte en versie uit APK ophalen** kiezen.
Ontbrekende iconen krijgen een neutrale aanduiding, geen verzonnen app-logo.
Een onbekende grootte wordt als onbekend getoond.

- **APK downloaden** opent de link in de browser. Download het bestand en open het
  om de Android-installatie te starten. Android kan toestemming vragen om apps
  uit die bron te installeren. De gebruiker bevestigt de installatie zelf.
- **Profiellink openen** opent de downloadbron. `.mobileconfig` is voor Apple,
  niet voor Android. Gebruik **Link delen** om de link naar een iPhone, iPad of Mac
  te sturen. Open hem daar in de browser en bevestig de profielinstallatie via de
  systeeminstellingen. Welke instellingen worden aangeboden hangt af van het
  profiel en de Apple-versie.
- Google Drive kan een extra downloadbevestiging of een limiet tonen. Een directe
  HTTPS-downloadlink op een eigen server kan ook worden gebruikt.
- Verwijderen haalt alleen de catalogusvermelding weg. Het bronbestand en eerder
  gedeelde links blijven bestaan; beheer die bij de downloadbron.

## Vormgeving

De bestaande DDA-kleuren, typografie en thema's blijven de richting. ENERGY 1,
RHYTHM 1, MOTION 1: een rustige lijst voor het kiezen van een bestand. Iedere
vermelding is één DdaCard met icoon, naam, platform, grootte en status. De hele
kaart is focusbaar en opent het detailvenster; beheeracties staan in dat venster.
Focus krijgt een duidelijke rand, hover bij de muis een lichtere rand. Het
vierkante Apps-raster staat voor een appverzameling. De staffbalk toont alle zes
tabs; lange labels worden op smalle schermen afgekort met hun volledige
toegankelijkheidsnaam.
In de donkere Apps-weergave is het merkpaars lichter (#B79AFF) met donkere
knoptekst (#26104F), zodat ook kleine knopteksten voldoende contrast hebben.
Geselecteerde navigatielabels gebruiken de contrastrijke onPrimaryContainer-kleur.

## Controle, 12 november 2026

- Klant 0.13.0 (18) en support 0.8.0 (11) gebouwd en gepubliceerd.
- Core compileert; 29 core-tests geslaagd.
- Catalogus en `appConfig/updates` bijgewerkt naar de nieuwe releases; tweede
  synchronisatie meldt beide apps als actueel.
- Niet op een fysieke Android TV of met een echte afstandsbediening getest.
  Controleer focusvolgorde, openen/sluiten van het detailvenster en terugkeer
  naar dezelfde rij.

## Controle, 8 november 2026

- Core: 25 unit tests geslaagd, inclusief afwijzen van ongeldige URL's,
  niet-ondersteunde bestandstypen en te lange catalogusvelden.
- Productie-rules gecompileerd en gepubliceerd. Negen REST-controles geslaagd
  met tijdelijke accounts: staff maakt/wijzigt/verwijdert, klant leest,
  anoniem lezen geweigerd, klant schrijven/verwijderen geweigerd,
  onjuist bestandstype en extra velden geweigerd.
- Emulator-5560: Apps opent in beide apps; lege toestand; support publiceert een
  tijdelijke APK-link; klant ziet de vermelding zonder beheerknoppen.
- Link delen opent de Android-deelkiezer; APK downloaden start Chrome met de
  downloadlink (Chrome zat nog in eerste-gebruiksetup).
- Bewerken opent het formulier; wisselen naar mobileconfig en annuleren werken.
- Bestandskiezer opent; XML wordt geweigerd; een lokaal mobileconfig-testbestand
  wordt geaccepteerd; upload start Google-autorisatie; annuleren toont een fout
  en maakt het formulier weer bruikbaar.
- Verwijderen vraagt bevestiging; annuleren behoudt de vermelding; bevestigen
  verwijdert deze uit de gedeelde catalogus.
- Definitieve build op de emulator: alle zes stafftabs zichtbaar; lichte en donkere
  Apps-weergave gecontroleerd; toetsenbord-Tab krijgt focus; geen fatale fouten in
  de recente logcat-uitvoer. Nieuwe tekstkleuren gemeten op minimaal 4,55:1 contrast.

Nog niet end-to-end bevestigd: een volledige Drive-upload met een Google-account,
de uiteindelijke Android-installatie vanuit de browser en installatie van een
profiel op een fysiek Apple-apparaat. Er worden geen compatibiliteitsclaims voor
de aangeboden bestanden afgeleid uit alleen de bestandsextensie.
