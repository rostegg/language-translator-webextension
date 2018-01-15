if (typeof kotlin === 'undefined') {
  throw new Error("Error loading module 'copy-module'. Its dependency 'kotlin' was not found. Please, check whether 'kotlin' is loaded prior to 'copy-module'.");
}
this['copy-module'] = function (_, Kotlin) {
  'use strict';
  var toString = Kotlin.toString;
  var println = Kotlin.kotlin.io.println_s8jyv4$;
  var Unit = Kotlin.kotlin.Unit;
  function main$lambda(message) {
    println('action : ' + toString(message));
    if (message.action === 'copy-text') {
      var selectedText = window.getSelection().toString();
      console.log(selectedText);
      document.execCommand('Copy');
    }
    return Unit;
  }
  function main(args) {
    console.log('initializing the copy script..');
    if (window.hasRun == true)
      return;
    window.hasRun = true;
    browser.runtime.onMessage.addListener(main$lambda);
  }
  var package$com = _.com || (_.com = {});
  var package$rostegg = package$com.rostegg || (package$com.rostegg = {});
  var package$kotlin = package$rostegg.kotlin || (package$rostegg.kotlin = {});
  var package$webextensions = package$kotlin.webextensions || (package$kotlin.webextensions = {});
  package$webextensions.main_kand9s$ = main;
  main([]);
  return _;
}(typeof this['copy-module'] === 'undefined' ? {} : this['copy-module'], kotlin);

//# sourceMappingURL=copy-module.js.map
