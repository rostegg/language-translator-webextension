if (typeof kotlin === 'undefined') {
  throw new Error("Error loading module 'panel-module'. Its dependency 'kotlin' was not found. Please, check whether 'kotlin' is loaded prior to 'panel-module'.");
}
this['panel-module'] = function (_, Kotlin) {
  'use strict';
  var Kind_CLASS = Kotlin.Kind.CLASS;
  var Kind_OBJECT = Kotlin.Kind.OBJECT;
  var throwCCE = Kotlin.throwCCE;
  var println = Kotlin.kotlin.io.println_s8jyv4$;
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
  Endpoints.prototype.translateTextEndpoint_puj7f4$ = function (lang, text) {
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
    xhttp.v.open('GET', 'https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20171203T152844Z.6e5c9380e6c29cce.1c5aa4d05ce699afbcdf8f0bac9b93c79382aee0&text=' + text + '&lang=ru-en');
    xhttp.v.onload = main$lambda$lambda(xhttp);
    return xhttp.v.send();
  }
  function main(args) {
    var tmp$;
    getLanguages();
    var btn = Kotlin.isType(tmp$ = document.querySelector('#translate-btn'), HTMLButtonElement) ? tmp$ : throwCCE();
    btn.onclick = main$lambda;
  }
  function getLanguages$lambda(closure$request, closure$xhttp) {
    return function () {
      var xmlParser = new DOMParser();
      println('executing query ' + closure$request.v);
      var xmlDoc = xmlParser.parseFromString(closure$xhttp.v.responseText, 'text/xml');
      var availableTranslateList = xmlDoc.getElementsByTagName('string');
      var languagesList = xmlDoc.getElementsByTagName('Item');
      var tmp$;
      tmp$ = asList(languagesList).iterator();
      while (tmp$.hasNext()) {
        var element = tmp$.next();
        var tmp$_0;
        println(element.getAttribute('key') + ' - ' + element.getAttribute('value'));
        var option = Kotlin.isType(tmp$_0 = document.createElement('option'), HTMLOptionElement) ? tmp$_0 : throwCCE();
        option.value = ensureNotNull(element.getAttribute('key'));
        option.text = ensureNotNull(element.getAttribute('value'));
        languageToMenu.add(option);
      }
    };
  }
  function getLanguages() {
    var xhttp = {v: new XMLHttpRequest()};
    var request = {v: Endpoints_getInstance().getLanguageEndpoint_61zpoe$('en')};
    xhttp.v.open('GET', request.v);
    xhttp.v.onload = getLanguages$lambda(request, xhttp);
    xhttp.v.send();
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
  package$webextensions.main_kand9s$ = main;
  package$webextensions.getLanguages = getLanguages;
  YANDEX_API_KEY = 'YOUR_API_KEY';
  var tmp$, tmp$_0, tmp$_1;
  inputPanel = Kotlin.isType(tmp$ = document.querySelector('#input-text'), HTMLTextAreaElement) ? tmp$ : throwCCE();
  outputPanel = Kotlin.isType(tmp$_0 = document.querySelector('#output-text'), HTMLTextAreaElement) ? tmp$_0 : throwCCE();
  languageToMenu = Kotlin.isType(tmp$_1 = document.querySelector('#language-to'), HTMLSelectElement) ? tmp$_1 : throwCCE();
  main([]);
  Kotlin.defineModule('panel-module', _);
  return _;
}(typeof this['panel-module'] === 'undefined' ? {} : this['panel-module'], kotlin);
