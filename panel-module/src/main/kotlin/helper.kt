package com.rostegg.kotlin.webextensions

/*
response example
{"code":200,"lang":"ru-en","text":["what's my name?"]}
*/
data class YandexResponse(val code:String, val lang:String, val text: String)

/* here is the key from yandex translate api*/

const val YANDEX_API_KEY = "YOUR_API_KEY"


external val browser: dynamic

object Endpoints{

    fun getTranslateTextEndpoint(lang:String,text:String): String {
        return  "https://translate.yandex.net/api/v1.5/tr.json/translate?key=$YANDEX_API_KEY&text=$text&lang=$lang"
    }


    fun getLanguageEndpoint(ui:String):String {
        return "https://translate.yandex.net/api/v1.5/tr/getLangs?key=$YANDEX_API_KEY&ui=$ui"
    }
}

data class Language(val key:String, val value:String)


