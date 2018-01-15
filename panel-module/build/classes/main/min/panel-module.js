if (typeof kotlin === 'undefined') {
  throw new Error("Error loading module 'panel-module'. Its dependency 'kotlin' was not found. Please, check whether 'kotlin' is loaded prior to 'panel-module'.");
}
this['panel-module'] = function (_, Kotlin) {
  'use strict';
  var Kind_CLASS = Kotlin.Kind.CLASS;
  var Kind_OBJECT = Kotlin.Kind.OBJECT;
  var throwCCE = Kotlin.throwCCE;
  var println = Kotlin.kotlin.io.println_s8jyv4$;
  var Endpoints_instance = null;
  var inputPanel;
  var outputPanel;
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
    var btn = Kotlin.isType(tmp$ = document.querySelector('#translate-btn'), HTMLButtonElement) ? tmp$ : throwCCE();
    btn.onclick = main$lambda;
  }
  var package$com = _.com || (_.com = {});
  var package$rostegg = package$com.rostegg || (package$com.rostegg = {});
  var package$kotlin = package$rostegg.kotlin || (package$rostegg.kotlin = {});
  var package$webextensions = package$kotlin.webextensions || (package$kotlin.webextensions = {});
  package$webextensions.main_kand9s$ = main;
  var tmp$, tmp$_0;
  inputPanel = Kotlin.isType(tmp$ = document.querySelector('#input-text'), HTMLTextAreaElement) ? tmp$ : throwCCE();
  outputPanel = Kotlin.isType(tmp$_0 = document.querySelector('#output-text'), HTMLTextAreaElement) ? tmp$_0 : throwCCE();
  main([]);
  return _;
}(typeof this['panel-module'] === 'undefined' ? {} : this['panel-module'], kotlin);

//# sourceMappingURL=panel-module.js.map
