if (typeof kotlin === 'undefined') {
  throw new Error("Error loading module 'options-module'. Its dependency 'kotlin' was not found. Please, check whether 'kotlin' is loaded prior to 'options-module'.");
}
this['options-module'] = function (_, Kotlin) {
  'use strict';
  var Kind_CLASS = Kotlin.Kind.CLASS;
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
  var languageFromMenu;
  var languageToMenu;
  var apiKeyEdit;
  var proxyServerEdit;
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
  function initDefaultLanguages$lambda(items) {
    var tmp$, tmp$_0, tmp$_1, tmp$_2;
    console.log(items);
    var languageTo = items['language-to'];
    console.log(languageTo.key);
    var languageFrom = items['language-from'];
    console.log(languageFrom.key);
    var languagesCount = languageFromMenu.options.length;
    for (var i = 0; i <= languagesCount; i++) {
      tmp$_0 = (Kotlin.isType(tmp$ = languageFromMenu.options[i], HTMLOptionElement) ? tmp$ : throwCCE()).value;
      console.log('geting : ' + tmp$_0);
      if (equals((Kotlin.isType(tmp$_1 = languageFromMenu.options[i], HTMLOptionElement) ? tmp$_1 : throwCCE()).value, languageFrom.key))
        languageFromMenu.selectedIndex = i;
      if (equals((Kotlin.isType(tmp$_2 = languageToMenu.options[i], HTMLOptionElement) ? tmp$_2 : throwCCE()).value, languageTo.key))
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
  function main(args) {
    initLanguagesList();
    initDefaultLanguages();
  }
  var package$com = _.com || (_.com = {});
  var package$rostegg = package$com.rostegg || (package$com.rostegg = {});
  var package$test = package$rostegg.test || (package$rostegg.test = {});
  package$test.Language = Language;
  Object.defineProperty(package$test, 'languageFromMenu', {
    get: function () {
      return languageFromMenu;
    }
  });
  Object.defineProperty(package$test, 'languageToMenu', {
    get: function () {
      return languageToMenu;
    }
  });
  Object.defineProperty(package$test, 'apiKeyEdit', {
    get: function () {
      return apiKeyEdit;
    }
  });
  Object.defineProperty(package$test, 'proxyServerEdit', {
    get: function () {
      return proxyServerEdit;
    }
  });
  package$test.initLanguagesList = initLanguagesList;
  package$test.initDefaultLanguages = initDefaultLanguages;
  package$test.insertIntoMenu_j755s4$ = insertIntoMenu;
  package$test.main_kand9s$ = main;
  var tmp$, tmp$_0, tmp$_1, tmp$_2;
  languageFromMenu = Kotlin.isType(tmp$ = document.querySelector('#language-from'), HTMLSelectElement) ? tmp$ : throwCCE();
  languageToMenu = Kotlin.isType(tmp$_0 = document.querySelector('#language-to'), HTMLSelectElement) ? tmp$_0 : throwCCE();
  apiKeyEdit = Kotlin.isType(tmp$_1 = document.querySelector('#api-key-edit'), HTMLInputElement) ? tmp$_1 : throwCCE();
  proxyServerEdit = Kotlin.isType(tmp$_2 = document.querySelector('#proxy-edit'), HTMLInputElement) ? tmp$_2 : throwCCE();
  main([]);
  Kotlin.defineModule('options-module', _);
  return _;
}(typeof this['options-module'] === 'undefined' ? {} : this['options-module'], kotlin);
