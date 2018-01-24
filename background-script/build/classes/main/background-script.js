if (typeof kotlin === 'undefined') {
  throw new Error("Error loading module 'background-script'. Its dependency 'kotlin' was not found. Please, check whether 'kotlin' is loaded prior to 'background-script'.");
}
this['background-script'] = function (_, Kotlin) {
  'use strict';
  var $$importsForInline$$ = _.$$importsForInline$$ || (_.$$importsForInline$$ = {});
  var defineInlineFunction = Kotlin.defineInlineFunction;
  var Kind_OBJECT = Kotlin.Kind.OBJECT;
  var Kind_CLASS = Kotlin.Kind.CLASS;
  var println = Kotlin.kotlin.io.println_s8jyv4$;
  var Unit = Kotlin.kotlin.Unit;
  var ensureNotNull = Kotlin.ensureNotNull;
  var equals = Kotlin.equals;
  var iterator = Kotlin.kotlin.js.iterator_s8jyvk$;
  var PROXY_SCRIPT_URL;
  var jsObject = defineInlineFunction('background-script.com.rostegg.kotlin.webextensions.jsObject_5ij4lk$', function (init) {
    var o = {};
    init(o);
    return o;
  });
  function Endpoints() {
    Endpoints_instance = this;
  }
  Endpoints.prototype.getLanguageEndpoint_puj7f4$ = function (apiKey, ui) {
    return 'https://translate.yandex.net/api/v1.5/tr.json/getLangs?key=' + apiKey + '&ui=' + ui;
  };
  Endpoints.$metadata$ = {
    kind: Kind_OBJECT,
    simpleName: 'Endpoints',
    interfaces: []
  };
  var Endpoints_instance = null;
  function Endpoints_getInstance() {
    if (Endpoints_instance === null) {
      new Endpoints();
    }
    return Endpoints_instance;
  }
  function Language(key, value) {
    this.key = key;
    this.value = value;
  }
  Language.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'Language',
    interfaces: []
  };
  Language.prototype.component1 = function () {
    return this.key;
  };
  Language.prototype.component2 = function () {
    return this.value;
  };
  Language.prototype.copy_puj7f4$ = function (key, value) {
    return new Language(key === void 0 ? this.key : key, value === void 0 ? this.value : value);
  };
  Language.prototype.toString = function () {
    return 'Language(key=' + Kotlin.toString(this.key) + (', value=' + Kotlin.toString(this.value)) + ')';
  };
  Language.prototype.hashCode = function () {
    var result = 0;
    result = result * 31 + Kotlin.hashCode(this.key) | 0;
    result = result * 31 + Kotlin.hashCode(this.value) | 0;
    return result;
  };
  Language.prototype.equals = function (other) {
    return this === other || (other !== null && (typeof other === 'object' && (Object.getPrototypeOf(this) === Object.getPrototypeOf(other) && (Kotlin.equals(this.key, other.key) && Kotlin.equals(this.value, other.value)))));
  };
  function YandexResponse(code, message, dirs, langs) {
    this.code = code;
    this.message = message;
    this.dirs = dirs;
    this.langs = langs;
  }
  YandexResponse.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'YandexResponse',
    interfaces: []
  };
  YandexResponse.prototype.component1 = function () {
    return this.code;
  };
  YandexResponse.prototype.component2 = function () {
    return this.message;
  };
  YandexResponse.prototype.component3 = function () {
    return this.dirs;
  };
  YandexResponse.prototype.component4 = function () {
    return this.langs;
  };
  YandexResponse.prototype.copy_fax0nd$ = function (code, message, dirs, langs) {
    return new YandexResponse(code === void 0 ? this.code : code, message === void 0 ? this.message : message, dirs === void 0 ? this.dirs : dirs, langs === void 0 ? this.langs : langs);
  };
  YandexResponse.prototype.toString = function () {
    return 'YandexResponse(code=' + Kotlin.toString(this.code) + (', message=' + Kotlin.toString(this.message)) + (', dirs=' + Kotlin.toString(this.dirs)) + (', langs=' + Kotlin.toString(this.langs)) + ')';
  };
  YandexResponse.prototype.hashCode = function () {
    var result = 0;
    result = result * 31 + Kotlin.hashCode(this.code) | 0;
    result = result * 31 + Kotlin.hashCode(this.message) | 0;
    result = result * 31 + Kotlin.hashCode(this.dirs) | 0;
    result = result * 31 + Kotlin.hashCode(this.langs) | 0;
    return result;
  };
  YandexResponse.prototype.equals = function (other) {
    return this === other || (other !== null && (typeof other === 'object' && (Object.getPrototypeOf(this) === Object.getPrototypeOf(other) && (Kotlin.equals(this.code, other.code) && Kotlin.equals(this.message, other.message) && Kotlin.equals(this.dirs, other.dirs) && Kotlin.equals(this.langs, other.langs)))));
  };
  function main$lambda$lambda() {
    return Unit;
  }
  function main$lambda() {
    return browser.sidebarAction.open().then(main$lambda$lambda);
  }
  function main$lambda$lambda_0(tabs) {
    var tmp$ = browser.tabs;
    var tmp$_0 = ensureNotNull(tabs[0].id);
    var o = {};
    o.action = 'copy-text';
    return tmp$.sendMessage(tmp$_0, o);
  }
  function main$lambda_0(command) {
    if (command == 'fast-translate') {
      var tmp$ = browser.tabs;
      var o = {};
      o.active = true;
      o.currentWindow = true;
      tmp$.query(o).then(main$lambda$lambda_0);
    }
    return Unit;
  }
  function main$lambda_1(command) {
    if (command === 'api-key-changed') {
      updateLanguagesList();
      createDefaultLanguageSettings();
    }
     else if (command === 'error-translating')
      printNotification('Error', 'An error occurred while translating. Could not send request.');
    else if (command.errorType === 'translation-api-error')
      printNotification('Error', 'An error occurred while translating.' + '\n' + 'Code: ' + command.code + '\n' + 'Status: ' + command.message);
    return Unit;
  }
  function main(args) {
    println('running background script..');
    var contexts = {v: ['all']};
    var tmp$ = browser.menus;
    var o = {};
    o.id = 'translate text';
    o.title = 'Translate text';
    contexts.v = contexts.v;
    tmp$.create(o);
    browser.menus.onClicked.addListener(main$lambda);
    initPlugin();
    browser.proxy.register(PROXY_SCRIPT_URL);
    browser.commands.onCommand.addListener(main$lambda_0);
    browser.runtime.onMessage.addListener(main$lambda_1);
  }
  function initPlugin() {
    browser.storage.local.clear();
    initDefaultLocalization();
    updateLanguagesList();
    createDefaultLanguageSettings();
  }
  function initDefaultLocalization$ObjectLiteral() {
  }
  initDefaultLocalization$ObjectLiteral.$metadata$ = {
    kind: Kind_CLASS,
    interfaces: []
  };
  function initDefaultLocalization() {
    var localization = new initDefaultLocalization$ObjectLiteral();
    localization['localization'] = 'en';
    browser.storage.local.set(localization);
  }
  function updateLanguagesList$lambda$lambda$ObjectLiteral() {
  }
  updateLanguagesList$lambda$lambda$ObjectLiteral.$metadata$ = {
    kind: Kind_CLASS,
    interfaces: []
  };
  var HashSet_init = Kotlin.kotlin.collections.HashSet_init_287e2$;
  var copyToArray = Kotlin.kotlin.collections.copyToArray;
  function updateLanguagesList$lambda$lambda(closure$xhttp) {
    return function () {
      var tmp$;
      var response = JSON.parse(closure$xhttp.v.responseText);
      if (!equals(response.code, undefined))
        printNotification('Key validation error', 'Code: ' + response.code + '\n' + 'Status: ' + response.message);
      else {
        var languagesStorageList = HashSet_init();
        tmp$ = iterator(Object.keys(response.langs));
        while (tmp$.hasNext()) {
          var key = tmp$.next();
          languagesStorageList.add_11rb$(new Language(key, response.langs[key]));
        }
        var languages = new updateLanguagesList$lambda$lambda$ObjectLiteral();
        var langArray = copyToArray(languagesStorageList);
        languages['languages-list'] = langArray;
        browser.storage.local.set(languages);
        printNotification('Good', 'The key was successfully validated, enjoy.');
      }
    };
  }
  function updateLanguagesList$lambda$lambda_0() {
    printNotification('Error', 'First try to insert a valid key from Yandex in the options menu');
  }
  function updateLanguagesList$lambda(closure$xhttp) {
    return function (items) {
      var localization = items['localization'];
      var apiKey = items['apiKey'];
      var request = Endpoints_getInstance().getLanguageEndpoint_puj7f4$(apiKey, localization);
      closure$xhttp.v.open('GET', request);
      closure$xhttp.v.onload = updateLanguagesList$lambda$lambda(closure$xhttp);
      closure$xhttp.v.onerror = updateLanguagesList$lambda$lambda_0;
      return closure$xhttp.v.send();
    };
  }
  function updateLanguagesList() {
    var xhttp = {v: new XMLHttpRequest()};
    browser.storage.local.get().then(updateLanguagesList$lambda(xhttp));
  }
  function createDefaultLanguageSettings$ObjectLiteral() {
  }
  createDefaultLanguageSettings$ObjectLiteral.$metadata$ = {
    kind: Kind_CLASS,
    interfaces: []
  };
  function createDefaultLanguageSettings$ObjectLiteral_0() {
  }
  createDefaultLanguageSettings$ObjectLiteral_0.$metadata$ = {
    kind: Kind_CLASS,
    interfaces: []
  };
  function createDefaultLanguageSettings() {
    var languageFrom = new createDefaultLanguageSettings$ObjectLiteral();
    languageFrom['language-from'] = new Language('ru', 'Russian');
    browser.storage.local.set(languageFrom);
    var languageTo = new createDefaultLanguageSettings$ObjectLiteral_0();
    languageTo['language-to'] = new Language('en', 'English');
    browser.storage.local.set(languageTo);
  }
  function printNotification(title, message) {
    var tmp$ = browser.notifications;
    var o = {};
    o.type = 'basic';
    o.title = title;
    o.message = message;
    o.iconUrl = browser.extension.getURL('icons/translator.svg');
    tmp$.create(o);
  }
  var package$com = _.com || (_.com = {});
  var package$rostegg = package$com.rostegg || (package$com.rostegg = {});
  var package$kotlin = package$rostegg.kotlin || (package$rostegg.kotlin = {});
  var package$webextensions = package$kotlin.webextensions || (package$kotlin.webextensions = {});
  Object.defineProperty(package$webextensions, 'PROXY_SCRIPT_URL', {
    get: function () {
      return PROXY_SCRIPT_URL;
    }
  });
  $$importsForInline$$['background-script'] = _;
  package$webextensions.jsObject_5ij4lk$ = jsObject;
  Object.defineProperty(package$webextensions, 'Endpoints', {
    get: Endpoints_getInstance
  });
  package$webextensions.Language = Language;
  package$webextensions.YandexResponse = YandexResponse;
  package$webextensions.main_kand9s$ = main;
  package$webextensions.initPlugin = initPlugin;
  package$webextensions.initDefaultLocalization = initDefaultLocalization;
  package$webextensions.updateLanguagesList = updateLanguagesList;
  package$webextensions.createDefaultLanguageSettings = createDefaultLanguageSettings;
  package$webextensions.printNotification_puj7f4$ = printNotification;
  PROXY_SCRIPT_URL = 'proxy/proxy-settings.js';
  main([]);
  Kotlin.defineModule('background-script', _);
  return _;
}(typeof this['background-script'] === 'undefined' ? {} : this['background-script'], kotlin);
