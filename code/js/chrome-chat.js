
var chat = require('./modules/chat');

var on_message = function(node_id, text) {
  //console.log("[chrome-chat] emit(worsettv.diagnose):" + text);
  chrome.runtime.sendMessage({"message": "worsettv.chat.message.diagnose", "node": node_id, "text": text});
};

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {

    //console.log('[chrome-chat] ' + request.message);

    if (request.message === "worsettv.chat.message.ill") {
      chat.message.ill(request.node, request.text);
    }
    else if (request.message === "worsettv.chat.message.sane") {
      chat.message.sane(request.node, request.text);
    }
    else if (request.message === "worsettv.chat.observer.start") {
      chat.observer.start(on_message);
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
