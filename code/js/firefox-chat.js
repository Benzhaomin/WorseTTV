
var chat = require('./modules/chat');

var on_message = function(node_id, text) {
  //console.log("emit(worsettv.diagnose):", text);
  self.port.emit("worsettv.chat.message.diagnose", node_id, text);
};

self.port.on("worsettv.chat.message.ill", function(node_id, text) {
  //console.log("got cancer there", text);
  chat.message.ill(node_id, text);
});

self.port.on("worsettv.chat.message.sane", function(node_id, text) {
  chat.message.sane(node_id, text);
});

self.port.on("worsettv.chat.observer.start", function() {
  chat.observer.start(on_message);
});

self.port.on("worsettv.chat.observer.stop", function() {
  chat.observer.stop();
});

self.port.on("detach", function() {
  chat.observer.stop();
});
