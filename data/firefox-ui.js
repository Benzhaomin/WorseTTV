
var started = false;

// shot the menu on right clicks inside the chat
self.on("context", function (node) {
  var chatbox = document.querySelector(".ember-chat");
  return chatbox != null && chatbox.contains(node);
});

self.on("click", function (node, data) {
  started = !started;
  self.postMessage(started);
});
