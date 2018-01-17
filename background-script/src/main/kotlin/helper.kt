package com.rostegg.kotlin.webextensions

external val browser: dynamic

inline fun jsObject(init: dynamic.() -> Unit): dynamic {
    val o = js("{}")
    init(o)
    return o
}

const val YANDEX_API_KEY = "YOUR_API_KEY"

object Endpoints{

    fun getTranslateTextEndpoint(lang:String,text:String): String {
        return  "https://translate.yandex.net/api/v1.5/tr.json/translate?key=$YANDEX_API_KEY&text=$text&lang=$lang"
    }

    fun getLanguageEndpoint(ui:String):String {
        return "https://translate.yandex.net/api/v1.5/tr/getLangs?key=$YANDEX_API_KEY&ui=$ui"
    }
}

data class Language(val key:String, val value:String)