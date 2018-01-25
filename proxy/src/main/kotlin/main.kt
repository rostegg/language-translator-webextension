const val allow = "DIRECT"

var PROXY_URL = ""
const val PROXY_TAG = "PROXY "

external val browser: dynamic

fun main(args: Array<String>){
    browser.runtime.onMessage.addListener { message->
        if (message.action === "change-proxy-url") {
            PROXY_URL = message.url;
        }
    }
}

fun FindProxyForURL(url:String, host:String):String {
    if (PROXY_URL != "" || PROXY_URL != undefined)
        return PROXY_TAG+PROXY_URL
    return allow
}