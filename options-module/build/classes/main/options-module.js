if (typeof kotlin === 'undefined') {
  throw new Error("Error loading module 'options-module'. Its dependency 'kotlin' was not found. Please, check whether 'kotlin' is loaded prior to 'options-module'.");
}
this['options-module'] = function (_, Kotlin) {
  'use strict';
  Kotlin.defineModule('options-module', _);
  return _;
}(typeof this['options-module'] === 'undefined' ? {} : this['options-module'], kotlin);
