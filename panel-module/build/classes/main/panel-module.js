if (typeof kotlin === 'undefined') {
  throw new Error("Error loading module 'panel-module'. Its dependency 'kotlin' was not found. Please, check whether 'kotlin' is loaded prior to 'panel-module'.");
}
this['panel-module'] = function (_, Kotlin) {
  'use strict';
  var $$importsForInline$$ = _.$$importsForInline$$ || (_.$$importsForInline$$ = {});
  var Kind_CLASS = Kotlin.Kind.CLASS;
  var throwCCE = Kotlin.throwCCE;
  var to = Kotlin.kotlin.to_ujzrz7$;
  var hashMapOf = Kotlin.kotlin.collections.hashMapOf_qfcya0$;
  var Kind_OBJECT = Kotlin.Kind.OBJECT;
  var defineInlineFunction = Kotlin.defineInlineFunction;
  var Unit = Kotlin.kotlin.Unit;
  var equals = Kotlin.equals;
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
  var PROXY_SCRIPT_URL;
  var inputPanel;
  var outputPanel;
  var languageToMenu;
  var languageFromMenu;
  var swapBtn;
  var translateBtn;
  var errorCodes;
  function Endpoints() {
    Endpoints_instance = this;
  }
  Endpoints.prototype.getTranslateTextEndpoint_6hosri$ = function (apiKey, lang, text) {
    return 'https://translate.yandex.net/api/v1.5/tr.json/translate?key=' + apiKey + '&text=' + text + '&lang=' + lang;
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
  var jsObject = defineInlineFunction('panel-module.com.rostegg.kotlin.webextensions.jsObject_5ij4lk$', function (init) {
    var o = {};
    init(o);
    return o;
  });
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
  function main$lambda(it) {
    translateText();
    return Unit;
  }
  function main$lambda_0(it) {
    swapLanguagesInMenu();
    return Unit;
  }
  function main$lambda_1(it) {
    inputPanel.focus();
    document.execCommand('paste');
    return Unit;
  }
  function main(args) {
    initLanguagesList();
    translateBtn.onclick = main$lambda;
    swapBtn.onclick = main$lambda_0;
    window.addEventListener('mouseover', main$lambda_1);
  }
  function translateText$lambda(items) {
    var tmp$, tmp$_0;
    var apiKey = items['apiKey'];
    var text = inputPanel.value;
    var fromLanguage = (Kotlin.isType(tmp$ = languageFromMenu.options[languageFromMenu.selectedIndex], HTMLOptionElement) ? tmp$ : throwCCE()).value;
    var toLanguage = (Kotlin.isType(tmp$_0 = languageToMenu.options[languageToMenu.selectedIndex], HTMLOptionElement) ? tmp$_0 : throwCCE()).value;
    var request = Endpoints_getInstance().getTranslateTextEndpoint_6hosri$(apiKey, fromLanguage + '-' + toLanguage, text);
    sendRequest(request);
    return Unit;
  }
  function translateText() {
    browser.storage.local.get().then(translateText$lambda);
  }
  function sendRequest$lambda(closure$xhttp) {
    return function () {
      var response = JSON.parse(closure$xhttp.v.responseText);
      if (errorCodes.keys.contains_11rb$(response.code)) {
        var tmp$ = browser.runtime;
        var o = {};
        o.errorType = 'translation-api-error';
        o.code = response.code;
        o.message = errorCodes.get_11rb$(o.code);
        tmp$.sendMessage(o);
      }
       else
        outputPanel.value = response.text;
    };
  }
  function sendRequest$lambda_0() {
    browser.runtime.sendMessage('error-translating');
  }
  function sendRequest(request) {
    var xhttp = {v: new XMLHttpRequest()};
    xhttp.v.open('GET', request);
    xhttp.v.onload = sendRequest$lambda(xhttp);
    xhttp.v.onerror = sendRequest$lambda_0;
    xhttp.v.send();
  }
  function swapLanguagesInMenu() {
    var tmp$ = languageToMenu;
    var $receiver = languageFromMenu.selectedIndex;
    languageFromMenu.selectedIndex = languageToMenu.selectedIndex;
    tmp$.selectedIndex = $receiver;
  }
  function initLanguagesList$lambda(items) {
    var tmp$, tmp$_0, tmp$_1, tmp$_2;
    var languages = Kotlin.isArray(tmp$ = items['languages-list']) ? tmp$ : throwCCE();
    for (tmp$_0 = 0; tmp$_0 !== languages.length; ++tmp$_0) {
      var language = languages[tmp$_0];
      insertIntoMenu(language.value, language.key, languageFromMenu);
      insertIntoMenu(language.value, language.key, languageToMenu);
    }
    var languageTo = items['language-to'];
    var languageFrom = items['language-from'];
    var languagesCount = languageFromMenu.options.length;
    for (var i = 0; i <= languagesCount; i++) {
      if (equals((Kotlin.isType(tmp$_1 = languageFromMenu.options[i], HTMLOptionElement) ? tmp$_1 : throwCCE()).value, languageFrom.key))
        languageFromMenu.selectedIndex = i;
      if (equals((Kotlin.isType(tmp$_2 = languageToMenu.options[i], HTMLOptionElement) ? tmp$_2 : throwCCE()).value, languageTo.key))
        languageToMenu.selectedIndex = i;
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
  package$webextensions.YandexResponse = YandexResponse;
  Object.defineProperty(package$webextensions, 'PROXY_SCRIPT_URL', {
    get: function () {
      return PROXY_SCRIPT_URL;
    }
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
  Object.defineProperty(package$webextensions, 'swapBtn', {
    get: function () {
      return swapBtn;
    },
    set: function (value) {
      swapBtn = value;
    }
  });
  Object.defineProperty(package$webextensions, 'translateBtn', {
    get: function () {
      return translateBtn;
    },
    set: function (value) {
      translateBtn = value;
    }
  });
  Object.defineProperty(package$webextensions, 'errorCodes', {
    get: function () {
      return errorCodes;
    }
  });
  Object.defineProperty(package$webextensions, 'Endpoints', {
    get: Endpoints_getInstance
  });
  $$importsForInline$$['panel-module'] = _;
  package$webextensions.jsObject_5ij4lk$ = jsObject;
  package$webextensions.Language = Language;
  package$webextensions.main_kand9s$ = main;
  package$webextensions.translateText = translateText;
  package$webextensions.sendRequest_61zpoe$ = sendRequest;
  package$webextensions.swapLanguagesInMenu = swapLanguagesInMenu;
  package$webextensions.initLanguagesList = initLanguagesList;
  package$webextensions.insertIntoMenu_j755s4$ = insertIntoMenu;
  PROXY_SCRIPT_URL = 'proxy/proxy-settings.js';
  var tmp$, tmp$_0, tmp$_1, tmp$_2, tmp$_3, tmp$_4;
  inputPanel = Kotlin.isType(tmp$ = document.querySelector('#input-text'), HTMLTextAreaElement) ? tmp$ : throwCCE();
  outputPanel = Kotlin.isType(tmp$_0 = document.querySelector('#output-text'), HTMLTextAreaElement) ? tmp$_0 : throwCCE();
  languageToMenu = Kotlin.isType(tmp$_1 = document.querySelector('#language-to'), HTMLSelectElement) ? tmp$_1 : throwCCE();
  languageFromMenu = Kotlin.isType(tmp$_2 = document.querySelector('#language-from'), HTMLSelectElement) ? tmp$_2 : throwCCE();
  swapBtn = Kotlin.isType(tmp$_3 = document.querySelector('#swap-btn'), HTMLButtonElement) ? tmp$_3 : throwCCE();
  translateBtn = Kotlin.isType(tmp$_4 = document.querySelector('#translate-btn'), HTMLButtonElement) ? tmp$_4 : throwCCE();
  errorCodes = hashMapOf([to('422', 'Text can not be translated'), to('413', 'Maximum text size exceeded'), to('404', 'The daily limit on the volume of the translated text was exceeded'), to('402', 'API Key Locked'), to('401', 'Invalid API key'), to('501', 'Specified translation direction is not supported')]);
  main([]);
  Kotlin.defineModule('panel-module', _);
  return _;
}(typeof this['panel-module'] === 'undefined' ? {} : this['panel-module'], kotlin);
