package com.rostegg.kotlin.webextensions

import org.w3c.dom.*
import org.w3c.xhr.XMLHttpRequest
import kotlin.browser.document

val inputPanel = document.querySelector("#input-text") as HTMLTextAreaElement
val outputPanel = document.querySelector("#output-text")  as HTMLTextAreaElement
val languageToMenu = document.querySelector("#language-to") as HTMLSelectElement
val languageFromMenu = document.querySelector("#language-from") as HTMLSelectElement


// TODO proxy, copy to textarea, design
fun main(args: Array<String>) {
    initLanguagesList()

    var translateBtn = document.querySelector("#translate-btn") as HTMLButtonElement
    translateBtn.onclick = {
        translateText()
    }

    var swapBtn = document.querySelector("#swap-btn") as HTMLButtonElement

    swapBtn.onclick = {
        swapLanguagesInMenu()
    }
}

fun translateText(){
    browser.storage.local.get().then({ items ->
        var apiKey = items["apiKey"]
        var text = inputPanel.value
        var xhttp :dynamic= XMLHttpRequest()
        var request= Endpoints.getTranslateTextEndpoint(apiKey,"ru-en",text)
        println("sending request : $request")
        xhttp.open("GET", request)
        xhttp.onload=fun(){
            println(xhttp.responseText)
            val response = JSON.parse<YandexResponse>(xhttp.responseText)
            outputPanel.value = response.text
        }
        xhttp.send()
    })

}

fun swapLanguagesInMenu() {
    languageToMenu.selectedIndex = languageFromMenu.selectedIndex.also { languageFromMenu.selectedIndex = languageToMenu.selectedIndex }
}

fun initLanguagesList() {
    browser.storage.local.get().then({ items ->
        var languages = items["languages-list"] as Array<Language>
        for (language in languages) {
            insertIntoMenu(language.value, language.key, languageFromMenu)
            insertIntoMenu(language.value, language.key, languageToMenu)
        }
        var languageTo = items["language-to"]
        var languageFrom = items["language-from"]
        val languagesCount = languageFromMenu.options.length
        for (i in 0..languagesCount) {
            if ((languageFromMenu.options[i] as HTMLOptionElement ).value == languageFrom.key)
                languageFromMenu.selectedIndex = i
            if ((languageToMenu.options[i] as HTMLOptionElement ).value == languageTo.key)
                languageToMenu.selectedIndex = i
        }
    })

}

fun insertIntoMenu(text:String, value:String, element:HTMLSelectElement){
    var option = document.createElement("option") as HTMLOptionElement
    option.value= value
    option.text = text
    element.add(option)
}

