package com.rostegg.kotlin.webextensions

import org.w3c.dom.asList
import org.w3c.dom.parsing.DOMParser
import org.w3c.xhr.XMLHttpRequest

fun main(args: Array<String>) {
    console.log("running background script..")
    initPlugin()

    // listen for shortcuts
    browser.commands.onCommand.addListener { command ->
        if (command == "fast-translate") {
            browser.tabs.query(jsObject {active = true; currentWindow = true}).then({tabs ->
                browser.tabs.sendMessage(tabs[0].id!!, jsObject {
                    action = "copy-text"
                })
            })
        }
    }

    // listen for options changes
    browser.runtime.onMessage.addListener{ command ->
        if (command == "api-key-changed"){
            console.log("updating languages")
            updateLanguagesList()
            createDefaultLanguageSettings()
        }
        else if (command == "proxy-changed") {
            // in progress
        }
    }
}

fun initPlugin() {
    browser.storage.local.clear()
    initDefaultLocalization()
    updateLanguagesList()
    createDefaultLanguageSettings()
}

fun initDefaultLocalization() {
    val localization: dynamic = object{}
    localization["localization"] = "en"
    browser.storage.local.set(localization)
}

fun updateLanguagesList() {

    var xhttp :dynamic= XMLHttpRequest()
    browser.storage.local.get().then({ items ->
        var localization = items["localization"]
        var apiKey = items["apiKey"]
        var request = Endpoints.getLanguageEndpoint(apiKey,localization)
        xhttp.open("GET",request )
        println("executing query $request")
        xhttp.onload=fun(){
            var xmlParser = DOMParser()

            var xmlDoc = xmlParser.parseFromString(xhttp.responseText,"text/xml")
            var languagesList = xmlDoc.getElementsByTagName("Item")
            val languagesStrorageList = hashSetOf<Language>()
            languagesList.asList().forEach { language->
                println("loaded : " + language.getAttribute("key") + " - " + language.getAttribute("value"))
                languagesStrorageList.add(
                        Language(language.getAttribute("key")!!,language.getAttribute("value")!!)
                )
            }
            val languages: dynamic = object{}
            // convert Set to Array, because kotlin.collections not mapped to any js type
            // more info https://kotlinlang.org/docs/reference/js-to-kotlin-interop.html
            val langArray = languagesStrorageList.toTypedArray()
            languages["languages-list"] = langArray
            browser.storage.local.set(languages)

        }
        xhttp.send()
    })

}

fun createDefaultLanguageSettings(){
    val languageFrom: dynamic = object{}
    languageFrom["language-from"] = Language("ru","Russian")
    browser.storage.local.set(languageFrom)

    val languageTo: dynamic = object{}
    languageTo["language-to"] = Language("en","English")
    browser.storage.local.set(languageTo)
}

