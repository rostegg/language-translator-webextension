package com.rostegg.kotlin.webextensions

import org.w3c.dom.HTMLButtonElement
import org.w3c.dom.HTMLOptionElement
import org.w3c.dom.HTMLSelectElement
import org.w3c.dom.HTMLTextAreaElement
import org.w3c.xhr.XMLHttpRequest
import kotlin.browser.document

val inputPanel = document.querySelector("#input-text") as HTMLTextAreaElement
val outputPanel = document.querySelector("#output-text")  as HTMLTextAreaElement
val languageToMenu = document.querySelector("#language-to") as HTMLSelectElement
val languageFromMenu = document.querySelector("#language-from") as HTMLSelectElement


// TODO options, proxy, copy to textarea, design, save default languages, list with available translates
/*
    options:
    default localization
    default translate languages
    use proxy
    api key
 */
fun main(args: Array<String>) {
    initLanguagesList()

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

fun initLanguagesList()
{
    browser.storage.local.get().then({ items ->
        var languages = items["languages-list"] as Array<Language>
        for (language in languages) {
            insertIntoMenu(language.value, language.key, languageFromMenu)
            insertIntoMenu(language.value, language.key, languageToMenu)
        }
    })
}

fun insertIntoMenu(text:String, value:String, element:HTMLSelectElement){
    var option = document.createElement("option") as HTMLOptionElement
    option.value= value
    option.text = text
    element.add(option)
}

