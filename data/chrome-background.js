
var diagnosis = require('../lib/diagnosis');

chrome.runtime.onMessage.addListener(
  function (request, sender, sendResponse) {

    console.log('[chrome-background]', request.message);

    if (request.message === "worsettv.chat.message.diagnose") {
      console.log('[chrome-background] diagnosis request for text', request.text, 'on node', request.node);

      if (diagnosis.is_sane(request.text)) {
        chrome.runtime.sendMessage({
          "message": "worsettv.chat.message.sane",
          "node": request.node,
          "text": request.text
        });
      }
      else {
        chrome.runtime.sendMessage({
          "message": "worsettv.chat.message.ill",
          "node": request.node,
          "text": request.text
        });
      }
    }
  }
);
