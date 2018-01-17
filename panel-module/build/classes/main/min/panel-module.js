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
    initLanguagesList();
    var btn = Kotlin.isType(tmp$ = document.querySelector('#translate-btn'), HTMLButtonElement) ? tmp$ : throwCCE();
    btn.onclick = main$lambda;
    var swapBtn = Kotlin.isType(tmp$_0 = document.querySelector('#swap-btn'), HTMLButtonElement) ? tmp$_0 : throwCCE();
    swapBtn.onclick = main$lambda_0;
  }
  function swapLanguagesInMenu() {
    var tmp$ = languageToMenu;
    var $receiver = languageFromMenu.selectedIndex;
    languageFromMenu.selectedIndex = languageToMenu.selectedIndex;
    tmp$.selectedIndex = $receiver;
  }
  function initLanguagesList$lambda(items) {
    var tmp$, tmp$_0;
    var languages = Kotlin.isArray(tmp$ = items['languages-list']) ? tmp$ : throwCCE();
    for (tmp$_0 = 0; tmp$_0 !== languages.length; ++tmp$_0) {
      var language = languages[tmp$_0];
      insertIntoMenu(language.value, language.key, languageFromMenu);
      insertIntoMenu(language.value, language.key, languageToMenu);
    }
    return Unit;
  }
  function initLanguagesList() {
    browser.storage.local.get().then(initLanguagesList$lambda);
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
  Object.defineProperty(package$webextensions, 'Endpoints', {get: Endpoints_getInstance});
  package$webextensions.main_kand9s$ = main;
  package$webextensions.swapLanguagesInMenu = swapLanguagesInMenu;
  package$webextensions.initLanguagesList = initLanguagesList;
  package$webextensions.insertIntoMenu_j755s4$ = insertIntoMenu;
  YANDEX_API_KEY = 'YOUR_API_KEY';
  var tmp$, tmp$_0, tmp$_1, tmp$_2;
  inputPanel = Kotlin.isType(tmp$ = document.querySelector('#input-text'), HTMLTextAreaElement) ? tmp$ : throwCCE();
  outputPanel = Kotlin.isType(tmp$_0 = document.querySelector('#output-text'), HTMLTextAreaElement) ? tmp$_0 : throwCCE();
  languageToMenu = Kotlin.isType(tmp$_1 = document.querySelector('#language-to'), HTMLSelectElement) ? tmp$_1 : throwCCE();
  languageFromMenu = Kotlin.isType(tmp$_2 = document.querySelector('#language-from'), HTMLSelectElement) ? tmp$_2 : throwCCE();
  main([]);
  return _;
}(typeof this['panel-module'] === 'undefined' ? {} : this['panel-module'], kotlin);

//# sourceMappingURL=panel-module.js.map
