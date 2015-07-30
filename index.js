// sdk
var self = require("sdk/self");
var tabs = require("sdk/tabs");
var mod = require("sdk/page-mod");
var cm = require("sdk/context-menu");
var array = require('sdk/util/array');

// custom
var diagnosis = require("./lib/diagnosis");

// list of active page workers
var pageWorkers = [];

// enhance pages on Twitch.tv
var pageMod = mod.PageMod({
  include: "http://www.twitch.tv/*",
  contentScriptFile: [
    "./chat.js",
    "./firefox-chat.js",
  ],
  contentStyleFile: "./content-style.css",
  attachTo: 'top',
  onAttach: function(worker) {
    
    // keep track of page workers so that the UI can talk to them
    array.add(pageWorkers, worker);
    worker.on('pageshow', function() { array.add(pageWorkers, this); });
    worker.on('pagehide', function() { array.remove(pageWorkers, this); });
    worker.on('detach', function() { array.remove(pageWorkers, this); });
    
    // listen to diagnosis requests
    worker.port.on('worsettv.chat.message.diagnose', function(node, text) {
      
      //console.log('diagnosis request for text', text, 'on node', node);

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
var menu = cm.Item({
  label: "Cure cancer",
  contentScriptFile: "./firefox-ui.js",
  onMessage: function(start) {
    for (var index = 0; index < pageWorkers.length; index += 1) {
      if (pageWorkers[index].tab === tabs.activeTab) {
        if (start == true) {
          this.label = "Restore cancer";
          pageWorkers[index].port.emit('worsettv.chat.observer.start');
        }
        else {
          this.label = "Cure cancer";
          pageWorkers[index].port.emit('worsettv.chat.observer.stop');
        }
      }
    }
  },
});

//tabs.open("http://www.twitch.tv/gamesdonequick");
