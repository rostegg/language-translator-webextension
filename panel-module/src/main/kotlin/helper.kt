package com.rostegg.kotlin.webextensions

/*
response example
{"code":200,"lang":"ru-en","text":["what's my name?"]}
*/
data class YandexResponse(val code:String, val lang:String, val text: String)

external val browser: dynamic

object Endpoints{

    fun getTranslateTextEndpoint(apiKey:String,lang:String,text:String): String {
        return  "https://translate.yandex.net/api/v1.5/tr.json/translate?key=$apiKey&text=$text&lang=$lang"
    }
}

data class Language(val key:String, val value:String)


