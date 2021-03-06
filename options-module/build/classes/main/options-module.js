if (typeof kotlin === 'undefined') {
  throw new Error("Error loading module 'options-module'. Its dependency 'kotlin' was not found. Please, check whether 'kotlin' is loaded prior to 'options-module'.");
}
this['options-module'] = function (_, Kotlin) {
  'use strict';
  var $$importsForInline$$ = _.$$importsForInline$$ || (_.$$importsForInline$$ = {});
  var Kind_CLASS = Kotlin.Kind.CLASS;
  var defineInlineFunction = Kotlin.defineInlineFunction;
  var throwCCE = Kotlin.throwCCE;
  var Unit = Kotlin.kotlin.Unit;
  var equals = Kotlin.equals;
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
  var jsObject = defineInlineFunction('options-module.com.rostegg.kotlin.webextensions.jsObject_5ij4lk$', function (init) {
    var o = {};
    init(o);
    return o;
  });
  var languageFromMenu;
  var languageToMenu;
  var apiKeyEdit;
  var proxyServerUrlEdit;
  var enableMouseUpEventCheckBox;
  var saveApiKeyBtn;
  var saveProxyUrlBtn;
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
  function initOptionsElements() {
    initDefaultLanguages();
    initValuesIfExist();
  }
  function initDefaultLanguages$lambda(items) {
    var tmp$, tmp$_0;
    var languageTo = items['language-to'];
    var languageFrom = items['language-from'];
    var languagesCount = languageFromMenu.options.length;
    for (var i = 0; i <= languagesCount; i++) {
      if (equals((Kotlin.isType(tmp$ = languageFromMenu.options[i], HTMLOptionElement) ? tmp$ : throwCCE()).value, languageFrom.key))
        languageFromMenu.selectedIndex = i;
      if (equals((Kotlin.isType(tmp$_0 = languageToMenu.options[i], HTMLOptionElement) ? tmp$_0 : throwCCE()).value, languageTo.key))
        languageToMenu.selectedIndex = i;
    }
    return Unit;
  }
  function initDefaultLanguages() {
    browser.storage.local.get().then(initDefaultLanguages$lambda);
  }
  function insertIntoMenu(text, value, element) {
    var tmp$;
    var option = Kotlin.isType(tmp$ = document.createElement('option'), HTMLOptionElement) ? tmp$ : throwCCE();
    option.value = value;
    option.text = text;
    element.add(option);
  }
  function initValuesIfExist$lambda(items) {
    var proxyUrl = items['proxyUrl'];
    var apiKey = items['apiKey'];
    var enabledMouseUpEvent = items['mouse-event'];
    if (proxyUrl != undefined)
      proxyServerUrlEdit.value = proxyUrl;
    if (apiKey != undefined)
      apiKeyEdit.value = apiKey;
    if (enabledMouseUpEvent != undefined)
      enableMouseUpEventCheckBox.checked = enabledMouseUpEvent;
    return Unit;
  }
  function initValuesIfExist() {
    browser.storage.local.get().then(initValuesIfExist$lambda);
  }
  function test() {
    console.log('unused');
  }
  function main$lambda$ObjectLiteral() {
  }
  main$lambda$ObjectLiteral.$metadata$ = {
    kind: Kind_CLASS,
    interfaces: []
  };
  function main$lambda(it) {
    var tmp$;
    var languageFrom = new main$lambda$ObjectLiteral();
    var selectedOption = Kotlin.isType(tmp$ = languageFromMenu.options[languageFromMenu.selectedIndex], HTMLOptionElement) ? tmp$ : throwCCE();
    languageFrom['language-from'] = new Language(selectedOption.value, selectedOption.text);
    return browser.storage.local.set(languageFrom);
  }
  function main$lambda$ObjectLiteral_0() {
  }
  main$lambda$ObjectLiteral_0.$metadata$ = {
    kind: Kind_CLASS,
    interfaces: []
  };
  function main$lambda_0(it) {
    var tmp$;
    var languageTo = new main$lambda$ObjectLiteral_0();
    var selectedOption = Kotlin.isType(tmp$ = languageToMenu.options[languageToMenu.selectedIndex], HTMLOptionElement) ? tmp$ : throwCCE();
    languageTo['language-to'] = new Language(selectedOption.value, selectedOption.text);
    return browser.storage.local.set(languageTo);
  }
  function main$lambda$ObjectLiteral_1() {
  }
  main$lambda$ObjectLiteral_1.$metadata$ = {
    kind: Kind_CLASS,
    interfaces: []
  };
  function main$lambda_1(it) {
    var apiKey = new main$lambda$ObjectLiteral_1();
    apiKey['apiKey'] = apiKeyEdit.value;
    browser.storage.local.set(apiKey);
    return browser.runtime.sendMessage('api-key-changed');
  }
  function main$lambda$ObjectLiteral_2() {
  }
  main$lambda$ObjectLiteral_2.$metadata$ = {
    kind: Kind_CLASS,
    interfaces: []
  };
  function main$lambda_2(it) {
    var proxyUrl = new main$lambda$ObjectLiteral_2();
    proxyUrl['proxyUrl'] = proxyServerUrlEdit.value;
    browser.storage.local.set(proxyUrl);
    var tmp$ = browser.runtime;
    var o = {};
    o.action = 'change-proxy-url';
    o.url = proxyServerUrlEdit.value;
    var o_0 = {};
    o_0.toProxyScript = true;
    return tmp$.sendMessage(o, o_0);
  }
  function main$lambda$ObjectLiteral_3() {
  }
  main$lambda$ObjectLiteral_3.$metadata$ = {
    kind: Kind_CLASS,
    interfaces: []
  };
  function main$lambda_3(it) {
    var mouseEvent = new main$lambda$ObjectLiteral_3();
    mouseEvent['mouse-event'] = enableMouseUpEventCheckBox.checked;
    return browser.storage.local.set(mouseEvent);
  }
  function main(args) {
    console.log('test');
    initLanguagesList();
    initOptionsElements();
    languageFromMenu.onclick = main$lambda;
    languageToMenu.onclick = main$lambda_0;
    saveApiKeyBtn.onclick = main$lambda_1;
    saveProxyUrlBtn.onclick = main$lambda_2;
    enableMouseUpEventCheckBox.onclick = main$lambda_3;
  }
  var package$com = _.com || (_.com = {});
  var package$rostegg = package$com.rostegg || (package$com.rostegg = {});
  var package$kotlin = package$rostegg.kotlin || (package$rostegg.kotlin = {});
  var package$webextensions = package$kotlin.webextensions || (package$kotlin.webextensions = {});
  package$webextensions.Language = Language;
  $$importsForInline$$['options-module'] = _;
  package$webextensions.jsObject_5ij4lk$ = jsObject;
  Object.defineProperty(package$webextensions, 'languageFromMenu', {
    get: function () {
      return languageFromMenu;
    }
  });
  Object.defineProperty(package$webextensions, 'languageToMenu', {
    get: function () {
      return languageToMenu;
    }
  });
  Object.defineProperty(package$webextensions, 'apiKeyEdit', {
    get: function () {
      return apiKeyEdit;
    }
  });
  Object.defineProperty(package$webextensions, 'proxyServerUrlEdit', {
    get: function () {
      return proxyServerUrlEdit;
    }
  });
  Object.defineProperty(package$webextensions, 'enableMouseUpEventCheckBox', {
    get: function () {
      return enableMouseUpEventCheckBox;
    }
  });
  Object.defineProperty(package$webextensions, 'saveApiKeyBtn', {
    get: function () {
      return saveApiKeyBtn;
    }
  });
  Object.defineProperty(package$webextensions, 'saveProxyUrlBtn', {
    get: function () {
      return saveProxyUrlBtn;
    }
  });
  package$webextensions.initLanguagesList = initLanguagesList;
  package$webextensions.initOptionsElements = initOptionsElements;
  package$webextensions.initDefaultLanguages = initDefaultLanguages;
  package$webextensions.insertIntoMenu_j755s4$ = insertIntoMenu;
  package$webextensions.initValuesIfExist = initValuesIfExist;
  package$webextensions.test = test;
  package$webextensions.main_kand9s$ = main;
  var tmp$, tmp$_0, tmp$_1, tmp$_2, tmp$_3, tmp$_4, tmp$_5;
  languageFromMenu = Kotlin.isType(tmp$ = document.querySelector('#language-from'), HTMLSelectElement) ? tmp$ : throwCCE();
  languageToMenu = Kotlin.isType(tmp$_0 = document.querySelector('#language-to'), HTMLSelectElement) ? tmp$_0 : throwCCE();
  apiKeyEdit = Kotlin.isType(tmp$_1 = document.querySelector('#api-key-edit'), HTMLInputElement) ? tmp$_1 : throwCCE();
  proxyServerUrlEdit = Kotlin.isType(tmp$_2 = document.querySelector('#proxy-edit'), HTMLInputElement) ? tmp$_2 : throwCCE();
  enableMouseUpEventCheckBox = Kotlin.isType(tmp$_3 = document.querySelector('#enable-mouse-up'), HTMLInputElement) ? tmp$_3 : throwCCE();
  saveApiKeyBtn = Kotlin.isType(tmp$_4 = document.querySelector('#save-api-btn'), HTMLAnchorElement) ? tmp$_4 : throwCCE();
  saveProxyUrlBtn = Kotlin.isType(tmp$_5 = document.querySelector('#save-proxy-btn'), HTMLAnchorElement) ? tmp$_5 : throwCCE();
  main([]);
  Kotlin.defineModule('options-module', _);
  return _;
}(typeof this['options-module'] === 'undefined' ? {} : this['options-module'], kotlin);
