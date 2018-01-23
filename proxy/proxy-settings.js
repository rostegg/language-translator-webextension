const allow = "DIRECT"

var PROXY_URL = ""
const PROXY_TAG = "PROXY "

browser.runtime.onMessage.addListener((message) => {
    if (message.action === "change-proxy-url") {
        PROXY_URL = message.url;
    }
});

function FindProxyForURL(url, host) {
    if (PROXY_URL != "" || PROXY_URL != undefined) {
        return PROXY_TAG+PROXY_URL;
    }
    return allow;
}