
var on_message = function(node_id, text) {
  console.log("emit(worsettv.diagnose):", text);
  chrome.runtime.sendMessage({"message": "worsettv.chat.message.diagnose", "node": node_id, "text": text});
}

chrome.runtime.onMessage.addListener(
  function (request, sender, sendResponse) {
    if (request.message === "worsettv.chat.message.ill") {
      console.log("got cancer there", text);
      worsettv.chat.message.ill(request.node, request.text);
    }
    else if (request.message === "worsettv.chat.message.sane") {
      worsettv.chat.message.sane(request.node, request.text);
    }
    else if (request.message === "worsettv.chat.observer.start") {
      worsettv.chat.observer.start(on_message);
    }
    else if (request.message === "worsettv.chat.observer.stop") {
      worsettv.chat.observer.stop();
    }
  }
);

/*
self.port.on("detach", function() {
  worsettv.chat.observer.stop();
});
*/
