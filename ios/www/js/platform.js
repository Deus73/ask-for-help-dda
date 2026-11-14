(function (root) {
    "use strict";
    var desktop = !!root.ddaDesktop;
    var system = desktop && root.ddaDesktop.platform === "linux" ? "Linux" : "Windows";
    root.DdaPlatform = {
        desktop: desktop,
        brand: desktop ? "ASK FOR HELP" : "ASK HELP DDA",
        text: function (value, english) {
            if (!desktop) return value;
            if (value === "Op iOS kun je Apple-profielen installeren. Android-apps zijn alleen voor Android." ||
                value === "On iOS you can install Apple profiles. Android apps are for Android only.") {
                return english
                    ? "Download or share app links. APK files require Android; Apple profiles require an Apple device. They cannot be installed on " + system + "."
                    : "Download of deel app-links. APK-bestanden vereisen Android; Apple-profielen een Apple-apparaat. Je kunt ze niet op " + system + " installeren.";
            }
            if (value === "Profiel installeren" || value === "Install profile") return english ? "Download profile" : "Profiel downloaden";
            return String(value).replace(/ASK HELP DDA/g, "ASK FOR HELP").replace(/iOS/g, system);
        }
    };
    if (!desktop) return;
    document.title = "ASK FOR HELP";
    document.body.classList.add("desktop");
    document.querySelectorAll("h1").forEach(function (heading) {
        if (heading.textContent === "ASK HELP DDA") heading.textContent = "ASK FOR HELP";
    });

    var activeOverlay = null;
    var previousFocus = null;
    function syncOverlay() {
        var overlay = document.querySelector(".modal:not(.hidden)");
        document.querySelectorAll(".view").forEach(function (view) { view.inert = !!overlay; });
        if (overlay === activeOverlay) return;
        if (overlay) {
            if (!activeOverlay) previousFocus = document.activeElement;
            activeOverlay = overlay;
            var first = overlay.querySelector("input:not(.hidden), button:not(.hidden)");
            // The input wrapper may be hidden even though the input itself is not.
            var controls = Array.from(overlay.querySelectorAll("input, button")).filter(function (node) {
                return !node.disabled && node.getClientRects().length;
            });
            first = controls[0];
            if (first) first.focus();
        } else {
            activeOverlay = null;
            if (previousFocus && previousFocus.isConnected) previousFocus.focus();
            previousFocus = null;
        }
    }
    new MutationObserver(syncOverlay).observe(document.body, { subtree: true, attributes: true, attributeFilter: ["class"] });
    document.addEventListener("keydown", function (event) {
        if (!activeOverlay) return;
        if (event.key === "Escape") {
            event.preventDefault();
            var cancel = activeOverlay.querySelector("#modal-cancel:not(.hidden), #sheet-cancel, #modal-ok");
            if (cancel) cancel.click();
        } else if (event.key === "Tab") {
            var controls = Array.from(activeOverlay.querySelectorAll("button, input, a[href]")).filter(function (node) {
                return !node.disabled && node.getClientRects().length;
            });
            if (!controls.length) return;
            var index = controls.indexOf(document.activeElement);
            if (event.shiftKey && index <= 0) { event.preventDefault(); controls[controls.length - 1].focus(); }
            else if (!event.shiftKey && (index < 0 || index === controls.length - 1)) { event.preventDefault(); controls[0].focus(); }
        }
    });
})(window);
