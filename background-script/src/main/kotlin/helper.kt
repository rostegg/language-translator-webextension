package com.rostegg.kotlin.webextensions

import kotlin.js.Promise

external val browser: dynamic
external val window: dynamic

external class Browser {
    val tabs: Tabs
    val extension: Extension
    val contextMenus:ContextMenus
    val menus:Menus
    val i18n:I18n
    val runtime:dynamic
    val commands:dynamic
}

external class I18n{
    fun getMessage(messageName: String):String
}


external class Menus{
    fun create(createProperties: dynamic):String
    val onClicked:dynamic
}

external class ContextMenus{
    fun create(createProperties: dynamic):String
}

external class Tabs {
    fun executeScript(def: Script): Promise<List<Any>>
    fun insertCSS(id: Int, details: CssDetails): Promise<Unit>
    fun removeCSS(id: Int, details: CssDetails): Promise<Unit>
    fun sendMessage(id: Int, message: dynamic): Any
}

external class Extension {
    fun getURL(s: String): String
}

class Tab(val id: Int)

class Script(val file: String)
class CssDetails(val code: String)
class QueryInfo(val active: Boolean, val currentWindow: Boolean)

inline fun jsObject(init: dynamic.() -> Unit): dynamic {
    val o = js("{}")
    init(o)
    return o
}

class ScriptDefinition(val file: String)