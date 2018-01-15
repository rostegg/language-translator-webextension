if (typeof kotlin === 'undefined') {
  throw new Error("Error loading module 'background-script'. Its dependency 'kotlin' was not found. Please, check whether 'kotlin' is loaded prior to 'background-script'.");
}
this['background-script'] = function (_, Kotlin) {
  'use strict';
  var $$importsForInline$$ = _.$$importsForInline$$ || (_.$$importsForInline$$ = {});
  var Kind_CLASS = Kotlin.Kind.CLASS;
  var defineInlineFunction = Kotlin.defineInlineFunction;
  var Unit = Kotlin.kotlin.Unit;
  var ensureNotNull = Kotlin.ensureNotNull;
  function Tab(id) {
    this.id = id;
  }
  Tab.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'Tab',
    interfaces: []
  };
  function Script(file) {
    this.file = file;
  }
  Script.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'Script',
    interfaces: []
  };
  function CssDetails(code) {
    this.code = code;
  }
  CssDetails.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'CssDetails',
    interfaces: []
  };
  function QueryInfo(active, currentWindow) {
    this.active = active;
    this.currentWindow = currentWindow;
  }
  QueryInfo.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'QueryInfo',
    interfaces: []
  };
  var jsObject = defineInlineFunction('background-script.com.rostegg.kotlin.webextensions.jsObject_5ij4lk$', function (init) {
    var o = {};
    init(o);
    return o;
  });
  function ScriptDefinition(file) {
    this.file = file;
  }
  ScriptDefinition.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'ScriptDefinition',
    interfaces: []
  };
  function main$lambda$lambda(tabs) {
    var tmp$ = browser.tabs;
    var tmp$_0 = ensureNotNull(tabs[0].id);
    var o = {};
    o.action = 'copy-text';
    return tmp$.sendMessage(tmp$_0, o);
  }
  function main$lambda(command) {
    if (command == 'fast-translate') {
      var tmp$ = browser.tabs;
      var o = {};
      o.active = true;
      o.currentWindow = true;
      tmp$.query(o).then(main$lambda$lambda);
    }
    return Unit;
  }
  function main(args) {
    console.log('init test plugin');
    var tmp$ = browser.menus;
    var o = {};
    o.id = 'radio-i';
    o.title = 'test';
    o.contexts = ['all'];
    o.checked = true;
    tmp$.create(o);
    var tmp$_0 = browser.menus;
    var o_0 = {};
    o_0.id = 'separator-1';
    o_0.type = 'separator';
    o_0.contexts = ['all'];
    tmp$_0.create(o_0);
    var tmp$_1 = browser.menus;
    var o_1 = {};
    o_1.id = 'log-selection';
    o_1.title = 'log-btn';
    o_1.contexts = ['all'];
    tmp$_1.create(o_1);
    browser.commands.onCommand.addListener(main$lambda);
  }
  var package$com = _.com || (_.com = {});
  var package$rostegg = package$com.rostegg || (package$com.rostegg = {});
  var package$kotlin = package$rostegg.kotlin || (package$rostegg.kotlin = {});
  var package$webextensions = package$kotlin.webextensions || (package$kotlin.webextensions = {});
  package$webextensions.Tab = Tab;
  package$webextensions.Script = Script;
  package$webextensions.CssDetails = CssDetails;
  package$webextensions.QueryInfo = QueryInfo;
  $$importsForInline$$['background-script'] = _;
  package$webextensions.jsObject_5ij4lk$ = jsObject;
  package$webextensions.ScriptDefinition = ScriptDefinition;
  package$webextensions.main_kand9s$ = main;
  main([]);
  Kotlin.defineModule('background-script', _);
  return _;
}(typeof this['background-script'] === 'undefined' ? {} : this['background-script'], kotlin);
