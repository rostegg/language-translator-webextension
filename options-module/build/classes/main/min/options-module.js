if (typeof kotlin === 'undefined') {
  throw new Error("Error loading module 'options-module'. Its dependency 'kotlin' was not found. Please, check whether 'kotlin' is loaded prior to 'options-module'.");
}
this['options-module'] = function (_, Kotlin) {
  'use strict';
  var throwCCE = Kotlin.throwCCE;
  var Unit = Kotlin.kotlin.Unit;
  var Kind_CLASS = Kotlin.Kind.CLASS;
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
  function insertIntoMenu(text, value, element) {
    var tmp$;
    var option = Kotlin.isType(tmp$ = document.createElement('option'), HTMLOptionElement) ? tmp$ : throwCCE();
    option.value = value;
    option.text = text;
    element.add(option);
  }
  function main(args) {
    initLanguagesList();
  }
  var package$com = _.com || (_.com = {});
  var package$rostegg = package$com.rostegg || (package$com.rostegg = {});
  var package$test = package$rostegg.test || (package$rostegg.test = {});
  package$test.initLanguagesList = initLanguagesList;
  package$test.insertIntoMenu_j755s4$ = insertIntoMenu;
  package$test.main_kand9s$ = main;
  var tmp$, tmp$_0, tmp$_1, tmp$_2;
  languageFromMenu = Kotlin.isType(tmp$ = document.querySelector('#language-from'), HTMLSelectElement) ? tmp$ : throwCCE();
  languageToMenu = Kotlin.isType(tmp$_0 = document.querySelector('#language-to'), HTMLSelectElement) ? tmp$_0 : throwCCE();
  apiKeyEdit = Kotlin.isType(tmp$_1 = document.querySelector('#api-key-edit'), HTMLInputElement) ? tmp$_1 : throwCCE();
  proxyServerEdit = Kotlin.isType(tmp$_2 = document.querySelector('#proxy-edit'), HTMLInputElement) ? tmp$_2 : throwCCE();
  main([]);
  return _;
}(typeof this['options-module'] === 'undefined' ? {} : this['options-module'], kotlin);

//# sourceMappingURL=options-module.js.map
