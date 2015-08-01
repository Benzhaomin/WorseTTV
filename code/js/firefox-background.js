// sdk
var self = require("sdk/self");
var tabs = require("sdk/tabs");
var mod = require("sdk/page-mod");
var cm = require("sdk/context-menu");
var array = require('sdk/util/array');

// custom
var diagnosis = require("./modules/diagnosis");

// list of active page workers
var pageWorkers = [];

// enhance pages on Twitch.tv
mod.PageMod({
  include: "http://www.twitch.tv/*",
  contentScriptFile: [
    self.data.url("js/modules/chat.js"),
    self.data.url("js/firefox-chat.js"),
  ],
  contentStyleFile: self.data.url("css/content.css"),
  attachTo: 'top',
  onAttach: function(worker) {

    // keep track of page workers so that the UI can talk to them
    array.add(pageWorkers, worker);
    worker.on('pageshow', function() { array.add(pageWorkers, this); });
    worker.on('pagehide', function() { array.remove(pageWorkers, this); });
    worker.on('detach', function() { array.remove(pageWorkers, this); });

    // listen to diagnosis requests
    worker.port.on('worsettv.chat.message.diagnose', function(node, text) {

      //console.log('[firefox-background] diagnosis request for text', text, 'on node', node);

      if (diagnosis.is_sane(text)) {
        worker.port.emit('worsettv.chat.message.sane', node, text);
      }
      else {
        worker.port.emit('worsettv.chat.message.ill', node, text);
      }
    });
  }
});

// custom context menu item on Twitch's chatbox
cm.Item({
  // cancer is On by default
  label: "Toggle Cancer",
  image: self.data.url("images/kappa-pride.png"),
  accesskey: 'W',

  contentScriptFile: self.data.url("js/firefox-ui.js"),

  // react to clicks on the menu
  onMessage: function(start) {
    for (var index = 0; index < pageWorkers.length; index += 1) {
      if (pageWorkers[index].tab === tabs.activeTab) {
        if (start === true) {
          pageWorkers[index].port.emit('worsettv.chat.observer.start');
        }
        else {
          pageWorkers[index].port.emit('worsettv.chat.observer.stop');
        }
      }
    }
  },
});

//tabs.open("http://www.twitch.tv/gamesdonequick");