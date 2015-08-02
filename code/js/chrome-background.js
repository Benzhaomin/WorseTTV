
var diagnosis = require('./modules/diagnosis');

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {

    //console.log('[chrome-background] ' + request.message);

    if (request.message === "worsettv.message.diagnose") {

      //console.log('[chrome-background] diagnosis request for text ' + request.msg.text + ' on node ' + request.msg.id);

      if (!diagnosis.cancer(request.msg)) {
        //console.log('[chrome-background] sane message here');

        chrome.tabs.sendMessage(sender.tab.id, {
          "message": "worsettv.message.sane",
          "msg": request.msg
        });
      }
      else {
        //console.log('[chrome-background] ill message here');

        chrome.tabs.sendMessage(sender.tab.id, {
          "message": "worsettv.message.ill",
          "msg": request.msg
        });
      }
    }
  }
);
