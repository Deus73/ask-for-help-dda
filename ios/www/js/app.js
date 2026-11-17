/* Schermen en bediening voor de ASK HELP DDA iOS-app. */
(function () {
    "use strict";

    var core = window.DdaCore;
    var api = window.DdaApi;
    var platform = window.DdaPlatform;

    var EN = {
        "Bezig met laden…": "Loading…",
        "Log in met je ASK HELP DDA-account.": "Sign in with your ASK HELP DDA account.",
        "E-mailadres": "Email address",
        "Wachtwoord": "Password",
        "Inloggen": "Sign in",
        "Wachtwoord vergeten?": "Forgot password?",
        "Account aanmaken met uitnodigingscode": "Create account with invite code",
        "Terug": "Back",
        "Account aanmaken": "Create account",
        "Je hebt een uitnodigingscode nodig. Elke code kan maar één keer gebruikt worden.": "You need an invite code. Each code can be used only once.",
        "Uitnodigingscode": "Invite code",
        "Wachtwoord: minimaal 8 tekens.": "Password: at least 8 characters.",
        "Home": "Home",
        "Apps": "Apps",
        "Notities": "Notes",
        "Profiel": "Profile",
        "Gesprek met support": "Conversation with support",
        "Open": "Open",
        "Meer": "More",
        "Typ een bericht…": "Type a message…",
        "Versturen": "Send",
        "Bijlage": "Attachment",
        "Notitie": "Note",
        "Opslaan": "Save",
        "Gedeeld met jou. Je kunt deze notitie lezen, maar niet wijzigen.": "Shared with you. You can read this note but not change it.",
        "Titel": "Title",
        "Tekst": "Text",
        "Koppelen aan gesprek": "Link to conversation",
        "Delen": "Share",
        "Deelcode van de ontvanger": "Recipient's share code",
        "Notitie verwijderen": "Delete note",
        "Gegevens aanpassen": "Edit details",
        "Voornaam": "First name",
        "Achternaam": "Last name",
        "Geboortedatum": "Date of birth",
        "Adres": "Address",
        "WhatsApp": "WhatsApp",
        "Contact e-mail": "Contact email",
        "Annuleren": "Cancel",
        "Doorgaan": "Continue",
        "Sluiten": "Close",
        "Verwijderen": "Delete",
        "Opnieuw proberen": "Try again",
        "Laden…": "Loading…",
        "Laden mislukt": "Could not load",
        "Laden mislukt. Controleer je verbinding.": "Could not load. Check your connection.",
        "Gesprekken": "Conversations",
        "Gesprekken laden…": "Loading conversations…",
        "Nieuw gesprek": "New conversation",
        "Nieuw": "New",
        "Support is online": "Support is online",
        "Support is nu offline": "Support is offline",
        "Support-status onbekend": "Support status unknown",
        "Je kunt nu een bericht sturen.": "You can send a message now.",
        "Je kunt een bericht achterlaten; we reageren zo snel mogelijk.": "You can leave a message; we will reply as soon as possible.",
        "Controleer je verbinding en probeer opnieuw.": "Check your connection and try again.",
        "Nog geen gesprekken": "No conversations yet",
        "Start een gesprek met support.": "Start a conversation with support.",
        "1 gesprek": "1 conversation",
        "gesprekken": "conversations",
        "Wacht op support": "Waiting for support",
        "Wacht op jouw antwoord": "Waiting for your reply",
        "Gesloten": "Closed",
        "Jij": "You",
        "Support": "Support",
        "Nog geen berichten": "No messages yet",
        "Stuur een bericht om te beginnen.": "Send a message to get started.",
        "Gesprek gesloten": "Conversation closed",
        "Je kunt dit gesprek niet meer beantwoorden. Start een nieuw gesprek als je hulp nodig hebt.": "You cannot reply to this conversation anymore. Start a new conversation if you need help.",
        "Dit gesprek is gesloten.": "This conversation is closed.",
        "Tik om te openen": "Tap to open",
        "Link niet beschikbaar": "Link unavailable",
        "Bestand": "File",
        "Bestand verstuurd.": "File sent.",
        "Bestand uploaden…": "Uploading file…",
        "Bestand uploaden mislukt.": "File upload failed.",
        "Bestand is te groot. Maximaal 50 MB.": "File is too large. Maximum 50 MB.",
        "Foto of video kiezen": "Choose photo or video",
        "Bestand kiezen": "Choose file",
        "Link plakken": "Paste link",
        "Plak een https-link naar een bestand of afbeelding.": "Paste an https link to a file or image.",
        "URL": "URL",
        "Toevoegen": "Add",
        "Gebruik een geldige https-link.": "Use a valid https link.",
        "Gesprek": "Conversation",
        "Gesprek sluiten": "Close conversation",
        "Gesprek verwijderen": "Delete conversation",
        "Gesprek sluiten?": "Close conversation?",
        "Gesprek verwijderen?": "Delete conversation?",
        "Je kunt later een nieuw gesprek starten. De berichten blijven bewaard.": "You can start a new conversation later. The messages are kept.",
        "Het gesprek en alle berichten verdwijnen voor jou én voor support. Dit kan niet ongedaan worden.": "The conversation and all messages will disappear for you and for support. This cannot be undone.",
        "Gesprek gesloten.": "Conversation closed.",
        "Gesprek verwijderd.": "Conversation deleted.",
        "Gesprek gestart.": "Conversation started.",
        "Nieuw bericht van support.": "New message from support.",
        "Mijn notities": "My notes",
        "Gedeeld met mij": "Shared with me",
        "Zoeken in notities": "Search notes",
        "Nieuwe notitie": "New note",
        "Nog geen notities": "No notes yet",
        "Maak een notitie voor jezelf of deel er een met support.": "Create a note for yourself or share one with support.",
        "Niets gedeeld met jou": "Nothing shared with you",
        "Notities die iemand met je deelt, verschijnen hier.": "Notes someone shares with you appear here.",
        "Geen notities gevonden": "No notes found",
        "Probeer een andere zoekterm.": "Try another search term.",
        "Zonder titel": "Untitled",
        "Gedeeld": "Shared",
        "Nog niet gedeeld.": "Not shared yet.",
        "Geef de notitie een titel.": "Give the note a title.",
        "Notitie opgeslagen.": "Note saved.",
        "Notitie verwijderd.": "Note deleted.",
        "Notitie gedeeld.": "Note shared.",
        "Delen mislukt. Controleer de deelcode.": "Sharing failed. Check the share code.",
        "Deze deelcode bestaat niet.": "This share code does not exist.",
        "Je kunt een notitie niet met jezelf delen.": "You cannot share a note with yourself.",
        "Stop": "Stop",
        "Stop met delen?": "Stop sharing?",
        "Deze persoon kan de notitie daarna niet meer lezen.": "This person will no longer be able to read the note.",
        "Delen gestopt.": "Sharing stopped.",
        "Gebruiker": "User",
        "Geen": "None",
        "Apple-profiel": "Apple profile",
        "Android": "Android",
        "Alleen Android": "Android only",
        "Alleen voor Android": "Android only",
        "APK-bestanden kunnen alleen op Android worden geïnstalleerd. Deel de link met een Android-toestel of gebruik de app daar.": "APK files can only be installed on Android. Share the link with an Android device or use the app there.",
        "Profiel installeren": "Install profile",
        "Link delen": "Share link",
        "Openen": "Open",
        "Apps van Digital Dope Advisors": "Apps from Digital Dope Advisors",
        "Op iOS kun je Apple-profielen installeren. Android-apps zijn alleen voor Android.": "On iOS you can install Apple profiles. Android apps are for Android only.",
        "Geen apps": "No apps",
        "Support heeft nog geen apps toegevoegd.": "Support has not added any apps yet.",
        "Deelcode": "Share code",
        "Deel deze code met support of een andere klant.": "Share this code with support or another customer.",
        "Kopieer": "Copy",
        "Gekopieerd.": "Copied.",
        "Gegevens": "Details",
        "Naam": "Name",
        "Niet ingevuld": "Not filled in",
        "Weergave": "Appearance",
        "Donker": "Dark",
        "Licht": "Light",
        "Systeem": "System",
        "Taal": "Language",
        "Nederlands": "Dutch",
        "English": "English",
        "Privacy en veiligheid": "Privacy and safety",
        "Uitloggen": "Sign out",
        "Uitgelogd.": "Signed out.",
        "Nog één keer bevestigen: uitloggen?": "Confirm once more: sign out?",
        "Weet je zeker dat je wilt uitloggen?": "Are you sure you want to sign out?",
        "Je wordt uitgelogd op dit toestel.": "You will be signed out on this device.",
        "Account verwijderen": "Delete account",
        "Account verwijderen?": "Delete account?",
        "Je account, profiel, notities en gesprekken worden definitief verwijderd. Dit kan niet ongedaan worden.": "Your account, profile, notes and conversations will be permanently deleted. This cannot be undone.",
        "Bevestig je wachtwoord": "Confirm your password",
        "Vul je wachtwoord in om je account te verwijderen.": "Enter your password to delete your account.",
        "Vul je wachtwoord in.": "Enter your password.",
        "Account verwijderd.": "Account deleted.",
        "Je account kon niet worden verwijderd. Probeer het opnieuw.": "Your account could not be deleted. Try again.",
        "Log opnieuw in om je account te verwijderen.": "Sign in again to delete your account.",
        "Versie": "Version",
        "Foto kiezen": "Choose photo",
        "Foto verwijderen": "Remove photo",
        "Profiel opgeslagen.": "Profile saved.",
        "Opslaan mislukt. Controleer je verbinding.": "Could not save. Check your connection.",
        "Foto verwijderen?": "Remove photo?",
        "Je profielfoto wordt verwijderd.": "Your profile photo will be removed.",
        "Foto verwijderd.": "Photo removed.",
        "Foto bijgewerkt.": "Photo updated.",
        "Afbeelding kon niet worden gelezen.": "The image could not be read.",
        "Afbeelding is te groot.": "The image is too large.",
        "Wachtwoord vergeten": "Forgot password",
        "Vul je e-mailadres in.": "Enter your email address.",
        "Er is een e-mail verstuurd om je wachtwoord opnieuw in te stellen.": "An email has been sent to reset your password.",
        "Wachtwoord herstellen mislukt. Controleer je e-mailadres.": "Password reset failed. Check your email address.",
        "Vul je e-mailadres en wachtwoord in.": "Enter your email address and password.",
        "Vul een uitnodigingscode, e-mailadres en wachtwoord van minimaal 8 tekens in.": "Enter an invite code, email address and a password of at least 8 characters.",
        "Dit is een medewerkersaccount. Gebruik DDA SUPPORT.": "This is a staff account. Use DDA SUPPORT.",
        "Dit is een klantaccount. Gebruik ASK FOR HELP DDA.": "This is a customer account. Use ASK FOR HELP DDA.",
        "Sessie verlopen. Log opnieuw in.": "Session expired. Sign in again.",
        "Geen verbinding. Controleer je internet.": "No connection. Check your internet.",
        "Er ging iets mis.": "Something went wrong.",
        "Bezig…": "Working…",
        "Versturen…": "Sending…",
        "Bezig met opslaan…": "Saving…",
        "Privacy en veiligheid": "Privacy and safety",
        "Je gegevens worden opgeslagen in de beveiligde Firebase-omgeving van Digital Dope Advisors. Alleen jij en support kunnen je gesprekken lezen. Je profielgegevens zijn alleen voor jou en support zichtbaar. Deel je deelcode alleen met mensen die je vertrouwt. Bestanden die je deelt, worden bewaard zolang het gesprek bestaat. Je kunt een gesprek verwijderen; dan worden ook de berichten verwijderd.\n\nTermux, APK-installatie en schermdeling zijn Android-functies en niet beschikbaar op iOS.": "Your data is stored in the secure Firebase environment of Digital Dope Advisors. Only you and support can read your conversations. Your profile details are visible only to you and support. Share your share code only with people you trust. Files you share are kept for as long as the conversation exists. You can delete a conversation; its messages will be deleted too.\n\nTermux, APK installation and screen sharing are Android features and are not available on iOS.",
        "Deze app gebruikt een beveiligde verbinding met Firebase.": "This app uses a secure connection to Firebase.",
        "Onbekend": "Unknown",
        "Bestand openen": "Open file",
        "Link": "Link",
        "Deel deze app": "Share this app",
        "App delen": "Share app",
        "Geen verbinding tijdens uploaden.": "No connection while uploading.",
        "Upload-antwoord kon niet worden gelezen.": "Could not read the upload response.",
        "Firebase Storage is nog niet ingeschakeld voor dit project.": "Firebase Storage is not enabled for this project yet.",
        "Bestand uploaden is niet toegestaan. Controleer de Firebase Storage-regels.": "File upload is not allowed. Check the Firebase Storage rules.",
        "Bestand uploaden mislukt (HTTP ": "File upload failed (HTTP ",
        "Ongeldige of al gebruikte uitnodigingscode.": "Invalid or already used invite code.",
        "E-mailadres of wachtwoord klopt niet.": "Email address or password is incorrect.",
        "Er bestaat al een account met dit e-mailadres.": "An account with this email address already exists.",
        "Kies een sterker wachtwoord van minimaal 8 tekens.": "Choose a stronger password of at least 8 characters.",
        "Te veel inlogpogingen. Probeer het later opnieuw.": "Too many sign-in attempts. Try again later.",
        "Dit account is uitgeschakeld.": "This account is disabled.",
        "Inloggen is niet gelukt. Controleer je gegevens en probeer opnieuw.": "Sign-in failed. Check your details and try again.",
        "Je kunt dit gesprek niet meer beantwoorden.": "You cannot reply to this conversation anymore.",
        "Gesprek": "Conversation",
        "Terug naar inloggen": "Back to sign in",
        "Weet je het zeker?": "Are you sure?",
        "Deze actie kan niet ongedaan worden.": "This action cannot be undone.",
        "Profiel": "Profile",
        "Klant": "Customer",
        "Geen foto": "No photo",
        "Foto": "Photo",
        "Kies een foto": "Choose a photo",
        "Deelcode gekopieerd.": "Share code copied.",
        "Link gekopieerd.": "Link copied.",
        "App": "App",
        "Versie 0.1.0 (iOS)": "Version 0.1.0 (iOS)",
        "Gesprekken worden geladen…": "Loading conversations…",
        "Alle gesprekken": "All conversations",
        "Toegewezen aan mij": "Assigned to me",
        "Open gesprekken": "Open conversations",
        "Gesloten gesprekken": "Closed conversations",
        "Uitnodigingen": "Invites",
        "Nieuwe uitnodiging": "New invite",
        "Code aanmaken": "Create code",
        "Ongebruikte code": "Unused code",
        "Gebruikte code": "Used code",
        "Intrekken": "Revoke",
        "Geen uitnodigingen": "No invites",
        "Er zijn nog geen uitnodigingscodes.": "There are no invite codes yet.",
        "Uitnodiging aangemaakt.": "Invite created.",
        "Uitnodiging ingetrokken.": "Invite revoked.",
        "Kies een klant": "Choose a customer",
        "Gesprek starten": "Start conversation",
        "Oppakken": "Claim",
        "Vrijgeven": "Release",
        "Toegewezen": "Assigned",
        "Niet toegewezen": "Unassigned",
        "Alleen medewerkers kunnen deze app gebruiken.": "Only staff members can use this app.",
        "Log in met je DDA SUPPORT-account.": "Sign in with your DDA SUPPORT account.",
        "Nieuw bericht van klant.": "New message from customer.",
        "Notities worden geladen…": "Loading notes…",
        "Apps worden geladen…": "Loading apps…",
        "Profiel wordt geladen…": "Loading profile…",
        "Wachten op antwoord…": "Waiting for a reply…",
        "Nieuwe berichten": "New messages",
        "Bijwerken": "Refresh",
        "Alles bijwerken": "Update all",
        "Updates controleren": "Check for updates",
        "Niet beschikbaar op iOS": "Not available on iOS",
        "Termux, APK-installatie en schermdeling zijn Android-functies.": "Termux, APK installation and screen sharing are Android features.",
        "Dit gesprek is gesloten. Je kunt wel een nieuw gesprek starten.": "This conversation is closed. You can start a new conversation.",
        "Start een nieuw gesprek": "Start a new conversation",
        "Geen berichten": "No messages",
        "Wacht op antwoord": "Waiting for a reply",
        "Antwoord nodig": "Reply needed",
        "Wacht op klant": "Waiting for customer",
        "Open gesprek": "Open conversation",
        "Gesloten gesprek": "Closed conversation",
        "Deelcode van de ontvanger": "Recipient's share code",
        "Notitie delen": "Share note",
        "Gedeeld met": "Shared with",
        "persoon": "person",
        "personen": "people",
        "Nog niet gedeeld": "Not shared yet",
        "Deze notitie is van jou.": "This note belongs to you.",
        "Alleen de eigenaar kan deze notitie wijzigen.": "Only the owner can change this note.",
        "Weet je zeker dat je deze notitie wilt verwijderen?": "Are you sure you want to delete this note?",
        "De notitie verdwijnt voor jou en voor iedereen met wie je hem hebt gedeeld.": "The note will disappear for you and everyone you shared it with.",
        "Geen deelcode ingevuld.": "No share code entered.",
        "Deelcode ongeldig.": "Invalid share code.",
        "De notitie is gedeeld.": "The note has been shared.",
        "De notitie kon niet worden gedeeld.": "The note could not be shared.",
        "De notitie kon niet worden opgeslagen.": "The note could not be saved.",
        "De notitie kon niet worden verwijderd.": "The note could not be deleted.",
        "Profielgegevens opslaan mislukt.": "Saving profile details failed.",
        "Profielgegevens opgeslagen.": "Profile details saved.",
        "Foto uploaden mislukt.": "Photo upload failed.",
        "Foto verwijderen mislukt.": "Removing the photo failed.",
        "Deelcode kopiëren mislukt.": "Copying the share code failed.",
        "Link delen mislukt.": "Sharing the link failed.",
        "Kon de app niet openen.": "Could not open the app.",
        "Kon de link niet openen.": "Could not open the link.",
        "Kon de deelcode niet kopiëren.": "Could not copy the share code.",
        "Kon het bestand niet openen.": "Could not open the file.",
        "Kon de afbeelding niet laden.": "Could not load the image.",
        "Kon de foto niet opslaan.": "Could not save the photo.",
        "Kon de foto niet verwijderen.": "Could not remove the photo.",
        "Kon de notitie niet laden.": "Could not load the note.",
        "Kon de notities niet laden.": "Could not load the notes.",
        "Kon de apps niet laden.": "Could not load the apps.",
        "Kon het profiel niet laden.": "Could not load the profile.",
        "Kon de gesprekken niet laden.": "Could not load the conversations.",
        "Kon de berichten niet laden.": "Could not load the messages.",
        "Kon het gesprek niet starten.": "Could not start the conversation.",
        "Kon het gesprek niet sluiten.": "Could not close the conversation.",
        "Kon het gesprek niet verwijderen.": "Could not delete the conversation.",
        "Kon het bericht niet versturen.": "Could not send the message.",
        "Kon het bestand niet versturen.": "Could not send the file.",
        "Kon de status niet laden.": "Could not load the status.",
        "Kon de wijziging niet opslaan.": "Could not save the change.",
        "Kon de wijziging niet verwijderen.": "Could not delete the change.",
        "Kon de wijziging niet delen.": "Could not share the change.",
        "Kon de wijziging niet openen.": "Could not open the change.",
        "Kon de wijziging niet laden.": "Could not load the change.",
        "Kon de wijziging niet bijwerken.": "Could not update the change.",
        "Kon de wijziging niet versturen.": "Could not send the change.",
        "Kon de wijziging niet kopiëren.": "Could not copy the change.",
        "Kon de wijziging niet sluiten.": "Could not close the change.",
        "Kon de wijziging niet starten.": "Could not start the change.",
        "Kon de wijziging niet vinden.": "Could not find the change.",
        "Kon de wijziging niet toevoegen.": "Could not add the change.",
        "Kon de wijziging niet bewerken.": "Could not edit the change.",
        "Kon de wijziging niet aanmaken.": "Could not create the change.",
        "Kon de wijziging niet openen.": "Could not open the change.",
        "Kon de wijziging niet verwijderen.": "Could not delete the change.",
        "Kon de wijziging niet opslaan.": "Could not save the change."
    };

    var state = {
        view: "loading",
        tab: "home",
        lang: "nl",
        theme: "system",
        session: null,
        profile: {},
        user: {},
        avatar: null,
        tickets: [],
        ticket: null,
        messages: [],
        notes: [],
        sharedNotes: [],
        apps: [],
        supportOnline: null,
        notesTab: "own",
        noteQuery: "",
        editingNote: null,
        unread: false,
        ticketsLoading: false,
        ticketsError: "",
        supportLoading: false,
        messagesLoading: false,
        notesLoading: false,
        notesError: "",
        appsLoading: false,
        appsError: "",
        profileLoading: false,
        profileError: "",
        profileLoadedAt: 0,
        notesLoadedAt: 0,
        appsLoadedAt: 0,
        ticketsLoadedAt: 0,
        creating: false,
        sending: false,
        uploading: false,
        savingNote: false,
        savingProfile: false,
        modalAction: null,
        toastTimer: null,
        timers: {},
        lastTicketStatus: {},
        ticketFilter: "open",
        invites: [],
        invitesLoading: false,
        invitesError: "",
        users: [],
        usersLoadedAt: 0
    };

    var el = {};

    function $(id) {
        return document.getElementById(id);
    }

    function t(value) {
        var translated = state.lang === "en" ? (EN[value] || value) : value;
        return platform ? platform.text(translated, state.lang === "en") : translated;
    }

    function escape(value) {
        return core.escapeHtml(value);
    }

    function imageSrc(value, fallbackMime) {
        var text = String(value || "");
        if (!text) return "";
        if (text.indexOf("data:") === 0) return text;
        return "data:" + (fallbackMime || "image/jpeg") + ";base64," + text;
    }

    function hasNative() {
        return !!window.ddaDesktop || !!(window.webkit && window.webkit.messageHandlers && window.webkit.messageHandlers.dda);
    }

    function native(payload) {
        if (!hasNative()) return false;
        try {
            if (window.ddaDesktop) {
                window.ddaDesktop.postMessage(payload);
                return true;
            }
            window.webkit.messageHandlers.dda.postMessage(payload);
            return true;
        } catch (error) {
            return false;
        }
    }

    function haptic() {
        native({ action: "haptic" });
    }

    function setBadge(count) {
        native({ action: "setBadge", count: count || 0 });
    }

    function openExternal(url) {
        if (!url) return;
        if (native({ action: "openExternal", url: url })) return;
        window.open(url, "_blank");
    }

    function copyText(text) {
        var value = String(text || "");
        if (native({ action: "copy", text: value })) return;
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(value).catch(function () { });
            return;
        }
        var input = document.createElement("textarea");
        input.value = value;
        input.style.position = "fixed";
        input.style.opacity = "0";
        document.body.appendChild(input);
        input.select();
        try { document.execCommand("copy"); } catch (error) { }
        document.body.removeChild(input);
    }

    function shareText(text, url) {
        var value = String(text || "");
        var link = String(url || "");
        if (native({ action: "share", text: value, url: link })) return;
        if (navigator.share) {
            navigator.share({ title: "ASK HELP DDA", text: value, url: link }).catch(function () { });
            return;
        }
        copyText(value + (link ? "\n" + link : ""));
        toast(t("Gekopieerd."));
    }

    function cacheElements() {
        el.loadingView = $("loading-view");
        el.loginView = $("login-view");
        el.registerView = $("register-view");
        el.mainView = $("main-view");
        el.chatView = $("chat-view");
        el.noteEditView = $("note-edit-view");
        el.profileEditView = $("profile-edit-view");

        el.loginForm = $("login-form");
        el.loginEmail = $("login-email");
        el.loginPassword = $("login-password");
        el.loginBtn = $("login-btn");
        el.loginError = $("login-error");
        el.loginForgot = $("login-forgot");
        el.loginRegister = $("login-register");
        el.loginLang = $("login-lang");

        el.registerForm = $("register-form");
        el.registerInvite = $("register-invite");
        el.registerEmail = $("register-email");
        el.registerPassword = $("register-password");
        el.registerBtn = $("register-btn");
        el.registerError = $("register-error");
        el.registerBack = $("register-back");

        el.headerTitle = $("header-title");
        el.headerSubtitle = $("header-subtitle");
        el.headerAction = $("header-action");
        el.tabContent = $("tab-content");
        el.homeBadge = $("home-badge");
        el.tabButtons = document.querySelectorAll(".tab");

        el.chatBack = $("chat-back");
        el.chatTitle = $("chat-title");
        el.chatStatus = $("chat-status");
        el.chatMenu = $("chat-menu");
        el.messages = $("messages");
        el.chatError = $("chat-error");
        el.uploadBar = $("upload-bar");
        el.uploadText = $("upload-text");
        el.uploadProgress = $("upload-progress");
        el.uploadProgressText = $("upload-progress-text");
        el.messageForm = $("message-form");
        el.attachBtn = $("attach-btn");
        el.messageInput = $("message-input");
        el.sendBtn = $("send-btn");

        el.noteBack = $("note-back");
        el.noteHeading = $("note-heading");
        el.noteSave = $("note-save");
        el.noteReadonly = $("note-readonly");
        el.noteTitle = $("note-title");
        el.noteBody = $("note-body");
        el.noteTicketWrap = $("note-ticket-wrap");
        el.noteTicket = $("note-ticket");
        el.noteError = $("note-error");
        el.noteShareSection = $("note-share-section");
        el.noteSharedCount = $("note-shared-count");
        el.noteShareCode = $("note-share-code");
        el.noteShareBtn = $("note-share-btn");
        el.noteSharedList = $("note-shared-list");
        el.noteDelete = $("note-delete");

        el.profileEditBack = $("profile-edit-back");
        el.profileSave = $("profile-save");
        el.profileFirst = $("profile-first");
        el.profileLast = $("profile-last");
        el.profileBirth = $("profile-birth");
        el.profileAddress = $("profile-address");
        el.profileWhatsapp = $("profile-whatsapp");
        el.profileEmail = $("profile-email");
        el.profileError = $("profile-error");

        el.modal = $("modal");
        el.modalTitle = $("modal-title");
        el.modalText = $("modal-text");
        el.modalInputWrap = $("modal-input-wrap");
        el.modalInputLabel = $("modal-input-label");
        el.modalInput = $("modal-input");
        el.modalCancel = $("modal-cancel");
        el.modalOk = $("modal-ok");
        el.modalActions = document.querySelector(".modal-actions");

        el.sheet = $("sheet");
        el.sheetTitle = $("sheet-title");
        el.sheetActions = $("sheet-actions");
        el.sheetCancel = $("sheet-cancel");

        el.toast = $("toast");
        el.fileInput = $("file-input");
        el.photoInput = $("photo-input");
        el.avatarInput = $("avatar-input");
    }

    function bind() {
        el.loginForm.addEventListener("submit", handleLogin);
        el.loginForgot.addEventListener("click", handleForgot);
        el.loginRegister.addEventListener("click", showRegister);
        el.loginLang.addEventListener("click", function () {
            setLanguage(state.lang === "en" ? "nl" : "en");
        });
        el.registerBack.addEventListener("click", function () { showLogin(); });
        el.registerForm.addEventListener("submit", handleRegister);

        el.tabButtons.forEach(function (button) {
            button.addEventListener("click", function () {
                switchTab(button.getAttribute("data-tab"));
            });
        });

        el.headerAction.addEventListener("click", function () {
            if (state.tab === "home") newChat();
            else if (state.tab === "apps" && supportMode) createInviteFlow();
            else if (state.tab === "notes") newNote();
        });

        el.chatBack.addEventListener("click", backToHome);
        el.chatMenu.addEventListener("click", openChatMenu);
        el.messageForm.addEventListener("submit", sendMessage);
        el.attachBtn.addEventListener("click", openAttachSheet);

        el.photoInput.addEventListener("change", function (event) {
            var file = event.target.files && event.target.files[0];
            event.target.value = "";
            handleFile(file);
        });
        el.fileInput.addEventListener("change", function (event) {
            var file = event.target.files && event.target.files[0];
            event.target.value = "";
            handleFile(file);
        });
        el.avatarInput.addEventListener("change", function (event) {
            var file = event.target.files && event.target.files[0];
            event.target.value = "";
            handleAvatar(file);
        });

        el.noteBack.addEventListener("click", backToNotes);
        el.noteSave.addEventListener("click", saveNote);
        el.noteDelete.addEventListener("click", confirmDeleteNote);
        el.noteShareBtn.addEventListener("click", shareNote);

        el.profileEditBack.addEventListener("click", backToProfile);
        el.profileSave.addEventListener("click", saveProfile);

        el.modalCancel.addEventListener("click", closeModal);
        el.modalOk.addEventListener("click", function () {
            var action = state.modalAction;
            var value = el.modalInput.value;
            closeModal();
            if (action) {
                try {
                    var result = action(value);
                    if (result && typeof result.catch === "function") result.catch(handleError);
                } catch (error) {
                    handleError(error);
                }
            }
        });
        el.modal.addEventListener("click", function (event) {
            if (event.target === el.modal) closeModal();
        });
        el.modalInput.addEventListener("keydown", function (event) {
            if (event.key === "Enter") {
                event.preventDefault();
                el.modalOk.click();
            }
        });

        el.sheetCancel.addEventListener("click", closeSheet);
        el.sheet.addEventListener("click", function (event) {
            if (event.target === el.sheet) closeSheet();
        });

        el.tabContent.addEventListener("click", handleTabContentClick);
        el.tabContent.addEventListener("input", handleTabContentInput);
        el.messages.addEventListener("click", handleMessagesClick);
        el.noteSharedList.addEventListener("click", handleNoteSharedClick);

        document.addEventListener("visibilitychange", function () {
            if (document.visibilityState !== "visible" || !state.session) return;
            if (state.view === "main") {
                if (state.tab === "home") {
                    loadTickets(false);
                    loadSupport(false);
                } else if (state.tab === "notes") {
                    loadNotes(false);
                } else if (state.tab === "apps") {
                    loadApps(false);
                } else if (state.tab === "profile") {
                    loadProfileData(false);
                }
            } else if (state.view === "chat") {
                loadMessages(false);
                loadTickets(false);
            }
        });

        window.addEventListener("online", function () {
            if (!state.session) return;
            toast(t("Geen verbinding. Controleer je internet."));
            if (state.view === "main") loadTickets(false);
            if (state.view === "chat") loadMessages(false);
        });
        window.addEventListener("offline", function () {
            if (state.session) toast(t("Geen verbinding. Controleer je internet."));
        });

        var media = window.matchMedia ? window.matchMedia("(prefers-color-scheme: light)") : null;
        if (media) {
            var onChange = function () {
                if (state.theme === "system") applyTheme();
            };
            if (media.addEventListener) media.addEventListener("change", onChange);
            else if (media.addListener) media.addListener(onChange);
        }
    }

    function init() {
        cacheElements();
        var storedLang = "";
        var storedTheme = "";
        try {
            storedLang = localStorage.getItem("dda.lang") || "";
            storedTheme = localStorage.getItem("dda.theme") || "";
        } catch (error) { }
        state.lang = storedLang === "en" ? "en" : "nl";
        state.theme = ["dark", "light", "system"].indexOf(storedTheme) >= 0 ? storedTheme : "system";
        applyLanguage();
        applyTheme();
        bind();
        api.restore().then(function (session) {
            if (session) {
                enterApp().catch(function () { showLogin(); });
            } else {
                showLogin();
            }
        }).catch(function () {
            showLogin();
        });
    }

    function showView(name) {
        state.view = name;
        el.loadingView.classList.toggle("hidden", name !== "loading");
        el.loginView.classList.toggle("hidden", name !== "login");
        el.registerView.classList.toggle("hidden", name !== "register");
        el.mainView.classList.toggle("hidden", name !== "main");
        el.chatView.classList.toggle("hidden", name !== "chat");
        el.noteEditView.classList.toggle("hidden", name !== "note-edit");
        el.profileEditView.classList.toggle("hidden", name !== "profile-edit");
        if (name !== "chat") stopChatPolling();
    }

    function applyBranding() {
        var loginTitle = $("login-title");
        var loadingTitle = $("loading-title");
        var loginSubtitle = $("login-subtitle");
        var loginRegister = $("login-register");
        if (loginTitle) loginTitle.textContent = appName;
        if (loadingTitle) loadingTitle.textContent = appName;
        if (el.headerTitle) el.headerTitle.textContent = appName;
        if (el.chatTitle && !state.ticket) el.chatTitle.textContent = t("Gesprek met support");
        if (loginSubtitle) loginSubtitle.textContent = supportMode ? t("Log in met je DDA SUPPORT-account.") : t("Log in met je ASK HELP DDA-account.");
        if (loginRegister) loginRegister.classList.toggle("hidden", supportMode);
    }

    function showLogin(message) {
        stopPolling();
        stopChatPolling();
        var lastEmail = state.session && state.session.email ? state.session.email : (el.loginEmail ? el.loginEmail.value : "");
        api.signOut();
        state.session = null;
        state.ticket = null;
        state.messages = [];
        state.tickets = [];
        state.invites = [];
        state.users = [];
        state.notes = [];
        state.sharedNotes = [];
        state.apps = [];
        state.profile = {};
        state.user = {};
        state.avatar = null;
        state.lastTicketStatus = {};
        state.unread = false;
        state.editingNote = null;
        state.notesTab = "own";
        state.noteQuery = "";
        state.ticketsLoading = false;
        state.ticketsError = "";
        state.supportLoading = false;
        state.invitesLoading = false;
        state.invitesError = "";
        state.messagesLoading = false;
        state.notesLoading = false;
        state.notesError = "";
        state.appsLoading = false;
        state.appsError = "";
        state.profileLoading = false;
        state.profileError = "";
        state.profileLoadedAt = 0;
        state.notesLoadedAt = 0;
        state.appsLoadedAt = 0;
        state.ticketsLoadedAt = 0;
        state.usersLoadedAt = 0;
        state.creating = false;
        state.sending = false;
        state.uploading = false;
        state.savingNote = false;
        state.savingProfile = false;
        hideUpload();
        setBadge(0);
        updateHomeBadge();
        showView("login");
        el.loginError.textContent = message || "";
        el.loginEmail.value = lastEmail || "";
        el.loginPassword.value = "";
        el.loginBtn.disabled = false;
        el.loginBtn.textContent = t("Inloggen");
        applyLanguage();
        applyBranding();
    }

    function showRegister() {
        showView("register");
        el.registerError.textContent = "";
        el.registerInvite.value = "";
        el.registerEmail.value = el.loginEmail.value;
        el.registerPassword.value = "";
        el.registerBtn.disabled = false;
        el.registerBtn.textContent = t("Account aanmaken");
        applyLanguage();
    }

    async function handleLogin(event) {
        event.preventDefault();
        var email = el.loginEmail.value.trim();
        var password = el.loginPassword.value;
        el.loginError.textContent = "";
        if (!email || !password) {
            el.loginError.textContent = t("Vul je e-mailadres en wachtwoord in.");
            return;
        }
        el.loginBtn.disabled = true;
        el.loginBtn.textContent = t("Bezig…");
        try {
            await api.signIn(email, password);
            await enterApp();
        } catch (error) {
            el.loginError.textContent = error.message || t("Inloggen is niet gelukt. Controleer je gegevens en probeer opnieuw.");
        } finally {
            el.loginBtn.disabled = false;
            el.loginBtn.textContent = t("Inloggen");
        }
    }

    async function handleRegister(event) {
        event.preventDefault();
        var invite = core.normalizeShareCode(el.registerInvite.value);
        var email = el.registerEmail.value.trim();
        var password = el.registerPassword.value;
        el.registerError.textContent = "";
        if (!invite || !email || !password) {
            el.registerError.textContent = t("Vul een uitnodigingscode, e-mailadres en wachtwoord van minimaal 8 tekens in.");
            return;
        }
        if (!core.isValidEmail(email)) {
            el.registerError.textContent = t("Vul je e-mailadres en wachtwoord in.");
            return;
        }
        if (password.length < 8) {
            el.registerError.textContent = t("Kies een sterker wachtwoord van minimaal 8 tekens.");
            return;
        }
        el.registerBtn.disabled = true;
        el.registerBtn.textContent = t("Bezig…");
        try {
            await api.register(email, password, invite);
            await enterApp();
        } catch (error) {
            el.registerError.textContent = error.message || t("Ongeldige of al gebruikte uitnodigingscode.");
        } finally {
            el.registerBtn.disabled = false;
            el.registerBtn.textContent = t("Account aanmaken");
        }
    }

    function handleForgot() {
        openInputModal(
            t("Wachtwoord vergeten"),
            t("Vul je e-mailadres in."),
            t("E-mailadres"),
            "naam@voorbeeld.nl",
            el.loginEmail.value,
            t("Versturen"),
            async function (value) {
                var email = String(value || "").trim();
                if (!core.isValidEmail(email)) {
                    el.loginError.textContent = t("Vul je e-mailadres in.");
                    return;
                }
                try {
                    await api.sendPasswordReset(email);
                    el.loginError.textContent = "";
                    toast(t("Er is een e-mail verstuurd om je wachtwoord opnieuw in te stellen."));
                } catch (error) {
                    el.loginError.textContent = error.message || t("Wachtwoord herstellen mislukt. Controleer je e-mailadres.");
                }
            }
        );
    }

    async function enterApp() {
        state.session = api.session();
        if (!state.session) {
            showLogin();
            return;
        }
        el.loginPassword.value = "";
        var support = false;
        try {
            support = await api.isSupportAccount();
        } catch (error) {
            support = false;
        }
        if (supportMode && !support) {
            api.signOut();
            showLogin(t("Alleen medewerkers kunnen deze app gebruiken."));
            return;
        }
        if (!supportMode && support) {
            api.signOut();
            showLogin(t("Dit is een medewerkersaccount. Gebruik DDA SUPPORT."));
            return;
        }
        showView("main");
        state.tab = "home";
        state.ticketFilter = "open";
        renderTab();
        startPolling();
        loadTickets(false);
        if (!supportMode) loadSupport(false);
        loadProfileData(false);
        loadApps(false);
        loadNotes(false);
        api.heartbeat().catch(function () { });
    }

    function startPolling() {
        stopPolling();
        state.timers.list = setInterval(function () {
            if (document.visibilityState === "visible") loadTickets(false);
        }, 10000);
        state.timers.support = setInterval(function () {
            if (document.visibilityState === "visible") loadSupport(false);
        }, 15000);
        state.timers.heartbeat = setInterval(function () {
            if (document.visibilityState === "visible" && state.session) api.heartbeat().catch(function () { });
        }, 60000);
    }

    function stopPolling() {
        if (state.timers.list) clearInterval(state.timers.list);
        if (state.timers.support) clearInterval(state.timers.support);
        if (state.timers.heartbeat) clearInterval(state.timers.heartbeat);
        state.timers.list = null;
        state.timers.support = null;
        state.timers.heartbeat = null;
    }

    function startChatPolling() {
        stopChatPolling();
        state.timers.chat = setInterval(function () {
            if (document.visibilityState === "visible" && state.view === "chat") loadMessages(false);
        }, 3000);
    }

    function stopChatPolling() {
        if (state.timers.chat) clearInterval(state.timers.chat);
        state.timers.chat = null;
    }

    function switchTab(tab) {
        if (state.view !== "main" || !tab) return;
        state.tab = tab;
        el.tabContent.scrollTop = 0;
        if (tab === "home") {
            state.unread = false;
            updateHomeBadge();
            setBadge(0);
            loadTickets(false);
            if (!supportMode) loadSupport(false);
        } else if (tab === "notes") {
            if (!state.notesLoadedAt || Date.now() - state.notesLoadedAt > 30000) loadNotes(false);
        } else if (tab === "apps") {
            if (supportMode) loadInvites(false);
            else if (!state.appsLoadedAt || Date.now() - state.appsLoadedAt > 30000) loadApps(false);
        } else if (tab === "profile") {
            if (!state.profileLoadedAt || Date.now() - state.profileLoadedAt > 30000) loadProfileData(false);
        }
        haptic();
        renderTab();
    }

    function renderTab() {
        if (state.view !== "main") return;
        el.tabButtons.forEach(function (button) {
            var key = button.getAttribute("data-tab");
            button.classList.toggle("active", key === state.tab);
            var label = button.querySelector("span[data-i18n]");
            if (label) {
                if (key === "apps" && supportMode) label.textContent = t("Uitnodigingen");
                else label.textContent = t(label.getAttribute("data-i18n"));
            }
        });
        el.headerTitle.textContent = appName;
        el.headerAction.classList.add("hidden");
        el.headerAction.textContent = "";
        if (state.tab === "home") {
            el.headerSubtitle.textContent = (state.user && state.user.email) || (state.session && state.session.email) || "";
            el.headerAction.textContent = supportMode ? t("Gesprek starten") : t("Nieuw");
            el.headerAction.classList.remove("hidden");
            renderHome();
        } else if (state.tab === "apps") {
            if (supportMode) {
                el.headerSubtitle.textContent = t("Uitnodigingen");
                el.headerAction.textContent = t("Nieuw");
                el.headerAction.classList.remove("hidden");
                renderInvites();
            } else {
                el.headerSubtitle.textContent = t("Apps van Digital Dope Advisors");
                renderApps();
            }
        } else if (state.tab === "notes") {
            el.headerSubtitle.textContent = t("Notities");
            el.headerAction.textContent = t("Nieuw");
            el.headerAction.classList.remove("hidden");
            renderNotes();
        } else if (state.tab === "profile") {
            el.headerSubtitle.textContent = t("Profiel");
            renderProfile();
        }
        updateHomeBadge();
    }

    function updateHomeBadge() {
        if (!el.homeBadge) return;
        el.homeBadge.classList.toggle("hidden", !state.unread);
    }

    function updateSupportCard() {
        var dot = $("support-status-dot");
        var title = $("support-status-title");
        var text = $("support-status-text");
        if (!dot || !title || !text) return;
        if (state.supportOnline === true) {
            dot.className = "status-dot online";
            title.textContent = t("Support is online");
            text.textContent = t("Je kunt nu een bericht sturen.");
        } else if (state.supportOnline === false) {
            dot.className = "status-dot";
            title.textContent = t("Support is nu offline");
            text.textContent = t("Je kunt een bericht achterlaten; we reageren zo snel mogelijk.");
        } else {
            dot.className = "status-dot";
            title.textContent = t("Support-status onbekend");
            text.textContent = t("Controleer je verbinding en probeer opnieuw.");
        }
    }

    function filteredTickets() {
        if (!supportMode) return state.tickets.slice();
        var filter = state.ticketFilter || "open";
        var uid = state.session ? state.session.localId : "";
        return state.tickets.filter(function (ticket) {
            if (filter === "mine") return ticket.status !== "closed" && ticket.assignedUid === uid;
            if (filter === "open") return ticket.status === "open" || ticket.status === "waiting_support";
            if (filter === "closed") return ticket.status === "closed";
            return true;
        });
    }

    function renderHome() {
        if (supportMode) {
            var filters = [
                ["open", t("Open gesprekken")],
                ["mine", t("Toegewezen aan mij")],
                ["all", t("Alle gesprekken")],
                ["closed", t("Gesloten gesprekken")]
            ];
            el.tabContent.innerHTML =
                '<div class="segmented support-filters">' + filters.map(function (f) {
                    return '<button type="button" data-ticket-filter="' + escape(f[0]) + '" class="' + (state.ticketFilter === f[0] ? "active" : "") + '">' + escape(f[1]) + '</button>';
                }).join("") + '</div>' +
                '<div class="section-title"><h2>' + escape(t("Gesprekken")) + '</h2><span id="home-ticket-count"></span></div>' +
                '<div id="home-ticket-list" class="ticket-list"></div>';
        } else {
            el.tabContent.innerHTML =
                '<section class="hero">' +
                    '<div class="status-card" id="support-status-card">' +
                        '<span id="support-status-dot" class="status-dot"></span>' +
                        '<div class="status-copy"><strong id="support-status-title"></strong><span id="support-status-text"></span></div>' +
                    '</div>' +
                    '<button type="button" class="primary wide" data-new-chat>' + escape(t("Nieuw gesprek")) + '</button>' +
                '</section>' +
                '<div class="section-title"><h2>' + escape(t("Gesprekken")) + '</h2><span id="home-ticket-count"></span></div>' +
                '<div id="home-ticket-list" class="ticket-list"></div>';
            updateSupportCard();
        }
        renderHomeTickets();
    }

    function renderHomeTickets() {
        var container = $("home-ticket-list");
        if (!container) return;
        var list = filteredTickets();
        var count = $("home-ticket-count");
        if (count) {
            count.textContent = list.length === 1 ? t("1 gesprek") : (list.length + " " + t("gesprekken"));
        }
        if (state.ticketsLoading && !state.tickets.length) {
            container.innerHTML = '<div class="empty-state"><div class="spinner"></div><p>' + escape(t("Gesprekken worden geladen…")) + '</p></div>';
            return;
        }
        if (state.ticketsError) {
            container.innerHTML = '<div class="empty-state"><h2>' + escape(t("Laden mislukt")) + '</h2><p>' + escape(state.ticketsError) + '</p><button type="button" class="secondary" data-retry-tickets>' + escape(t("Opnieuw proberen")) + '</button></div>';
            return;
        }
        if (!list.length) {
            container.innerHTML = '<div class="empty-state"><h2>' + escape(t("Nog geen gesprekken")) + '</h2><p>' + escape(supportMode ? t("Er zijn geen gesprekken in deze weergave.") : t("Start een gesprek met support.")) + '</p></div>';
            return;
        }
        container.innerHTML = list.map(function (ticket) {
            var who = supportMode ? (ticket.customerEmail || ticket.customerUid || t("Klant")) : (ticket.title || t("Gesprek met support"));
            var preview = ticket.lastMessage || t("Nog geen berichten");
            var time = core.formatRelative(ticket.updatedAt);
            var assigned = supportMode ? '<span class="badge">' + escape(ticket.assignedUid ? (ticket.assignedUid === (state.session && state.session.localId) ? t("Toegewezen aan mij") : t("Toegewezen")) : t("Niet toegewezen")) + '</span>' : '';
            return '<button type="button" class="ticket-card" data-open-ticket="' + escape(ticket.id) + '">' +
                '<div class="ticket-top"><span class="ticket-title">' + escape(who) + '</span><span class="ticket-time">' + escape(time) + '</span></div>' +
                '<div class="ticket-preview">' + escape(preview) + '</div>' +
                '<div class="ticket-meta"><span class="status-badge ' + core.statusClass(ticket.status) + '">' + escape(t(core.statusLabel(ticket.status))) + '</span>' + assigned + '</div>' +
            '</button>';
        }).join("");
    }

    async function loadInvites(showLoading) {
        if (!supportMode || state.invitesLoading) return;
        state.invitesLoading = true;
        if (showLoading && state.view === "main" && state.tab === "apps") renderInvites();
        try {
            state.invites = await api.listInvites();
            state.invitesError = "";
        } catch (error) {
            state.invitesError = error.message || t("Laden mislukt");
        } finally {
            state.invitesLoading = false;
            if (state.view === "main" && state.tab === "apps") renderInvites();
        }
    }

    function renderInvites() {
        if (!supportMode) { renderApps(); return; }
        var list = state.invites || [];
        var html = '<button type="button" class="primary wide" data-new-invite>' + escape(t("Nieuwe uitnodiging")) + '</button>';
        if (state.invitesLoading && !list.length) {
            el.tabContent.innerHTML = html + '<div class="empty-state"><div class="spinner"></div><p>' + escape(t("Laden…")) + '</p></div>';
            return;
        }
        if (state.invitesError) {
            el.tabContent.innerHTML = html + '<div class="empty-state"><h2>' + escape(t("Laden mislukt")) + '</h2><p>' + escape(state.invitesError) + '</p><button type="button" class="secondary" data-retry-invites>' + escape(t("Opnieuw proberen")) + '</button></div>';
            return;
        }
        if (!list.length) {
            el.tabContent.innerHTML = html + '<div class="empty-state"><h2>' + escape(t("Geen uitnodigingen")) + '</h2><p>' + escape(t("Er zijn nog geen uitnodigingscodes.")) + '</p></div>';
            return;
        }
        html += '<div class="note-list" style="margin-top:14px">' + list.map(function (invite) {
            var used = Boolean(invite.used);
            var badge = '<span class="badge ' + (used ? '' : 'apple') + '">' + escape(used ? t("Gebruikte code") : t("Ongebruikte code")) + '</span>';
            var actions = used ? '' : '<button type="button" class="link-button danger-link" data-revoke-invite="' + escape(invite.id) + '">' + escape(t("Intrekken")) + '</button>';
            return '<div class="note-card invite-card"><h3>' + escape(invite.id) + '</h3><div class="note-foot"><span>' + badge + '</span>' + actions + '</div></div>';
        }).join("") + '</div>';
        el.tabContent.innerHTML = html;
    }
        if (state.ticketsLoading && state.tickets.length === 0) {
            container.innerHTML = '<div class="empty-state"><div class="spinner"></div><p>' + escape(t("Gesprekken laden…")) + '</p></div>';
            return;
        }
        if (state.ticketsError) {
            container.innerHTML = '<div class="empty-state"><h2>' + escape(t("Laden mislukt")) + '</h2><p>' + escape(state.ticketsError) + '</p><button type="button" class="secondary" data-retry-tickets>' + escape(t("Opnieuw proberen")) + '</button></div>';
            return;
        }
        if (!state.tickets.length) {
            container.innerHTML = '<div class="empty-state"><h2>' + escape(t("Nog geen gesprekken")) + '</h2><p>' + escape(t("Start een gesprek met support.")) + '</p></div>';
            return;
        }
        container.innerHTML = state.tickets.map(function (ticket) {
            var title = ticket.title || t("Gesprek met support");
            var preview = ticket.lastMessage || t("Nog geen berichten");
            var time = core.formatRelative(ticket.updatedAt);
            return '<button type="button" class="ticket-card" data-open-ticket="' + escape(ticket.id) + '">' +
                '<div class="ticket-top"><span class="ticket-title">' + escape(title) + '</span><span class="ticket-time">' + escape(time) + '</span></div>' +
                '<div class="ticket-preview">' + escape(preview) + '</div>' +
                '<div class="ticket-meta"><span class="status-badge ' + core.statusClass(ticket.status) + '">' + escape(t(core.statusLabel(ticket.status))) + '</span></div>' +
            '</button>';
        }).join("");
    }


    async function loadUsers(force) {
        if (!supportMode) return;
        if (!force && state.users.length && Date.now() - state.usersLoadedAt < 60000) return;
        try {
            state.users = await api.listUsers();
            state.usersLoadedAt = Date.now();
        } catch (error) {
            state.users = state.users || [];
        }
    }

    function createInviteFlow() {
        if (!supportMode) return;
        openInputModal(
            t("Nieuwe uitnodiging"),
            t("Code aanmaken"),
            t("Uitnodigingscode"),
            core.generateShareCode(),
            core.generateShareCode(),
            t("Opslaan"),
            async function (value) {
                var code = core.normalizeShareCode(value || core.generateShareCode());
                try {
                    await api.createInvite(code);
                    toast(t("Uitnodiging aangemaakt."));
                    loadInvites(false);
                } catch (error) {
                    handleError(error);
                }
            }
        );
    }

    function revokeInviteFlow(code) {
        if (!supportMode || !code) return;
        openConfirm(
            t("Intrekken"),
            t("Weet je het zeker?"),
            t("Intrekken"),
            true,
            async function () {
                try {
                    await api.deleteInvite(code);
                    toast(t("Uitnodiging ingetrokken."));
                    loadInvites(false);
                } catch (error) {
                    handleError(error);
                }
            }
        );
    }

    async function startSupportConversationFlow() {
        await loadUsers(true);
        if (!state.users.length) {
            toast(t("Geen klanten gevonden."));
            return;
        }
        var actions = state.users.slice(0, 30).map(function (user) {
            var label = (user.email || user.id || t("Klant"));
            return {
                label: label,
                action: async function () {
                    try {
                        state.creating = true;
                        var id = await api.startSupportTicket(user.id, user.email || "", "Support-gesprek");
                        await loadTickets(false);
                        openTicket(id);
                        toast(t("Gesprek gestart."));
                    } catch (error) {
                        handleError(error);
                    } finally {
                        state.creating = false;
                    }
                }
            };
        });
        openSheet(t("Kies een klant"), actions);
    }

    async function loadTickets(showLoading) {
        if (state.ticketsLoading) return;
        state.ticketsLoading = true;
        if (showLoading || !state.tickets.length) renderHomeTickets();
        try {
            var tickets = await api.listTickets();
            var previous = state.lastTicketStatus;
            var nextStatus = {};
            tickets.forEach(function (ticket) {
                nextStatus[ticket.id] = ticket.status;
                var old = previous[ticket.id];
                if (!old) return;
                if (!supportMode && old !== "waiting_customer" && ticket.status === "waiting_customer") {
                    if (!state.ticket || state.ticket.id !== ticket.id) {
                        state.unread = true;
                        toast(t("Nieuw bericht van support."));
                    }
                }
                if (supportMode && old !== "waiting_support" && ticket.status === "waiting_support") {
                    if (!state.ticket || state.ticket.id !== ticket.id) {
                        state.unread = true;
                        toast(t("Nieuw bericht van klant."));
                    }
                }
            });
            state.lastTicketStatus = nextStatus;
            state.tickets = tickets;
            state.ticketsError = "";
            state.ticketsLoadedAt = Date.now();
            if (state.ticket) {
                var current = tickets.filter(function (item) { return item.id === state.ticket.id; })[0];
                if (current) {
                    var oldStatus = state.ticket.status;
                    state.ticket = current;
                    if (oldStatus !== current.status && state.view === "chat") {
                        renderChatHeader();
                        updateComposerState();
                    }
                }
            }
            if (state.view === "main" && state.tab === "home") renderHomeTickets();
            updateHomeBadge();
        } catch (error) {
            state.ticketsError = error.message || t("Kon de gesprekken niet laden.");
            if (state.view === "main" && state.tab === "home") renderHomeTickets();
            if (isSessionError(error)) handleError(error);
        } finally {
            state.ticketsLoading = false;
        }
    }

    async function loadSupport() {
        if (state.supportLoading) return;
        state.supportLoading = true;
        try {
            state.supportOnline = await api.supportOnline();
        } catch (error) {
            state.supportOnline = null;
        } finally {
            state.supportLoading = false;
            updateSupportCard();
        }
    }

    async function newChat() {
        if (state.creating) return;
        if (supportMode) {
            await startSupportConversationFlow();
            return;
        }
        state.creating = true;
        try {
            var openId = core.openTicketId(state.tickets);
            if (openId) {
                openTicket(openId);
                return;
            }
            if (!state.user || !state.user.shareCode) {
                state.user = await api.ownUser();
            }
            var id = await api.createTicket((state.user && state.user.shareCode) || "");
            await loadTickets(false);
            openTicket(id);
            toast(t("Gesprek gestart."));
        } catch (error) {
            handleError(error);
        } finally {
            state.creating = false;
        }
    }

    function openTicket(id) {
        var ticket = state.tickets.filter(function (item) { return item.id === id; })[0];
        if (!ticket) {
            toast(t("Kon het gesprek niet vinden."));
            return;
        }
        state.ticket = ticket;
        state.messages = [];
        state.unread = false;
        updateHomeBadge();
        setBadge(0);
        showView("chat");
        el.chatError.textContent = "";
        el.messages.innerHTML = '<div class="empty-state"><div class="spinner"></div><p>' + escape(t("Laden…")) + '</p></div>';
        renderChatHeader();
        updateComposerState();
        startChatPolling();
        loadMessages(true);
        haptic();
    }

    function renderChatHeader() {
        if (!state.ticket) return;
        var title = state.ticket.title || t("Gesprek met support");
        if (supportMode) title = state.ticket.customerEmail || state.ticket.customerUid || title;
        el.chatTitle.textContent = title;
        el.chatStatus.textContent = t(core.statusLabel(state.ticket.status));
        el.chatStatus.className = "status-badge " + core.statusClass(state.ticket.status);
        updateComposerState();
    }

    function updateComposerState() {
        if (!el.messageInput) return;
        var closed = state.ticket && state.ticket.status === "closed";
        el.messageInput.disabled = Boolean(closed);
        el.attachBtn.disabled = Boolean(closed || state.uploading || state.sending);
        el.sendBtn.disabled = Boolean(closed || state.uploading || state.sending);
        el.messageInput.placeholder = closed ? t("Dit gesprek is gesloten.") : t("Typ een bericht…");
    }

    async function loadMessages(forceBottom) {
        if (!state.ticket || state.messagesLoading) return;
        state.messagesLoading = true;
        var ticketId = state.ticket.id;
        var container = el.messages;
        var nearBottom = core.shouldStickToBottom(container.scrollTop, container.scrollHeight, container.clientHeight);
        var oldTop = container.scrollTop;
        try {
            var messages = await api.listMessages(ticketId);
            if (!state.ticket || state.ticket.id !== ticketId) return;
            state.messages = messages;
            el.chatError.textContent = "";
            renderMessages((forceBottom || nearBottom) ? "bottom" : "keep", oldTop);
        } catch (error) {
            if (!state.ticket || state.ticket.id !== ticketId) return;
            el.chatError.textContent = error.message || t("Kon de berichten niet laden.");
            el.messages.innerHTML = '<div class="empty-state"><h2>' + escape(t("Laden mislukt")) + '</h2><p>' + escape(error.message || t("Kon de berichten niet laden.")) + '</p><button type="button" class="secondary" data-retry-messages>' + escape(t("Opnieuw proberen")) + '</button></div>';
            if (isSessionError(error)) handleError(error);
        } finally {
            state.messagesLoading = false;
        }
    }

    function renderFileCard(message) {
        var link = core.safeLink(message.fileLink);
        var name = message.fileName || t("Bestand");
        var mime = message.fileMime || "";
        if (!link) {
            return '<div class="file-card"><span class="file-icon">📎</span><span class="file-copy"><span class="file-name">' + escape(name) + '</span><span class="file-sub">' + escape(t("Link niet beschikbaar")) + '</span></span></div>';
        }
        var image = core.isImageMime(mime);
        var icon = image ? '<img class="file-image" src="' + escape(link) + '" alt="">' : '<span class="file-icon">📎</span>';
        return '<button type="button" class="file-card' + (image ? ' file-card-image' : '') + '" data-open-url="' + escape(link) + '">' +
            icon +
            '<span class="file-copy"><span class="file-name">' + escape(name) + '</span><span class="file-sub">' + escape(t("Tik om te openen")) + '</span></span>' +
        '</button>';
    }

    function renderMessages(mode, oldTop) {
        if (!state.messages.length) {
            var empty = state.ticket && state.ticket.status === "closed"
                ? '<div class="empty-state"><h2>' + escape(t("Gesprek gesloten")) + '</h2><p>' + escape(t("Je kunt dit gesprek niet meer beantwoorden. Start een nieuw gesprek als je hulp nodig hebt.")) + '</p></div>'
                : '<div class="empty-state"><h2>' + escape(t("Nog geen berichten")) + '</h2><p>' + escape(t("Stuur een bericht om te beginnen.")) + '</p></div>';
            el.messages.innerHTML = empty;
            return;
        }
        var html = state.messages.map(function (message) {
            var mine = state.session && message.senderUid === state.session.localId;
            var fromSupport = message.fromSupport === true;
            var classes = "message" + (mine ? " mine" : "") + (fromSupport ? " support" : "");
            var body = "";
            if (message.kind === "FILE") {
                body = renderFileCard(message);
            } else {
                body = '<div class="bubble">' + escape(message.text || "") + '</div>';
            }
            var meta = '<div class="message-meta"><span>' + escape(fromSupport ? t("Support") : t("Jij")) + '</span><span>·</span><span>' + escape(core.formatTime(message.createdAt)) + '</span></div>';
            return '<div class="' + classes + '">' + body + meta + '</div>';
        }).join("");
        if (state.ticket && state.ticket.status === "closed") {
            html += '<div class="empty-state"><h2>' + escape(t("Gesprek gesloten")) + '</h2><p>' + escape(t("Je kunt dit gesprek niet meer beantwoorden. Start een nieuw gesprek als je hulp nodig hebt.")) + '</p></div>';
        }
        el.messages.innerHTML = html;
        if (mode === "bottom") {
            el.messages.scrollTop = el.messages.scrollHeight;
        } else if (typeof oldTop === "number") {
            el.messages.scrollTop = oldTop;
        }
    }

    async function sendMessage(event) {
        event.preventDefault();
        if (!state.ticket || state.ticket.status === "closed" || state.sending || state.uploading) return;
        var text = el.messageInput.value.trim();
        if (!text) return;
        state.sending = true;
        el.chatError.textContent = "";
        updateComposerState();
        try {
            await api.sendText(state.ticket.id, text);
            el.messageInput.value = "";
            await loadMessages(true);
            loadTickets(false);
        } catch (error) {
            el.chatError.textContent = error.message || t("Kon het bericht niet versturen.");
            if (isSessionError(error)) handleError(error);
        } finally {
            state.sending = false;
            updateComposerState();
            if (!el.messageInput.disabled) {
                try { el.messageInput.focus(); } catch (error) { }
            }
        }
    }

    function showUpload() {
        state.uploading = true;
        el.uploadBar.classList.remove("hidden");
        el.uploadText.textContent = t("Bestand uploaden…");
        el.uploadProgress.style.width = "0%";
        el.uploadProgressText.textContent = "0%";
        updateComposerState();
    }

    function hideUpload() {
        state.uploading = false;
        el.uploadBar.classList.add("hidden");
        el.uploadProgress.style.width = "0%";
        el.uploadProgressText.textContent = "0%";
        updateComposerState();
    }

    async function handleFile(file) {
        if (!file || !state.ticket || state.ticket.status === "closed") return;
        if (state.uploading || state.sending) return;
        if (file.size > 50 * 1024 * 1024) {
            toast(t("Bestand is te groot. Maximaal 50 MB."));
            return;
        }
        var ticketId = state.ticket.id;
        el.chatError.textContent = "";
        showUpload();
        try {
            var uploaded = await api.uploadChatFile(ticketId, file, function (percent) {
                el.uploadProgress.style.width = percent + "%";
                el.uploadProgressText.textContent = percent + "%";
            });
            await api.sendFile(ticketId, uploaded.name, uploaded.mime, uploaded.link);
            toast(t("Bestand verstuurd."));
            if (state.ticket && state.ticket.id === ticketId) {
                await loadMessages(true);
                loadTickets(false);
            }
        } catch (error) {
            el.chatError.textContent = error.message || t("Kon het bestand niet versturen.");
            toast(error.message || t("Bestand uploaden mislukt."));
        } finally {
            hideUpload();
        }
    }

    function openAttachSheet() {
        if (!state.ticket || state.ticket.status === "closed") return;
        openSheet(t("Bijlage"), [
            { label: t("Foto of video kiezen"), action: function () { el.photoInput.click(); } },
            { label: t("Bestand kiezen"), action: function () { el.fileInput.click(); } },
            { label: t("Link plakken"), action: openLinkModal }
        ]);
    }

    function openLinkModal() {
        if (!state.ticket) return;
        var ticketId = state.ticket.id;
        openInputModal(
            t("Link plakken"),
            t("Plak een https-link naar een bestand of afbeelding."),
            t("URL"),
            "https://...",
            "",
            t("Toevoegen"),
            async function (value) {
                var url = String(value || "").trim();
                if (!core.safeLink(url)) {
                    toast(t("Gebruik een geldige https-link."));
                    return;
                }
                var name = core.fileNameFromPath(url.split("?")[0]) || t("Link");
                try {
                    await api.sendFile(ticketId, name, "application/octet-stream", url);
                    if (state.ticket && state.ticket.id === ticketId) await loadMessages(true);
                    loadTickets(false);
                    toast(t("Bestand verstuurd."));
                } catch (error) {
                    el.chatError.textContent = error.message || t("Kon het bestand niet versturen.");
                }
            }
        );
    }

    function openChatMenu() {
        if (!state.ticket) return;
        var actions = [];
        var mine = state.session && state.ticket.assignedUid === state.session.localId;
        if (supportMode) {
            if (!state.ticket.assignedUid) actions.push({ label: t("Oppakken"), action: function () { ticketAction("claim"); } });
            else if (mine) actions.push({ label: t("Vrijgeven"), action: function () { ticketAction("release"); } });
        }
        if (state.ticket.status !== "closed") {
            actions.push({ label: t("Gesprek sluiten"), action: confirmCloseTicket });
        }
        actions.push({ label: t("Gesprek verwijderen"), danger: true, action: confirmDeleteTicket });
        openSheet(t("Gesprek"), actions);
    }

    async function ticketAction(action) {
        if (!state.ticket) return;
        try {
            if (action === "claim") await api.claimTicket(state.ticket.id);
            if (action === "release") await api.releaseTicket(state.ticket.id);
            await loadTickets(false);
            toast(t("Opslaan") + "…");
        } catch (error) {
            handleError(error);
        }
    }

    function confirmCloseTicket() {
        if (!state.ticket) return;
        var ticketId = state.ticket.id;
        openConfirm(
            t("Gesprek sluiten?"),
            t("Je kunt later een nieuw gesprek starten. De berichten blijven bewaard."),
            t("Sluiten"),
            false,
            async function () {
                try {
                    await api.setStatus(ticketId, "closed");
                    if (state.ticket && state.ticket.id === ticketId) {
                        state.ticket.status = "closed";
                        renderChatHeader();
                        updateComposerState();
                        renderMessages("bottom");
                    }
                    await loadTickets(false);
                    toast(t("Gesprek gesloten."));
                } catch (error) {
                    handleError(error);
                }
            }
        );
    }

    function confirmDeleteTicket() {
        if (!state.ticket) return;
        var ticketId = state.ticket.id;
        openConfirm(
            t("Gesprek verwijderen?"),
            t("Het gesprek en alle berichten verdwijnen voor jou én voor support. Dit kan niet ongedaan worden."),
            t("Verwijderen"),
            true,
            async function () {
                try {
                    await api.deleteTicket(ticketId);
                    backToHome();
                    toast(t("Gesprek verwijderd."));
                } catch (error) {
                    handleError(error);
                }
            }
        );
    }

    function backToHome() {
        stopChatPolling();
        state.ticket = null;
        state.messages = [];
        showView("main");
        state.tab = "home";
        renderTab();
        loadTickets(false);
        loadSupport(false);
    }

    async function loadNotes(showLoading) {
        if (state.notesLoading) return;
        state.notesLoading = true;
        if (showLoading && state.view === "main" && state.tab === "notes") renderNotes();
        try {
            var results = await Promise.all([api.listOwnNotes(), api.listSharedNotes()]);
            state.notes = results[0];
            state.sharedNotes = results[1];
            state.notesError = "";
            state.notesLoadedAt = Date.now();
        } catch (error) {
            state.notesError = error.message || t("Kon de notities niet laden.");
            if (isSessionError(error)) handleError(error);
        } finally {
            state.notesLoading = false;
            if (state.view === "main" && state.tab === "notes") renderNotes();
        }
    }

    function renderNotes() {
        var ownActive = state.notesTab === "own";
        el.tabContent.innerHTML =
            '<div class="segmented">' +
                '<button type="button" data-notes-tab="own" class="' + (ownActive ? "active" : "") + '">' + escape(t("Mijn notities")) + '</button>' +
                '<button type="button" data-notes-tab="shared" class="' + (ownActive ? "" : "active") + '">' + escape(t("Gedeeld met mij")) + '</button>' +
            '</div>' +
            '<div class="search-row"><input id="note-search" type="search" placeholder="' + escape(t("Zoeken in notities")) + '" value="' + escape(state.noteQuery) + '"></div>' +
            '<button type="button" class="primary wide" data-new-note>' + escape(t("Nieuwe notitie")) + '</button>' +
            '<div id="notes-list" class="note-list" style="margin-top:14px"></div>';
        renderNoteList();
    }

    function renderNoteList() {
        var container = $("notes-list");
        if (!container) return;
        var source = state.notesTab === "shared" ? state.sharedNotes : state.notes;
        var query = state.noteQuery.trim().toLowerCase();
        var list = source.filter(function (note) {
            if (!query) return true;
            return String(note.title || "").toLowerCase().indexOf(query) >= 0 || String(note.body || "").toLowerCase().indexOf(query) >= 0;
        });
        if (state.notesLoading && !source.length) {
            container.innerHTML = '<div class="empty-state"><div class="spinner"></div><p>' + escape(t("Notities worden geladen…")) + '</p></div>';
            return;
        }
        if (state.notesError) {
            container.innerHTML = '<div class="empty-state"><h2>' + escape(t("Laden mislukt")) + '</h2><p>' + escape(state.notesError) + '</p><button type="button" class="secondary" data-retry-notes>' + escape(t("Opnieuw proberen")) + '</button></div>';
            return;
        }
        if (!list.length) {
            var title = query ? t("Geen notities gevonden") : (state.notesTab === "shared" ? t("Niets gedeeld met jou") : t("Nog geen notities"));
            var text = query ? t("Probeer een andere zoekterm.") : (state.notesTab === "shared" ? t("Notities die iemand met je deelt, verschijnen hier.") : t("Maak een notitie voor jezelf of deel er een met support."));
            container.innerHTML = '<div class="empty-state"><h2>' + escape(title) + '</h2><p>' + escape(text) + '</p></div>';
            return;
        }
        container.innerHTML = list.map(function (note) {
            var mine = note.ownerUid === state.session.localId;
            var title = note.title || t("Zonder titel");
            var body = note.body || "";
            var badge = mine ? "" : '<span class="badge">' + escape(t("Gedeeld")) + '</span>';
            return '<button type="button" class="note-card" data-open-note="' + escape(note.id) + '">' +
                '<h3>' + escape(title) + '</h3>' +
                '<p>' + escape(body.slice(0, 220)) + '</p>' +
                '<div class="note-foot"><span>' + escape(core.formatRelative(note.updatedAt)) + '</span>' + badge + '</div>' +
            '</button>';
        }).join("");
    }

    function renderNoteTicketOptions(selected) {
        var options = ['<option value="">' + escape(t("Geen")) + '</option>'];
        state.tickets.forEach(function (ticket) {
            var title = ticket.title || t("Gesprek met support");
            options.push('<option value="' + escape(ticket.id) + '"' + (ticket.id === selected ? " selected" : "") + '>' + escape(title) + '</option>');
        });
        el.noteTicket.innerHTML = options.join("");
    }

    async function openNote(id) {
        if (!state.tickets.length) await loadTickets(false);
        var note = null;
        if (id) {
            note = state.notes.concat(state.sharedNotes).filter(function (item) { return item.id === id; })[0] || null;
            if (!note) {
                try {
                    note = await api.getNote(id);
                } catch (error) {
                    handleError(error);
                    return;
                }
            }
            if (!note) {
                toast(t("Kon de notitie niet laden."));
                return;
            }
        }
        fillNoteEditor(note, !id);
    }

    function newNote() {
        openNote(null);
    }

    function fillNoteEditor(note, isNew) {
        state.editingNote = note || null;
        var mine = !note || note.ownerUid === state.session.localId;
        el.noteHeading.textContent = note ? (note.title || t("Notitie")) : t("Nieuwe notitie");
        el.noteTitle.value = note ? note.title || "" : "";
        el.noteBody.value = note ? note.body || "" : "";
        el.noteReadonly.classList.toggle("hidden", !note || mine);
        el.noteSave.classList.toggle("hidden", Boolean(note && !mine));
        el.noteDelete.classList.toggle("hidden", !note || !mine);
        el.noteShareSection.classList.toggle("hidden", !note || !mine);
        el.noteTicketWrap.classList.toggle("hidden", Boolean(note && !mine));
        el.noteTitle.disabled = Boolean(note && !mine);
        el.noteBody.disabled = Boolean(note && !mine);
        el.noteTicket.disabled = Boolean(note && !mine);
        el.noteError.textContent = "";
        el.noteShareCode.value = "";
        renderNoteTicketOptions(note && note.ticketId ? note.ticketId : "");
        if (note && mine) {
            var shared = Array.isArray(note.sharedWith) ? note.sharedWith : [];
            el.noteSharedCount.textContent = shared.length
                ? t("Gedeeld met") + " " + shared.length + " " + (shared.length === 1 ? t("persoon") : t("personen")) + "."
                : t("Nog niet gedeeld.");
            el.noteSharedList.innerHTML = shared.map(function (uid) {
                return '<div class="kv"><span>' + escape(t("Gebruiker")) + " " + escape(String(uid).slice(0, 8)) + '…</span><button type="button" class="link-button danger-link" data-unshare-uid="' + escape(uid) + '">' + escape(t("Stop")) + '</button></div>';
            }).join("");
        } else {
            el.noteSharedCount.textContent = "";
            el.noteSharedList.innerHTML = "";
        }
        showView("note-edit");
        if (!note || mine) {
            setTimeout(function () {
                try { el.noteTitle.focus(); } catch (error) { }
            }, 120);
        }
    }

    async function saveNote() {
        if (state.savingNote) return;
        var title = el.noteTitle.value.trim();
        var body = el.noteBody.value;
        var ticketId = el.noteTicket.value || null;
        if (!title) {
            el.noteError.textContent = t("Geef de notitie een titel.");
            el.noteTitle.focus();
            return;
        }
        state.savingNote = true;
        el.noteError.textContent = "";
        el.noteSave.disabled = true;
        try {
            if (state.editingNote) await api.saveNote(state.editingNote.id, title, body, ticketId);
            else await api.createNote(title, body, ticketId);
            state.notesLoadedAt = 0;
            state.editingNote = null;
            showView("main");
            state.tab = "notes";
            renderTab();
            loadNotes(false);
            toast(t("Notitie opgeslagen."));
        } catch (error) {
            el.noteError.textContent = error.message || t("De notitie kon niet worden opgeslagen.");
        } finally {
            state.savingNote = false;
            el.noteSave.disabled = false;
        }
    }

    function confirmDeleteNote() {
        if (!state.editingNote) return;
        var noteId = state.editingNote.id;
        openConfirm(
            t("Weet je zeker dat je deze notitie wilt verwijderen?"),
            t("De notitie verdwijnt voor jou en voor iedereen met wie je hem hebt gedeeld."),
            t("Verwijderen"),
            true,
            async function () {
                try {
                    await api.deleteNote(noteId);
                    state.notesLoadedAt = 0;
                    state.editingNote = null;
                    showView("main");
                    state.tab = "notes";
                    renderTab();
                    loadNotes(false);
                    toast(t("Notitie verwijderd."));
                } catch (error) {
                    handleError(error);
                }
            }
        );
    }

    async function shareNote() {
        if (!state.editingNote) return;
        var code = core.normalizeShareCode(el.noteShareCode.value);
        if (!code) {
            el.noteError.textContent = t("Geen deelcode ingevuld.");
            return;
        }
        el.noteError.textContent = "";
        try {
            await api.shareNote(state.editingNote.id, code);
            var updated = await api.getNote(state.editingNote.id);
            state.notesLoadedAt = 0;
            fillNoteEditor(updated, false);
            toast(t("Notitie gedeeld."));
        } catch (error) {
            el.noteError.textContent = error.message || t("Delen mislukt. Controleer de deelcode.");
        }
    }

    function handleNoteSharedClick(event) {
        var button = event.target.closest("[data-unshare-uid]");
        if (!button || !state.editingNote) return;
        var uid = button.getAttribute("data-unshare-uid");
        var noteId = state.editingNote.id;
        openConfirm(
            t("Stop met delen?"),
            t("Deze persoon kan de notitie daarna niet meer lezen."),
            t("Stop"),
            true,
            async function () {
                try {
                    await api.unshareNote(noteId, uid);
                    var updated = await api.getNote(noteId);
                    state.notesLoadedAt = 0;
                    fillNoteEditor(updated, false);
                    toast(t("Delen gestopt."));
                } catch (error) {
                    handleError(error);
                }
            }
        );
    }

    function backToNotes() {
        state.editingNote = null;
        showView("main");
        state.tab = "notes";
        renderTab();
    }

    async function loadApps(showLoading) {
        if (state.appsLoading) return;
        state.appsLoading = true;
        if (showLoading && state.view === "main" && state.tab === "apps") renderApps();
        try {
            state.apps = await api.listCatalog();
            state.appsError = "";
            state.appsLoadedAt = Date.now();
        } catch (error) {
            state.appsError = error.message || t("Kon de apps niet laden.");
            if (isSessionError(error)) handleError(error);
        } finally {
            state.appsLoading = false;
            if (state.view === "main" && state.tab === "apps") renderApps();
        }
    }

    function latestApps(apps) {
        var groups = {};
        apps.forEach(function (app) {
            var baseTitle = String(app.title || "").replace(/\s+v?\d+(?:\.\d+){1,3}(?:\s.*)?$/i, "").trim().toLowerCase();
            var key = app.kind + ":" + (app.packageName || baseTitle || app.id);
            if (!groups[key]) groups[key] = [];
            groups[key].push(app);
        });
        return Object.keys(groups).map(function (key) {
            return groups[key].sort(function (a, b) {
                var ac = Number(a.versionCode || 0);
                var bc = Number(b.versionCode || 0);
                if (ac !== bc) return bc - ac;
                return Number(b.updatedAt || 0) - Number(a.updatedAt || 0);
            })[0];
        }).sort(function (a, b) {
            return String(a.title || "").localeCompare(String(b.title || ""), "nl");
        });
    }

    function extraCatalogApps() {
        var base = "https://deus73.github.io/mobileconfig-installer/";
        return [
            {
                id: "static-floreal-control",
                kind: "mobileconfig",
                title: "Floreal Control",
                description: "Webclip-profiel voor Floreal Control (Safari-installatie).",
                url: base + "Floreal-Control.mobileconfig"
            },
            {
                id: "static-cinejoy-ios",
                kind: "mobileconfig",
                title: "Cinejoy iOS",
                description: "Webclip-profiel voor Cinejoy (Safari-installatie).",
                url: base + "Cinejoy-iOS.mobileconfig"
            },
            {
                id: "static-ask-help-dda-webclip",
                kind: "mobileconfig",
                title: "ASK FOR HELP DDA Webclip",
                description: "Webclip-profiel voor ASK FOR HELP DDA (Safari-installatie).",
                url: base + "ASK-FOR-HELP-DDA-webclip.mobileconfig"
            }
        ];
    }

    function allApps() {
        var apps = latestApps(state.apps);
        var extras = extraCatalogApps();
        var seen = {};
        apps.forEach(function (app) { seen[String(app.id)] = true; });
        extras.forEach(function (app) {
            if (!seen[String(app.id)]) {
                apps.push(app);
                seen[String(app.id)] = true;
            }
        });
        return apps;
    }

    function renderAppCard(app) {
        var icon = app.iconBase64
            ? '<img class="app-icon" src="' + escape(imageSrc(app.iconBase64, "image/png")) + '" alt="">'
            : '<div class="app-icon">' + escape(initials(app.title)) + '</div>';
        var apple = app.kind === "mobileconfig";
        var kindBadge = apple
            ? '<span class="badge apple">' + escape(t("Apple-profiel")) + '</span>'
            : '<span class="badge android">' + escape(t("Android")) + '</span>';
        var meta = [apple ? t("Apple-profiel") : t("Android")];
        if (app.sizeBytes) meta.push(core.formatBytes(app.sizeBytes));
        if (app.versionCode) meta.push("v" + app.versionCode);
        var actions = apple
            ? '<button type="button" class="primary" data-app-action="open" data-app-id="' + escape(app.id) + '">' + escape(t("Profiel installeren")) + '</button>' +
              '<button type="button" class="secondary" data-app-action="share" data-app-id="' + escape(app.id) + '">' + escape(t("Delen")) + '</button>'
            : '<button type="button" class="secondary" data-app-action="share" data-app-id="' + escape(app.id) + '">' + escape(t("Link delen")) + '</button>' +
               '<button type="button" class="ghost-button" data-app-action="open" data-app-id="' + escape(app.id) + '">' + escape(t("Openen")) + '</button>';
        if (platform && platform.desktop) {
            actions = '<button type="button" class="primary" data-app-action="open" data-app-id="' + escape(app.id) + '">' +
                (state.lang === "en" ? "Download" : "Downloaden") + '</button>' +
                '<button type="button" class="secondary" data-app-action="share" data-app-id="' + escape(app.id) + '">' + escape(t("Link delen")) + '</button>';
        }
        return '<article class="app-card">' +
            icon +
            '<div class="app-body">' +
                '<div class="app-title-row"><h3>' + escape(app.title || t("App")) + '</h3>' + kindBadge + '</div>' +
                (app.description ? '<p class="app-desc">' + escape(app.description) + '</p>' : "") +
                '<div class="app-meta">' + meta.map(function (item) { return '<span>' + escape(item) + '</span>'; }).join("") + '</div>' +
                '<div class="app-actions">' + actions + '</div>' +
            '</div>' +
        '</article>';
    }

    function renderApps() {
        var apps = allApps();
        var html = '<div class="notice">' + escape(t("Op iOS kun je Apple-profielen installeren. Android-apps zijn alleen voor Android.")) + '</div>';
        if (state.appsLoading && !state.apps.length) {
            el.tabContent.innerHTML = html + '<div class="empty-state"><div class="spinner"></div><p>' + escape(t("Apps worden geladen…")) + '</p></div>';
            return;
        }
        if (state.appsError) {
            el.tabContent.innerHTML = html + '<div class="empty-state"><h2>' + escape(t("Laden mislukt")) + '</h2><p>' + escape(state.appsError) + '</p><button type="button" class="secondary" data-retry-apps>' + escape(t("Opnieuw proberen")) + '</button></div>';
            return;
        }
        if (!apps.length) {
            el.tabContent.innerHTML = html + '<div class="empty-state"><h2>' + escape(t("Geen apps")) + '</h2><p>' + escape(t("Support heeft nog geen apps toegevoegd.")) + '</p></div>';
            return;
        }
        var installerUrl = "https://deus73.github.io/mobileconfig-installer/";
        var lastMobileconfig = -1;
        apps.forEach(function (app, idx) {
            if (app.kind === "mobileconfig") lastMobileconfig = idx;
        });
        var installerCard = '<article class="app-card app-card-link">' +
            '<div class="app-icon">' + escape("MC") + '</div>' +
            '<div class="app-body">' +
                '<div class="app-title-row"><h3>' + escape(t("MobileConfig Installer")) + '</h3><span class="badge apple">' + escape(t("Apple-profiel")) + '</span></div>' +
                '<p class="app-desc">' + escape(t("Open de MobileConfig Installer-pagina om .mobileconfig-profielen via Safari te installeren.")) + '</p>' +
                '<div class="app-actions"><button type="button" class="primary" data-open-url="' + escape(installerUrl) + '">' + escape(t("Installer openen")) + '</button>' +
                '<button type="button" class="secondary" data-copy-url="' + escape(installerUrl) + '">' + escape(t("Link kopiëren")) + '</button></div>' +
            '</div>' +
        '</article>';
        var cards = apps.map(function (app, idx) {
            var card = renderAppCard(app);
            if (idx === lastMobileconfig) card += installerCard;
            return card;
        }).join("");
        if (lastMobileconfig < 0) {
            cards += installerCard;
        }
        html += '<div class="app-list">' + cards + '</div>';
        el.tabContent.innerHTML = html;
    }

    function handleAppAction(action, id) {
        var app = allApps().filter(function (item) { return String(item.id) === String(id); })[0];
        if (!app) return;
        if (action === "open") {
            if (app.kind === "apk" && !(platform && platform.desktop)) {
                openInfo(t("Alleen voor Android"), t("APK-bestanden kunnen alleen op Android worden geïnstalleerd. Deel de link met een Android-toestel of gebruik de app daar."));
                return;
            }
            openExternal(app.url);
        } else if (action === "share") {
            shareText(app.title || "ASK HELP DDA", app.url);
        } else if (action === "copy") {
            copyText(app.url);
            toast(t("Link gekopieerd."));
        }
    }

    async function loadProfileData(showLoading) {
        if (state.profileLoading) return;
        state.profileLoading = true;
        if (showLoading && state.view === "main" && state.tab === "profile") renderProfile();
        try {
            var results = await Promise.all([api.ownProfile(), api.ownUser(), api.loadAvatar()]);
            state.profile = results[0] || {};
            state.user = Object.assign({}, state.user || {}, results[1] || {});
            state.avatar = results[2] || null;
            state.profileError = "";
            state.profileLoadedAt = Date.now();
        } catch (error) {
            state.profileError = error.message || t("Kon het profiel niet laden.");
            if (isSessionError(error)) handleError(error);
        } finally {
            state.profileLoading = false;
            if (state.view === "main" && state.tab === "profile") renderProfile();
        }
    }

    function initials(value) {
        var text = String(value || "").trim();
        if (!text) return "?";
        var parts = text.split(/\s+/).filter(Boolean);
        var first = parts[0] ? parts[0].charAt(0) : "?";
        var last = parts.length > 1 ? parts[parts.length - 1].charAt(0) : "";
        return (first + last).toUpperCase();
    }

    function displayName() {
        var profile = state.profile || {};
        var name = [profile.firstName, profile.lastName].filter(Boolean).join(" ").trim();
        if (name) return name;
        if (state.user && state.user.email) return state.user.email;
        if (state.session && state.session.email) return state.session.email;
        return t("Klant");
    }

    function renderProfile() {
        var profile = state.profile || {};
        var user = state.user || {};
        var name = displayName();
        var email = user.email || (state.session && state.session.email) || "";
        var shareCode = user.shareCode || "—";
        var avatar = state.avatar
            ? '<img src="' + escape(imageSrc(state.avatar)) + '" alt="">'
            : escape(initials(name));
        var details = [
            [t("Naam"), name],
            [t("E-mailadres"), email || t("Niet ingevuld")],
            [t("WhatsApp"), profile.whatsapp || t("Niet ingevuld")],
            [t("Geboortedatum"), profile.birthDate || t("Niet ingevuld")],
            [t("Adres"), profile.address || t("Niet ingevuld")],
            [t("Contact e-mail"), profile.contactEmail || t("Niet ingevuld")]
        ];
        var theme = state.theme;
        var lang = state.lang;
        el.tabContent.innerHTML =
            '<div class="profile-hero">' +
                '<div class="avatar">' + avatar + '</div>' +
                '<div class="grow"><h2>' + escape(name) + '</h2><p>' + escape(email || t("Klant")) + '</p></div>' +
            '</div>' +
            '<div class="card">' +
                '<h2>' + escape(t("Deelcode")) + '</h2>' +
                '<p class="muted">' + escape(t("Deel deze code met support of een andere klant.")) + '</p>' +
                '<div class="share-code"><code>' + escape(shareCode) + '</code><button type="button" class="pill-button" data-profile-action="copy-code">' + escape(t("Kopieer")) + '</button></div>' +
            '</div>' +
            '<div class="card">' +
                '<h2>' + escape(t("Gegevens")) + '</h2>' +
                details.map(function (row) { return '<div class="kv"><span>' + escape(row[0]) + '</span><strong>' + escape(row[1]) + '</strong></div>'; }).join("") +
                '<div class="profile-actions"><button type="button" class="secondary wide" data-profile-action="edit">' + escape(t("Gegevens aanpassen")) + '</button></div>' +
            '</div>' +
            '<div class="card">' +
                '<h2>' + escape(t("Weergave")) + '</h2>' +
                '<div class="setting-row"><span>' + escape(t("Weergave")) + '</span><div class="mini-segmented">' +
                    '<button type="button" data-set-theme="dark" class="' + (theme === "dark" ? "active" : "") + '">' + escape(t("Donker")) + '</button>' +
                    '<button type="button" data-set-theme="light" class="' + (theme === "light" ? "active" : "") + '">' + escape(t("Licht")) + '</button>' +
                    '<button type="button" data-set-theme="system" class="' + (theme === "system" ? "active" : "") + '">' + escape(t("Systeem")) + '</button>' +
                '</div></div>' +
                '<div class="setting-row"><span>' + escape(t("Taal")) + '</span><div class="mini-segmented">' +
                    '<button type="button" data-set-lang="nl" class="' + (lang === "nl" ? "active" : "") + '">NL</button>' +
                    '<button type="button" data-set-lang="en" class="' + (lang === "en" ? "active" : "") + '">EN</button>' +
                '</div></div>' +
            '</div>' +
            '<div class="card">' +
                '<h2>' + escape(t("Foto")) + '</h2>' +
                '<div class="profile-actions">' +
                    '<button type="button" class="secondary wide" data-profile-action="avatar">' + escape(t("Foto kiezen")) + '</button>' +
                    (state.avatar ? '<button type="button" class="ghost-button wide" data-profile-action="remove-avatar">' + escape(t("Foto verwijderen")) + '</button>' : "") +
                '</div>' +
            '</div>' +
            '<div class="profile-actions">' +
                '<button type="button" class="secondary wide" data-profile-action="privacy">' + escape(t("Privacy en veiligheid")) + '</button>' +
                '<button type="button" class="ghost-button wide" data-profile-action="logout">' + escape(t("Uitloggen")) + '</button>' +
                '<button type="button" class="danger wide" data-profile-action="delete-account">' + escape(t("Account verwijderen")) + '</button>' +
            '</div>' +
            '<p class="version">' + escape(t("Versie 0.1.0 (iOS)")) + '</p>';
        if (state.profileError) {
            el.tabContent.insertAdjacentHTML("afterbegin", '<div class="notice">' + escape(state.profileError) + '</div>');
        }
    }

    function openProfileEdit() {
        var profile = state.profile || {};
        el.profileFirst.value = profile.firstName || "";
        el.profileLast.value = profile.lastName || "";
        el.profileBirth.value = profile.birthDate || "";
        el.profileAddress.value = profile.address || "";
        el.profileWhatsapp.value = profile.whatsapp || "";
        el.profileEmail.value = profile.contactEmail || "";
        el.profileError.textContent = "";
        showView("profile-edit");
        setTimeout(function () {
            try { el.profileFirst.focus(); } catch (error) { }
        }, 120);
    }

    async function saveProfile() {
        if (state.savingProfile) return;
        state.savingProfile = true;
        el.profileSave.disabled = true;
        el.profileError.textContent = "";
        var details = {
            firstName: el.profileFirst.value.trim(),
            lastName: el.profileLast.value.trim(),
            birthDate: el.profileBirth.value.trim(),
            address: el.profileAddress.value.trim(),
            whatsapp: el.profileWhatsapp.value.trim(),
            contactEmail: el.profileEmail.value.trim()
        };
        try {
            await api.saveProfile(details);
            state.profile = details;
            state.profileLoadedAt = Date.now();
            showView("main");
            state.tab = "profile";
            renderTab();
            toast(t("Profiel opgeslagen."));
        } catch (error) {
            el.profileError.textContent = error.message || t("Profielgegevens opslaan mislukt.");
        } finally {
            state.savingProfile = false;
            el.profileSave.disabled = false;
        }
    }

    function backToProfile() {
        showView("main");
        state.tab = "profile";
        renderTab();
    }

    async function handleAvatar(file) {
        if (!file) return;
        if (!/^image\//i.test(file.type || "")) {
            toast(t("Afbeelding kon niet worden gelezen."));
            return;
        }
        try {
            var base64 = await resizeAvatar(file);
            if (!base64 || base64.length > 60000) {
                toast(t("Afbeelding is te groot."));
                return;
            }
            await api.saveAvatar(base64);
            state.avatar = base64;
            if (state.view === "main" && state.tab === "profile") renderProfile();
            toast(t("Foto bijgewerkt."));
        } catch (error) {
            toast(error.message || t("Foto uploaden mislukt."));
        }
    }

    function resizeAvatar(file) {
        return new Promise(function (resolve, reject) {
            var reader = new FileReader();
            reader.onerror = function () { reject(new Error(t("Afbeelding kon niet worden gelezen."))); };
            reader.onload = function () {
                var image = new Image();
                image.onerror = function () { reject(new Error(t("Afbeelding kon niet worden gelezen."))); };
                image.onload = function () {
                    try {
                        var side = Math.min(image.width, image.height);
                        var canvas = document.createElement("canvas");
                        canvas.width = 192;
                        canvas.height = 192;
                        var context = canvas.getContext("2d");
                        context.drawImage(image, (image.width - side) / 2, (image.height - side) / 2, side, side, 0, 0, 192, 192);
                        var data = canvas.toDataURL("image/jpeg", 0.85);
                        resolve(String(data).split(",")[1] || "");
                    } catch (error) {
                        reject(error);
                    }
                };
                image.src = reader.result;
            };
            reader.readAsDataURL(file);
        });
    }

    function confirmRemoveAvatar() {
        openConfirm(
            t("Foto verwijderen?"),
            t("Je profielfoto wordt verwijderd."),
            t("Verwijderen"),
            true,
            async function () {
                try {
                    await api.removeAvatar();
                    state.avatar = null;
                    if (state.view === "main" && state.tab === "profile") renderProfile();
                    toast(t("Foto verwijderd."));
                } catch (error) {
                    handleError(error);
                }
            }
        );
    }

    function confirmLogout() {
        openConfirm(
            t("Weet je zeker dat je wilt uitloggen?"),
            t("Je wordt uitgelogd op dit toestel."),
            t("Uitloggen"),
            true,
            function () {
                openConfirm(
                    t("Nog één keer bevestigen: uitloggen?"),
                    t("Je wordt uitgelogd op dit toestel."),
                    t("Uitloggen"),
                    true,
                    function () {
                        showLogin();
                        toast(t("Uitgelogd."));
                    }
                );
            }
        );
    }

    function confirmDeleteAccount() {
        openConfirm(
            t("Account verwijderen?"),
            t("Je account, profiel, notities en gesprekken worden definitief verwijderd. Dit kan niet ongedaan worden."),
            t("Doorgaan"),
            true,
            function () {
                openInputModal(
                    t("Bevestig je wachtwoord"),
                    t("Vul je wachtwoord in om je account te verwijderen."),
                    t("Wachtwoord"),
                    "",
                    "",
                    t("Account verwijderen"),
                    async function (password) {
                        if (!password) {
                            toast(t("Vul je wachtwoord in."));
                            return;
                        }
                        try {
                            await api.reauthenticate(password);
                            await api.deleteAccountPermanently();
                            showLogin();
                            toast(t("Account verwijderd."));
                        } catch (error) {
                            toast(error.message || t("Je account kon niet worden verwijderd. Probeer het opnieuw."));
                        }
                    },
                    "password"
                );
            }
        );
    }

    function handleTabContentClick(event) {
        var target;
        target = event.target.closest("[data-ticket-filter]");
        if (target) {
            state.ticketFilter = target.getAttribute("data-ticket-filter") || "open";
            renderHome();
            return;
        }
        target = event.target.closest("[data-retry-invites]");
        if (target) { loadInvites(true); return; }
        target = event.target.closest("[data-new-invite]");
        if (target) { createInviteFlow(); return; }
        target = event.target.closest("[data-revoke-invite]");
        if (target) { revokeInviteFlow(target.getAttribute("data-revoke-invite")); return; }
        target = event.target.closest("[data-retry-tickets]");
        if (target) { loadTickets(true); return; }
        target = event.target.closest("[data-retry-notes]");
        if (target) { loadNotes(true); return; }
        target = event.target.closest("[data-retry-apps]");
        if (target) { if (supportMode) loadInvites(true); else loadApps(true); return; }
        target = event.target.closest("[data-new-chat]");
        if (target) { newChat(); return; }
        target = event.target.closest("[data-open-ticket]");
        if (target) { openTicket(target.getAttribute("data-open-ticket")); return; }
        target = event.target.closest("[data-notes-tab]");
        if (target) {
            state.notesTab = target.getAttribute("data-notes-tab");
            renderNotes();
            return;
        }
        target = event.target.closest("[data-new-note]");
        if (target) { newNote(); return; }
        target = event.target.closest("[data-open-note]");
        if (target) { openNote(target.getAttribute("data-open-note")); return; }
        target = event.target.closest("[data-app-action]");
        if (target) {
            handleAppAction(target.getAttribute("data-app-action"), target.getAttribute("data-app-id"));
            return;
        }
        target = event.target.closest("[data-profile-action]");
        if (target) {
            handleProfileAction(target.getAttribute("data-profile-action"));
            return;
        }
        target = event.target.closest("[data-set-lang]");
        if (target) {
            setLanguage(target.getAttribute("data-set-lang"));
            return;
        }
        target = event.target.closest("[data-set-theme]");
        if (target) {
            setTheme(target.getAttribute("data-set-theme"));
            return;
        }
        target = event.target.closest("[data-open-url]");
        if (target) {
            event.preventDefault();
            openExternal(target.getAttribute("data-open-url"));
            return;
        }
        target = event.target.closest("[data-copy-url]");
        if (target) {
            copyText(target.getAttribute("data-copy-url") || "");
            toast(t("Link gekopieerd."));
            return;
        }
    }

    function handleTabContentInput(event) {
        if (event.target && event.target.id === "note-search") {
            state.noteQuery = event.target.value;
            renderNoteList();
        }
    }

    function handleMessagesClick(event) {
        var target = event.target.closest("[data-open-url]");
        if (target) {
            event.preventDefault();
            openExternal(target.getAttribute("data-open-url"));
            return;
        }
        target = event.target.closest("[data-retry-messages]");
        if (target) {
            loadMessages(true);
        }
    }

    function handleProfileAction(action) {
        if (action === "copy-code") {
            copyText((state.user && state.user.shareCode) || "");
            toast(t("Gekopieerd."));
        } else if (action === "edit") {
            openProfileEdit();
        } else if (action === "privacy") {
            openInfo(t("Privacy en veiligheid"), t("Je gegevens worden opgeslagen in de beveiligde Firebase-omgeving van Digital Dope Advisors. Alleen jij en support kunnen je gesprekken lezen. Je profielgegevens zijn alleen voor jou en support zichtbaar. Deel je deelcode alleen met mensen die je vertrouwt. Bestanden die je deelt, worden bewaard zolang het gesprek bestaat. Je kunt een gesprek verwijderen; dan worden ook de berichten verwijderd.\n\nTermux, APK-installatie en schermdeling zijn Android-functies en niet beschikbaar op iOS."));
        } else if (action === "logout") {
            confirmLogout();
        } else if (action === "delete-account") {
            confirmDeleteAccount();
        } else if (action === "avatar") {
            el.avatarInput.click();
        } else if (action === "remove-avatar") {
            confirmRemoveAvatar();
        }
    }

    function setLanguage(lang) {
        state.lang = lang === "en" ? "en" : "nl";
        try { localStorage.setItem("dda.lang", state.lang); } catch (error) { }
        applyLanguage();
        if (state.view === "main") renderTab();
        else if (state.view === "chat") {
            renderChatHeader();
            renderMessages("keep", el.messages.scrollTop);
        } else if (state.view === "note-edit") {
            el.noteHeading.textContent = state.editingNote ? (state.editingNote.title || t("Notitie")) : t("Nieuwe notitie");
        }
    }

    function setTheme(theme) {
        state.theme = ["dark", "light", "system"].indexOf(theme) >= 0 ? theme : "system";
        try { localStorage.setItem("dda.theme", state.theme); } catch (error) { }
        applyTheme();
        if (state.view === "main" && state.tab === "profile") renderProfile();
    }

    function applyLanguage() {
        document.documentElement.lang = state.lang === "en" ? "en" : "nl";
        document.querySelectorAll("[data-i18n]").forEach(function (node) {
            node.textContent = t(node.getAttribute("data-i18n"));
        });
        document.querySelectorAll("[data-i18n-placeholder]").forEach(function (node) {
            node.setAttribute("placeholder", t(node.getAttribute("data-i18n-placeholder")));
        });
        document.querySelectorAll("[data-i18n-aria]").forEach(function (node) {
            node.setAttribute("aria-label", t(node.getAttribute("data-i18n-aria")));
        });
        if (el.loginLang) el.loginLang.textContent = state.lang === "en" ? "Nederlands" : "English";
        if (el.loginBtn) el.loginBtn.textContent = t("Inloggen");
        if (el.registerBtn) el.registerBtn.textContent = t("Account aanmaken");
        if (el.noteSave) el.noteSave.textContent = t("Opslaan");
        if (el.noteDelete) el.noteDelete.textContent = t("Notitie verwijderen");
        if (el.noteShareBtn) el.noteShareBtn.textContent = t("Delen");
        if (el.profileSave) el.profileSave.textContent = t("Opslaan");
        if (el.sheetCancel) el.sheetCancel.textContent = t("Annuleren");
    }

    function applyTheme() {
        var effective = state.theme;
        if (effective === "system") {
            effective = window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
        }
        document.documentElement.setAttribute("data-theme", effective);
        document.documentElement.style.colorScheme = effective;
        var meta = document.querySelector('meta[name="theme-color"]');
        if (meta) meta.setAttribute("content", effective === "light" ? "#F3F5FA" : "#0C111C");
        native({ action: "setTheme", theme: effective });
    }

    function openConfirm(title, text, okLabel, danger, action) {
        el.modalTitle.textContent = title;
        el.modalText.textContent = text || "";
        el.modalInputWrap.classList.add("hidden");
        el.modalCancel.classList.remove("hidden");
        el.modalActions.classList.remove("single");
        el.modalOk.textContent = okLabel || t("Doorgaan");
        el.modalOk.className = danger ? "danger" : "";
        state.modalAction = action || null;
        el.modal.classList.remove("hidden");
    }

    function openInfo(title, text) {
        el.modalTitle.textContent = title;
        el.modalText.textContent = text || "";
        el.modalInputWrap.classList.add("hidden");
        el.modalCancel.classList.add("hidden");
        el.modalActions.classList.add("single");
        el.modalOk.textContent = t("Sluiten");
        el.modalOk.className = "";
        state.modalAction = null;
        el.modal.classList.remove("hidden");
    }

    function openInputModal(title, text, label, placeholder, value, okLabel, action, inputType) {
        el.modalTitle.textContent = title;
        el.modalText.textContent = text || "";
        el.modalInputWrap.classList.remove("hidden");
        el.modalInputLabel.textContent = label || "";
        el.modalInput.type = inputType === "password" ? "password" : "text";
        el.modalInput.placeholder = placeholder || "";
        el.modalInput.value = value || "";
        el.modalCancel.classList.remove("hidden");
        el.modalActions.classList.remove("single");
        el.modalOk.textContent = okLabel || t("Doorgaan");
        el.modalOk.className = "";
        state.modalAction = action || null;
        el.modal.classList.remove("hidden");
        setTimeout(function () {
            try { el.modalInput.focus(); } catch (error) { }
        }, 80);
    }

    function closeModal() {
        el.modal.classList.add("hidden");
        state.modalAction = null;
        el.modalInputWrap.classList.add("hidden");
        el.modalCancel.classList.remove("hidden");
        el.modalActions.classList.remove("single");
        el.modalInput.type = "text";
        el.modalInput.value = "";
    }

    function openSheet(title, actions) {
        el.sheetTitle.textContent = title;
        el.sheetActions.innerHTML = "";
        (actions || []).forEach(function (item) {
            var button = document.createElement("button");
            button.type = "button";
            button.textContent = item.label;
            if (item.danger) button.className = "danger";
            button.addEventListener("click", function () {
                closeSheet();
                if (item.action) item.action();
            });
            el.sheetActions.appendChild(button);
        });
        el.sheet.classList.remove("hidden");
    }

    function closeSheet() {
        el.sheet.classList.add("hidden");
        el.sheetActions.innerHTML = "";
    }

    function toast(message) {
        if (!el.toast) return;
        el.toast.textContent = message;
        el.toast.classList.add("show");
        if (state.toastTimer) clearTimeout(state.toastTimer);
        state.toastTimer = setTimeout(function () {
            el.toast.classList.remove("show");
            state.toastTimer = null;
        }, 2800);
    }

    function isSessionError(error) {
        var message = error && error.message ? error.message : "";
        return /Sessie verlopen|Niet ingelogd|not signed in/i.test(message);
    }

    function handleError(error) {
        var message = error && error.message ? error.message : t("Er ging iets mis.");
        if (isSessionError(error)) {
            showLogin(t("Sessie verlopen. Log opnieuw in."));
            return;
        }
        toast(message);
    }

    init();
})();
