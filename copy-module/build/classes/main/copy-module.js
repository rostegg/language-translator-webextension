if (typeof kotlin === 'undefined') {
  throw new Error("Error loading module 'copy-module'. Its dependency 'kotlin' was not found. Please, check whether 'kotlin' is loaded prior to 'copy-module'.");
}
this['copy-module'] = function (_, Kotlin) {
  'use strict';
  var Unit = Kotlin.kotlin.Unit;
  function main$lambda(message) {
    if (message.action === 'copy-text') {
      copySelectedText();
    }
    return Unit;
  }
  function main(args) {
    if (window.hasRun == true)
      return;
    window.hasRun = true;
    checkForMouseUpEvent();
    browser.runtime.onMessage.addListener(main$lambda);
  }
  function checkForMouseUpEvent$lambda$lambda(it) {
    copySelectedText();
    return Unit;
  }
  function checkForMouseUpEvent$lambda$lambda_0(it) {
    copySelectedText();
    return Unit;
  }
  function checkForMouseUpEvent$lambda(items) {
    var mouseUpEnabled = items['mouse-event'];
    if (mouseUpEnabled != undefined && mouseUpEnabled == true)
      document.addEventListener('mouseup', checkForMouseUpEvent$lambda$lambda);
    else
      document.removeEventListener('mouseup', checkForMouseUpEvent$lambda$lambda_0);
    return Unit;
  }
  function checkForMouseUpEvent() {
    browser.storage.local.get().then(checkForMouseUpEvent$lambda);
  }
  function copySelectedText() {
    var selectedText = window.getSelection().toString();
    console.log(selectedText);
    document.execCommand('Copy');
  }
  var package$com = _.com || (_.com = {});
  var package$rostegg = package$com.rostegg || (package$com.rostegg = {});
  var package$kotlin = package$rostegg.kotlin || (package$rostegg.kotlin = {});
  var package$webextensions = package$kotlin.webextensions || (package$kotlin.webextensions = {});
  package$webextensions.main_kand9s$ = main;
  package$webextensions.checkForMouseUpEvent = checkForMouseUpEvent;
  package$webextensions.copySelectedText = copySelectedText;
  main([]);
  Kotlin.defineModule('copy-module', _);
  return _;
}(typeof this['copy-module'] === 'undefined' ? {} : this['copy-module'], kotlin);
