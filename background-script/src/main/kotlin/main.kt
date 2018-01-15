package com.rostegg.kotlin.webextensions

fun main(args: Array<String>) {
    console.log("init test plugin")
    browser.menus.create(
            jsObject {
                id = "radio-i"
                title = "test"
                contexts = arrayOf("all")
                checked = true
            }
    )
    browser.menus.create(
            jsObject {
                id = "separator-1"
                type = "separator"
                contexts = arrayOf("all")
            }
    )
    browser.menus.create(
            jsObject {
                id = "log-selection"
                title = "log-btn"
                contexts = arrayOf("all")
            }
    )

    browser.commands.onCommand.addListener { command ->
        if (command == "fast-translate") {
            browser.tabs.query(jsObject {active = true; currentWindow = true}).then({tabs ->
                browser.tabs.sendMessage(tabs[0].id!!, jsObject {
                    action = "copy-text"
                })
            })
        }
    }
}