package com.rostegg.kotlin.webextensions

import org.w3c.dom.*
import org.w3c.dom.parsing.DOMParser
import org.w3c.xhr.XMLHttpRequest
import kotlin.browser.document

val inputPanel = document.querySelector("#input-text") as HTMLTextAreaElement
val outputPanel = document.querySelector("#output-text")  as HTMLTextAreaElement
val languageToMenu = document.querySelector("#language-to") as HTMLSelectElement
val languageFromMenu = document.querySelector("#language-from") as HTMLSelectElement

fun main(args: Array<String>) {
    setupLanguagesList()

    var btn = document.querySelector("#translate-btn") as HTMLButtonElement
    btn.onclick = {
        var text = inputPanel.value
        var xhttp :dynamic= XMLHttpRequest()
        var request= Endpoints.getTranslateTextEndpoint("ru-en",text)
        println("sending request : $request")
        xhttp.open("GET", request)
        xhttp.onload=fun(){
            println(xhttp.responseText)
            val response = JSON.parse<YandexResponse>(xhttp.responseText)
            outputPanel.value = response.text
        }
        xhttp.send()
    }

    var swapBtn = document.querySelector("#swap-btn") as HTMLButtonElement

    swapBtn.onclick = {
        swapLanguagesInMenu()
    }
}

fun swapLanguagesInMenu() {
    languageToMenu.selectedIndex = languageFromMenu.selectedIndex.also { languageFromMenu.selectedIndex = languageToMenu.selectedIndex }
}

fun setupLanguagesList()
{
    var xhttp :dynamic= XMLHttpRequest()
    var request = Endpoints.getLanguageEndpoint("en")
    xhttp.open("GET",request )
    xhttp.onload=fun(){
        var xmlParser = DOMParser()
        println("executing query $request")
        var xmlDoc = xmlParser.parseFromString(xhttp.responseText,"text/xml")
        var languagesList = xmlDoc.getElementsByTagName("Item")
        languagesList.asList().forEach { language->
            println(language.getAttribute("key") + " - " + language.getAttribute("value"))
            insertIntoMenu(language.getAttribute("value")!!,language.getAttribute("key")!!, languageToMenu)
            insertIntoMenu(language.getAttribute("value")!!,language.getAttribute("key")!!, languageFromMenu)
        }
    }
    xhttp.send()
}

fun insertIntoMenu(text:String, value:String, element:HTMLSelectElement){
    var option = document.createElement("option") as HTMLOptionElement
    option.value= value
    option.text = text
    element.add(option)
}

