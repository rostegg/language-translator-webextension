package com.rostegg.kotlin.webextensions

import kotlin.browser.document

fun main(args: Array<String>) {
    console.log("initializing the copy script..")
    if (kotlin.browser.window.asDynamic().hasRun == true)
        return

    kotlin.browser.window.asDynamic().hasRun = true

    browser.runtime.onMessage.addListener { message->
        println("action : " + message)
        if (message.action === "copy-text") {
            var selectedText = com.rostegg.kotlin.webextensions.window.getSelection().toString()
            console.log(selectedText)
            document.execCommand("Copy")
        }
    }
}

