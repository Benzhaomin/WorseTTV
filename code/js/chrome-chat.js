
var chat = require('./modules/chat');
var message = require('./modules/message');

var on_chat_message = function(msg) {
  //console.log("[chrome-chat] emit(worsettv.diagnose): " + msg + ' ' + msg.text);

  chrome.runtime.sendMessage({
    "message": "worsettv.message.diagnose",
    "msg": msg
  });
};

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {

    //console.log('[chrome-chat] ' + request.message);

    if (request.message === "worsettv.message.ill") {
      // rebuild a message object after it has been deserialized by message passing
      message.from_id(request.msg.id).status("ill");
    }
    else if (request.message === "worsettv.message.sane") {
      // rebuild a message object after it has been deserialized by message passing
      message.from_id(request.msg.id).status("sane");
    }
    else if (request.message === "worsettv.chat.observer.start") {
      chat.observer.start(on_chat_message);
    }
    else if (request.message === "worsettv.chat.observer.stop") {
      chat.observer.stop();
    }
  }
);

/*
self.port.on("detach", function() {
  worsettv.chat.observer.stop();
});
*/
