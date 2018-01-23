package com.rostegg.kotlin.webextensions

import kotlin.browser.document

fun main(args: Array<String>) {
    if (kotlin.browser.window.asDynamic().hasRun == true)
        return
    kotlin.browser.window.asDynamic().hasRun = true
    checkForMouseUpEvent()
    browser.runtime.onMessage.addListener { message->
        if (message.action === "copy-text") {
            copySelectedText()
        }
    }

}
fun checkForMouseUpEvent(){
    browser.storage.local.get().then({ items ->
        println(items)
        var mouseUpEnabled = items["mouse-event"]
        if (mouseUpEnabled != undefined && mouseUpEnabled == true)
            document.addEventListener("mouseup", { copySelectedText() })
        else
            document.removeEventListener("mouseup", { copySelectedText() })
    })

}

fun copySelectedText(){
    var selectedText = com.rostegg.kotlin.webextensions.window.getSelection().toString()
    console.log(selectedText)
    document.execCommand("Copy")
}

