import UIKit
import UserNotifications
import WebKit

final class WebViewController: UIViewController {
    private var webView: WKWebView!
    private var bottomConstraint: NSLayoutConstraint!
    private var isLightTheme = false

    override func viewDidLoad() {
        super.viewDidLoad()
        view.backgroundColor = UIColor(red: 12 / 255, green: 17 / 255, blue: 28 / 255, alpha: 1)
        configureWebView()
        loadWebApp()
        observeKeyboard()
    }

    deinit {
        NotificationCenter.default.removeObserver(self)
        webView?.configuration.userContentController.removeScriptMessageHandler(forName: "dda")
    }

    override var preferredStatusBarStyle: UIStatusBarStyle {
        isLightTheme ? .darkContent : .lightContent
    }

    private func configureWebView() {
        let configuration = WKWebViewConfiguration()
        configuration.defaultWebpagePreferences.allowsContentJavaScript = true
        configuration.allowsInlineMediaPlayback = true
        configuration.mediaTypesRequiringUserActionForPlayback = []
        configuration.userContentController.add(WeakScriptMessageHandler(self), name: "dda")

        let webView = WKWebView(frame: .zero, configuration: configuration)
        webView.translatesAutoresizingMaskIntoConstraints = false
        webView.navigationDelegate = self
        webView.uiDelegate = self
        webView.isOpaque = false
        webView.backgroundColor = .clear
        webView.scrollView.backgroundColor = .clear
        webView.scrollView.contentInsetAdjustmentBehavior = .never
        webView.scrollView.keyboardDismissMode = .interactive
        webView.allowsBackForwardNavigationGestures = false

        view.addSubview(webView)
        NSLayoutConstraint.activate([
            webView.topAnchor.constraint(equalTo: view.topAnchor),
            webView.leadingAnchor.constraint(equalTo: view.leadingAnchor),
            webView.trailingAnchor.constraint(equalTo: view.trailingAnchor)
        ])
        bottomConstraint = webView.bottomAnchor.constraint(equalTo: view.bottomAnchor)
        bottomConstraint.isActive = true
        self.webView = webView
    }

    private func loadWebApp() {
        let directoryURL = Bundle.main.url(forResource: "index", withExtension: "html", subdirectory: "www")
            ?? Bundle.main.url(forResource: "index", withExtension: "html")
        guard let url = directoryURL else {
            showFatal("De app-bestanden ontbreken. Installeer de app opnieuw.")
            return
        }
        webView.loadFileURL(url, allowingReadAccessTo: url.deletingLastPathComponent())
    }

    private func showFatal(_ message: String) {
        let html = """
        <!doctype html>
        <html lang="nl">
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
        <style>
        body { margin: 0; min-height: 100vh; display: flex; align-items: center; justify-content: center;
               padding: 28px; background: #0C111C; color: #F5F7FB;
               font: 16px -apple-system, BlinkMacSystemFont, sans-serif; text-align: center; }
        </style>
        <p>\(message)</p>
        </html>
        """
        webView.loadHTMLString(html, baseURL: nil)
    }

    private func observeKeyboard() {
        let center = NotificationCenter.default
        center.addObserver(
            self,
            selector: #selector(keyboardWillChange(_:)),
            name: UIResponder.keyboardWillChangeFrameNotification,
            object: nil
        )
        center.addObserver(
            self,
            selector: #selector(keyboardWillHide(_:)),
            name: UIResponder.keyboardWillHideNotification,
            object: nil
        )
    }

    @objc private func keyboardWillChange(_ notification: Notification) {
        guard
            let frame = notification.userInfo?[UIResponder.keyboardFrameEndUserInfoKey] as? CGRect
        else { return }
        let converted = view.convert(frame, from: nil)
        let overlap = max(0, view.bounds.maxY - converted.minY)
        let duration = notification.userInfo?[UIResponder.keyboardAnimationDurationUserInfoKey] as? Double ?? 0.25
        bottomConstraint.constant = -overlap
        UIView.animate(
            withDuration: duration,
            delay: 0,
            options: [.beginFromCurrentState, .curveEaseOut]
        ) {
            self.view.layoutIfNeeded()
        }
    }

    @objc private func keyboardWillHide(_ notification: Notification) {
        let duration = notification.userInfo?[UIResponder.keyboardAnimationDurationUserInfoKey] as? Double ?? 0.25
        bottomConstraint.constant = 0
        UIView.animate(
            withDuration: duration,
            delay: 0,
            options: [.beginFromCurrentState, .curveEaseOut]
        ) {
            self.view.layoutIfNeeded()
        }
    }

    private func handleBridge(action: String, body: [String: Any]) {
        switch action {
        case "openExternal":
            guard
                let raw = body["url"] as? String,
                let url = URL(string: raw),
                let scheme = url.scheme?.lowercased(),
                ["http", "https", "mailto", "tel"].contains(scheme)
            else { return }
            UIApplication.shared.open(url)

        case "share":
            let text = body["text"] as? String ?? ""
            let rawURL = body["url"] as? String ?? ""
            var items: [Any] = []
            if !text.isEmpty { items.append(text) }
            if !rawURL.isEmpty, let url = URL(string: rawURL) { items.append(url) }
            guard !items.isEmpty else { return }
            let controller = UIActivityViewController(activityItems: items, applicationActivities: nil)
            if let popover = controller.popoverPresentationController {
                popover.sourceView = view
                popover.sourceRect = CGRect(
                    x: view.bounds.midX,
                    y: view.bounds.maxY - 70,
                    width: 1,
                    height: 1
                )
                popover.permittedArrowDirections = []
            }
            if let presented = presentedViewController {
                presented.dismiss(animated: false) { [weak self] in
                    self?.present(controller, animated: true)
                }
            } else {
                present(controller, animated: true)
            }

        case "copy":
            UIPasteboard.general.string = body["text"] as? String ?? ""

        case "haptic":
            let generator = UIImpactFeedbackGenerator(style: .light)
            generator.prepare()
            generator.impactOccurred()

        case "setBadge":
            let count = body["count"] as? Int ?? 0
            setBadge(count)

        case "setTheme":
            let theme = body["theme"] as? String ?? "dark"
            isLightTheme = theme == "light"
            overrideUserInterfaceStyle = isLightTheme ? .light : .dark
            setNeedsStatusBarAppearanceUpdate()

        case "openSettings":
            if let url = URL(string: UIApplication.openSettingsURLString) {
                UIApplication.shared.open(url)
            }

        default:
            break
        }
    }

    private func setBadge(_ count: Int) {
        let center = UNUserNotificationCenter.current()
        let apply = {
            if #available(iOS 16.0, *) {
                center.setBadgeCount(count, withCompletionHandler: nil)
            } else {
                UIApplication.shared.applicationIconBadgeNumber = count
            }
        }
        center.getNotificationSettings { settings in
            if settings.authorizationStatus == .notDetermined {
                guard count > 0 else { return }
                center.requestAuthorization(options: [.badge]) { granted, _ in
                    guard granted else { return }
                    DispatchQueue.main.async(execute: apply)
                }
            } else if settings.authorizationStatus == .authorized
                || settings.authorizationStatus == .provisional
                || settings.authorizationStatus == .ephemeral {
                DispatchQueue.main.async(execute: apply)
            }
        }
    }
}

extension WebViewController: WKScriptMessageHandler {
    func userContentController(
        _ userContentController: WKUserContentController,
        didReceive message: WKScriptMessage
    ) {
        guard
            message.name == "dda",
            let body = message.body as? [String: Any],
            let action = body["action"] as? String
        else { return }
        handleBridge(action: action, body: body)
    }
}

extension WebViewController: WKNavigationDelegate {
    func webView(
        _ webView: WKWebView,
        decidePolicyFor navigationAction: WKNavigationAction,
        decisionHandler: @escaping (WKNavigationActionPolicy) -> Void
    ) {
        guard let url = navigationAction.request.url else {
            decisionHandler(.allow)
            return
        }
        if navigationAction.navigationType == .linkActivated, !url.isFileURL {
            if let scheme = url.scheme?.lowercased(),
               ["http", "https", "mailto", "tel"].contains(scheme) {
                UIApplication.shared.open(url)
                decisionHandler(.cancel)
                return
            }
        }
        decisionHandler(.allow)
    }

    func webViewWebContentProcessDidTerminate(_ webView: WKWebView) {
        webView.reload()
    }
}

extension WebViewController: WKUIDelegate {
    func webView(
        _ webView: WKWebView,
        createWebViewWith configuration: WKWebViewConfiguration,
        for navigationAction: WKNavigationAction,
        windowFeatures: WKWindowFeatures
    ) -> WKWebView? {
        if let url = navigationAction.request.url {
            UIApplication.shared.open(url)
        }
        return nil
    }
}

private final class WeakScriptMessageHandler: NSObject, WKScriptMessageHandler {
    weak var target: WKScriptMessageHandler?

    init(_ target: WKScriptMessageHandler) {
        self.target = target
    }

    func userContentController(
        _ userContentController: WKUserContentController,
        didReceive message: WKScriptMessage
    ) {
        target?.userContentController(userContentController, didReceive: message)
    }
}
