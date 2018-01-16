if (typeof kotlin === 'undefined') {
  throw new Error("Error loading module 'panel-module'. Its dependency 'kotlin' was not found. Please, check whether 'kotlin' is loaded prior to 'panel-module'.");
}
this['panel-module'] = function (_, Kotlin) {
  'use strict';
  var Kind_CLASS = Kotlin.Kind.CLASS;
  var Kind_OBJECT = Kotlin.Kind.OBJECT;
  var throwCCE = Kotlin.throwCCE;
  var println = Kotlin.kotlin.io.println_s8jyv4$;
  var Unit = Kotlin.kotlin.Unit;
  var asList = Kotlin.org.w3c.dom.asList_kt9thq$;
  var ensureNotNull = Kotlin.ensureNotNull;
  function YandexResponse(code, lang, text) {
    this.code = code;
    this.lang = lang;
    this.text = text;
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
    return this.lang;
  };
  YandexResponse.prototype.component3 = function () {
    return this.text;
  };
  YandexResponse.prototype.copy_6hosri$ = function (code, lang, text) {
    return new YandexResponse(code === void 0 ? this.code : code, lang === void 0 ? this.lang : lang, text === void 0 ? this.text : text);
  };
  YandexResponse.prototype.toString = function () {
    return 'YandexResponse(code=' + Kotlin.toString(this.code) + (', lang=' + Kotlin.toString(this.lang)) + (', text=' + Kotlin.toString(this.text)) + ')';
  };
  YandexResponse.prototype.hashCode = function () {
    var result = 0;
    result = result * 31 + Kotlin.hashCode(this.code) | 0;
    result = result * 31 + Kotlin.hashCode(this.lang) | 0;
    result = result * 31 + Kotlin.hashCode(this.text) | 0;
    return result;
  };
  YandexResponse.prototype.equals = function (other) {
    return this === other || (other !== null && (typeof other === 'object' && (Object.getPrototypeOf(this) === Object.getPrototypeOf(other) && (Kotlin.equals(this.code, other.code) && Kotlin.equals(this.lang, other.lang) && Kotlin.equals(this.text, other.text)))));
  };
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
  var inputPanel;
  var outputPanel;
  var languageToMenu;
  var languageFromMenu;
  function main$lambda$lambda(closure$xhttp) {
    return function () {
      println(closure$xhttp.v.responseText);
      var response = JSON.parse(closure$xhttp.v.responseText);
      outputPanel.value = response.text;
    };
  }
  function main$lambda(it) {
    var text = inputPanel.value;
    var xhttp = {v: new XMLHttpRequest()};
    var request = Endpoints_getInstance().getTranslateTextEndpoint_puj7f4$('ru-en', text);
    println('sending request : ' + request);
    xhttp.v.open('GET', request);
    xhttp.v.onload = main$lambda$lambda(xhttp);
    return xhttp.v.send();
  }
  function main$lambda_0(it) {
    swapLanguagesInMenu();
    return Unit;
  }
  function main(args) {
    var tmp$, tmp$_0;
    setupLanguagesList();
    var btn = Kotlin.isType(tmp$ = document.querySelector('#translate-btn'), HTMLButtonElement) ? tmp$ : throwCCE();
    btn.onclick = main$lambda;
    var swapBtn = Kotlin.isType(tmp$_0 = document.querySelector('#swap-btn'), HTMLButtonElement) ? tmp$_0 : throwCCE();
    swapBtn.onclick = main$lambda_0;
  }
  function swapLanguagesInMenu() {
    languageToMenu.selectedIndex = languageToMenu.selectedIndex + languageFromMenu.selectedIndex | 0;
    languageFromMenu.selectedIndex = languageToMenu.selectedIndex - languageFromMenu.selectedIndex | 0;
    languageToMenu.selectedIndex = languageToMenu.selectedIndex - languageFromMenu.selectedIndex | 0;
  }
  function setupLanguagesList$lambda(closure$request, closure$xhttp) {
    return function () {
      var xmlParser = new DOMParser();
      println('executing query ' + closure$request.v);
      var xmlDoc = xmlParser.parseFromString(closure$xhttp.v.responseText, 'text/xml');
      var languagesList = xmlDoc.getElementsByTagName('Item');
      var tmp$;
      tmp$ = asList(languagesList).iterator();
      while (tmp$.hasNext()) {
        var element = tmp$.next();
        println(element.getAttribute('key') + ' - ' + element.getAttribute('value'));
        insertIntoMenu(ensureNotNull(element.getAttribute('value')), ensureNotNull(element.getAttribute('key')), languageToMenu);
        insertIntoMenu(ensureNotNull(element.getAttribute('value')), ensureNotNull(element.getAttribute('key')), languageFromMenu);
      }
    };
  }
  function setupLanguagesList() {
    var xhttp = {v: new XMLHttpRequest()};
    var request = {v: Endpoints_getInstance().getLanguageEndpoint_61zpoe$('en')};
    xhttp.v.open('GET', request.v);
    xhttp.v.onload = setupLanguagesList$lambda(request, xhttp);
    xhttp.v.send();
  }
  function insertIntoMenu(text, value, element) {
    var tmp$;
    var option = Kotlin.isType(tmp$ = document.createElement('option'), HTMLOptionElement) ? tmp$ : throwCCE();
    option.value = value;
    option.text = text;
    element.add(option);
  }
  var package$com = _.com || (_.com = {});
  var package$rostegg = package$com.rostegg || (package$com.rostegg = {});
  var package$kotlin = package$rostegg.kotlin || (package$rostegg.kotlin = {});
  var package$webextensions = package$kotlin.webextensions || (package$kotlin.webextensions = {});
  package$webextensions.YandexResponse = YandexResponse;
  Object.defineProperty(package$webextensions, 'YANDEX_API_KEY', {
    get: function () {
      return YANDEX_API_KEY;
    }
  });
  Object.defineProperty(package$webextensions, 'Endpoints', {
    get: Endpoints_getInstance
  });
  Object.defineProperty(package$webextensions, 'inputPanel', {
    get: function () {
      return inputPanel;
    }
  });
  Object.defineProperty(package$webextensions, 'outputPanel', {
    get: function () {
      return outputPanel;
    }
  });
  Object.defineProperty(package$webextensions, 'languageToMenu', {
    get: function () {
      return languageToMenu;
    }
  });
  Object.defineProperty(package$webextensions, 'languageFromMenu', {
    get: function () {
      return languageFromMenu;
    }
  });
  package$webextensions.main_kand9s$ = main;
  package$webextensions.swapLanguagesInMenu = swapLanguagesInMenu;
  package$webextensions.setupLanguagesList = setupLanguagesList;
  package$webextensions.insertIntoMenu_j755s4$ = insertIntoMenu;
  YANDEX_API_KEY = 'YOUR_API_KEY';
  var tmp$, tmp$_0, tmp$_1, tmp$_2;
  inputPanel = Kotlin.isType(tmp$ = document.querySelector('#input-text'), HTMLTextAreaElement) ? tmp$ : throwCCE();
  outputPanel = Kotlin.isType(tmp$_0 = document.querySelector('#output-text'), HTMLTextAreaElement) ? tmp$_0 : throwCCE();
  languageToMenu = Kotlin.isType(tmp$_1 = document.querySelector('#language-to'), HTMLSelectElement) ? tmp$_1 : throwCCE();
  languageFromMenu = Kotlin.isType(tmp$_2 = document.querySelector('#language-from'), HTMLSelectElement) ? tmp$_2 : throwCCE();
  main([]);
  Kotlin.defineModule('panel-module', _);
  return _;
}(typeof this['panel-module'] === 'undefined' ? {} : this['panel-module'], kotlin);
