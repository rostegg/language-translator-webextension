if (typeof kotlin === 'undefined') {
  throw new Error("Error loading module 'background-script'. Its dependency 'kotlin' was not found. Please, check whether 'kotlin' is loaded prior to 'background-script'.");
}
this['background-script'] = function (_, Kotlin) {
  'use strict';
  var $$importsForInline$$ = _.$$importsForInline$$ || (_.$$importsForInline$$ = {});
  var defineInlineFunction = Kotlin.defineInlineFunction;
  var Kind_OBJECT = Kotlin.Kind.OBJECT;
  var Kind_CLASS = Kotlin.Kind.CLASS;
  var Unit = Kotlin.kotlin.Unit;
  var ensureNotNull = Kotlin.ensureNotNull;
  var println = Kotlin.kotlin.io.println_s8jyv4$;
  var asList = Kotlin.org.w3c.dom.asList_kt9thq$;
  var jsObject = defineInlineFunction('background-script.com.rostegg.kotlin.webextensions.jsObject_5ij4lk$', function (init) {
    var o = {};
    init(o);
    return o;
  });
  function Endpoints() {
    Endpoints_instance = this;
  }
  Endpoints.prototype.getLanguageEndpoint_puj7f4$ = function (apiKey, ui) {
    return 'https://translate.yandex.net/api/v1.5/tr/getLangs?key=' + apiKey + '&ui=' + ui;
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
  function main$lambda_0(command) {
    if (command == 'api-key-changed') {
      console.log('updating languages');
      updateLanguagesList();
      createDefaultLanguageSettings();
    }
    return Unit;
  }
  function main(args) {
    console.log('running background script..');
    initPlugin();
    browser.commands.onCommand.addListener(main$lambda);
    browser.runtime.onMessage.addListener(main$lambda_0);
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
      var xmlParser = new DOMParser();
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
      var languages = new updateLanguagesList$lambda$lambda$ObjectLiteral();
      var langArray = copyToArray(languagesStrorageList);
      languages['languages-list'] = langArray;
      browser.storage.local.set(languages);
    };
  }
  function updateLanguagesList$lambda(closure$xhttp) {
    return function (items) {
      var localization = items['localization'];
      var apiKey = items['apiKey'];
      var request = Endpoints_getInstance().getLanguageEndpoint_puj7f4$(apiKey, localization);
      closure$xhttp.v.open('GET', request);
      println('executing query ' + request);
      closure$xhttp.v.onload = updateLanguagesList$lambda$lambda(closure$xhttp);
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
  $$importsForInline$$['background-script'] = _;
  var package$com = _.com || (_.com = {});
  var package$rostegg = package$com.rostegg || (package$com.rostegg = {});
  var package$kotlin = package$rostegg.kotlin || (package$rostegg.kotlin = {});
  var package$webextensions = package$kotlin.webextensions || (package$kotlin.webextensions = {});
  package$webextensions.jsObject_5ij4lk$ = jsObject;
  Object.defineProperty(package$webextensions, 'Endpoints', {
    get: Endpoints_getInstance
  });
  package$webextensions.Language = Language;
  package$webextensions.main_kand9s$ = main;
  package$webextensions.initPlugin = initPlugin;
  package$webextensions.initDefaultLocalization = initDefaultLocalization;
  package$webextensions.updateLanguagesList = updateLanguagesList;
  package$webextensions.createDefaultLanguageSettings = createDefaultLanguageSettings;
  main([]);
  Kotlin.defineModule('background-script', _);
  return _;
}(typeof this['background-script'] === 'undefined' ? {} : this['background-script'], kotlin);
