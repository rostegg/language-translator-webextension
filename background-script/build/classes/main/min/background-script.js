if (typeof kotlin === 'undefined') {
  throw new Error("Error loading module 'background-script'. Its dependency 'kotlin' was not found. Please, check whether 'kotlin' is loaded prior to 'background-script'.");
}
this['background-script'] = function (_, Kotlin) {
  'use strict';
  var defineInlineFunction = Kotlin.defineInlineFunction;
  var Kind_OBJECT = Kotlin.Kind.OBJECT;
  var Kind_CLASS = Kotlin.Kind.CLASS;
  var Unit = Kotlin.kotlin.Unit;
  var ensureNotNull = Kotlin.ensureNotNull;
  var println = Kotlin.kotlin.io.println_s8jyv4$;
  var asList = Kotlin.org.w3c.dom.asList_kt9thq$;
  var YANDEX_API_KEY;
  function Endpoints() {
    Endpoints_instance = this;
  }
  Endpoints.prototype.getTranslateTextEndpoint_puj7f4$ = function (lang, text) {
    return 'https://translate.yandex.net/api/v1.5/tr.json/translate?key=' + YANDEX_API_KEY + '&text=' + text + '&lang=' + lang;
  };
  Endpoints.prototype.getLanguageEndpoint_61zpoe$ = function (ui) {
    return 'https://translate.yandex.net/api/v1.5/tr/getLangs?key=' + YANDEX_API_KEY + '&ui=' + ui;
  };
  Endpoints.$metadata$ = {kind: Kind_OBJECT, simpleName: 'Endpoints', interfaces: []};
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
  Language.$metadata$ = {kind: Kind_CLASS, simpleName: 'Language', interfaces: []};
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
  function main$lambda$lambda(tabs) {
    var tmp$ = browser.tabs;
    var tmp$_0 = ensureNotNull(tabs[0].id);
    var o = {};
    o.action = 'copy-text';
    return tmp$.sendMessage(tmp$_0, o);
  }
  function main$lambda(command) {
    if (command == 'fast-translate') {
      var tmp$ = browser.tabs;
      var o = {};
      o.active = true;
      o.currentWindow = true;
      tmp$.query(o).then(main$lambda$lambda);
    }
    return Unit;
  }
  function main(args) {
    console.log('running background script');
    initPlugin();
    browser.commands.onCommand.addListener(main$lambda);
  }
  function initPlugin() {
    browser.storage.local.clear();
    updateLanguagesList();
    createDefaultLanguageSettings();
  }
  function updateLanguagesList$lambda$ObjectLiteral() {
  }
  updateLanguagesList$lambda$ObjectLiteral.$metadata$ = {kind: Kind_CLASS, interfaces: []};
  var HashSet_init = Kotlin.kotlin.collections.HashSet_init_287e2$;
  var copyToArray = Kotlin.kotlin.collections.copyToArray;
  function updateLanguagesList$lambda(closure$request, closure$xhttp) {
    return function () {
      var xmlParser = new DOMParser();
      println('executing query ' + closure$request.v);
      var xmlDoc = xmlParser.parseFromString(closure$xhttp.v.responseText, 'text/xml');
      var languagesList = xmlDoc.getElementsByTagName('Item');
      var languagesStrorageList = HashSet_init();
      var tmp$;
      tmp$ = asList(languagesList).iterator();
      while (tmp$.hasNext()) {
        var element = tmp$.next();
        println('loaded : ' + element.getAttribute('key') + ' - ' + element.getAttribute('value'));
        languagesStrorageList.add_11rb$(new Language(ensureNotNull(element.getAttribute('key')), ensureNotNull(element.getAttribute('value'))));
      }
      var languages = new updateLanguagesList$lambda$ObjectLiteral();
      var langArray = copyToArray(languagesStrorageList);
      languages['languages-list'] = langArray;
      browser.storage.local.set(languages);
    };
  }
  function updateLanguagesList() {
    var xhttp = {v: new XMLHttpRequest()};
    var request = {v: Endpoints_getInstance().getLanguageEndpoint_61zpoe$('en')};
    xhttp.v.open('GET', request.v);
    xhttp.v.onload = updateLanguagesList$lambda(request, xhttp);
    xhttp.v.send();
  }
  function createDefaultLanguageSettings() {
  }
  var package$com = _.com || (_.com = {});
  var package$rostegg = package$com.rostegg || (package$com.rostegg = {});
  var package$kotlin = package$rostegg.kotlin || (package$rostegg.kotlin = {});
  var package$webextensions = package$kotlin.webextensions || (package$kotlin.webextensions = {});
  Object.defineProperty(package$webextensions, 'Endpoints', {get: Endpoints_getInstance});
  package$webextensions.Language = Language;
  package$webextensions.main_kand9s$ = main;
  package$webextensions.initPlugin = initPlugin;
  package$webextensions.updateLanguagesList = updateLanguagesList;
  package$webextensions.createDefaultLanguageSettings = createDefaultLanguageSettings;
  YANDEX_API_KEY = 'YOUR_API_KEY';
  main([]);
  return _;
}(typeof this['background-script'] === 'undefined' ? {} : this['background-script'], kotlin);

//# sourceMappingURL=background-script.js.map
