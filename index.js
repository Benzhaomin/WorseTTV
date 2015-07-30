var self = require("sdk/self");
var tabs = require("sdk/tabs");
var mod = require("sdk/page-mod");
var cm = require("sdk/context-menu");
var array = require('sdk/util/array');

var diagnosis = require("./lib/diagnosis");

var pageWorkers = [];

var pageMod = mod.PageMod({
  include: "http://www.twitch.tv/*",
  contentScriptFile: [
    "./chat.js",
    "./firefox-chat.js",
  ],
  contentStyleFile: "./content-style.css",
  attachTo: 'top',
  onAttach: startListening,
});

function startListening(worker) {
  array.add(pageWorkers, worker);
  worker.on('pageshow', function() { array.add(pageWorkers, this); });
  worker.on('pagehide', function() { array.remove(pageWorkers, this); });
  worker.on('detach', function() { array.remove(pageWorkers, this); });
  
  worker.port.on('worsettv.diagnose', function(node, text) {
    
    //console.log('diagnosis request for text', text, 'on node', node);

    if (diagnosis.is_sane(text)) {
      worker.port.emit('worsettv.sane', node, text);
    }
    else {
      worker.port.emit('worsettv.ill', node, text);
    }
  });
}

var menu = cm.Item({
  label: "Cure cancer",
  contentScriptFile: "./firefox-ui.js",
  onMessage: function(start) {
    for (var index = 0; index < pageWorkers.length; index += 1) {
      if (pageWorkers[index].tab === tabs.activeTab) {
        if (start == true) {
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
