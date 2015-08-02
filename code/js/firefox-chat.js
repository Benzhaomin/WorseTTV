
var chat = require('./modules/chat');
var message = require('./modules/message');

var on_chat_message = function(msg) {
  self.port.emit("worsettv.message.diagnose", msg);
};

self.port.on("worsettv.message.ill", function(msg) {
  // rebuild a message object after it has been deserialized by the port
  message.from_id(msg.id).status('ill');
});

self.port.on("worsettv.message.sane", function(msg) {
  // rebuild a message object after it has been deserialized by the port
  message.from_id(msg.id).status('sane');
});

self.port.on("worsettv.chat.observer.start", function() {
  chat.observer.start(on_chat_message);
});

self.port.on("worsettv.chat.observer.stop", function() {
  chat.observer.stop();
});

self.port.on("detach", function() {
  chat.observer.stop();
});
