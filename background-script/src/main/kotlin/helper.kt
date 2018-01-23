package com.rostegg.kotlin.webextensions

external val browser: dynamic

inline fun jsObject(init: dynamic.() -> Unit): dynamic {
    val o = js("{}")
    init(o)
    return o
}

object Endpoints{
    fun getLanguageEndpoint(apiKey:String,ui:String):String {
        return "https://translate.yandex.net/api/v1.5/tr.json/getLangs?key=$apiKey&ui=$ui"
    }
}

data class Language(val key:String, val value:String)

data class YandexResponse(val code:String, val message: String, val dirs: Array<String>, val langs:dynamic)


