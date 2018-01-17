package com.rostegg.test

import org.w3c.dom.HTMLOptionElement
import org.w3c.dom.get

fun main(args: Array<String>) {
    initLanguagesList()
    initDefaultLanguages()

    languageFromMenu.onclick = {
        val languageFrom: dynamic = object{}
        var selectedOption = languageFromMenu.options[languageFromMenu.selectedIndex] as HTMLOptionElement
        languageFrom["language-from"] = Language(selectedOption.value,selectedOption.text)
        browser.storage.local.set(languageFrom)
    }

    languageToMenu.onclick = {
        val languageTo: dynamic = object{}
        var selectedOption = languageToMenu.options[languageToMenu.selectedIndex] as HTMLOptionElement
        languageTo["language-to"] = Language(selectedOption.value,selectedOption.text)
        browser.storage.local.set(languageTo)
    }
}

