package com.rostegg.kotlin.webextensions

import org.w3c.dom.HTMLSelectElement
import org.w3c.dom.HTMLTextAreaElement
import kotlin.browser.document

/*
response example
{"code":200,"lang":"ru-en","text":["what's my name?"]}
*/
data class YandexResponse(val code:String, val lang:String, val text: String)

external val browser: dynamic

val inputPanel = document.querySelector("#input-text") as HTMLTextAreaElement
val outputPanel = document.querySelector("#output-text")  as HTMLTextAreaElement
val languageToMenu = document.querySelector("#language-to") as HTMLSelectElement
val languageFromMenu = document.querySelector("#language-from") as HTMLSelectElement

val errorCodes:HashMap<String,String> = hashMapOf("422" to "Text can not be translated",
                                                  "413" to "Maximum text size exceeded",
                                                  "404" to "The daily limit on the volume of the translated text was exceeded",
                                                  "402" to "API Key Locked",
                                                  "401" to "Invalid API key",
                                                  "501" to "Specified translation direction is not supported")

object Endpoints{
    fun getTranslateTextEndpoint(apiKey:String,lang:String,text:String): String {
        return  "https://translate.yandex.net/api/v1.5/tr.json/translate?key=$apiKey&text=$text&lang=$lang"
    }
}

inline fun jsObject(init: dynamic.() -> Unit): dynamic {
    val o = js("{}")
    init(o)
    return o
}

data class Language(val key:String, val value:String)


