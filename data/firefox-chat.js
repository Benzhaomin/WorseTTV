
var on_message = function(node_id, text) {
  //console.log("emit(worsettv.diagnose):", text);
  self.port.emit("worsettv.diagnose", node_id, text);
}

self.port.on("worsettv.ill", function(node_id, text) {
  //console.log("got cancer there", text);
  worsettv.chat.message.ill(node_id, text);
});

self.port.on("worsettv.sane", function(node_id, text) {
  worsettv.chat.message.sane(node_id, text);
});

worsettv.chat.observer.start(on_message);
