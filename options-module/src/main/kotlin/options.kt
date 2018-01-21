package com.rostegg.kotlin.webextensions

import org.w3c.dom.HTMLOptionElement
import org.w3c.dom.get

fun main(args: Array<String>) {
    initLanguagesList()
    initOptionsElements()

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

    saveApiKeyBtn.onclick = {
        val apiKey: dynamic = object{}
        apiKey["apiKey"] = apiKeyEdit.value
        browser.storage.local.set(apiKey)
        browser.runtime.sendMessage("api-key-changed")
    }

    saveProxyUrlBtn.onclick = {
        val proxyUrl: dynamic = object{}
        proxyUrl["proxyUrl"] = proxyServerUrlEdit.value
        browser.storage.local.set(proxyUrl)
        browser.runtime.sendMessage("proxy-changed")
    }

    enableMouseUpEventCheckBox.onclick = {
        val mouseEvent: dynamic = object{}
        mouseEvent["mouse-event"] = enableMouseUpEventCheckBox.checked
        browser.storage.local.set(mouseEvent)
    }

}

