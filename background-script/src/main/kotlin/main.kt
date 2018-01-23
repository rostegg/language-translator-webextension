package com.rostegg.kotlin.webextensions

import org.w3c.xhr.XMLHttpRequest

fun main(args: Array<String>) {
    println("running background script..")

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
        if (command === "api-key-changed"){
            updateLanguagesList()
            createDefaultLanguageSettings()
        }
        else if (command === "proxy-changed") {
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
        xhttp.open("GET",request)
        xhttp.onload=fun(){
            println(xhttp.responseText)
            val response = JSON.parse<YandexResponse>(xhttp.responseText)
            if (response.code != undefined)
                printNotification("Key validation error",
                        "Code: ${response.code}\nStatus: ${response.message}")
            else{
                val languagesStorageList = hashSetOf<Language>()
                for (key in js("Object").keys(response.langs)){
                    languagesStorageList.add(
                            Language(key,response.langs[key])
                    )
                }
                val languages: dynamic = object{}
                // convert Set to Array, because kotlin.collections not mapped to any js type
                // more info https://kotlinlang.org/docs/reference/js-to-kotlin-interop.html
                val langArray = languagesStorageList.toTypedArray()
                languages["languages-list"] = langArray
                browser.storage.local.set(languages)
                printNotification("Good", "The key was successfully validated, enjoy.")
            }

        }
        xhttp.onerror = fun(){
            printNotification("Error", "First try to insert a valid key from Yandex in the options menu")
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

fun printNotification(title:String, message:String){
    browser.notifications.create(jsObject {
        type="basic"
        this.title = title
        this.message = message
        iconUrl = browser.extension.getURL("icons/translator.svg")
    })
}