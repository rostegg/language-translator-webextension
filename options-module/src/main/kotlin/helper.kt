package com.rostegg.test

import org.w3c.dom.HTMLInputElement
import org.w3c.dom.HTMLOptionElement
import org.w3c.dom.HTMLSelectElement
import org.w3c.dom.get
import kotlin.browser.document

external val browser: dynamic

data class Language(val key:String, val value:String)


val languageFromMenu = document.querySelector("#language-from") as HTMLSelectElement
val languageToMenu = document.querySelector("#language-to") as HTMLSelectElement
val apiKeyEdit = document.querySelector("#api-key-edit") as HTMLInputElement
val proxyServerEdit = document.querySelector("#proxy-edit") as HTMLInputElement



fun initLanguagesList() {
    browser.storage.local.get().then({ items ->
        var languages = items["languages-list"] as Array<Language>
        for (language in languages) {
            insertIntoMenu(language.value, language.key, languageFromMenu)
            insertIntoMenu(language.value, language.key, languageToMenu)
        }
    })
}

fun initDefaultLanguages(){
    browser.storage.local.get().then({ items ->
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

fun insertIntoMenu(text:String, value:String, element: HTMLSelectElement){
    var option = document.createElement("option") as HTMLOptionElement
    option.value= value
    option.text = text
    element.add(option)
}
