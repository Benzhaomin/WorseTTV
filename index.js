var self = require("sdk/self");
var tabs = require("sdk/tabs");
var mod = require("sdk/page-mod");
var diagnosis = require("./lib/diagnosis");

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

//tabs.open("http://www.twitch.tv/gamesdonequick");
