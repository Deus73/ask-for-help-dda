# Windows-proefversie: controles op Linux

De interface wordt tijdens het bouwen gecontroleerd. Geen Windows-runtimeclaim:
deze controles draaien in Electron 45.3.1 op Linux, met gesimuleerde Firebase-antwoorden.

## Uitgevoerde bedieningstest

`npm run test:ui`:

- Opstarten: ASK FOR HELP in titel en inlogscherm; Node `require` niet beschikbaar in de pagina.
- Leeg inlogformulier: zichtbare validatie.
- Wachtwoord vergeten: dialoog opent; Escape sluit; focus keert terug.
- Registratie: scherm opent, lege velden geven validatie, Terug werkt.
- NL/EN: inlogknop en profiel wisselen van taal.
- Testlogin: gesprekken worden geladen; geen sessietoken in localStorage.
- Chat: testbericht verzonden en zichtbaar; bijlagemenu opent/sluit.
- Gesprek sluiten: bevestiging, daarna invoer uitgeschakeld.
- Apps: platformwaarschuwing klopt voor Windows; Downloaden opent externe-linkbevestiging.
- Delen: testlink verschijnt op het systeemklembord.
- Notities: lege lijst, nieuwe notitie met tekst opslaan en terugvinden.
- Profiel: naam opslaan, deelcode kopiëren, privacydialoog openen/sluiten.
- Thema's: daadwerkelijke licht/donker-knoppen; geen horizontale overflow bij 480 en 1100 pixels.
- Uitloggen: tweede bevestiging verschijnt; annuleren houdt de sessie open.
- Herladen: terug naar inloggen, geen opgeslagen aanmeldtoken.
- Geen ongehanteerde JavaScript-fouten tijdens deze route.

Screenshots staan lokaal in `build/windows-tests/`. De test start geen echte
accountregistratie, verstuurt geen echte berichten en opent geen externe browser.
De browserbevestiging wordt met een testantwoord geannuleerd.

`npm test`: URL-schema's en hoofdvensterafbakening voor IPC gecontroleerd.
Vier unit-tests slagen, inclusief Windows-platformtekst en afwezigheid van
tokenopslag. De tien gekozen desktoptekst-/focus-/randcombinaties zijn met de
WCAG-luminantieformule gemeten: 4,51:1 tot 8,31:1, inclusief beide thema's.
`node --test ios/test/*.test.cjs`: bestaande 16 webapp-tests geslaagd.

## Controlepoort voor deze proefversie

- PASS, functiecontrole: de hierboven genoemde knoppen en formulieren daadwerkelijk bediend.
- PASS, platformisolatie: vier unit-tests; de iOS-naam en iOS-profielactie blijven ongewijzigd.
- PASS, leesbaarheid: gemeten combinaties en zichtbare toetsenbordfocus in beide thema's.
- PASS, indeling: screenshots en overflowcontrole op 480 en 1100 pixels.
- PASS, ontwerpkeuzes: bestaande DDA-identiteit en onderstaande redenen vastgelegd.
- PASS, eerlijkheid: testgegevens als test beschreven; geen claim van Windows- of productievalidatie.

Deze poort geldt voor de beschreven Linux-proefroute, niet voor algemene
releasegoedkeuring. De resterende controles onderaan zijn nog vereist.

## Vormgevingskeuzes

- Bestaand DDA-icoon en palet hergebruikt; geen nieuwe merkafbeeldingen bedacht.
- ENERGY 1 / RHYTHM 1 / MOTION 1: voorspelbare navigatie voor een supporttaak.
- Segoe UI: Windows-systeemlettertype voor leesbare, vertrouwde venstertekst.
- Begrensde tekstbreedtes: chat en formulieren blijven leesbaar in brede vensters.
- Focusrand en inert achtergrondvenster: toetsenbord blijft in de geopende dialoog.
- Donkere primaire knop heeft donkere tekst op lichtpaars; lichte knop wit op donkerpaars.
- Rood met wit alleen op een donkere rode knop, niet wit op lichtrood.

## Nog niet gevalideerd

Geen fysieke Windows-test, SmartScreen-test, echte bestandsdialoog of volledige
Firebase-end-to-endtest. Uploads blijven geblokkeerd door ontbrekende Firebase
Storage/billingconfiguratie. Dit is een proefversie, geen volledig goedgekeurde release.
