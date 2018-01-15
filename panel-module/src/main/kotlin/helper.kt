package com.rostegg.kotlin.webextensions

/*
response example
{"code":200,"lang":"ru-en","text":["what's my name?"]}
*/
data class YandexResponse(val code:String, val lang:String, val text: String)

/* here is the key from yandex translate api*/


object Endpoints{
    val TRANSLATE_TEXT = ""
}