package com.rostegg.kotlin.webextensions

import org.w3c.dom.HTMLOptionElement
import org.w3c.dom.HTMLSelectElement
import org.w3c.dom.get
import org.w3c.xhr.XMLHttpRequest
import kotlin.browser.document
import kotlin.browser.window


// TODO proxy, copy to textarea, ui
fun main(args: Array<String>) {
    initLanguagesList()

    translateBtn.onclick = {
        translateText()
    }

    swapBtn.onclick = {
        swapLanguagesInMenu()
    }
    window.addEventListener("mouseover", { inputPanel.focus()
        document.execCommand("paste")
    })
}

fun translateText(){
    browser.storage.local.get().then({ items ->
        var apiKey = items["apiKey"]
        var text = inputPanel.value
        var fromLanguage = (languageFromMenu.options[languageFromMenu.selectedIndex] as HTMLOptionElement).value
        var toLanguage = (languageToMenu.options[languageToMenu.selectedIndex] as HTMLOptionElement).value
        var request= Endpoints.getTranslateTextEndpoint(apiKey,"$fromLanguage-$toLanguage",text)
        sendRequest(request)
    })
}

fun sendRequest(request: String){
    var xhttp :dynamic= XMLHttpRequest()
    xhttp.open("GET", request)
    xhttp.onload=fun(){
        val response = JSON.parse<YandexResponse>(xhttp.responseText)
        if (errorCodes.keys.contains(response.code))
            browser.runtime.sendMessage(jsObject {
                errorType = "translation-api-error"
                code = response.code
                message = errorCodes[code]
            })
        else
            outputPanel.value = response.text
    }
    xhttp.onerror=fun(){
        browser.runtime.sendMessage("error-translating")
    }
    xhttp.send()
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

