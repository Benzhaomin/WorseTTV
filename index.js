var self = require("sdk/self");
var tabs = require("sdk/tabs");
var mod = require("sdk/page-mod");
var diagnosis = require("./lib/diagnosis");

var pageMod = mod.PageMod({
  include: "http://www.twitch.tv/*",
  contentScriptFile: "./content-script.js",
  contentStyleFile: "./content-style.css",
  onAttach: startListening,
});

function startListening(worker) {
  worker.port.on('worsettv.diagnose', function(node, text) {
    
    //console.log('diagnosis request for text', text, 'on node', node);

    if (diagnosis.diagnose(text).length > 0) {
      worker.port.emit('worsettv.ill', node, text);
    }
    else {
      worker.port.emit('worsettv.sane', node, text);
    }
  });
}