package com.rostegg.kotlin.webextensions

import org.w3c.dom.*
import org.w3c.dom.parsing.DOMParser
import org.w3c.xhr.XMLHttpRequest
import kotlin.browser.document

val inputPanel = document.querySelector("#input-text") as HTMLTextAreaElement
val outputPanel = document.querySelector("#output-text")  as HTMLTextAreaElement
val languageToMenu = document.querySelector("#language-to") as HTMLSelectElement

fun main(args: Array<String>) {
    getLanguages()

    var btn = document.querySelector("#translate-btn") as HTMLButtonElement
    btn.onclick = {
        var text = inputPanel.value
        var xhttp :dynamic= XMLHttpRequest()
        xhttp.open("GET", "https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20171203T152844Z.6e5c9380e6c29cce.1c5aa4d05ce699afbcdf8f0bac9b93c79382aee0&text=$text&lang=ru-en")
        xhttp.onload=fun(){
            println(xhttp.responseText)
            val response = JSON.parse<YandexResponse>(xhttp.responseText)
            outputPanel.value = response.text
        }
        xhttp.send()
    }
}

fun getLanguages()
{
    var xhttp :dynamic= XMLHttpRequest()
    var request = Endpoints.getLanguageEndpoint("en")
    xhttp.open("GET",request )
    xhttp.onload=fun(){
        var xmlParser = DOMParser()
        println("executing query $request")
        var xmlDoc = xmlParser.parseFromString(xhttp.responseText,"text/xml")

        var availableTranslateList = xmlDoc.getElementsByTagName("string")

        var languagesList = xmlDoc.getElementsByTagName("Item")
        languagesList.asList().forEach { language->
            println(language.getAttribute("key") + " - " + language.getAttribute("value") )
            var option = document.createElement("option") as HTMLOptionElement
            option.value= language.getAttribute("key")!!
            option.text =  language.getAttribute("value")!!
            languageToMenu.add(option)
        }


    }

    xhttp.send()
}

