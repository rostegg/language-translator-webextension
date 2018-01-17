package com.rostegg.test

import org.w3c.dom.HTMLInputElement
import org.w3c.dom.HTMLOptionElement
import org.w3c.dom.HTMLSelectElement
import kotlin.browser.document

external val browser: dynamic


val languageFromMenu = document.querySelector("#language-from") as HTMLSelectElement
val languageToMenu = document.querySelector("#language-to") as HTMLSelectElement
val apiKeyEdit = document.querySelector("#api-key-edit") as HTMLInputElement
val proxyServerEdit = document.querySelector("#proxy-edit") as HTMLInputElement



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

fun insertIntoMenu(text:String, value:String, element: HTMLSelectElement){
    var option = document.createElement("option") as HTMLOptionElement
    option.value= value
    option.text = text
    element.add(option)
}

data class Language(val key:String, val value:String)
