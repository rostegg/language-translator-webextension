package com.rostegg.kotlin.webextensions

import org.w3c.dom.*
import kotlin.browser.document

external val browser: dynamic

data class Language(val key:String, val value:String)

val languageFromMenu = document.querySelector("#language-from") as HTMLSelectElement
val languageToMenu = document.querySelector("#language-to") as HTMLSelectElement
val apiKeyEdit = document.querySelector("#api-key-edit") as HTMLInputElement
val proxyServerUrlEdit = document.querySelector("#proxy-edit") as HTMLInputElement

val saveApiKeyBtn = document.querySelector("#save-api-btn") as HTMLAnchorElement
val saveProxyUrlBtn = document.querySelector("#save-proxy-btn") as HTMLAnchorElement

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

fun initProxyAndKeyIfExist(){
    browser.storage.local.get().then({ items ->
        var proxyUrl = items["proxyUrl"]
        var apiKey = items["apiKey"]
        if (proxyUrl != undefined)
            proxyServerUrlEdit.value = proxyUrl
        if (apiKey != undefined)
            apiKeyEdit.value = apiKey
    })
}
