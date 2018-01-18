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

object Endpoints{

    fun getTranslateTextEndpoint(apiKey:String,lang:String,text:String): String {
        return  "https://translate.yandex.net/api/v1.5/tr.json/translate?key=$apiKey&text=$text&lang=$lang"
    }
}

data class Language(val key:String, val value:String)


